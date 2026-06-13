"""Lightweight DB bootstrap so local dev works without running Alembic first."""

from __future__ import annotations

from app.core.config import settings
from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.models.user import User, UserRole
from app.services.job_roles_seed import ensure_job_roles_seed
from app.services.security import hash_password


def ensure_dev_schema() -> None:
    """Create missing tables from ORM models (development only; production should use Alembic)."""
    if settings.is_production:
        return
    import app.models  # noqa: F401 — loads mapped classes onto Base.metadata

    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        ensure_job_roles_seed(db)
    finally:
        db.close()


def ensure_prod_admin_user() -> None:
    """Optional production bootstrap when SEED_ADMIN_EMAIL + SEED_ADMIN_PASSWORD are set on Render."""
    if not settings.is_production:
        return

    email = (settings.SEED_ADMIN_EMAIL or "").strip().lower()
    password = (settings.SEED_ADMIN_PASSWORD or "").strip()
    name = (settings.SEED_ADMIN_NAME or "Admin").strip()
    if not email or not password:
        return

    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        if user:
            user.name = name
            user.password_hash = hash_password(password)
            user.role = UserRole.ADMIN
            user.is_active = True
        else:
            user = User(
                name=name,
                email=email,
                password_hash=hash_password(password),
                role=UserRole.ADMIN,
                is_active=True,
            )
            db.add(user)
        db.commit()
    finally:
        db.close()


def ensure_sqlite_dev_user() -> None:
    """Seed the same user as NextAuth local fallback (`auth.ts`) when DB is empty SQLite."""
    if settings.is_production or not settings.is_sqlite:
        return

    email = "test.user@bitcraftly.local"
    password = "Test@12345"

    db = SessionLocal()
    try:
        if db.query(User).filter(User.email == email.lower()).first():
            return
        user = User(
            name="Dev Test User",
            email=email.lower(),
            password_hash=hash_password(password),
            role=UserRole.ADMIN,
            is_active=True,
        )
        db.add(user)
        db.commit()
    finally:
        db.close()
