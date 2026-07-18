from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings
from app.db.base import Base

if settings.is_sqlite:
    connect_args: dict = {"check_same_thread": False}
else:
    # Fail fast instead of hanging until the platform kills the request.
    connect_args = {"connect_timeout": 10}

engine = create_engine(
    settings.DB_URL,
    connect_args=connect_args,
    echo=settings.ENVIRONMENT != "production",
    pool_pre_ping=True,
    pool_recycle=1800,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=Session)


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
