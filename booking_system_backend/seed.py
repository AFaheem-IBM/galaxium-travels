from models import Base, User, Flight, Booking
from db import engine, SessionLocal
from datetime import datetime, timedelta
import random

def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    # Clear existing data
    db.query(Booking).delete()
    db.query(User).delete()
    db.query(Flight).delete()
    db.commit()
    # Add demo users
    users = [
        User(name="Alice", email="alice@example.com"),
        User(name="Bob", email="bob@example.com"),
        User(name="Charlie", email="charlie@galaxium.com"),
        User(name="Diana", email="diana@moonmail.com"),
        User(name="Eve", email="eve@marsmail.com"),
        User(name="Frank", email="frank@venusmail.com"),
        User(name="Grace", email="grace@jupiter.com"),
        User(name="Heidi", email="heidi@europa.com"),
        User(name="Ivan", email="ivan@asteroidbelt.com"),
        User(name="Judy", email="judy@pluto.com"),
    ]
    db.add_all(users)
    db.commit()
    # Add demo events sorted by date (origin = event name, destination = venue)
    flights = [
        Flight(origin="Nova Pulse: The Neon Circuit Tour", destination="Madison Square Garden, New York", departure_time="2027-02-14T20:00:00Z", arrival_time="2027-02-14T23:00:00Z", price=9500, seats_available=6),
        Flight(origin="SynthFest 2027", destination="Axiom Arena, Chicago", departure_time="2027-03-01T12:00:00Z", arrival_time="2027-03-01T23:00:00Z", price=14500, seats_available=4),
        Flight(origin="Premier League: City vs United", destination="Etihad Stadium, Manchester", departure_time="2027-03-08T15:00:00Z", arrival_time="2027-03-08T17:00:00Z", price=8500, seats_available=10),
        Flight(origin="Solaris & The Drift: Live in Concert", destination="Royal Albert Hall, London", departure_time="2027-03-22T19:30:00Z", arrival_time="2027-03-22T22:00:00Z", price=7500, seats_available=3),
        Flight(origin="DeveloperWorld Summit 2027", destination="Moscone Center, San Francisco", departure_time="2027-04-05T09:00:00Z", arrival_time="2027-04-05T18:00:00Z", price=49900, seats_available=8),
        Flight(origin="Lyra Moon: Echoes World Tour", destination="Ziggo Dome, Amsterdam", departure_time="2027-04-19T20:00:00Z", arrival_time="2027-04-19T22:30:00Z", price=11000, seats_available=2),
        Flight(origin="NBA Playoffs — Conference Finals", destination="United Center, Chicago", departure_time="2027-05-10T20:30:00Z", arrival_time="2027-05-10T23:00:00Z", price=27500, seats_available=5),
        Flight(origin="The Velvet Static: Farewell Tour", destination="O2 Arena, London", departure_time="2027-05-24T19:00:00Z", arrival_time="2027-05-24T21:30:00Z", price=13500, seats_available=1),
        Flight(origin="UEFA Champions League Final", destination="Allianz Arena, Munich", departure_time="2027-05-31T19:45:00Z", arrival_time="2027-05-31T21:45:00Z", price=35000, seats_available=2),
        Flight(origin="UX & Product Design Conference", destination="The Barbican, London", departure_time="2027-06-03T09:00:00Z", arrival_time="2027-06-03T17:30:00Z", price=29900, seats_available=7),
        Flight(origin="Ember Riot: Sold-Out Summer Show", destination="Accor Arena, Paris", departure_time="2027-06-12T21:00:00Z", arrival_time="2027-06-12T23:30:00Z", price=10500, seats_available=4),
        Flight(origin="Formula 1 Grand Prix — Monaco", destination="Circuit de Monaco, Monte Carlo", departure_time="2027-06-22T14:00:00Z", arrival_time="2027-06-22T16:30:00Z", price=42000, seats_available=3),
        Flight(origin="DuskGrove Music Festival", destination="Clapham Common, London", departure_time="2027-07-05T11:00:00Z", arrival_time="2027-07-06T00:00:00Z", price=18500, seats_available=9),
        Flight(origin="AI Frontiers Conference 2027", destination="ExCeL London, London", departure_time="2027-09-15T09:00:00Z", arrival_time="2027-09-15T18:00:00Z", price=59900, seats_available=6),
        Flight(origin="Kira Voss: The Midnight Sessions", destination="Beacon Theatre, New York", departure_time="2027-10-03T20:00:00Z", arrival_time="2027-10-03T22:30:00Z", price=8500, seats_available=2),
    ]
    db.add_all(flights)
    db.commit()
    # Add demo bookings
    user_ids = [user.user_id for user in db.query(User).all()]
    flight_ids = [flight.flight_id for flight in db.query(Flight).all()]
    statuses = ["booked", "cancelled", "completed"]
    bookings = []
    now = datetime.utcnow()
    for i in range(20):
        user_id = random.choice(user_ids)
        flight_id = random.choice(flight_ids)
        status = random.choice(statuses)
        booking_time = (now - timedelta(days=random.randint(0, 30), hours=random.randint(0, 23))).isoformat() + "Z"
        bookings.append(Booking(user_id=user_id, flight_id=flight_id, status=status, booking_time=booking_time))
    db.add_all(bookings)
    db.commit()
    db.close()
    print("Database seeded with elaborate demo data!")

if __name__ == "__main__":
    seed() 