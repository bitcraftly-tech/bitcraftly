import json
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, field_validator


class JobRoleBase(BaseModel):
    slug: str = Field(..., min_length=2, max_length=80, pattern=r"^[a-z0-9-]+$")
    title: str = Field(..., min_length=2, max_length=120)
    department: str = Field(..., pattern=r"^(engineering|design|product)$")
    level: str = Field(..., pattern=r"^(mid|senior|lead)$")
    work_mode: str = Field(..., pattern=r"^(remote|hybrid|onsite)$")
    employment_type: str = Field(..., min_length=2, max_length=80)
    experience: str = Field(..., min_length=2, max_length=60)
    skills: list[str] = Field(..., min_length=1)
    salary_range: str = Field(..., min_length=2, max_length=80)
    description: str = Field(..., min_length=10, max_length=4000)
    featured: bool = False
    is_active: bool = True
    sort_order: int = 0

    @field_validator("skills")
    @classmethod
    def skills_non_empty(cls, v: list[str]) -> list[str]:
        cleaned = [s.strip() for s in v if s and s.strip()]
        if not cleaned:
            raise ValueError("At least one skill is required")
        return cleaned


class JobRoleCreate(JobRoleBase):
    pass


class JobRoleUpdate(BaseModel):
    slug: Optional[str] = Field(None, min_length=2, max_length=80, pattern=r"^[a-z0-9-]+$")
    title: Optional[str] = Field(None, min_length=2, max_length=120)
    department: Optional[str] = Field(None, pattern=r"^(engineering|design|product)$")
    level: Optional[str] = Field(None, pattern=r"^(mid|senior|lead)$")
    work_mode: Optional[str] = Field(None, pattern=r"^(remote|hybrid|onsite)$")
    employment_type: Optional[str] = Field(None, min_length=2, max_length=80)
    experience: Optional[str] = Field(None, min_length=2, max_length=60)
    skills: Optional[list[str]] = None
    salary_range: Optional[str] = Field(None, min_length=2, max_length=80)
    description: Optional[str] = Field(None, min_length=10, max_length=4000)
    featured: Optional[bool] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None


class JobRoleRead(BaseModel):
    id: int
    slug: str
    title: str
    department: str
    level: str
    work_mode: str
    employment_type: str
    experience: str
    skills: list[str]
    salary_range: str
    description: str
    featured: bool
    is_active: bool
    sort_order: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}

    @field_validator("skills", mode="before")
    @classmethod
    def parse_skills(cls, v: object) -> list[str]:
        if isinstance(v, list):
            return v
        if isinstance(v, str):
            try:
                parsed = json.loads(v)
                if isinstance(parsed, list):
                    return [str(x) for x in parsed]
            except json.JSONDecodeError:
                return [s.strip() for s in v.split(",") if s.strip()]
        return []


class JobRoleListResponse(BaseModel):
    total: int
    roles: list[JobRoleRead]
