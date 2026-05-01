from typing import Optional

from sqlalchemy import desc, select
from sqlalchemy.orm import Session

from app.models.contact import ContactSubmission
from app.schemas.contact import ContactCreate


def create_contact(db: Session, contact: ContactCreate) -> ContactSubmission:
    db_contact = ContactSubmission(
        name=contact.name,
        business_name=contact.business_name,
        business_type=contact.business_type,
        phone=contact.phone,
        email=contact.email,
        message=contact.message,
        source=contact.source,
    )
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact


def get_all_contacts(
    db: Session,
    skip: int = 0,
    limit: int = 50,
    is_contacted: Optional[bool] = None,
) -> tuple[int, list[ContactSubmission]]:
    stmt = select(ContactSubmission)
    if is_contacted is not None:
        stmt = stmt.where(ContactSubmission.is_contacted == is_contacted)

    total = len(db.execute(stmt).scalars().all())
    submissions = db.execute(
        stmt.order_by(desc(ContactSubmission.created_at)).offset(skip).limit(limit)
    ).scalars().all()
    return total, submissions


def mark_as_contacted(db: Session, contact_id: int) -> Optional[ContactSubmission]:
    contact = db.get(ContactSubmission, contact_id)
    if contact:
        contact.is_contacted = True
        db.commit()
        db.refresh(contact)
    return contact


def update_notes(db: Session, contact_id: int, notes: str) -> Optional[ContactSubmission]:
    contact = db.get(ContactSubmission, contact_id)
    if contact:
        contact.notes = notes
        db.commit()
        db.refresh(contact)
    return contact
