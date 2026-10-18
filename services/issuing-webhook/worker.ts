import { Job, Worker } from 'bullmq';
import { Pool } from 'pg';
import Stripe from 'stripe';

for (const name of ['DATABASE_URL', 'REDIS_HOST']) {
  if (!process.env[name]) throw new Error(`Missing required environment variable: ${name}`);
}

const redisConnection = {
  host: process.env.REDIS_HOST!,
  port: Number(process.env.REDIS_PORT || 6379),
  maxRetriesPerRequest: null,
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  // Production deployments must provide a verified TLS configuration where required.
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
});

interface WebhookJobData {
  eventId: string;
  transaction: Stripe.Issuing.Transaction;
  receivedAt: string;
}

export const issuingLedgerWorker = new Worker<WebhookJobData>(
  'stripe-issuing-queue',
  async (job: Job<WebhookJobData>) => {
    const { transaction: tx, eventId } = job.data;
    const client = await pool.connect();
    let inTransaction = false;

    try {
      await client.query('BEGIN');
      inTransaction = true;

      // The transaction ID unique constraint is the final idempotency guard.
      const existing = await client.query(
        'SELECT journal_entry_id FROM stripe_issuing_transactions WHERE stripe_transaction_id = $1',
        [tx.id],
      );
      if (existing.rowCount) {
        await client.query('COMMIT');
        inTransaction = false;
        return { status: 'DUPLICATE', entryId: existing.rows[0].journal_entry_id };
      }

      const accountsRes = await client.query(
        'SELECT id, account_number FROM ledger_accounts WHERE account_number = ANY($1::text[])',
        [['1010-CARDHOLDER-FUNDS', '5010-MERCHANT-SETTLEMENT-EXPENSE', '4010-UNLINKED-REFUND-CLEARING']],
      );
      const accounts = new Map<string, string>(
        accountsRes.rows.map((row: { account_number: string; id: string | number }) => [row.account_number, String(row.id)]),
      );
      const fundsId = accounts.get('1010-CARDHOLDER-FUNDS');
      const expenseId = accounts.get('5010-MERCHANT-SETTLEMENT-EXPENSE');
      const refundClearingId = accounts.get('4010-UNLINKED-REFUND-CLEARING');
      if (!fundsId || !expenseId || !refundClearingId) {
        throw new Error('Required chart-of-accounts entries are missing.');
      }

      const amountCents = Math.abs(tx.amount);
      if (!Number.isSafeInteger(amountCents) || amountCents <= 0) {
        throw new Error('Transaction amount must be a positive safe integer in minor units.');
      }
      const currency = tx.currency.toUpperCase();
      const isRefund = tx.type === 'refund';
      const merchant = tx.merchant_data?.name || (isRefund ? 'Unlinked Credit' : 'Unknown Merchant');

      const journalRes = await client.query(
        'INSERT INTO journal_entries (reference_id, description) VALUES ($1, $2) RETURNING id',
        [tx.id, `Issuing ${isRefund ? 'Refund' : 'Capture'}: ${merchant}`],
      );
      const entryId = journalRes.rows[0].id;

      if (!isRefund) {
        await client.query(
          `INSERT INTO journal_lines (entry_id, account_id, debit_amount_cents, credit_amount_cents, currency)
           VALUES ($1, $2, $3, 0, $4), ($1, $5, 0, $3, $4)`,
          [entryId, expenseId, amountCents, currency, fundsId],
        );
      } else {
        await client.query(
          `INSERT INTO journal_lines (entry_id, account_id, debit_amount_cents, credit_amount_cents, currency)
           VALUES ($1, $2, $3, 0, $4), ($1, $5, 0, $3, $4)`,
          [entryId, fundsId, amountCents, currency, refundClearingId],
        );
      }

      await client.query(
        `INSERT INTO stripe_issuing_transactions (
          stripe_transaction_id, card_id, cardholder_id, amount_cents, currency,
          transaction_type, merchant_category_code, merchant_name, merchant_city,
          merchant_country, level_3_purchase_details, journal_entry_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
        [
          tx.id, tx.card, tx.cardholder || null, tx.amount, currency, tx.type,
          tx.merchant_data?.category || null, tx.merchant_data?.name || null,
          tx.merchant_data?.city || null, tx.merchant_data?.country || null,
          JSON.stringify(tx.purchase_details || {}), entryId,
        ],
      );

      await client.query('COMMIT');
      inTransaction = false;
      console.info(`[QUEUE_SUCCESS] event=${eventId} job=${job.id} transaction=${tx.id} journal_entry=${entryId} received_at=${job.data.receivedAt}`);
      return { status: 'COMMITTED', entryId };
    } catch (error: unknown) {
      if (inTransaction) {
        try { await client.query('ROLLBACK'); } catch (rollbackError) {
          console.error('[ROLLBACK_FAILED]', rollbackError);
        }
      }
      const message = error instanceof Error ? error.message : String(error);
      console.error(`[QUEUE_RETRY] job=${job.id} attempt=${job.attemptsMade + 1}: ${message}`);
      throw error;
    } finally {
      client.release();
    }
  },
  {
    connection: redisConnection,
    concurrency: 5,
    limiter: { max: 100, duration: 1000 },
  },
);

issuingLedgerWorker.on('failed', (job, error) => {
  console.error(`[QUEUE_JOB_FAILED] job=${job?.id ?? 'unknown'} attempts=${job?.attemptsMade ?? 'unknown'}: ${error.message}`);
});

async function shutdown() {
  await issuingLedgerWorker.close();
  await pool.end();
}
process.on('SIGTERM', () => shutdown().finally(() => process.exit(0)));
process.on('SIGINT', () => shutdown().finally(() => process.exit(0)));
