from urllib.parse import quote

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import RedirectResponse
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from app.api.deps import CurrentTenant, DBSession
from app.core.config import settings
from app.models.notification import NotificationType
from app.models.parking_report import ParkingReport
from app.models.qr_contact import QRContact
from app.schemas.notification import NotificationRead
from app.schemas.qr_contact import (
    ParkingReportCreate,
    ParkingReportCreateResponse,
    QRCreateRequest,
    QRCreateResponse,
    QRPublicRead,
    QRRead,
)
from app.services.notification_hub import notification_hub
from app.services.notification_service import create_notification
from app.services.qr_service import (
    build_external_qr_image_url,
    generate_unique_qr_code,
    mask_phone,
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
    record = QRContact(
        tenant_id=tenant.id,
        code=code,
        destination_phone=phone,
        owner_name=(payload.owner_name or "").strip() or None,
        vehicle_number=(payload.vehicle_number or "").strip().upper() or None,
        default_issue=(payload.default_issue or "").strip() or None,
    )
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
    redirect_url = f"{base}/parking/report/{code}"
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
            owner_name=item.owner_name,
            vehicle_number=item.vehicle_number,
            default_issue=item.default_issue,
        )
        for item in records
    ]


@public_qr_router.get("/api/qr/public/{code}", response_model=QRPublicRead, status_code=status.HTTP_200_OK)
def get_public_qr_contact(code: str, db: DBSession) -> QRPublicRead:
    if code == "demo":
        return QRPublicRead(
            code="demo",
            owner_name="Bitcraftly Demo Owner",
            masked_phone="+********0954",
            call_path="/api/qr/public/demo/call",
            vehicle_number="UP-14ES-0966",
            issue="Wrong parking / blocked exit",
        )
    record = db.execute(select(QRContact).where(QRContact.code == code)).scalar_one_or_none()
    if record is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="QR code not found")
    return QRPublicRead(
        code=record.code,
        owner_name=record.owner_name,
        masked_phone=mask_phone(record.destination_phone),
        call_path=f"/api/qr/public/{record.code}/call",
        vehicle_number=record.vehicle_number,
        issue=record.default_issue,
    )


@public_qr_router.post("/api/qr/public/{code}/report", response_model=ParkingReportCreateResponse, status_code=status.HTTP_201_CREATED)
async def create_public_parking_report(code: str, payload: ParkingReportCreate, db: DBSession) -> ParkingReportCreateResponse:
    if code == "demo":
        return ParkingReportCreateResponse(success=True, message="Demo parking issue reported successfully.")

    record = db.execute(select(QRContact).where(QRContact.code == code)).scalar_one_or_none()
    if record is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="QR code not found")

    report = ParkingReport(
        tenant_id=record.tenant_id,
        qr_contact_id=record.id,
        issue_type=payload.issue_type.strip(),
        notes=(payload.notes or "").strip() or None,
        reporter_phone=normalize_phone_for_whatsapp(payload.reporter_phone or "") or None,
    )
    db.add(report)
    db.commit()
    db.refresh(report)

    try:
        notification = create_notification(
            db,
            notification_type=NotificationType.CONTACT_INQUIRY,
            title="New parking issue reported",
            message=f"{record.vehicle_number or 'Vehicle'} reported: {report.issue_type}",
            link="/dashboard/leads",
            icon="Car",
            tenant_id=record.tenant_id,
        )
        await notification_hub.broadcast(
            {
                "type": "notification.created",
                "notification": NotificationRead.model_validate(notification).model_dump(mode="json"),
            }
        )
    except Exception:
        # Public scan flow should not fail if notifications fail.
        pass

    return ParkingReportCreateResponse(success=True, message="Parking issue reported successfully.")


@public_qr_router.get("/api/qr/public/{code}/call", status_code=status.HTTP_307_TEMPORARY_REDIRECT)
def call_owner_via_qr(code: str, db: DBSession) -> RedirectResponse:
    if code == "demo":
        return RedirectResponse(url="tel:+919667710954", status_code=status.HTTP_307_TEMPORARY_REDIRECT)

    record = db.execute(select(QRContact).where(QRContact.code == code)).scalar_one_or_none()
    if record is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="QR code not found")
    # Relay call redirect so raw number is not exposed in page payload.
    return RedirectResponse(url=f"tel:+{record.destination_phone}", status_code=status.HTTP_307_TEMPORARY_REDIRECT)


@public_qr_router.get("/qr/{code}", status_code=status.HTTP_307_TEMPORARY_REDIRECT)
def redirect_qr_contact(code: str, db: DBSession) -> RedirectResponse:
    record = db.execute(select(QRContact).where(QRContact.code == code)).scalar_one_or_none()
    if record is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="QR code not found")

    whatsapp_url = f"https://wa.me/{quote(record.destination_phone, safe='')}"
    return RedirectResponse(url=whatsapp_url, status_code=status.HTTP_307_TEMPORARY_REDIRECT)
