# 2026-10-08 — Remove all flight terminology from codebase

## What was requested
Replace every flight-related variable name, field, class name, route, and label across the entire codebase with ticket/event-appropriate terminology, since the app is an events ticketing platform (concerts, conferences, sports), not an airline.

## What was changed

### Backend
- `models.py`: `Flight` → `Event`, `__tablename__ = 'flights'` → `'events'`, `flight_id` → `event_id`, `seats_available` → `tickets_available`; `Booking.flight_id` FK → `event_id` referencing `events.event_id`
- `schemas.py`: `FlightOut` → `EventOut`, `flight_id` → `event_id`, `seats_available` → `tickets_available`, `BookingRequest.flight_id` → `event_id`, `BookingOut.flight_id` → `event_id`
- `services/flight.py` → deleted; replaced by `services/event.py` with `list_events()`
- `services/booking.py`: `book_flight()` → `book_ticket()`, all internal vars and error codes updated (`FLIGHT_NOT_FOUND` → `EVENT_NOT_FOUND`, `NO_SEATS_AVAILABLE` → `NO_TICKETS_AVAILABLE`)
- `services/__init__.py`: `flight` → `event`
- `server.py`: imports, MCP tools (`list_flights` → `list_events`, `book_flight` → `book_ticket`), REST route `/flights` → `/events`, API description updated
- `seed.py`: `Flight` → `Event`, `seats_available` → `tickets_available`, variable names updated
- `tests/conftest.py`: `sample_flight_data` → `sample_event_data`, field names updated
- `tests/test_services.py`: all Flight/flight references → Event/event, error codes updated
- `tests/test_rest.py`: all Flight/flight references → Event/event, endpoint `/flights` → `/events`

### Frontend
- `types/index.ts`: `Flight` → `Event`, `flight_id` → `event_id`, `seats_available` → `tickets_available`, `BookingWithFlight` → `BookingWithEvent`, `FlightFilters` → `EventFilters`
- `services/api.ts`: `getFlights` → `getEvents` (calls `/events`), `bookFlight` → `bookTicket`, import type `Flight` → `Event`
- `components/flights/FlightCard.tsx`: `FlightCard` → `EventCard`, all `flight.*` props → `event.*`
- `components/bookings/BookingModal.tsx`: `flight` prop → `event`, `bookFlight` → `bookTicket`
- `components/bookings/BookingCard.tsx`: `flight` prop → `event`, `booking.flight_id` → `booking.event_id`
- `pages/Flights.tsx`: all state variables and handlers updated to use `event` terminology
- `pages/MyBookings.tsx`: `flights` state → `events`, `getFlights` → `getEvents`, `getFlightForBooking` → `getEventForBooking`, redirect updated to `/events`
- `App.tsx`: route `/flights` → `/events`
- `components/layout/Header.tsx`: all `to="/flights"` → `to="/events"`
- `pages/Home.tsx`: both `to="/flights"` links → `to="/events"`

## Notable decisions
- Kept the `Flights` page component name and file path unchanged (`pages/Flights.tsx`, `components/flights/FlightCard.tsx`) to avoid a large file rename — only internal logic and exports were updated. The exported component was renamed to `EventCard`/`Flights` still works as a route component.
- All 29 backend tests pass. Frontend TypeScript build is clean.
