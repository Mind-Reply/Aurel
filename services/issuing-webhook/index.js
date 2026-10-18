const express = require('express');
const Stripe = require('stripe');
const { Pool } = require('pg');

for (const name of ['STRIPE_SECRET_KEY', 'DATABASE_URL', 'STRIPE_ISSUING_WEBHOOK_SECRET']) {
  if (!process.env[name]) throw new Error('Missing required environment variable: ' + name);
}
const app = express();
const port = Number(process.env.PORT || 8086);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-01-27.acacia' });
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
});

app.get('/health', (_req, res) => res.json({ ok: true }));
app.post('/webhooks/issuing', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];
  if (typeof signature !== 'string' || !Buffer.isBuffer(req.body)) {
    return res.status(400).json({ error: 'Missing Stripe signature or raw request body.' });
  }
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_ISSUING_WEBHOOK_SECRET);
  } catch (_error) {
    return res.status(400).json({ error: 'Invalid webhook signature.' });
  }
  if (event.type !== 'issuing_transaction.created') return res.json({ received: true, ignored: event.type });

  const tx = event.data.object;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    // The unique constraint on stripe_transaction_id is the final race-safe idempotency guard.
    const existing = await client.query('SELECT journal_entry_id FROM stripe_issuing_transactions WHERE stripe_transaction_id = $1', [tx.id]);
    if (existing.rowCount) {
      await client.query('COMMIT');
      return res.json({ received: true, duplicate: true, journal_entry_id: existing.rows[0].journal_entry_id });
    }
    const accountRows = await client.query(
      'SELECT id, account_number FROM ledger_accounts WHERE account_number = ANY($1::text[])',
      [['1010-CARDHOLDER-FUNDS', '5010-MERCHANT-SETTLEMENT-EXPENSE', '4010-UNLINKED-REFUND-CLEARING']],
    );
    const accounts = new Map(accountRows.rows.map(row => [row.account_number, row.id]));
    const funds = accounts.get('1010-CARDHOLDER-FUNDS');
    const expense = accounts.get('5010-MERCHANT-SETTLEMENT-EXPENSE');
    const refundClearing = accounts.get('4010-UNLINKED-REFUND-CLEARING');
    if (!funds || !expense || !refundClearing) throw new Error('Required ledger accounts are missing.');
    const amount = Math.abs(tx.amount);
    if (!Number.isSafeInteger(amount) || amount <= 0) throw new Error('Invalid transaction amount.');
    const currency = String(tx.currency).toUpperCase();
    const isRefund = tx.type === 'refund';
    const header = await client.query(
      'INSERT INTO journal_entries (reference_id, description) VALUES ($1, $2) RETURNING id',
      [tx.id, (isRefund ? 'Issuing Refund: ' : 'Issuing Capture: ') + (tx.merchant_data?.name || 'Unknown Merchant')],
    );
    const entryId = header.rows[0].id;
    const debitAccount = isRefund ? funds : expense;
    const creditAccount = isRefund ? refundClearing : funds;
    await client.query(
      'INSERT INTO journal_lines (entry_id, account_id, debit_amount_cents, credit_amount_cents, currency) VALUES ($1,$2,$3,0,$4),($1,$5,0,$3,$4)',
      [entryId, debitAccount, amount, currency, creditAccount],
    );
    await client.query(
      `INSERT INTO stripe_issuing_transactions (
        stripe_transaction_id, card_id, cardholder_id, amount_cents, currency,
        transaction_type, merchant_category_code, merchant_name, merchant_city,
        merchant_country, level_3_purchase_details, journal_entry_id
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [tx.id, tx.card, tx.cardholder || null, tx.amount, currency, tx.type,
        tx.merchant_data?.category || null, tx.merchant_data?.name || null,
        tx.merchant_data?.city || null, tx.merchant_data?.country || null,
        JSON.stringify(tx.purchase_details || {}), entryId],
    );
    await client.query('COMMIT');
    return res.json({ received: true, journal_entry_id: entryId });
  } catch (error) {
    try { await client.query('ROLLBACK'); } catch (rollbackError) { console.error('Rollback failed', rollbackError); }
    if (error && error.code === '23505') {
      // A concurrent delivery won the unique transaction-ID race. Read its committed result.
      try {
        const existing = await pool.query('SELECT journal_entry_id FROM stripe_issuing_transactions WHERE stripe_transaction_id = $1', [tx.id]);
        if (existing.rowCount) return res.json({ received: true, duplicate: true, journal_entry_id: existing.rows[0].journal_entry_id });
      } catch (readError) { console.error('Idempotency recovery failed', readError); }
    }
    console.error('Ledger processing failed', error);
    return res.status(503).json({ error: 'Ledger processing unavailable; retry delivery.' });
  } finally {
    client.release();
  }
});
app.listen(port, () => console.info('Issuing webhook listening on ' + port));
