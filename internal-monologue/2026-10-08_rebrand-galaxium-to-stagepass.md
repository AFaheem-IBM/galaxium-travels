# 2026-10-08 — Rebrand Galaxium Travels → Stagepass

## What was requested
Transform the Galaxium Travels space-travel booking UI into "Stagepass", a live event ticketing platform for concerts, conferences, and sporting events. Only aesthetic/content changes — no backend or functional logic touched.

## What was changed

| File | Change |
|---|---|
| `index.html` | Page title → "Stagepass — Live Event Tickets" |
| `tailwind.config.js` | Color palette: cosmic purple → red (`#E53935`), nebula pink → orange (`#FF7043`); dark bg stays near-black |
| `src/index.css` | Scrollbar colors updated to match new palette |
| `src/components/common/Starfield.tsx` | Replaced white star particles with coloured (red/orange/amber/white) upward-drifting bokeh orbs; bg gradient tweaked to warmer dark red |
| `src/components/layout/Header.tsx` | `Rocket` icon → `Ticket`; brand name → "Stagepass"; "Flights" nav → "Events"; "My Bookings" → "My Tickets"; CTA → "Get Tickets" |
| `src/components/layout/Footer.tsx` | Copyright and tagline updated |
| `src/pages/Home.tsx` | Full hero/features/CTA copy rewritten for event ticketing; icons changed to `Music`, `Mic`, `Trophy`, `Ticket` |
| `src/pages/Flights.tsx` | Page heading, search placeholder, filter count, empty/loading states → event language |
| `src/components/flights/FlightCard.tsx` | Card shows event name + venue (MapPin); labels changed to "Doors Open / Event End / tickets left / Get Tickets"; `Plane` → `Ticket` |
| `src/components/bookings/BookingCard.tsx` | "Booking" → "Ticket" throughout; route display → event name + venue |
| `src/components/bookings/BookingModal.tsx` | Added venue row; "Passenger" → "Attendee"; "Confirm Booking" → "Confirm Purchase" |
| `src/pages/MyBookings.tsx` | "Bookings" → "Tickets"; "Active Bookings" → "Upcoming Events"; "Past Bookings" → "Past Events" |
| `src/components/user/UserIdentification.tsx` | Sign-in prompt copy updated for ticketing context |

## Notable decisions
- Kept the dark, high-contrast aesthetic and Tailwind class names (`cosmic-purple`, etc.) — just remapped the color values so no component JSX needed color-class replacements.
- `flight.origin` = event/act name; `flight.destination` = venue — this mapping works naturally with the existing data model.
- Build (`tsc -b && vite build`) passes cleanly with no errors or warnings.
