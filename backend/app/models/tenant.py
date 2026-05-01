from sqlalchemy import Column, DateTime, Integer, String, func

from app.db.base import Base


class Tenant(Base):
    __tablename__ = "tenants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(160), nullable=False)
    subdomain = Column(String(80), unique=True, index=True, nullable=False)
    business_phone = Column(String(32), nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
