BEGIN;

CREATE TABLE IF NOT EXISTS ledger_accounts (
  id BIGSERIAL PRIMARY KEY,
  account_number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('asset','liability','equity','revenue','expense')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS journal_entries (
  id BIGSERIAL PRIMARY KEY,
  reference_id TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS journal_lines (
  id BIGSERIAL PRIMARY KEY,
  entry_id BIGINT NOT NULL REFERENCES journal_entries(id),
  account_id BIGINT NOT NULL REFERENCES ledger_accounts(id),
  debit_amount_cents BIGINT NOT NULL DEFAULT 0 CHECK (debit_amount_cents >= 0),
  credit_amount_cents BIGINT NOT NULL DEFAULT 0 CHECK (credit_amount_cents >= 0),
  currency CHAR(3) NOT NULL,
  CHECK ((debit_amount_cents > 0 AND credit_amount_cents = 0) OR (credit_amount_cents > 0 AND debit_amount_cents = 0))
);

CREATE TABLE IF NOT EXISTS stripe_issuing_transactions (
  id BIGSERIAL PRIMARY KEY,
  stripe_transaction_id TEXT NOT NULL UNIQUE,
  card_id TEXT NOT NULL,
  cardholder_id TEXT,
  amount_cents BIGINT NOT NULL,
  currency CHAR(3) NOT NULL,
  transaction_type TEXT NOT NULL,
  merchant_category_code TEXT,
  merchant_name TEXT,
  merchant_city TEXT,
  merchant_country TEXT,
  level_3_purchase_details JSONB NOT NULL DEFAULT '{}'::jsonb,
  journal_entry_id BIGINT NOT NULL UNIQUE REFERENCES journal_entries(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO ledger_accounts (account_number, name, account_type) VALUES
  ('1010-CARDHOLDER-FUNDS', 'Cardholder Funds Reserve', 'liability'),
  ('5010-MERCHANT-SETTLEMENT-EXPENSE', 'Merchant Settlement Expense', 'expense'),
  ('4010-UNLINKED-REFUND-CLEARING', 'Unlinked Refund Clearing', 'liability')
ON CONFLICT (account_number) DO NOTHING;

CREATE OR REPLACE FUNCTION prevent_ledger_row_mutation()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = pg_catalog
AS $$
BEGIN
  RAISE EXCEPTION 'Ledger rows are immutable; append a correcting entry instead.';
END;
$$;

DROP TRIGGER IF EXISTS journal_entries_immutable ON journal_entries;
CREATE TRIGGER journal_entries_immutable
BEFORE UPDATE OR DELETE ON journal_entries
FOR EACH ROW EXECUTE FUNCTION prevent_ledger_row_mutation();

DROP TRIGGER IF EXISTS journal_lines_immutable ON journal_lines;
CREATE TRIGGER journal_lines_immutable
BEFORE UPDATE OR DELETE ON journal_lines
FOR EACH ROW EXECUTE FUNCTION prevent_ledger_row_mutation();

DROP TRIGGER IF EXISTS stripe_issuing_transactions_immutable ON stripe_issuing_transactions;
CREATE TRIGGER stripe_issuing_transactions_immutable
BEFORE UPDATE OR DELETE ON stripe_issuing_transactions
FOR EACH ROW EXECUTE FUNCTION prevent_ledger_row_mutation();

COMMIT;
