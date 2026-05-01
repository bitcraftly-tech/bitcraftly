from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy import desc, select

from app.api.deps import CurrentUser, DBSession
from app.models.parking_report import ParkingReport
from app.models.qr_contact import QRContact
from app.models.user import UserRole
from app.schemas.parking_report import ParkingReportListResponse, ParkingReportRead

router = APIRouter(prefix="/parking-reports", tags=["parking-reports"])


@router.get("", response_model=ParkingReportListResponse, status_code=status.HTTP_200_OK)
def list_parking_reports(
    request: Request,
    db: DBSession,
    current_user: CurrentUser,
    status_filter: str = "all",
) -> ParkingReportListResponse:
    if current_user.role not in {UserRole.ADMIN, UserRole.MANAGER}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")

    tenant = getattr(request.state, "tenant", None)
    stmt = (
        select(ParkingReport, QRContact)
        .join(QRContact, QRContact.id == ParkingReport.qr_contact_id)
        .order_by(desc(ParkingReport.created_at))
    )
    if tenant is not None:
        stmt = stmt.where(ParkingReport.tenant_id == tenant.id)
    if status_filter in {"open", "resolved"}:
        stmt = stmt.where(ParkingReport.status == status_filter)

    rows = db.execute(stmt).all()
    items = [
        ParkingReportRead(
            id=report.id,
            tenant_id=report.tenant_id,
            qr_contact_id=report.qr_contact_id,
            issue_type=report.issue_type,
            status=report.status,
            notes=report.notes,
            reporter_phone=report.reporter_phone,
            resolved_by_user_id=report.resolved_by_user_id,
            resolved_at=report.resolved_at,
            created_at=report.created_at,
            vehicle_number=qr.vehicle_number,
            owner_name=qr.owner_name,
            destination_phone=qr.destination_phone,
        )
        for report, qr in rows
    ]
    return ParkingReportListResponse(total=len(items), items=items)


@router.patch("/{report_id}/resolve", status_code=status.HTTP_200_OK)
def resolve_parking_report(
    report_id: int,
    request: Request,
    db: DBSession,
    current_user: CurrentUser,
) -> dict[str, bool | str]:
    if current_user.role not in {UserRole.ADMIN, UserRole.MANAGER}:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")

    tenant = getattr(request.state, "tenant", None)
    report = db.get(ParkingReport, report_id)
    if report is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")
    if tenant is not None and report.tenant_id != tenant.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")
    if report.status == "resolved":
        return {"success": True, "message": "Already resolved"}

    from datetime import datetime, timezone

    report.status = "resolved"
    report.resolved_by_user_id = current_user.id
    report.resolved_at = datetime.now(timezone.utc)
    db.add(report)
    db.commit()
    return {"success": True, "message": "Marked as resolved"}
