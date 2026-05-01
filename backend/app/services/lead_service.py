from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.models.lead import Lead
from app.schemas.lead import LeadCreate


def create_lead(db: Session, payload: LeadCreate) -> Lead:
    lead = Lead(
        name=payload.name,
        phone=payload.phone,
        business_type=payload.business_type,
        message=payload.message,
    )
    db.add(lead)
    try:
        db.commit()
    except SQLAlchemyError:
        db.rollback()
        raise
    db.refresh(lead)
    return lead


def list_leads(db: Session) -> list[Lead]:
    stmt = select(Lead).order_by(Lead.created_at.desc())
    return db.execute(stmt).scalars().all()
