from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text, func

from app.db.base import Base


class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(120), nullable=False)
    email = Column(String(150), nullable=False)
    phone = Column(String(15), nullable=False)
    city = Column(String(100), nullable=True)
    role_applied = Column(String(120), nullable=False)
    experience_years = Column(String(30), nullable=True)
    current_role = Column(String(150), nullable=True)
    notice_period = Column(String(60), nullable=True)
    expected_ctc = Column(String(80), nullable=True)
    skills = Column(Text, nullable=True)
    portfolio_url = Column(String(500), nullable=True)
    github_url = Column(String(500), nullable=True)
    linkedin_url = Column(String(500), nullable=True)
    behance_url = Column(String(500), nullable=True)
    cover_letter = Column(Text, nullable=True)
    resume_filename = Column(String(255), nullable=False)
    resume_stored_name = Column(String(255), nullable=False)
    resume_mime = Column(String(120), nullable=True)
    resume_size_bytes = Column(Integer, nullable=True)
    source = Column(String(80), nullable=True, server_default="careers-apply")
    stage = Column(String(20), nullable=False, server_default="new")
    assigned_to = Column(String(120), nullable=True)
    notes = Column(Text, nullable=True)
    is_contacted = Column(Boolean, default=False, nullable=False, server_default="0")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
