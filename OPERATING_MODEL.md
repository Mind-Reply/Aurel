# AUREL × Mind-Reply Operating Model

**Status:** Operating standard proposed for review. This document defines controls; it does not assert that every division, funding source, entitlement, integration, or deployment is already operational.

## Operating principle

“Now” is a live event; evidence preserves a verifiable record of that event after it has passed. Systems must distinguish a timestamp, a content-integrity digest, and an authenticated witness. None alone proves the whole event.

## Eight divisions

1. **Sovereign Cloud & Routing** — open-weight model registry, routing contracts, access controls, usage limits and spend ceilings.
2. **Porting & Integration** — compatibility suites, adapters and runtime migration across providers and model families.
3. **Small Projects Studio** — scoped consultancy, prototypes, agent development and isolated feasibility sandboxes.
4. **Core Projects** — reusable foundations and data pipelines for Open Web, FMCG, pharma and data-lake work.
5. **Large-Scale Programmes** — government delivery, startup incubation and SME acceleration with contracted milestones.
6. **Research & Compute** — training/inference planning, reproducible benchmarks and controlled GPU allocation.
7. **Commercial & Resource Office** — mentoring, workspace, approved data procurement, budgets and written commercial terms.
8. **Technical Assurance** — security, tests, observability, compliance mapping, independent verification and release approval.

These are proposed organizational workstreams, not proof of staffed departments or available capacity.

## Project lifecycle

`Idea / request → triage and scope → isolated sandbox and feasibility → small project / core project / large programme → build and test → independent verification → evidence decision`

- **Fail:** return to the named builder with a reproducible failure and owner.
- **Pass:** release or hand off only through the approved release path; record support owner and rollback route.
- Every project has one accountable owner, one approved budget, one source repository, and one evidence register.
- Sandbox credentials, test data and workloads remain isolated from production. Production data access requires separate authorization.

## Funding and access controls

- Research/open development: free only where the named programme's rules permit; enforce usage limits.
- Incubation: free support or convertible equity only under separate written terms, informed consent and legal review.
- SME acceleration: fees or profit share with costs, IP ownership, scope and exit terms documented before work starts.
- Government/large programmes: contracted milestones plus applicable procurement, security and audit requirements.
- Commercial model access: metered usage with explicit spending caps and alerts.
- GPU tiers **Playground**, **Fast Lane** (including any proposed 50,000-hour allowance) and **Large Scale** (>50,000 hours) are planning categories only. Do not advertise capacity, eligibility or entitlements until provider/programme terms are verified.
- Funding may cover personnel, mentoring, workspace, product development, approved data and eligible compute where permitted. Commercial model-token spend remains a separate cost bucket unless the signed agreement explicitly includes it.

## PATCH Talk — Proof of Now

A proof record should carry three separate evidence classes:

1. **Time:** server-generated UTC timestamp and a monotonic/request identifier where useful. A client timestamp is untrusted.
2. **Reality/integrity:** hash a canonical serialization of the exact content and relevant media bytes. A hash detects changes relative to a trusted recorded digest; it does not prove that content is true, that a photo depicts the claimed event, or that the timestamp is independently trusted.
3. **Witness:** store authenticated witness statements or cryptographic signatures tied to the record digest, identity/key, consent and timestamp. A string such as “yes, we were there” is not a signature and cannot establish who witnessed an event.

Persist the digest and event metadata in an append-only or tamper-evident evidence store with access controls, retention rules and audit logs. Verify signatures on receipt. Treat community visibility and witness consent as privacy-sensitive. Do not publish private stories or media by default.

**Security note:** the example `Date.now() + JSON.stringify(content)` is a prototype, not an unforgeable proof system. A SHA-256 digest is only useful when the canonical input, digest, identity, and trusted record are preserved. Do not claim “un-fakeable” or legal non-repudiation without an appropriate trust and key-management design.

## Release contract

Required flow: **GitHub → validation → approved deployment provider (ResellerPro or Cloudflare, as configured) → smoke/health checks → evidence register → production**.

- A green source build is not a successful deployment.
- A successful deployment is not proof that integrations work.
- Keep production blocked until validation, security review, provider configuration and post-deploy smoke checks pass.
- Never invent resource IDs, keys, evidence, funding, account access or provider entitlements.
- Secrets belong in the approved secret store, never source control.
- Database policy review, least privilege, webhook authentication, rate limiting, idempotency and rollback readiness are release prerequisites.

## Evidence labels

Use **VERIFIED**, **READY**, **BLOCKED**, **FAILED** or **UNVERIFIED**. Every VERIFIED claim links to a reproducible test, provider observation, run log or timestamped evidence artifact. Distinguish implemented source, configured service, tested preview and production observation.
