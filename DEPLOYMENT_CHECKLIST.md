# PATCH Talk / WhatsApp Router Deployment Checklist

**Purpose:** release gate for `Mind-Reply/whatsapp-ai-router`. This checklist does not authorize a production deployment by itself.

**Current known record:** PR #98 is merged. Issue #99 records a release recovery effort where validation and related payment-wire checks failed, deployment/smoke steps were skipped, and the exact first failing command was not recovered from the available logs. Treat the release as unverified until new evidence supersedes that record.

## A. Confirm the target

- [ ] Confirm canonical repository: `Mind-Reply/whatsapp-ai-router`.
- [ ] Confirm the intended Cloudflare account, Worker/Pages project, production domain and connected GitHub repository.
- [ ] Inventory duplicate or stale deployments and their routes read-only. Do not change DNS/routes until the owner approves a migration plan.
- [ ] Record the current production version/commit and rollback target.
- [ ] Keep test and live credentials, webhook endpoints and payment evidence separate.

## B. Recover the build failure

- [ ] Open the failing GitHub Actions run and identify the **first failing command**.
- [ ] Save the exact error output and relevant job/step URL.
- [ ] Check the actual source entry point and imports used by the failing build.
- [ ] Search the relevant branch/commit for `createFetchHttpClient`; only patch it if the failing stack trace or runtime compatibility test proves it is involved.
- [ ] Inspect email-provider code before changing packages or providers. Do not replace a provider just because another provider is available.
- [ ] Reconcile `src/index.ts`, `src/types.ts`, configuration validation and the deployed entry point.
- [ ] Run the repository's documented typecheck, tests and build commands; attach the logs to the PR.
- [ ] Review dependency lockfile consistency and security scan results.

## C. Verify Cloudflare resources and configuration

- [ ] Read the intended Cloudflare account's existing KV namespace inventory.
- [ ] Confirm that `RATE_LIMIT_KV`, `DEDUP_KV`, and any required proof/evidence bindings point to the correct persistent namespaces.
- [ ] Commit only actual, account-verified resource IDs. Never invent or copy IDs from an unrelated account.
- [ ] Confirm the D1 database binding and schema required by the running code.
- [ ] Confirm any Vectorize/index dependency if the selected deployment uses it.
- [ ] Confirm required secrets exist in the provider secret store without printing their values.
- [ ] Verify Supabase RLS and server-side service-role access. Do not use the service-role key in client-side code.
- [ ] Confirm configuration is resolved for the target environment, not inferred from hostname or client input.

## D. Preview validation

- [ ] Preview deployment succeeds for the reviewed commit.
- [ ] `GET /health` returns the expected service and environment response.
- [ ] `GET /webhook` with the correct test verification parameters returns the challenge; incorrect tokens are rejected.
- [ ] Signed synthetic `POST /webhook` payload is accepted.
- [ ] Invalid/missing signatures are rejected.
- [ ] Duplicate event delivery does not create duplicate side effects.
- [ ] A valid synthetic message reaches the expected test processing path.
- [ ] The resulting event/processing record is persisted in the intended test store.
- [ ] Outbound WhatsApp behavior is verified using a controlled test recipient and approved test setup.
- [ ] Retry behavior, timeouts, errors and logs are reviewed without exposing personal data or secrets.
- [ ] No live charge, refund, payout or customer contact occurs as part of routine validation.

## E. Payment and revenue evidence (read-only unless separately approved)

- [ ] Confirm the Stripe mode/account used by the target environment.
- [ ] Reconcile relevant Stripe event/payment identifiers with webhook delivery and database persistence.
- [ ] Separate payment attempts, successful captures, refunds, disputes, fees, net balance transactions and payouts.
- [ ] Report zero only for the exact source, account and date range queried; record query/run evidence.
- [ ] Never treat request volume or a webhook error count as proof that those requests were paid users.

## F. PR evidence bundle

- [ ] PR URL, branch and commit SHA.
- [ ] CI run links and successful typecheck/test/build results.
- [ ] Preview deployment URL and provider-side deployment record.
- [ ] Health and signed-webhook smoke-test results.
- [ ] Binding/resource verification evidence with secret values redacted.
- [ ] Database/RLS review results.
- [ ] Security review and any unresolved findings.
- [ ] Rollback instructions and current version recorded.
- [ ] Owner review and explicit release approval.

## G. Production release gate

Do not dispatch a production deployment until all required checks above pass, unresolved critical security issues are addressed, and the owner explicitly approves the release.

After an approved deployment:

- [ ] Confirm deployed commit/version in the provider.
- [ ] Re-run health and controlled webhook smoke tests.
- [ ] Confirm persisted event evidence and delivery behavior.
- [ ] Observe error rate and logs over a defined window.
- [ ] Roll back if the release breaches the agreed health/error criteria.
- [ ] Update the recovery issue with evidence URLs and the final outcome.

## Current known blocker

The recovery record is [issue #99](https://github.com/Mind-Reply/whatsapp-ai-router/issues/99). It reports that the precise CI root cause remains undetermined and that actual Cloudflare namespace IDs must be verified. The claim that `Stripe.createFetchHttpClient()` or a mailer dependency is the root cause is **not accepted without matching code and failure logs**.

A checklist marked complete is not proof by itself: attach direct evidence for every required item.
