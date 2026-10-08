from sqlalchemy.orm import Session
from datetime import datetime
from models import User, Event, Booking
from schemas import BookingOut, ErrorResponse


def book_ticket(db: Session, user_id: int, name: str, event_id: int) -> BookingOut | ErrorResponse:
    """Book a ticket for a specific event for a user."""
    # Check event exists
    event = db.query(Event).filter(Event.event_id == event_id).first()
    if not event:
        return ErrorResponse(
            error="Event not found",
            error_code="EVENT_NOT_FOUND",
            details=f"The specified event_id {event_id} does not exist in our system. Please check the event_id or use list_events to see available events."
        )

    # Check tickets available
    if event.tickets_available < 1:
        return ErrorResponse(
            error="No tickets available",
            error_code="NO_TICKETS_AVAILABLE",
            details="This event is sold out. Please check other events or try again later if tickets become available."
        )

    # Check user exists and name matches
    user = db.query(User).filter(User.user_id == user_id, User.name == name).first()
    if not user:
        existing_user = db.query(User).filter(User.user_id == user_id).first()
        if existing_user:
            return ErrorResponse(
                error="Name mismatch",
                error_code="NAME_MISMATCH",
                details=f"User ID {user_id} exists but the name '{name}' does not match the registered name '{existing_user.name}'. Please verify the user's name or use the correct name for this user ID."
            )
        else:
            return ErrorResponse(
                error="User not found",
                error_code="USER_NOT_FOUND",
                details=f"User with ID {user_id} is not registered in our system. The user might need to register first, or you may need to check if the user_id is correct."
            )

    # Create booking
    event.tickets_available -= 1
    new_booking = Booking(
        user_id=user_id,
        event_id=event_id,
        status="booked",
        booking_time=datetime.utcnow().isoformat()
    )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return BookingOut.model_validate(new_booking)


def cancel_booking(db: Session, booking_id: int) -> BookingOut | ErrorResponse:
    """Cancel an existing booking by its booking_id."""
    booking = db.query(Booking).filter(Booking.booking_id == booking_id).first()
    if not booking:
        return ErrorResponse(
            error="Booking not found",
            error_code="BOOKING_NOT_FOUND",
            details=f"Booking with ID {booking_id} not found. The booking may have been deleted or the booking_id may be incorrect. Please verify the booking_id or check if the booking exists."
        )

    if booking.status == "cancelled":
        return ErrorResponse(
            error="Booking already cancelled",
            error_code="ALREADY_CANCELLED",
            details=f"Booking {booking_id} is already cancelled and cannot be cancelled again. The booking status is currently '{booking.status}'. If you need to make changes, please contact support."
        )

    # Restore ticket
    event = db.query(Event).filter(Event.event_id == booking.event_id).first()
    if event:
        event.tickets_available += 1

    booking.status = "cancelled"
    db.commit()
    db.refresh(booking)
    return BookingOut.model_validate(booking)


def get_bookings(db: Session, user_id: int) -> list[BookingOut]:
    """Retrieve all bookings for a specific user."""
    bookings = db.query(Booking).filter(Booking.user_id == user_id).all()
    return [BookingOut.model_validate(b) for b in bookings]
