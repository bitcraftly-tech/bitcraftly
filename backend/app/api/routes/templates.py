from fastapi import APIRouter, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from app.api.deps import CurrentTenant, DBSession
from app.models.notification import NotificationType
from app.models.whatsapp_template import WhatsAppTemplate
from app.schemas.notification import NotificationRead
from app.schemas.template import TemplateCreate, TemplateRead
from app.services.notification_hub import notification_hub
from app.services.notification_service import create_notification
from app.services.template_service import ensure_default_templates

router = APIRouter(prefix="/templates", tags=["templates"])


@router.get("", response_model=list[TemplateRead], status_code=status.HTTP_200_OK)
def list_templates(db: DBSession, tenant: CurrentTenant) -> list[TemplateRead]:
    ensure_default_templates(db, tenant.id)
    templates = db.execute(
        select(WhatsAppTemplate)
        .where(WhatsAppTemplate.tenant_id == tenant.id)
        .order_by(WhatsAppTemplate.type.asc())
    ).scalars().all()
    return [TemplateRead.model_validate(item) for item in templates]


@router.post("", response_model=TemplateRead, status_code=status.HTTP_200_OK)
async def upsert_template(payload: TemplateCreate, db: DBSession, tenant: CurrentTenant) -> TemplateRead:
    ensure_default_templates(db, tenant.id)
    existing = db.execute(
        select(WhatsAppTemplate).where(
            WhatsAppTemplate.tenant_id == tenant.id,
            WhatsAppTemplate.type == payload.type,
        )
    ).scalar_one_or_none()

    if existing:
        existing.content = payload.content
        db.add(existing)
        db.commit()
        db.refresh(existing)
        notification = create_notification(
            db,
            tenant_id=tenant.id,
            notification_type=NotificationType.TEMPLATE_UPDATED,
            title="Template updated",
            message=f"{payload.type.capitalize()} template was updated.",
            link="/dashboard/templates",
            icon="FileText",
        )
        await notification_hub.broadcast(
            {
                "type": "notification.created",
                "notification": NotificationRead.model_validate(notification).model_dump(mode="json"),
            }
        )
        return TemplateRead.model_validate(existing)

    template = WhatsAppTemplate(tenant_id=tenant.id, type=payload.type, content=payload.content)
    db.add(template)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise
    db.refresh(template)
    notification = create_notification(
        db,
        tenant_id=tenant.id,
        notification_type=NotificationType.TEMPLATE_CREATED,
        title="Template created",
        message=f"{payload.type.capitalize()} template was created.",
        link="/dashboard/templates",
        icon="FileText",
    )
    await notification_hub.broadcast(
        {
            "type": "notification.created",
            "notification": NotificationRead.model_validate(notification).model_dump(mode="json"),
        }
    )
    return TemplateRead.model_validate(template)
