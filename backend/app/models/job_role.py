from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text, func

from app.db.base import Base


class JobRole(Base):
    __tablename__ = "job_roles"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(80), unique=True, nullable=False, index=True)
    title = Column(String(120), nullable=False)
    department = Column(String(40), nullable=False, server_default="engineering")
    level = Column(String(20), nullable=False, server_default="mid")
    work_mode = Column(String(20), nullable=False, server_default="remote")
    employment_type = Column(String(80), nullable=False, server_default="Full-time")
    experience = Column(String(60), nullable=False)
    skills = Column(Text, nullable=False, server_default="[]")
    salary_range = Column(String(80), nullable=False)
    description = Column(Text, nullable=False)
    featured = Column(Boolean, nullable=False, server_default="0")
    is_active = Column(Boolean, nullable=False, server_default="1", index=True)
    sort_order = Column(Integer, nullable=False, server_default="0")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
