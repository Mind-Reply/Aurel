# Frontier Quality Contract

Aurel is the reference implementation for the Mind-Reply web estate. It is a living product, not a static mockup.

## Non-negotiable release gates

- Every production URL must return a deliberate response; accidental 404s are release blockers.
- Every navigation item must resolve to a real route.
- Direct deep-links must work on a cold request.
- Mobile and desktop layouts must remain usable.
- Loading, empty, error and not-found states must be intentional and branded.
- Build, typecheck, lint and route smoke tests must pass before production promotion.
- Broken production routes create a GitHub issue with URL, status, deployment and first-seen timestamp.
- A failed deployment must never replace the last known-good production deployment.

## Design direction

Aurel remains the canonical visual reference: spatial, premium, restrained, highly legible, motion-aware and responsive. New pages should extend that language while adapting information architecture and interaction patterns to their actual purpose.

## Required page families

Home, product/capabilities, about/context, documentation or knowledge, contact, legal/privacy where applicable, status/health, and a branded not-found fallback. Product-specific applications may add dashboards, workflows, onboarding, pricing, authentication and settings.

## Automation contract

The repository should continuously validate routes and production health. Automation must prefer repair PRs over silent mutation, retain rollback paths, and report every failure with enough evidence to reproduce it.
