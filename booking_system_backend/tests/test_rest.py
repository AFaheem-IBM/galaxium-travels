import pytest
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent))

from models import User, Event, Booking


class TestEventsEndpoint:
    """Test /events endpoint."""

    def test_get_events_empty(self, client, db_session):
        """Test getting events when database is empty."""
        response = client.get("/events")
        assert response.status_code == 200
        assert response.json() == []

    def test_get_events_with_data(self, client, db_session):
        """Test getting events with data."""
        db_session.add(Event(
            origin="Test Concert",
            destination="Test Venue, Test City",
            departure_time="2099-01-01T09:00:00Z",
            arrival_time="2099-01-01T17:00:00Z",
            price=1000000,
            tickets_available=5
        ))
        db_session.commit()

        response = client.get("/events")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 1
        assert data[0]["origin"] == "Test Concert"
        assert data[0]["destination"] == "Test Venue, Test City"


class TestRegisterEndpoint:
    """Test /register endpoint."""

    def test_register_success(self, client, db_session, sample_user_data):
        """Test successful user registration."""
        response = client.post("/register", json=sample_user_data)
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == sample_user_data["name"]
        assert data["email"] == sample_user_data["email"]
        assert "user_id" in data

    def test_register_duplicate_email(self, client, db_session, sample_user_data):
        """Test registration with duplicate email."""
        client.post("/register", json=sample_user_data)
        response = client.post("/register", json=sample_user_data)

        assert response.status_code == 200
        data = response.json()
        assert data["success"] == False
        assert data["error_code"] == "EMAIL_EXISTS"


class TestUserEndpoint:
    """Test /user endpoint."""

    def test_get_user_success(self, client, db_session, sample_user_data):
        """Test successful user retrieval."""
        client.post("/register", json=sample_user_data)

        response = client.get(
            "/user",
            params={"name": sample_user_data["name"], "email": sample_user_data["email"]}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == sample_user_data["name"]

    def test_get_user_not_found(self, client, db_session):
        """Test user retrieval when not found."""
        response = client.get(
            "/user",
            params={"name": "NonExistent", "email": "none@example.com"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == False
        assert data["error_code"] == "USER_NOT_FOUND"


class TestBookEndpoint:
    """Test /book endpoint."""

    def test_book_ticket_success(self, client, db_session, sample_user_data):
        """Test successful ticket booking."""
        # Register user
        user_response = client.post("/register", json=sample_user_data)
        user_id = user_response.json()["user_id"]

        # Create event
        db_session.add(Event(
            origin="Test Concert",
            destination="Test Venue, Test City",
            departure_time="2099-01-01T09:00:00Z",
            arrival_time="2099-01-01T17:00:00Z",
            price=1000000,
            tickets_available=5
        ))
        db_session.commit()
        event = db_session.query(Event).first()

        # Book ticket
        response = client.post("/book", json={
            "user_id": user_id,
            "name": sample_user_data["name"],
            "event_id": event.event_id
        })

        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "booked"
        assert data["user_id"] == user_id

    def test_book_ticket_event_not_found(self, client, db_session, sample_user_data):
        """Test booking non-existent event."""
        user_response = client.post("/register", json=sample_user_data)
        user_id = user_response.json()["user_id"]

        response = client.post("/book", json={
            "user_id": user_id,
            "name": sample_user_data["name"],
            "event_id": 999
        })

        assert response.status_code == 200
        data = response.json()
        assert data["success"] == False
        assert data["error_code"] == "EVENT_NOT_FOUND"


class TestBookingsEndpoint:
    """Test /bookings/{user_id} endpoint."""

    def test_get_bookings_success(self, client, db_session, sample_user_data):
        """Test getting user bookings."""
        # Register user
        user_response = client.post("/register", json=sample_user_data)
        user_id = user_response.json()["user_id"]

        # Create event and booking
        db_session.add(Event(
            origin="Test Concert",
            destination="Test Venue, Test City",
            departure_time="2099-01-01T09:00:00Z",
            arrival_time="2099-01-01T17:00:00Z",
            price=1000000,
            tickets_available=5
        ))
        db_session.commit()
        event = db_session.query(Event).first()

        db_session.add(Booking(
            user_id=user_id,
            event_id=event.event_id,
            status="booked",
            booking_time="2099-01-01T10:00:00Z"
        ))
        db_session.commit()

        response = client.get(f"/bookings/{user_id}")
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 1
        assert data[0]["status"] == "booked"

    def test_get_bookings_empty(self, client, db_session):
        """Test getting bookings when user has none."""
        response = client.get("/bookings/999")
        assert response.status_code == 200
        assert response.json() == []


class TestCancelEndpoint:
    """Test /cancel/{booking_id} endpoint."""

    def test_cancel_booking_success(self, client, db_session, sample_user_data):
        """Test successful booking cancellation."""
        # Register user
        user_response = client.post("/register", json=sample_user_data)
        user_id = user_response.json()["user_id"]

        # Create event and booking
        db_session.add(Event(
            origin="Test Concert",
            destination="Test Venue, Test City",
            departure_time="2099-01-01T09:00:00Z",
            arrival_time="2099-01-01T17:00:00Z",
            price=1000000,
            tickets_available=4
        ))
        db_session.commit()
        event = db_session.query(Event).first()

        db_session.add(Booking(
            user_id=user_id,
            event_id=event.event_id,
            status="booked",
            booking_time="2099-01-01T10:00:00Z"
        ))
        db_session.commit()
        booking = db_session.query(Booking).first()

        response = client.post(f"/cancel/{booking.booking_id}")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "cancelled"

    def test_cancel_booking_not_found(self, client, db_session):
        """Test cancelling non-existent booking."""
        response = client.post("/cancel/999")
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == False
        assert data["error_code"] == "BOOKING_NOT_FOUND"


class TestHealthEndpoint:
    """Test health check endpoint."""

    def test_health_check(self, client, db_session):
        """Test health check returns OK."""
        response = client.get("/")
        assert response.status_code == 200
        assert response.json() == {"status": "OK"}
