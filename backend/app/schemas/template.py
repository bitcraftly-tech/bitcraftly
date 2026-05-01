from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field, field_validator

ALLOWED_TEMPLATE_TYPES = {"intro", "demo", "price"}


class TemplateCreate(BaseModel):
    type: str = Field(min_length=3, max_length=24)
    content: str = Field(min_length=1, max_length=4000)

    @field_validator("type")
    @classmethod
    def validate_type(cls, value: str) -> str:
        normalized = value.strip().lower()
        if normalized not in ALLOWED_TEMPLATE_TYPES:
            raise ValueError("Template type must be one of: intro, demo, price")
        return normalized

    @field_validator("content")
    @classmethod
    def validate_content(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Content cannot be empty")
        return cleaned


class TemplateRead(BaseModel):
    id: int
    tenant_id: int
    type: str
    content: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class LeadAutoReplyRequest(BaseModel):
    phone: str = Field(min_length=1, max_length=32)
    type: str = Field(min_length=3, max_length=24)
    name: str | None = Field(default=None, max_length=120)

    @field_validator("type")
    @classmethod
    def validate_type(cls, value: str) -> str:
        normalized = value.strip().lower()
        if normalized not in ALLOWED_TEMPLATE_TYPES:
            raise ValueError("Template type must be one of: intro, demo, price")
        return normalized

    @field_validator("phone")
    @classmethod
    def normalize_phone(cls, value: str) -> str:
        digits = "".join(c for c in value if c.isdigit())
        if len(digits) < 7 or len(digits) > 15:
            raise ValueError("Invalid phone number")
        return digits


class LeadAutoReplyResponse(BaseModel):
    message: str
