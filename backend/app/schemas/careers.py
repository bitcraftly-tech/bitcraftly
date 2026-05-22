from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class JobApplicationMetaUpdate(BaseModel):
    stage: Optional[str] = Field(
        None,
        pattern="^(applied|new|screening|interview|trial_task|final_round|hired|offer|rejected|closed)$",
    )
    assigned_to: Optional[str] = Field(None, max_length=120)
    is_contacted: Optional[bool] = None


class JobApplicationNotesUpdate(BaseModel):
    notes: str = Field(..., max_length=8000)


class JobApplicationRead(BaseModel):
    id: int
    full_name: str
    email: str
    phone: str
    city: Optional[str] = None
    role_applied: str
    experience_years: Optional[str] = None
    current_role: Optional[str] = None
    notice_period: Optional[str] = None
    expected_ctc: Optional[str] = None
    skills: Optional[str] = None
    portfolio_url: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    behance_url: Optional[str] = None
    cover_letter: Optional[str] = None
    resume_filename: str
    resume_mime: Optional[str] = None
    resume_size_bytes: Optional[int] = None
    source: Optional[str] = None
    stage: str
    assigned_to: Optional[str] = None
    notes: Optional[str] = None
    is_contacted: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class JobApplicationListResponse(BaseModel):
    total: int
    applications: list[JobApplicationRead]
