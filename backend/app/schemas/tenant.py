from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class TenantCreate(BaseModel):
    name: str = Field(min_length=1, max_length=160)

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Name is required")
        return cleaned


class TenantResponse(BaseModel):
    id: int
    name: str
    subdomain: str
    business_phone: str | None = None
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class TenantUpdate(BaseModel):
    name: str = Field(min_length=1, max_length=160)
    business_phone: str | None = Field(default=None, max_length=32)

    @field_validator("name")
    @classmethod
    def validate_update_name(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Name is required")
        return cleaned

    @field_validator("business_phone")
    @classmethod
    def normalize_phone(cls, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = value.strip()
        return cleaned or None


# Backward-compat alias
TenantRead = TenantResponse
