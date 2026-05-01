from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import desc, func, or_, select
from sqlalchemy.orm import Session

from app.models.notification import Notification, NotificationType


def create_notification(
    db: Session,
    *,
    notification_type: NotificationType,
    title: str,
    message: str | None = None,
    link: Optional[str] = None,
    icon: Optional[str] = None,
    tenant_id: Optional[int] = None,
    user_id: Optional[int] = None,
) -> Notification:
    item = Notification(
        type=notification_type,
        title=title,
        message=message,
        link=link,
        icon=icon,
        tenant_id=tenant_id,
        user_id=user_id,
        is_read=False,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


def list_notifications(db: Session, *, tenant_id: Optional[int], user_id: Optional[int] = None, limit: int = 30) -> list[Notification]:
    stmt = select(Notification).order_by(desc(Notification.created_at)).limit(limit)
    if tenant_id is not None:
        stmt = stmt.where(or_(Notification.tenant_id == tenant_id, Notification.tenant_id.is_(None)))
    if user_id is not None:
        stmt = stmt.where(or_(Notification.user_id == user_id, Notification.user_id.is_(None)))
    return list(db.execute(stmt).scalars().all())


def unread_count(db: Session, *, tenant_id: Optional[int], user_id: Optional[int] = None) -> int:
    stmt = select(func.count(Notification.id)).where(Notification.is_read.is_(False))
    if tenant_id is not None:
        stmt = stmt.where(or_(Notification.tenant_id == tenant_id, Notification.tenant_id.is_(None)))
    if user_id is not None:
        stmt = stmt.where(or_(Notification.user_id == user_id, Notification.user_id.is_(None)))
    return int(db.execute(stmt).scalar_one())


def mark_notification_read(
    db: Session,
    *,
    notification_id: int,
    tenant_id: Optional[int],
    user_id: Optional[int] = None,
) -> Notification | None:
    stmt = select(Notification).where(Notification.id == notification_id)
    if tenant_id is not None:
        stmt = stmt.where(or_(Notification.tenant_id == tenant_id, Notification.tenant_id.is_(None)))
    if user_id is not None:
        stmt = stmt.where(or_(Notification.user_id == user_id, Notification.user_id.is_(None)))
    item = db.execute(stmt).scalar_one_or_none()
    if item is None:
        return None
    if not item.is_read:
        item.is_read = True
        item.read_at = datetime.now(timezone.utc)
        db.add(item)
        db.commit()
        db.refresh(item)
    return item


def mark_all_notifications_read(db: Session, *, tenant_id: Optional[int], user_id: Optional[int] = None) -> int:
    stmt = select(Notification).where(Notification.is_read.is_(False))
    if tenant_id is not None:
        stmt = stmt.where(or_(Notification.tenant_id == tenant_id, Notification.tenant_id.is_(None)))
    if user_id is not None:
        stmt = stmt.where(or_(Notification.user_id == user_id, Notification.user_id.is_(None)))
    items = list(db.execute(stmt).scalars().all())
    if not items:
        return 0
    now = datetime.now(timezone.utc)
    for item in items:
        item.is_read = True
        item.read_at = now
        db.add(item)
    db.commit()
    return len(items)
