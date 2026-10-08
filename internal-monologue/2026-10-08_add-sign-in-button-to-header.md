# 2026-10-08 — Add Sign In button to Header

## Requested
User expected a Sign In button in the top navigation bar.

## Changed
- `booking_system_frontend/src/components/layout/Header.tsx`: added `useState` for modal open state, imported `UserIdentification`, added a "Sign In" secondary button next to "Get Tickets" (visible when no user is logged in), and rendered the `UserIdentification` modal inside the header.

## Decision
Reused the existing `UserIdentification` modal rather than creating a new flow — keeps the sign-in and register experience consistent with the purchase flow.
