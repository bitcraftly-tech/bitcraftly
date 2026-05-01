from pydantic import BaseModel, Field, field_validator


class QRCreateRequest(BaseModel):
    phone: str = Field(min_length=7, max_length=24)
    owner_name: str | None = Field(default=None, max_length=120)
    vehicle_number: str | None = Field(default=None, max_length=32)
    default_issue: str | None = Field(default=None, max_length=160)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        allowed = set("0123456789+-() ")
        if any(char not in allowed for char in value):
            raise ValueError("Phone contains invalid characters")
        return value.strip()


class QRCreateResponse(BaseModel):
    qr_url: str
    redirect_url: str


class QRRead(BaseModel):
    id: int
    tenant_id: int
    code: str
    destination_phone: str
    owner_name: str | None = None
    vehicle_number: str | None = None
    default_issue: str | None = None


class QRPublicRead(BaseModel):
    code: str
    owner_name: str | None = None
    masked_phone: str
    call_path: str
    vehicle_number: str | None = None
    issue: str | None = None


class ParkingReportCreate(BaseModel):
    issue_type: str = Field(min_length=3, max_length=120)
    notes: str | None = Field(default=None, max_length=2000)
    reporter_phone: str | None = Field(default=None, max_length=24)


class ParkingReportCreateResponse(BaseModel):
    success: bool
    message: str
