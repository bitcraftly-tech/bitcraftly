from urllib.parse import urlparse

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.whatsapp_template import WhatsAppTemplate


DEFAULT_TEMPLATES: dict[str, str] = {
    "intro": (
        "Hi sir 👋 Main aapke business ke liye website + WhatsApp system banata hoon..."
    ),
    "demo": "Aap live demo dekh sakte ho: {demo_link}",
    "price": "Setup charge ₹3000–₹5000 one-time hai...",
}


def ensure_default_templates(db: Session, tenant_id: int) -> None:
    existing_types = {
        row[0]
        for row in db.execute(select(WhatsAppTemplate.type).where(WhatsAppTemplate.tenant_id == tenant_id)).all()
    }

    created = False
    for template_type, content in DEFAULT_TEMPLATES.items():
        if template_type in existing_types:
            continue
        db.add(WhatsAppTemplate(tenant_id=tenant_id, type=template_type, content=content))
        created = True

    if created:
        db.commit()


def build_demo_link(subdomain: str) -> str:
    netloc = urlparse(settings.public_base_url).netloc or "bitcraftly.com"
    return f"https://{subdomain}.{netloc}"


def render_template_content(
    content: str,
    *,
    name: str,
    demo_link: str,
    business_name: str,
    phone: str,
) -> str:
    return (
        content.replace("{name}", name)
        .replace("{demo_link}", demo_link)
        .replace("{business_name}", business_name)
        .replace("{phone}", phone)
    )
