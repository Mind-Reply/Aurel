# Aurel — The Atelier

Aurel is the premium experience product within the Mind-Reply estate. It owns atmosphere, interaction craft, visual identity and distinctive digital presence; it is not the operational control plane.

## Product function

- Premium experience and brand surface.
- Independent visual and interaction language.
- Shared infrastructure, telemetry and delivery tooling only where compatible with the product boundary.
- Consequential automation must be explicit, reversible and evidenced.

## Estate relationship

- Canonical platform: `Mind-Reply/mindreply-app`
- Private owner-control source: `angellllkr-eng/agent-control-plane`
- Organization control-plane repository: `Mind-Reply/control-plane` (legacy/source-freeze)
- A11-K: `Mind-Reply/A11-K`
- Migration/reference source: `Mind-Reply/mind-reply-core`

## Delivery contract

The repository is the source for Aurel experience work. Hosting bindings, domains and production health must be verified from the delivery provider; source presence or a successful platform build alone is not production proof.

### Deployment ownership

- Cloudflare Pages' connected GitHub integration is the canonical static-site deployment path.
- GitHub Actions validates the Next.js build and Docker images for `linux/amd64` and `linux/arm64`.
- Docker Hub publishing is optional and runs only when both registry credentials are configured; missing credentials do not suppress architecture validation.
- Duplicate GitHub Pages, Render-hook, and token-based Wrangler deployment paths are intentionally not used. This prevents one source change from triggering competing production deployments.
- D1 is not configured until a real account-verified database ID is provisioned. Lead intake must remain fail-closed with `NEEDS_D1_BINDING` until that is done.


No DNS, routing, credentials, billing or external-service changes are made by repository reconciliation without explicit owner approval.

Cross-estate classification and evidence are maintained in `Mind-Reply/mindreply-app/ESTATE_RECONSTRUCTION_AUDIT_2026-09-13.md`.
