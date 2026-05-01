from typing import Optional

from fastapi import APIRouter, Depends, Request, WebSocket, WebSocketDisconnect, status
from sqlalchemy.orm import Session

from app.api.deps import OptionalCurrentUser
from app.db.session import get_db_session
from app.models.notification import NotificationType
from app.models.tenant import Tenant
from app.schemas.notification import NotificationListResponse, NotificationRead
from app.services.notification_hub import notification_hub
from app.services.notification_service import (
    create_notification,
    list_notifications,
    mark_all_notifications_read,
    mark_notification_read,
    unread_count,
)

router = APIRouter(prefix="/notifications", tags=["notifications"])


def get_optional_tenant(request: Request) -> Optional[Tenant]:
    return getattr(request.state, "tenant", None)


@router.get("", response_model=NotificationListResponse, status_code=status.HTTP_200_OK)
def get_notifications(
    db: Session = Depends(get_db_session),
    tenant: Optional[Tenant] = Depends(get_optional_tenant),
    current_user: OptionalCurrentUser = None,
) -> NotificationListResponse:
    tenant_id = tenant.id if tenant else None
    user_id = current_user.id if current_user else None
    items = list_notifications(db, tenant_id=tenant_id, user_id=user_id, limit=50)
    return NotificationListResponse(
        unread_count=unread_count(db, tenant_id=tenant_id, user_id=user_id),
        items=[NotificationRead.model_validate(item) for item in items],
    )


@router.post("/{notification_id}/read", response_model=NotificationRead, status_code=status.HTTP_200_OK)
def read_notification(
    notification_id: int,
    db: Session = Depends(get_db_session),
    tenant: Optional[Tenant] = Depends(get_optional_tenant),
    current_user: OptionalCurrentUser = None,
) -> NotificationRead:
    tenant_id = tenant.id if tenant else None
    user_id = current_user.id if current_user else None
    item = mark_notification_read(db, notification_id=notification_id, tenant_id=tenant_id, user_id=user_id)
    if item is None:
        from fastapi import HTTPException

        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found.")
    return NotificationRead.model_validate(item)


@router.post("/read-all", status_code=status.HTTP_200_OK)
def read_all_notifications(
    db: Session = Depends(get_db_session),
    tenant: Optional[Tenant] = Depends(get_optional_tenant),
    current_user: OptionalCurrentUser = None,
) -> dict[str, int]:
    tenant_id = tenant.id if tenant else None
    user_id = current_user.id if current_user else None
    updated = mark_all_notifications_read(db, tenant_id=tenant_id, user_id=user_id)
    return {"updated": updated}


@router.post("/weekly-report", response_model=NotificationRead, status_code=status.HTTP_201_CREATED)
async def create_weekly_report_notification(
    db: Session = Depends(get_db_session),
    tenant: Optional[Tenant] = Depends(get_optional_tenant),
    current_user: OptionalCurrentUser = None,
) -> NotificationRead:
    tenant_id = tenant.id if tenant else None
    user_id = current_user.id if current_user else None
    item = create_notification(
        db,
        tenant_id=tenant_id,
        user_id=user_id,
        notification_type=NotificationType.REPORT_WEEKLY_READY,
        title="Weekly performance report is ready",
        message="Your latest weekly report has been generated successfully.",
        link="/dashboard/analytics",
        icon="BarChart3",
    )
    payload = NotificationRead.model_validate(item).model_dump(mode="json")
    await notification_hub.broadcast({"type": "notification.created", "notification": payload})
    return NotificationRead.model_validate(item)


@router.websocket("/ws")
async def notifications_ws(websocket: WebSocket) -> None:
    await notification_hub.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        await notification_hub.disconnect(websocket)
