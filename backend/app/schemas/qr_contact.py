from pydantic import BaseModel, Field, field_validator


class QRCreateRequest(BaseModel):
    phone: str = Field(min_length=7, max_length=24)

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
