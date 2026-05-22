import logging
import re

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.crud.careers import create_application, get_application, list_applications, update_meta, update_notes
from app.crud.job_roles import create_role, delete_role, get_role, list_roles, update_role
from app.models.notification import NotificationType
from app.schemas.careers import JobApplicationListResponse, JobApplicationMetaUpdate, JobApplicationNotesUpdate, JobApplicationRead
from app.schemas.job_role import JobRoleCreate, JobRoleListResponse, JobRoleRead, JobRoleUpdate
from app.schemas.notification import NotificationRead
from app.services.careers_storage import resume_path, save_resume
from app.services.notification_hub import notification_hub
from app.services.notification_service import create_notification

router = APIRouter(prefix="/api/careers", tags=["careers"])
logger = logging.getLogger(__name__)

PHONE_RE = re.compile(r"^\d{10}$")
URL_RE = re.compile(r"^https?://", re.I)


def _optional_url(value: str | None) -> str | None:
    if not value or not value.strip():
        return None
    trimmed = value.strip()
    if not URL_RE.match(trimmed):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Links must start with http:// or https://")
    return trimmed


@router.get("/roles", response_model=JobRoleListResponse)
def get_public_roles(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    """Active open positions for careers page and apply form."""
    total, rows = list_roles(db, active_only=True, skip=skip, limit=limit)
    return JobRoleListResponse(total=total, roles=[JobRoleRead.model_validate(r) for r in rows])


@router.get("/roles/manage", response_model=JobRoleListResponse)
def get_all_roles(
    skip: int = 0,
    limit: int = 200,
    include_inactive: bool = True,
    db: Session = Depends(get_db),
):
    """Dashboard: all roles including inactive."""
    total, rows = list_roles(db, active_only=not include_inactive, skip=skip, limit=limit)
    return JobRoleListResponse(total=total, roles=[JobRoleRead.model_validate(r) for r in rows])


@router.get("/roles/{role_id}", response_model=JobRoleRead)
def get_role_detail(role_id: int, db: Session = Depends(get_db)):
    row = get_role(db, role_id)
    if not row:
        raise HTTPException(status_code=404, detail="Role not found")
    return JobRoleRead.model_validate(row)


@router.post("/roles", response_model=JobRoleRead, status_code=status.HTTP_201_CREATED)
def post_role(payload: JobRoleCreate, db: Session = Depends(get_db)):
    try:
        row = create_role(db, payload)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Slug already exists")
    return JobRoleRead.model_validate(row)


@router.patch("/roles/{role_id}", response_model=JobRoleRead)
def patch_role(role_id: int, payload: JobRoleUpdate, db: Session = Depends(get_db)):
    try:
        row = update_role(db, role_id, payload)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Slug already exists")
    if not row:
        raise HTTPException(status_code=404, detail="Role not found")
    return JobRoleRead.model_validate(row)


@router.delete("/roles/{role_id}")
def remove_role(role_id: int, hard: bool = False, db: Session = Depends(get_db)):
    if not delete_role(db, role_id, hard=hard):
        raise HTTPException(status_code=404, detail="Role not found")
    return {"success": True}


@router.post("/apply", response_model=dict)
async def submit_application(
    full_name: str = Form(..., min_length=2, max_length=120),
    email: str = Form(..., min_length=5, max_length=150),
    phone: str = Form(..., min_length=10, max_length=15),
    city: str | None = Form(None),
    role_applied: str = Form(..., min_length=2, max_length=120),
    experience_years: str | None = Form(None),
    current_role: str | None = Form(None),
    notice_period: str | None = Form(None),
    expected_ctc: str | None = Form(None),
    skills: str | None = Form(None),
    portfolio_url: str | None = Form(None),
    github_url: str | None = Form(None),
    linkedin_url: str | None = Form(None),
    behance_url: str | None = Form(None),
    cover_letter: str | None = Form(None),
    source: str | None = Form("careers-apply"),
    resume: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    phone_digits = re.sub(r"\D", "", phone)
    if not PHONE_RE.match(phone_digits):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Enter a valid 10-digit Indian mobile number.")

    row = create_application(
        db,
        {
            "full_name": full_name.strip(),
            "email": email.strip().lower(),
            "phone": phone_digits,
            "city": (city or "").strip() or None,
            "role_applied": role_applied.strip(),
            "experience_years": (experience_years or "").strip() or None,
            "current_role": (current_role or "").strip() or None,
            "notice_period": (notice_period or "").strip() or None,
            "expected_ctc": (expected_ctc or "").strip() or None,
            "skills": (skills or "").strip() or None,
            "portfolio_url": _optional_url(portfolio_url),
            "github_url": _optional_url(github_url),
            "linkedin_url": _optional_url(linkedin_url),
            "behance_url": _optional_url(behance_url),
            "cover_letter": (cover_letter or "").strip() or None,
            "resume_filename": "pending",
            "resume_stored_name": "pending",
            "source": (source or "careers-apply").strip() or "careers-apply",
            "stage": "applied",
        },
    )

    try:
        original, stored, mime, size = await save_resume(row.id, resume)
        row.resume_filename = original
        row.resume_stored_name = stored
        row.resume_mime = mime
        row.resume_size_bytes = size
        db.commit()
        db.refresh(row)
    except HTTPException:
        db.delete(row)
        db.commit()
        raise
    except Exception as exc:
        db.delete(row)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not save resume. Please try again.",
        ) from exc

    try:
        notification = create_notification(
            db,
            notification_type=NotificationType.CONTACT_INQUIRY,
            title="New job application",
            message=f"{row.full_name} applied for {row.role_applied}.",
            link="/dashboard/applications",
            icon="Briefcase",
        )
        await notification_hub.broadcast(
            {
                "type": "notification.created",
                "notification": NotificationRead.model_validate(notification).model_dump(mode="json"),
            }
        )
    except Exception:
        logger.exception("Application saved but notification failed")

    return {
        "success": True,
        "message": "Application received. We will review your profile and get back to you.",
        "id": row.id,
    }


@router.get("/applications", response_model=JobApplicationListResponse)
def get_applications(
    skip: int = 0,
    limit: int = 100,
    stage: str | None = None,
    db: Session = Depends(get_db),
):
    total, rows = list_applications(db, skip=skip, limit=limit, stage=stage)
    return JobApplicationListResponse(
        total=total,
        applications=[JobApplicationRead.model_validate(r) for r in rows],
    )


@router.get("/applications/{application_id}", response_model=JobApplicationRead)
def get_application_detail(application_id: int, db: Session = Depends(get_db)):
    row = get_application(db, application_id)
    if not row:
        raise HTTPException(status_code=404, detail="Application not found")
    return JobApplicationRead.model_validate(row)


@router.get("/applications/{application_id}/resume")
def download_resume(application_id: int, db: Session = Depends(get_db)):
    row = get_application(db, application_id)
    if not row:
        raise HTTPException(status_code=404, detail="Application not found")
    path = resume_path(application_id, row.resume_stored_name)
    return FileResponse(
        path,
        media_type=row.resume_mime or "application/octet-stream",
        filename=row.resume_filename,
    )


@router.patch("/applications/{application_id}/meta")
def patch_application_meta(
    application_id: int,
    payload: JobApplicationMetaUpdate,
    db: Session = Depends(get_db),
):
    row = update_meta(db, application_id, payload)
    if not row:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"success": True, "application": JobApplicationRead.model_validate(row)}


@router.patch("/applications/{application_id}/notes")
def patch_application_notes(
    application_id: int,
    payload: JobApplicationNotesUpdate,
    db: Session = Depends(get_db),
):
    row = update_notes(db, application_id, payload)
    if not row:
        raise HTTPException(status_code=404, detail="Application not found")
    return {"success": True, "application": JobApplicationRead.model_validate(row)}
