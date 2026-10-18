#!/usr/bin/env bash
set -euo pipefail

WEBHOOK_SECRET="${STRIPE_ISSUING_WEBHOOK_SECRET:-whsec_local_simulation_secret_test}"
WEBHOOK_URL="http://127.0.0.1:8086/webhooks/issuing"
DB_CONTAINER="aurel-ledger-db"
TX_ID="ipi_test_$(date +%s)_$$"
TIMESTAMP="$(date +%s)"
PAYLOAD_FILE="$(mktemp)"
trap 'rm -f "$PAYLOAD_FILE"' EXIT

command -v docker >/dev/null || { echo "BLOCKED: Docker is not installed."; exit 2; }
command -v openssl >/dev/null || { echo "BLOCKED: OpenSSL is required."; exit 2; }
command -v curl >/dev/null || { echo "BLOCKED: curl is required."; exit 2; }

echo "==> Starting isolated local stack"
docker compose up -d --build

echo "==> Waiting for PostgreSQL"
for _ in $(seq 1 60); do
  if docker exec "$DB_CONTAINER" pg_isready -U a11_admin -d sovereign_ledger >/dev/null 2>&1; then break; fi
  sleep 1
done
docker exec "$DB_CONTAINER" pg_isready -U a11_admin -d sovereign_ledger >/dev/null

cat > "$PAYLOAD_FILE" <<EOF
{"id":"evt_sim_$TIMESTAMP","object":"event","type":"issuing_transaction.created","data":{"object":{"id":"$TX_ID","object":"issuing.transaction","amount":4500,"currency":"usd","card":"ic_test_virtual_fleet_01","type":"capture","merchant_data":{"name":"Fleet Fuel Station #402","category":"automated_fuel_dispensers","city":"Denver","country":"US"},"purchase_details":{"fleet":{"purchase_type":"fuel_purchase","cardholder_prompt_data":{"driver_id":"DRV-109","vehicle_number":"VAN-99","odometer":48290}},"fuel":{"type":"diesel","unit":"us_gallon","quantity_decimal":"12.5000","unit_cost_decimal":"3.6000"}}}}}
EOF

echo "==> Signing raw payload"
SIGNATURE="$(node -e 'const fs=require("fs"),crypto=require("crypto");const p=fs.readFileSync(process.argv[1]);const t=process.argv[2];const s=process.argv[3];process.stdout.write(crypto.createHmac("sha256",s).update(t+".").update(p).digest("hex"))' "$PAYLOAD_FILE" "$TIMESTAMP" "$WEBHOOK_SECRET")"

echo "==> Dispatching signed webhook"
HTTP_STATUS="$(curl --silent --show-error -o /tmp/aurel-webhook-response.json -w '%{http_code}' -X POST "$WEBHOOK_URL" -H 'Content-Type: application/json' -H "Stripe-Signature: t=$TIMESTAMP,v1=$SIGNATURE" --data-binary "@$PAYLOAD_FILE")"
if [ "$HTTP_STATUS" != "200" ]; then
  cat /tmp/aurel-webhook-response.json || true
  echo "FAIL: webhook returned HTTP $HTTP_STATUS"
  exit 1
fi
cat /tmp/aurel-webhook-response.json

echo "==> Checking balanced journal and retained telemetry"
docker exec -i "$DB_CONTAINER" psql -v ON_ERROR_STOP=1 -U a11_admin -d sovereign_ledger -v tx_id="$TX_ID" <<'SQL'
SELECT
  j.reference_id,
  SUM(l.debit_amount_cents) AS total_debit,
  SUM(l.credit_amount_cents) AS total_credit,
  SUM(l.debit_amount_cents) = SUM(l.credit_amount_cents) AS balanced
FROM journal_entries j
JOIN journal_lines l ON l.entry_id = j.id
WHERE j.reference_id = :'tx_id'
GROUP BY j.id, j.reference_id
HAVING SUM(l.debit_amount_cents) = SUM(l.credit_amount_cents);
SQL
BALANCE="$(docker exec -i "$DB_CONTAINER" psql -At -U a11_admin -d sovereign_ledger -v tx_id="$TX_ID" -c "SELECT COALESCE(SUM(l.debit_amount_cents),0)=COALESCE(SUM(l.credit_amount_cents),-1) AND COUNT(*)=2 FROM journal_entries j JOIN journal_lines l ON l.entry_id=j.id WHERE j.reference_id=:'tx_id';")"
[ "$BALANCE" = "t" ] || { echo "FAIL: ledger did not balance"; exit 1; }

TELEMETRY="$(docker exec -i "$DB_CONTAINER" psql -At -U a11_admin -d sovereign_ledger -v tx_id="$TX_ID" -c "SELECT level_3_purchase_details->'fleet'->'cardholder_prompt_data'->>'driver_id' FROM stripe_issuing_transactions WHERE stripe_transaction_id=:'tx_id';")"
[ "$TELEMETRY" = "DRV-109" ] || { echo "FAIL: Level 3 telemetry was not retained"; exit 1; }

echo "PASS: signed webhook, balanced ledger, and fleet telemetry verified."
