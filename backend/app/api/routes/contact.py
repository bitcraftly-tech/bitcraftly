from fastapi import APIRouter, HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
import logging

from app.api.deps import DBSession
from app.models.notification import NotificationType
from app.schemas.contact import ContactCreate, ContactResponse
from app.schemas.notification import NotificationRead
from app.services.contact_service import create_contact_submission
from app.services.notification_hub import notification_hub
from app.services.notification_service import create_notification

router = APIRouter(prefix="/contact", tags=["contact"])
logger = logging.getLogger(__name__)


@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def create_contact(payload: ContactCreate, db: DBSession) -> ContactResponse:
    try:
        submission = create_contact_submission(db, payload)
    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save contact submission",
        ) from exc

    try:
        notification = create_notification(
            db,
            notification_type=NotificationType.CONTACT_INQUIRY,
            title="New contact inquiry",
            message=f"{submission.name} sent a contact request.",
            link="/dashboard/leads",
            icon="MessageCircle",
        )
        await notification_hub.broadcast(
            {
                "type": "notification.created",
                "notification": NotificationRead.model_validate(notification).model_dump(mode="json"),
            }
        )
    except SQLAlchemyError:
        logger.exception("Contact saved but notification creation failed")

    return ContactResponse.model_validate(submission)
