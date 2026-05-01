from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator


class LeadBase(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    phone: str = Field(min_length=1, max_length=24)
    business_type: str | None = Field(default=None, min_length=2, max_length=80)
    message: str | None = Field(default=None, max_length=2000)

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, value: str) -> str:
        allowed = set("0123456789+-() ")
        if any(char not in allowed for char in value):
            raise ValueError("Phone contains invalid characters")
        return value.strip()

    @field_validator("name")
    @classmethod
    def strip_required_text_fields(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Field cannot be empty")
        return cleaned

    @field_validator("business_type")
    @classmethod
    def normalize_business_type(cls, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = value.strip()
        return cleaned or None

    @field_validator("message")
    @classmethod
    def normalize_message(cls, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = value.strip()
        return cleaned or None


class LeadCreate(LeadBase):
    pass


class LeadResponse(LeadBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# Backward-compat alias
LeadRead = LeadResponse
