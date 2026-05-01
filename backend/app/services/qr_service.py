import secrets
from urllib.parse import quote

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.qr_contact import QRContact


def normalize_phone_for_whatsapp(raw_phone: str) -> str:
    return "".join(char for char in raw_phone if char.isdigit())


def generate_unique_qr_code(db: Session) -> str:
    while True:
        code = secrets.token_urlsafe(8).replace("-", "").replace("_", "")[:12]
        exists = db.execute(select(QRContact.id).where(QRContact.code == code)).scalar_one_or_none()
        if exists is None:
            return code


def build_external_qr_image_url(redirect_url: str) -> str:
    encoded = quote(redirect_url, safe="")
    return f"https://api.qrserver.com/v1/create-qr-code/?size=240x240&data={encoded}"
