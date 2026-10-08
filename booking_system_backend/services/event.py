from sqlalchemy.orm import Session
from models import Event
from schemas import EventOut


def list_events(db: Session) -> list[EventOut]:
    """List all available events."""
    events = db.query(Event).all()
    return [EventOut.model_validate(e) for e in events]
