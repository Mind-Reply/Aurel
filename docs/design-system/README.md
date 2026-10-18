# Aurel Afterglow — optional design-system artifact

**Status: READY as a reviewable design option; NOT applied to production UI.**

This package was derived from the user-provided `docs.zip`. It contains:
- `aurel-afterglow.tokens.css`: semantic palette, type, spacing, radius, motion and surface tokens.
- `assistant-modes.json`: eight example interaction modes with permission boundaries.
- `preview.html`: self-contained comparison surface to open locally or through an approved preview host.
- `AGENTS.md`: implementation and review constraints for this option.

## Important product boundary

The current `Mind-Reply/Aurel` repository describes Aurel as **premium connectivity design** for homes, hospitality and executive spaces. The archive's original instructions describe an anticipatory workspace with assistant modes. Those are not the same product contract.

Therefore this is kept as a **separate optional concept**, not made the authoritative brand guide, not wired into the existing homepage, and not used to relabel the current product. The existing gold/Cormorant visual system remains untouched. Owner review should decide whether the Afterglow palette is for a separate Aurel workspace surface or should be rejected.

## Source integrity

Original archive: `docs.zip` (uploaded 2026-10-18).
- Original `docs/AGENTS.md` SHA-256: `4c0546bf8dd72145033594c27677a40c9a27653cb85d42cb1e500f75e8e04a88`
- Original `docs/assistant-modes.json` SHA-256: `51b35f62f631d27b3a411c2fd7e90b6d4e6ad4da62c904f36254dfbee8d93f3b`
- Original `docs/aurel-afterglow.tokens.css` SHA-256: `8c042119fb13e9c7ff526ddbe9805fc75767c1875685956007a66db1f03aa4a7`
- Archive SHA-256: `27d9f3f6d7afcbf9e0032b792c6f69f01b7032bcbc4552fab6521049560247e8`

Correction: the original CSS declared `--aurel-neutral-200: #cfc be5;`, which is not a valid CSS hex color. The reviewable variant uses `#cfcbe5`. The source archive remains unchanged in the user's file library.

## How to review

1. Open `preview.html` locally, or use the repository's approved PR preview if one is produced.
2. Compare the palette and type against the current gold/Cormorant UI.
3. Test desktop and mobile widths, focus visibility, reduced motion, text contrast, and non-color status indicators.
4. Do not import the tokens into `src/app/globals.css` or change production routes until the design direction is approved.
5. If approved, implement a separate feature/route or deliberate migration with screenshot evidence and a rollback path.

## Acceptance checks

- CSS custom-property values are valid.
- `assistant-modes.json` parses as JSON and contains exactly eight unique IDs.
- Preview clearly labels itself as an optional concept.
- No existing production styles, pages, routes, or deployment configuration are changed by this package.
