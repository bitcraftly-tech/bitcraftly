from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, ForeignKey, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class QRContact(Base):
    __tablename__ = "qr_contacts"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    tenant_id: Mapped[int] = mapped_column(ForeignKey("tenants.id"), index=True, nullable=False)
    code: Mapped[str] = mapped_column(String(32), unique=True, index=True, nullable=False)
    destination_phone: Mapped[str] = mapped_column(String(24), nullable=False)
    owner_name: Mapped[Optional[str]] = mapped_column(String(120), nullable=True)
    vehicle_number: Mapped[Optional[str]] = mapped_column(String(32), nullable=True, index=True)
    default_issue: Mapped[Optional[str]] = mapped_column(String(160), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
