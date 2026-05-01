from urllib.parse import quote

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from app.api.deps import CurrentTenant, DBSession
from app.core.config import settings
from app.models.qr_contact import QRContact
from app.schemas.qr_contact import QRCreateRequest, QRCreateResponse, QRRead
from app.services.qr_service import (
    build_external_qr_image_url,
    generate_unique_qr_code,
    normalize_phone_for_whatsapp,
)

qr_api_router = APIRouter(prefix="/qr", tags=["qr"])
public_qr_router = APIRouter(tags=["qr"])


@qr_api_router.post("/create", response_model=QRCreateResponse, status_code=status.HTTP_201_CREATED)
def create_qr(
    payload: QRCreateRequest,
    db: DBSession,
    tenant: CurrentTenant,
) -> QRCreateResponse:
    phone = normalize_phone_for_whatsapp(payload.phone)
    if len(phone) < 7 or len(phone) > 15:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Invalid phone number")

    code = generate_unique_qr_code(db)
    record = QRContact(tenant_id=tenant.id, code=code, destination_phone=phone)
    db.add(record)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Could not generate a unique QR code. Please retry.",
        ) from None
    db.refresh(record)

    base = settings.public_base_url.rstrip("/")
    redirect_url = f"{base}/qr/{code}"
    qr_url = build_external_qr_image_url(redirect_url)
    return QRCreateResponse(qr_url=qr_url, redirect_url=redirect_url)


@qr_api_router.get("", response_model=list[QRRead], status_code=status.HTTP_200_OK)
def list_qr_contacts(db: DBSession, tenant: CurrentTenant) -> list[QRRead]:
    records = db.execute(
        select(QRContact).where(QRContact.tenant_id == tenant.id).order_by(QRContact.created_at.desc())
    ).scalars().all()
    return [
        QRRead(
            id=item.id,
            tenant_id=item.tenant_id,
            code=item.code,
            destination_phone=item.destination_phone,
        )
        for item in records
    ]


@public_qr_router.get("/qr/{code}", status_code=status.HTTP_307_TEMPORARY_REDIRECT)
def redirect_qr_contact(code: str, db: DBSession) -> RedirectResponse:
    record = db.execute(select(QRContact).where(QRContact.code == code)).scalar_one_or_none()
    if record is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="QR code not found")

    whatsapp_url = f"https://wa.me/{quote(record.destination_phone, safe='')}"
    return RedirectResponse(url=whatsapp_url, status_code=status.HTTP_307_TEMPORARY_REDIRECT)
