from fastapi import APIRouter, HTTPException, status
from sqlalchemy.exc import SQLAlchemyError
import logging

from app.api.deps import DBSession
from app.models.notification import NotificationType
from app.schemas.lead import LeadCreate, LeadResponse
from app.schemas.notification import NotificationRead
from app.services.notification_hub import notification_hub
from app.services.lead_service import create_lead as create_lead_service
from app.services.lead_service import list_leads as list_leads_service
from app.services.notification_service import create_notification

router = APIRouter(prefix="/leads", tags=["leads"])
logger = logging.getLogger(__name__)


@router.post("", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
async def create_lead(payload: LeadCreate, db: DBSession) -> LeadResponse:
    try:
        lead = create_lead_service(db, payload)
    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save lead",
        ) from exc

    try:
        notification = create_notification(
            db,
            notification_type=NotificationType.LEAD_NEW,
            title="New lead captured",
            message=f"{lead.name} submitted a new lead inquiry.",
            link="/dashboard/leads",
            icon="Users",
        )
        await notification_hub.broadcast(
            {
                "type": "notification.created",
                "notification": NotificationRead.model_validate(notification).model_dump(mode="json"),
            }
        )
    except SQLAlchemyError:
        logger.exception("Lead saved but notification creation failed")

    return LeadResponse.model_validate(lead)


@router.get("", response_model=list[LeadResponse], status_code=status.HTTP_200_OK)
def list_leads(db: DBSession) -> list[LeadResponse]:
    try:
        leads = list_leads_service(db)
    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch leads",
        ) from exc
    return [LeadResponse.model_validate(item) for item in leads]
