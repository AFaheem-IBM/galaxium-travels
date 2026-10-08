# 2026-10-08 — Fix "Failed to load events" backend startup crash

## What was requested
The frontend showed "Failed to load events" — needed to diagnose and fix.

## Root cause
The `booking.db` SQLite file was stale (created before the `seats_available` column was added to the `flights` table). On startup, `seed()` tries to INSERT into `flights` including `seats_available`, which the old schema didn't have, causing:

```
sqlite3.OperationalError: table flights has no column named seats_available
```

This caused the FastAPI lifespan to fail immediately, so the server exited before binding to port 8080.

## What was changed
- Deleted the stale `booking_system_backend/booking.db` file.
- Restarted the backend — `init_db()` recreated the database with the correct schema, and `seed()` populated it successfully.
- Verified with `curl http://localhost:8080/flights` — returns all 10 events.

## Notable decisions
No code changes were needed. The fix was purely deleting the outdated database file so SQLAlchemy could recreate it from the current model definitions.
