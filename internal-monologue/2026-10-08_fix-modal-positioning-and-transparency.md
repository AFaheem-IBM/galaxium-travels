# 2026-10-08 — Fix modal positioning and transparency

## Requested
Sign in modal was cut off at the top and the background was too transparent.

## Changed
- `booking_system_frontend/src/components/layout/Header.tsx`: removed modal state/render from inside `<header>`; replaced with an `onSignIn` callback prop.
- `booking_system_frontend/src/components/layout/Layout.tsx`: modal state and `UserIdentification` render moved here, above the main content, so it isn't clipped by the header's CSS stacking context.
- `booking_system_frontend/src/components/common/Modal.tsx`: added `!bg-[rgba(10,25,41,0.92)]` override to the modal card so it renders with a dark, opaque background instead of the near-transparent `glass-card` default.

## Decision
The root cause of the cut-off was the modal being a `fixed` element inside `<header>`, which has `position: fixed` itself — creating a new stacking context that confined the modal. Moving it to `Layout` (a normal flow element) lets the modal overlay the full viewport correctly.
