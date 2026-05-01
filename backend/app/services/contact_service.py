from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.models.contact import ContactSubmission
from app.schemas.contact import ContactCreate


def create_contact_submission(db: Session, payload: ContactCreate) -> ContactSubmission:
    submission = ContactSubmission(
        name=payload.name,
        business_name=payload.business_name,
        business_type=payload.business_type,
        phone=payload.phone,
        email=payload.email,
        message=payload.message,
        source=payload.source,
    )
    db.add(submission)
    try:
        db.commit()
    except SQLAlchemyError:
        db.rollback()
        raise
    db.refresh(submission)
    return submission
