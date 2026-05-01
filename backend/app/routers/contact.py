from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import logging

from app.core.database import get_db
from app.crud.contact import create_contact, get_all_contacts, mark_as_contacted, update_meta, update_notes
from app.models.notification import NotificationType
from app.schemas.notification import NotificationRead
from app.schemas.contact import ContactCreate, ContactListResponse, ContactMetaUpdate, ContactNotesUpdate
from app.services.notification_hub import notification_hub
from app.services.notification_service import create_notification

router = APIRouter(prefix="/api/contact", tags=["contact"])
logger = logging.getLogger(__name__)


@router.post("/", response_model=dict)
async def submit_contact(
    contact: ContactCreate,
    db: Session = Depends(get_db),
):
    try:
        db_contact = create_contact(db, contact)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error. Please try again.",
        ) from exc

    try:
        notification = create_notification(
            db,
            notification_type=NotificationType.CONTACT_INQUIRY,
            title="New contact inquiry",
            message=f"{db_contact.name} sent a contact request.",
            link="/dashboard/leads",
            icon="MessageCircle",
        )
        await notification_hub.broadcast(
            {
                "type": "notification.created",
                "notification": NotificationRead.model_validate(notification).model_dump(mode="json"),
            }
        )
    except Exception:
        logger.exception("Contact saved but notification creation failed")

    return {
        "success": True,
        "message": "Your message has been received. We will contact you shortly.",
        "id": db_contact.id,
    }


@router.get("/submissions", response_model=ContactListResponse)
async def list_contacts(
    skip: int = 0,
    limit: int = 50,
    pending_only: bool = False,
    db: Session = Depends(get_db),
):
    is_contacted = False if pending_only else None
    total, submissions = get_all_contacts(db, skip, limit, is_contacted)
    return ContactListResponse(total=total, submissions=submissions)


@router.patch("/{contact_id}/contacted")
async def mark_contacted(
    contact_id: int,
    db: Session = Depends(get_db),
):
    contact = mark_as_contacted(db, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"success": True, "message": "Marked as contacted"}


@router.patch("/{contact_id}/notes")
async def add_notes(
    contact_id: int,
    payload: ContactNotesUpdate,
    db: Session = Depends(get_db),
):
    contact = update_notes(db, contact_id, payload.notes)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"success": True, "message": "Notes updated"}


@router.patch("/{contact_id}/meta")
async def update_contact_meta(
    contact_id: int,
    payload: ContactMetaUpdate,
    db: Session = Depends(get_db),
):
    contact = update_meta(db, contact_id, payload.stage, payload.assigned_to)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"success": True, "message": "Contact pipeline updated"}
