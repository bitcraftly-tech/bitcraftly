from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.api.deps import CurrentTenant, DBSession
from app.models.whatsapp_template import WhatsAppTemplate
from app.schemas.template import LeadAutoReplyRequest, LeadAutoReplyResponse
from app.services.template_service import (
    build_demo_link,
    ensure_default_templates,
    render_template_content,
)

router = APIRouter(prefix="/lead", tags=["lead-automation"])


@router.post("/auto-reply", response_model=LeadAutoReplyResponse, status_code=status.HTTP_200_OK)
def lead_auto_reply(
    payload: LeadAutoReplyRequest,
    db: DBSession,
    tenant: CurrentTenant,
) -> LeadAutoReplyResponse:
    ensure_default_templates(db, tenant.id)
    row = db.execute(
        select(WhatsAppTemplate).where(
            WhatsAppTemplate.tenant_id == tenant.id,
            WhatsAppTemplate.type == payload.type,
        )
    ).scalar_one_or_none()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Template not found")

    demo_link = build_demo_link(tenant.subdomain)
    display_name = (payload.name or "").strip() or "Sir"
    message = render_template_content(
        row.content,
        name=display_name,
        demo_link=demo_link,
        business_name=tenant.name,
        phone=payload.phone,
    )
    return LeadAutoReplyResponse(message=message)
