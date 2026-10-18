-- Hardens the immutable-ledger trigger function against search_path shadowing.
ALTER FUNCTION public.fn_prevent_ledger_mutation() SET search_path = pg_catalog;
