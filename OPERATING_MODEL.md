# AUREL × Mind-Reply Operating Model

**Purpose:** one shared operating contract for product ownership, project routing, assurance, funding boundaries and evidence-based release decisions.

**Document status:** Proposed operating standard. Repository facts are linked where known; commercial terms, programme eligibility and infrastructure entitlements must be independently confirmed before being advertised or treated as active.

## 1. Estate boundaries and ownership

| Area | Responsibility | Delivery evidence |
|---|---|---|
| AUREL | Premium experience, interaction craft, visual identity and distinctive digital presence | Reviewed UI, accessibility checks, build and provider-side health |
| Mind-Reply core | Shared product and operational workflows | Tests, integration contracts, owner approval and runtime evidence |
| A11-K | Platform and routing experiments, with explicit boundaries between sandbox and production | Reproducible experiments, compatibility results and resource limits |
| PATCH Talk / WhatsApp router | Messaging webhook and associated routing | Signature-validation tests, idempotency checks, webhook logs and successful health/smoke tests |
| ResellerPro | Intended hosting/reseller operating layer; use only where provider access and deployment capability are confirmed | Provider account/resource evidence, deployment record, health check and rollback path |
| Technical Assurance | Independent verification and release recommendation | Test results, security findings, evidence index and explicit approval record |

Repository names and product labels are not, by themselves, proof of canonical runtime ownership. Confirm the connected deployment repository, project/account, domain routes and active version with the relevant provider before changing production.

## 2. Required delivery flow

`GitHub → validation → preview → independent smoke/security checks → evidence review → owner approval → production release → post-release verification`

- A failed or missing required check stops the release.
- A successful build proves only that the build completed; it does not prove that secrets, bindings, domains, data stores, webhooks or payment flows work.
- A preview is not production. Test credentials, fixtures and synthetic events must remain separate from live financial activity.
- Production deployment, secret changes, database migrations and financial actions require explicit owner approval after preflight checks pass.
- If the intended hosting path is ResellerPro, verify it is actually provisioned and connected first. The Aurel repository currently documents Cloudflare Pages as its canonical static-site deployment path; do not silently replace that path with an assumed ResellerPro integration.

## 3. Project intake and routing

`Idea / request → triage and scope → isolated sandbox / feasibility → project class → build and test → independent verification → evidence decision → release or return to builder → support and scale`

Choose the smallest suitable delivery class:

1. **Small project:** bounded prototype, integration, assessment or consultancy.
2. **Core project:** reusable foundation, shared platform, pipeline or cross-product capability.
3. **Large programme:** multi-party delivery requiring funded milestones, procurement, governance and security review.

Each project must have one accountable owner, a written scope, a budget or spending limit, a risk record, a repository/source of truth, and an evidence location. Sandbox work must not inherit production credentials or permissions by default.

## 4. Eight operating divisions

1. **Sovereign Compute and Model Routing** — model/provider registry, routing interface, access policy, usage and cost limits.
2. **Porting and Integration** — runtime adapters, compatibility tests and migration records.
3. **Small Projects Studio** — prototypes, assessments and bounded implementation engagements.
4. **Core Projects** — reusable platforms, data pipelines and shared foundations.
5. **Large Programmes** — contracted milestones, programme governance and partner delivery.
6. **Research and Compute** — workload plans, benchmarks, capacity and approved compute access.
7. **Commercial and Resource Office** — budgets, mentoring, workspace, data procurement and written commercial terms.
8. **Technical Assurance** — testing, security, observability, compliance evidence and release recommendations.

These divisions are an operating model, not a claim that eight separate staffed or funded units already exist.

## 5. Funding, access and cost boundaries

- Research/open development may be free only where the specific programme allows it and documented usage limits are in place.
- Incubation, equity, fees and profit-share require separate written terms, clear ownership/IP treatment, and informed consent before work begins.
- SME and large-programme engagements require agreed scope, cost ownership, milestones and procurement/security requirements.
- Commercial model access must be metered where feasible, with budgets, quotas, alerts and explicit limits.
- Personnel, mentoring, workspace, product development, approved data and eligible compute may be fundable only when permitted by the applicable agreement.
- Commercial model-token/API spend remains a separate cost line unless a signed agreement explicitly includes it.
- “Playground”, “Fast Lane” and “Large Scale” are proposed capacity tiers until eligibility, capacity, limits and pricing are verified. Do not advertise them as confirmed entitlements.

## 6. Evidence and release decisions

A release evidence bundle should contain, as applicable:

- repository, branch, commit SHA and pull request;
- required CI run URLs and exact results;
- dependency, typecheck, unit-test and build outputs;
- preview URL and environment identification;
- configuration/binding inventory with secret values redacted;
- webhook signature, deduplication, retry and delivery test results;
- database write/read evidence using synthetic or explicitly approved test data;
- security review, unresolved findings and rollback instructions;
- owner approval and post-release health/smoke evidence.

Use evidence-based wording:
- **Verified:** direct evidence from the correct environment.
- **Ready:** prerequisites passed and the next controlled step can proceed; not a claim that production is live.
- **Continue:** work remains; state the exact next action and owner.
- **Contribution needed:** a human decision, credential provisioning or approval is required.

Never infer revenue from request counts, database rows, build logs or provider bills. Reconcile payments against Stripe records and persisted application events; distinguish gross payments, refunds, fees, net balance movements and payouts.

## 7. Security and control rules

- Keep secrets in the appropriate provider secret store; never commit credentials or request them in chat.
- Use least privilege and read-only inspection for audits wherever possible.
- Validate webhook signatures against the exact raw request body and deduplicate events before side effects.
- Keep payment operations read-only during recovery unless a separately approved test explicitly requires otherwise.
- Keep production blocked while critical validation, data-access or security controls remain unverified.
- Do not perform destructive changes, production data migrations, secret rotations or deployments without owner approval and a documented rollback path.

## 8. Immediate priorities

1. Resolve the canonical PATCH Talk runtime and connected deployment target using provider-side evidence.
2. Recover the exact first failing command from the canonical repository's CI logs; do not assume a Stripe HTTP-client or mailer issue without a matching stack trace.
3. Reconcile runtime types/configuration and run typecheck, tests and build.
4. Verify actual Cloudflare KV namespace IDs and other required resources in the intended account; never invent IDs.
5. Verify Supabase row-level security and service-role access boundaries before enabling production data paths.
6. Run signed synthetic webhook tests, verify event persistence and outbound response behavior, then capture evidence.
7. Only then request release approval and execute the authorized deployment.

## Related source of truth

- AUREL repository delivery contract: [README.md](README.md)
- Canonical WhatsApp router recovery record: [Mind-Reply/whatsapp-ai-router issue #99](https://github.com/Mind-Reply/whatsapp-ai-router/issues/99)
- Secured read-only Stripe balance endpoint: [Mind-Reply/whatsapp-ai-router PR #98](https://github.com/Mind-Reply/whatsapp-ai-router/pull/98)

This document is an operating standard. It does not assert that production is healthy, that income has been received, that all divisions are staffed, or that any proposed funding or hosting entitlement has been approved.
