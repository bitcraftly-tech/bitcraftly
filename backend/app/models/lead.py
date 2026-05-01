from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text, func

from app.db.base import Base


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    phone = Column(String(24), nullable=False)
    business_type = Column(String(80), nullable=True)
    message = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
