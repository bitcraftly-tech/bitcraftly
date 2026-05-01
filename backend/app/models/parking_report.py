from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class ParkingReport(Base):
    __tablename__ = "parking_reports"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    tenant_id: Mapped[int] = mapped_column(Integer, nullable=False, index=True)
    qr_contact_id: Mapped[int] = mapped_column(ForeignKey("qr_contacts.id"), nullable=False, index=True)
    issue_type: Mapped[str] = mapped_column(String(120), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, server_default="open")
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    reporter_phone: Mapped[str | None] = mapped_column(String(24), nullable=True)
    resolved_by_user_id: Mapped[int | None] = mapped_column(Integer, nullable=True)
    resolved_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, server_default=func.now())
