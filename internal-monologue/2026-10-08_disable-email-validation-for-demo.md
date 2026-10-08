# 2026-10-08 — Disable email validation for demo

## Requested
Temporarily allow any string in the email field during registration so the demo "broken" state works before the fix is shown.

## Changed
- `booking_system_backend/schemas.py`: changed `UserRegistration.email` from `EmailStr` to `str` (with a TODO comment to restore it). Removed now-unused `EmailStr` import.

## Decision
The `EmailStr` Pydantic type was the source of the 422 validation error on `/register`. Swapping to plain `str` removes all server-side email format enforcement, which is exactly the "vulnerable" state the demo needs to illustrate the business problem.
