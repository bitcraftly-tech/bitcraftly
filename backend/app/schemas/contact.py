from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


class ContactCreate(BaseModel):
    name: str = Field(min_length=2)
    business_name: str
    business_type: str
    phone: str
    email: Optional[str] = None
    message: Optional[str] = None
    source: Optional[str] = None

    @model_validator(mode="before")
    @classmethod
    def map_legacy_frontend_keys(cls, data: object) -> object:
        if not isinstance(data, dict):
            return data
        mapped = dict(data)
        if "name" not in mapped and "fullName" in mapped:
            mapped["name"] = mapped.get("fullName")
        if "business_name" not in mapped and "businessName" in mapped:
            mapped["business_name"] = mapped.get("businessName")
        if "business_type" not in mapped and "businessType" in mapped:
            mapped["business_type"] = mapped.get("businessType")
        return mapped

    @field_validator("name")
    @classmethod
    def name_min_length(cls, value: str) -> str:
        cleaned = value.strip()
        if len(cleaned) < 2:
            raise ValueError("Name must be at least 2 characters")
        return cleaned

    @field_validator("phone")
    @classmethod
    def phone_must_be_valid(cls, value: str) -> str:
        digits = "".join(filter(str.isdigit, value))
        if len(digits) != 10:
            raise ValueError("Phone must be 10 digits")
        return digits

    @field_validator("business_name")
    @classmethod
    def business_name_required(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Business name is required")
        return cleaned

    @field_validator("business_type", "email", "message", "source")
    @classmethod
    def strip_optional_text(cls, value: Optional[str]) -> Optional[str]:
        if value is None:
            return None
        cleaned = value.strip()
        return cleaned or None


class ContactResponse(BaseModel):
    id: int
    name: str
    business_name: str
    business_type: str
    phone: str
    email: Optional[str]
    message: Optional[str]
    source: Optional[str]
    is_contacted: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ContactListResponse(BaseModel):
    total: int
    submissions: list[ContactResponse]
