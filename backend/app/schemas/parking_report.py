from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ParkingReportRead(BaseModel):
    id: int
    tenant_id: int
    qr_contact_id: int
    issue_type: str
    status: str
    notes: str | None = None
    reporter_phone: str | None = None
    resolved_by_user_id: int | None = None
    resolved_at: datetime | None = None
    created_at: datetime
    vehicle_number: str | None = None
    owner_name: str | None = None
    destination_phone: str | None = None

    model_config = ConfigDict(from_attributes=True)


class ParkingReportListResponse(BaseModel):
    total: int
    items: list[ParkingReportRead]
