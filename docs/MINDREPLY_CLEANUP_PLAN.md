# MindReply Production Go-Live Cleanup Runbook

## Scope and safety
Use this runbook on a dedicated cleanup branch. Do not deploy, rotate live credentials, rewrite shared Git history, or apply a production migration without owner approval and a verified rollback path. Never paste secrets into commits, issues, or logs.

## 1. Branch and baseline
```bash
git status --short
git switch main
git pull --ff-only origin main
git switch -c go-live-cleanup
```
If the branch already exists, inspect it instead of overwriting it. Save the current commit SHA and working-tree diff before changes.

## 2. Inspect and remove unsafe artifacts
First inspect tracked files and preserve evidence; do not blindly remove every `.env*` path because safe templates such as `.env.example` may be required.
```bash
git ls-files | grep -E '(^|/)(\.env($|\.)|\.next/|dist/|build/|.*\.log$)'
git status --short
```
Remove only confirmed secrets and generated artifacts from version control. Add ignore rules for local environment files, build output, logs, and dependency directories. Keep sanitized templates with placeholder values only.

## 3. Secret exposure and history
If a credential was committed, revoke/rotate it at the provider first. History rewriting is a coordinated, destructive operation: identify all affected refs, create a protected backup, obtain owner approval, then use `git-filter-repo` and coordinate force-pushes with every collaborator. A rewritten history does not invalidate an exposed credential.

## 4. Credential rotation
Rotate in provider dashboards; record only provider, credential type, rotation time, affected environment, and verification evidence—not the secret value.
- Stripe: rotate the relevant API key and webhook signing secret; test-mode first.
- Supabase: rotate/reissue service credentials only after checking dependent services and recovery access.
- GitHub: rotate exposed tokens and update repository/environment secrets.
- Cloudflare/hosting: rotate exposed tokens and replace environment values through the provider's secret store.
- Any other gateway/provider: rotate only if evidence shows exposure or policy requires it.

## 5. Documentation consolidation
Keep current, accurate operational documents such as `START_HERE.md`, `DEPLOYMENT_RUNBOOK.md`, `GO_LIVE_CHECKLIST.md`, `SECURITY_ROTATION.md`, and `POST_LAUNCH_MONITORING.md` where they exist. Move superseded notes to `docs/archive/` only after checking links and retaining useful history. Do not claim a document exists until verified.

## 6. Pre-deploy checks
Run in the repository root with the committed lockfile and the supported package manager:
```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm build
```
Run only scripts that are defined in `package.json`; if a script is missing, record it as BLOCKED rather than implying it passed. Inspect client bundles for accidental secret values, not merely environment-variable names.

## 7. Queue and ledger checks
- Verify Redis health and queue connectivity.
- Send a signed Stripe test event and confirm the receiver returns `202` only after enqueue succeeds.
- Confirm the worker commits exactly one ledger record for a given Stripe transaction ID.
- Confirm duplicate deliveries do not create duplicate journal entries.
- Verify journal debits equal credits per entry and currency.
- Force a transient database failure and confirm retry/backoff behavior.
- Confirm failed jobs remain inspectable and are alerted/handled; logs must not contain secrets or unnecessary cardholder data.

## 8. Promotion gate
Promotion remains BLOCKED until lint/typecheck/build, container health, signed webhook test, duplicate-delivery test, ledger-balance assertions, secret review, rollback review, and the target URL smoke check have evidence attached to the change. No production migration or public deployment is implied by this runbook.
