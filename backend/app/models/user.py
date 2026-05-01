from enum import Enum as PyEnum

from sqlalchemy import Boolean, Column, DateTime, Enum as SQLEnum, Integer, String, func

from app.db.base import Base


class UserRole(str, PyEnum):
    ADMIN = "admin"
    MANAGER = "manager"
    USER = "user"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    email = Column(String(190), nullable=False, unique=True, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(SQLEnum(UserRole), nullable=False, default=UserRole.USER, server_default=UserRole.USER.value)
    is_active = Column(Boolean, nullable=False, default=True, server_default="1")
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=True, onupdate=func.now())
