from enum import Enum as PyEnum

from sqlalchemy import Boolean, Column, DateTime, Enum as SQLEnum, ForeignKey, Integer, String, Text, func

from app.db.base import Base


class NotificationType(str, PyEnum):
    LEAD_NEW = "lead.new"
    TEMPLATE_UPDATED = "template.updated"
    TEMPLATE_CREATED = "template.created"
    REPORT_WEEKLY_READY = "report.weekly_ready"
    CONTACT_INQUIRY = "contact.inquiry"


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    tenant_id = Column(Integer, ForeignKey("tenants.id"), nullable=True, index=True)
    user_id = Column(Integer, nullable=True, index=True)
    type = Column(SQLEnum(NotificationType), nullable=False)
    title = Column(String(180), nullable=False)
    message = Column(Text, nullable=True)
    link = Column(String(500), nullable=True)
    icon = Column(String(50), nullable=True)
    is_read = Column(Boolean, nullable=False, default=False, server_default="0", index=True)
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), index=True)
    read_at = Column(DateTime(timezone=True), nullable=True)
