# Aurel Afterglow — optional concept instructions

This directory holds a design option imported from a user-provided archive. It is not the authoritative production brand contract.

Before using it, read `README.md`, `aurel-afterglow.tokens.css`, and `assistant-modes.json`.

## Scope boundary
- Current canonical Aurel repository positioning is premium connectivity design.
- The archived assistant-mode concept is a different possible experience surface.
- Keep this concept isolated until the owner explicitly selects it.
- Do not replace the existing gold/Cormorant palette, public copy, navigation, or routes as part of artifact ingestion.
- Do not claim that the eight modes are implemented application capabilities. They are a proposed interaction taxonomy only.

## Design rules for the option
- Use semantic tokens; do not scatter new hex values through components.
- Keep a dark, high-contrast, cinematic surface with restrained lime/ember/violet accents.
- Body text at least 16px; captions at least 12px; touch targets at least 44×44px.
- Provide keyboard focus, semantic labels, visible error/empty/loading/permission states and status text that does not rely on color alone.
- Respect `prefers-reduced-motion`; do not use motion to hide state or delay user control.
- No action may look successful until its result is verified.

## Permission model
- Sense, Scout and Lens are read-oriented.
- Forecast suggests only.
- Strategy plans until approved.
- Studio creates drafts and requires approval before publishing/sending.
- Forge may make local changes; external writes/deployment require approval.
- Pilot requires explicit approval for consequential external actions.

## Verification
Review the concept separately from production. Do not merge or deploy based on a successful file commit alone. Record preview URL or local test evidence, desktop/mobile checks, accessibility checks, and explicit approval before production integration.
