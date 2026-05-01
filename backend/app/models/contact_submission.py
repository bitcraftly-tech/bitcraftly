from datetime import datetime
from typing import Optional

from sqlalchemy import DateTime, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String(120), nullable=False)
    business_name: Mapped[str] = mapped_column(String(160), nullable=False)
    business_type: Mapped[str] = mapped_column(String(80), nullable=False)
    phone_number: Mapped[str] = mapped_column(String(24), nullable=False, index=True)
    email: Mapped[Optional[str]] = mapped_column(String(160), nullable=True)
    message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    source: Mapped[Optional[str]] = mapped_column(String(80), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
