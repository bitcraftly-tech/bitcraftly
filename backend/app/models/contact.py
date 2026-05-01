from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text, func

from app.db.base import Base


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    business_name = Column(String(150), nullable=False)
    business_type = Column(String(50), nullable=False)
    phone = Column(String(15), nullable=False)
    email = Column(String(150), nullable=True)
    message = Column(Text, nullable=True)
    source = Column(String(50), nullable=True)
    is_contacted = Column(Boolean, default=False, nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Contact {self.name} - {self.business_name}>"
