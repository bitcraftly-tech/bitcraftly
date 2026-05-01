from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict

from app.models.notification import NotificationType


class NotificationRead(BaseModel):
    id: int
    tenant_id: Optional[int]
    user_id: Optional[int]
    type: NotificationType
    title: str
    message: Optional[str]
    link: Optional[str]
    icon: Optional[str]
    is_read: bool
    created_at: datetime
    read_at: Optional[datetime]

    model_config = ConfigDict(from_attributes=True)


class NotificationListResponse(BaseModel):
    unread_count: int
    items: list[NotificationRead]
