import json

from sqlalchemy.orm import Session

from app.models.job_role import JobRole
from app.schemas.job_role import JobRoleCreate, JobRoleUpdate


def _skills_to_db(skills: list[str]) -> str:
    return json.dumps(skills)


def list_roles(
    db: Session,
    *,
    active_only: bool = True,
    skip: int = 0,
    limit: int = 100,
) -> tuple[int, list[JobRole]]:
    query = db.query(JobRole)
    if active_only:
        query = query.filter(JobRole.is_active.is_(True))
    total = query.count()
    rows = query.order_by(JobRole.sort_order.asc(), JobRole.id.asc()).offset(skip).limit(limit).all()
    return total, rows


def get_role(db: Session, role_id: int) -> JobRole | None:
    return db.query(JobRole).filter(JobRole.id == role_id).first()


def get_role_by_slug(db: Session, slug: str) -> JobRole | None:
    return db.query(JobRole).filter(JobRole.slug == slug).first()


def create_role(db: Session, payload: JobRoleCreate) -> JobRole:
    if get_role_by_slug(db, payload.slug):
        raise ValueError("slug_exists")
    row = JobRole(
        slug=payload.slug,
        title=payload.title,
        department=payload.department,
        level=payload.level,
        work_mode=payload.work_mode,
        employment_type=payload.employment_type,
        experience=payload.experience,
        skills=_skills_to_db(payload.skills),
        salary_range=payload.salary_range,
        description=payload.description,
        featured=payload.featured,
        is_active=payload.is_active,
        sort_order=payload.sort_order,
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return row


def update_role(db: Session, role_id: int, payload: JobRoleUpdate) -> JobRole | None:
    row = get_role(db, role_id)
    if not row:
        return None
    data = payload.model_dump(exclude_unset=True)
    if "slug" in data and data["slug"] != row.slug:
        existing = get_role_by_slug(db, data["slug"])
        if existing and existing.id != role_id:
            raise ValueError("slug_exists")
    if "skills" in data and data["skills"] is not None:
        data["skills"] = _skills_to_db(data["skills"])
    for key, value in data.items():
        setattr(row, key, value)
    db.commit()
    db.refresh(row)
    return row


def delete_role(db: Session, role_id: int, *, hard: bool = False) -> bool:
    row = get_role(db, role_id)
    if not row:
        return False
    if hard:
        db.delete(row)
    else:
        row.is_active = False
    db.commit()
    return True
