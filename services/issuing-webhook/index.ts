import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import { Pool } from 'pg';

const app = express();
const port = Number(process.env.PORT || 8086);

const requiredEnv = ['STRIPE_SECRET_KEY', 'DATABASE_URL', 'STRIPE_ISSUING_WEBHOOK_SECRET'] as const;
for (const name of requiredEnv) {
  if (!process.env[name]) throw new Error(`Missing required environment variable: ${name}`);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia' as Stripe.LatestApiVersion,
});
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Prefer verified TLS configuration in production; do not disable certificate validation.
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
});
const webhookSecret = process.env.STRIPE_ISSUING_WEBHOOK_SECRET!;

// Stripe signature verification requires the unmodified request bytes.
app.post('/webhooks/issuing', express.raw({ type: 'application/json' }), async (req: Request, res: Response): Promise<void> => {
  const signature = req.headers['stripe-signature'];
  if (typeof signature !== 'string' || !Buffer.isBuffer(req.body)) {
    res.status(400).json({ error: 'Missing Stripe signature or raw request body.' });
    return;
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Invalid signature';
    console.error('[SECURITY_ALERT] Stripe signature verification failed:', message);
    res.status(400).json({ error: 'Invalid webhook signature.' });
    return;
  }

  if (event.type !== 'issuing_transaction.created') {
    res.json({ received: true, ignored: event.type });
    return;
  }

  const tx = event.data.object as Stripe.Issuing.Transaction;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // This service depends on the migration/schema being reviewed and applied before deployment.
    // Idempotency is enforced by a unique Stripe transaction ID in the database migration.
    const existing = await client.query(
      'SELECT journal_entry_id FROM stripe_issuing_transactions WHERE stripe_transaction_id = $1 FOR UPDATE',
      [tx.id],
    );
    if (existing.rowCount) {
      await client.query('COMMIT');
      res.json({ received: true, duplicate: true, journal_entry_id: existing.rows[0].journal_entry_id });
      return;
    }

    const accountsRes = await client.query(
      `SELECT id, account_number FROM ledger_accounts WHERE account_number = ANY($1::text[])`,
      [['1010-CARDHOLDER-FUNDS', '5010-MERCHANT-SETTLEMENT-EXPENSE', '4010-UNLINKED-REFUND-CLEARING']],
    );
    const accounts = new Map<string, string>(accountsRes.rows.map((row: { account_number: string; id: string }) => [row.account_number, row.id]));
    const cardholderFundsId = accounts.get('1010-CARDHOLDER-FUNDS');
    const merchantExpenseId = accounts.get('5010-MERCHANT-SETTLEMENT-EXPENSE');
    const refundClearingId = accounts.get('4010-UNLINKED-REFUND-CLEARING');
    if (!cardholderFundsId || !merchantExpenseId || !refundClearingId) {
      throw new Error('Required chart-of-accounts entries are missing.');
    }

    const isRefund = tx.type === 'refund';
    const amountCents = Math.abs(tx.amount);
    if (!Number.isSafeInteger(amountCents) || amountCents <= 0) throw new Error('Transaction amount is invalid.');
    const currency = tx.currency.toUpperCase();
    const description = isRefund
      ? `Issuing Refund: ${tx.merchant_data?.name || 'Unknown Merchant'}`
      : `Issuing Capture: ${tx.merchant_data?.name || 'Unknown Merchant'}`;

    const journalRes = await client.query(
      'INSERT INTO journal_entries (reference_id, description) VALUES ($1, $2) RETURNING id',
      [tx.id, description],
    );
    const entryId = journalRes.rows[0].id;

    if (!isRefund) {
      await client.query(
        `INSERT INTO journal_lines (entry_id, account_id, debit_amount_cents, credit_amount_cents, currency)
         VALUES ($1, $2, $3, 0, $4), ($1, $5, 0, $3, $4)`,
        [entryId, merchantExpenseId, amountCents, currency, cardholderFundsId],
      );
    } else {
      await client.query(
        `INSERT INTO journal_lines (entry_id, account_id, debit_amount_cents, credit_amount_cents, currency)
         VALUES ($1, $2, $3, 0, $4), ($1, $5, 0, $3, $4)`,
        [entryId, cardholderFundsId, amountCents, currency, refundClearingId],
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
    console.info(`[LEDGER_COMMITTED] Stripe transaction ${tx.id} recorded as journal entry ${entryId}.`);
    res.json({ received: true, journal_entry_id: entryId });
  } catch (error: unknown) {
    try { await client.query('ROLLBACK'); } catch (rollbackError) {
      console.error('[LEDGER_FAILURE] Rollback failed:', rollbackError);
    }
    console.error('[LEDGER_FAILURE] Issuing transaction was not committed:', error);
    res.status(503).json({ error: 'Ledger processing unavailable; retry delivery.' });
  } finally {
    client.release();
  }
});

app.listen(port, () => console.info(`Issuing webhook listening on port ${port}`));
