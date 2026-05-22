from sqlalchemy.orm import Session

from app.models.job_application import JobApplication
from app.schemas.careers import JobApplicationMetaUpdate, JobApplicationNotesUpdate


def create_application(db: Session, data: dict) -> JobApplication:
    row = JobApplication(**data)
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


STAGE_FILTER_ALIASES: dict[str, list[str]] = {
    "applied": ["applied", "new"],
    "final_round": ["final_round", "offer"],
    "hired": ["hired", "closed"],
}


def list_applications(
    db: Session,
    *,
    skip: int = 0,
    limit: int = 100,
    stage: str | None = None,
) -> tuple[int, list[JobApplication]]:
    query = db.query(JobApplication)
    if stage:
        aliases = STAGE_FILTER_ALIASES.get(stage, [stage])
        query = query.filter(JobApplication.stage.in_(aliases))
    total = query.count()
    rows = query.order_by(JobApplication.created_at.desc()).offset(skip).limit(limit).all()
    return total, rows


def get_application(db: Session, application_id: int) -> JobApplication | None:
    return db.query(JobApplication).filter(JobApplication.id == application_id).first()


def update_meta(db: Session, application_id: int, payload: JobApplicationMetaUpdate) -> JobApplication | None:
    row = get_application(db, application_id)
    if not row:
        return None
    if payload.stage is not None:
        row.stage = payload.stage
    if payload.assigned_to is not None:
        row.assigned_to = payload.assigned_to or None
    if payload.is_contacted is not None:
        row.is_contacted = payload.is_contacted
    db.commit()
    db.refresh(row)
    return row


def update_notes(db: Session, application_id: int, payload: JobApplicationNotesUpdate) -> JobApplication | None:
    row = get_application(db, application_id)
    if not row:
        return None
    row.notes = payload.notes
    db.commit()
    db.refresh(row)
    return row
