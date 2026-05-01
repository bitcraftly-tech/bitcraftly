from pydantic import BaseModel, Field, field_validator


class DemoCreateRequest(BaseModel):
    business_name: str = Field(min_length=2, max_length=160)

    @field_validator("business_name")
    @classmethod
    def validate_business_name(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Business name cannot be empty")
        return cleaned


class DemoCreateResponse(BaseModel):
    success: bool
    demo_url: str
