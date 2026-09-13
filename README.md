# Aurel — The Atelier

Aurel is the premium experience product within the Mind-Reply estate. It owns atmosphere, gesture, visual craft and distinctive digital presence rather than operational control-plane behavior.

## Product boundary

- Experience product, not MindReply's canonical web/API root.
- Keep Aurel's visual identity and interaction language independent.
- Shared infrastructure, telemetry and delivery contracts are allowed where they reduce duplication without flattening the product.
- Consequential automation must remain explicit and recoverable.

## Deployment

The repository describes a static experience surface for `aurel.mind-reply.com`. The actual delivery binding must be verified from the hosting provider before production status is claimed.

## Estate relationship

- Canonical platform source: `Mind-Reply/mindreply`
- Control plane: `Mind-Reply/control-plane`
- A11-K: `Mind-Reply/A11-K`

Aurel remains a separate product/module with its own deployment and design contract.
