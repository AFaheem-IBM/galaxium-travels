# 2026-10-08 — Replace seed events with fictional mixed dummy data

## What was requested
Use fake/fictional event names and artists (no real names), add more sporting events, and mix up the types while keeping everything sorted by date.

## What was changed
- `booking_system_backend/seed.py`: replaced all event rows with 15 fictional events, sorted chronologically Feb–Oct 2027.

| Date | Type | Event |
|---|---|---|
| Feb 14 | Concert | Nova Pulse: The Neon Circuit Tour |
| Mar 01 | Festival | SynthFest 2027 |
| Mar 08 | Sport | Premier League: City vs United |
| Mar 22 | Concert | Solaris & The Drift: Live in Concert |
| Apr 05 | Conference | DeveloperWorld Summit 2027 |
| Apr 19 | Concert | Lyra Moon: Echoes World Tour |
| May 10 | Sport | NBA Playoffs — Conference Finals |
| May 24 | Concert | The Velvet Static: Farewell Tour |
| May 31 | Sport | UEFA Champions League Final |
| Jun 03 | Conference | UX & Product Design Conference |
| Jun 12 | Concert | Ember Riot: Sold-Out Summer Show |
| Jun 22 | Sport | Formula 1 Grand Prix — Monaco |
| Jul 05 | Festival | DuskGrove Music Festival |
| Sep 15 | Conference | AI Frontiers Conference 2027 |
| Oct 03 | Concert | Kira Voss: The Midnight Sessions |

- Deleted stale `booking.db` and restarted the backend to reseed.
