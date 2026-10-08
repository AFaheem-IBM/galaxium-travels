# 2026-10-08 — Replace space-travel seed data with real event data

## What was requested
The event names and locations in the seed data still used space-travel placeholders (Earth, Mars, Moon, etc.) which made no sense for an event ticketing platform.

## What was changed
- `booking_system_backend/seed.py`: replaced all 10 `Flight` seed rows with real-world events:
  - **Concerts**: Coldplay, Taylor Swift, Beyoncé, Coachella, Glastonbury
  - **Conferences**: Web Summit, AWS re:Invent, TED Conference
  - **Sporting events**: UEFA Champions League Final, NBA Finals Game 7
  - `origin` = event/act name, `destination` = venue + city
  - Prices updated to realistic ticket prices (in cents: $125, $180, $899, etc.)
  - Dates set to 2027

- Deleted stale `booking.db` and restarted the backend to reseed.

## Notable decisions
No schema or backend logic changes — only the seed data rows were updated.
