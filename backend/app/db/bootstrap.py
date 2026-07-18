"""Lightweight DB bootstrap so local dev works without running Alembic first."""

from __future__ import annotations

import logging

from sqlalchemy import inspect, text

from app.core.config import settings
from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.models.user import User, UserRole
from app.services.job_roles_seed import ensure_job_roles_seed
from app.services.security import hash_password

logger = logging.getLogger(__name__)


def ensure_contact_schema() -> None:
    """
    Ensure contact_submissions exists with the columns the ORM expects.

    The original Alembic create revision was a no-op, so production DBs can
    miss this table (or pipeline columns) and public contact submits fail.
    """
    import app.models.contact  # noqa: F401 — register mapped class

    from app.models.contact import ContactSubmission

    try:
        ContactSubmission.__table__.create(bind=engine, checkfirst=True)
    except Exception:
        logger.exception("contact_schema_create_failed")
        return

    try:
        inspector = inspect(engine)
        existing = {col["name"] for col in inspector.get_columns("contact_submissions")}
    except Exception:
        logger.exception("contact_schema_inspect_failed")
        return

    bool_default = "0" if settings.is_sqlite else "FALSE"
    timestamp_type = "DATETIME" if settings.is_sqlite else "TIMESTAMPTZ"

    statements: list[str] = []
    if "is_contacted" not in existing:
        statements.append(
            f"ALTER TABLE contact_submissions ADD COLUMN is_contacted BOOLEAN NOT NULL DEFAULT {bool_default}"
        )
    if "stage" not in existing:
        statements.append(
            "ALTER TABLE contact_submissions ADD COLUMN stage VARCHAR(20) NOT NULL DEFAULT 'new'"
        )
    if "assigned_to" not in existing:
        statements.append("ALTER TABLE contact_submissions ADD COLUMN assigned_to VARCHAR(120)")
    if "notes" not in existing:
        statements.append("ALTER TABLE contact_submissions ADD COLUMN notes TEXT")
    if "email" not in existing:
        statements.append("ALTER TABLE contact_submissions ADD COLUMN email VARCHAR(150)")
    if "message" not in existing:
        statements.append("ALTER TABLE contact_submissions ADD COLUMN message TEXT")
    if "source" not in existing:
        statements.append("ALTER TABLE contact_submissions ADD COLUMN source VARCHAR(50)")
    if "updated_at" not in existing:
        statements.append(
            f"ALTER TABLE contact_submissions ADD COLUMN updated_at {timestamp_type}"
        )

    if not statements:
        return

    try:
        with engine.begin() as connection:
            for statement in statements:
                connection.execute(text(statement))
        logger.info("contact_schema_columns_added", extra={"columns": len(statements)})
    except Exception:
        logger.exception("contact_schema_alter_failed")


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
