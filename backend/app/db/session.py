from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings

_connect_args: dict = {}
if settings.is_sqlite:
    _connect_args = {"check_same_thread": False}
else:
    # Fail fast on Render instead of hanging until health-check timeout.
    _connect_args = {"connect_timeout": 10}

engine = create_engine(
    settings.DB_URL,
    pool_pre_ping=True,
    pool_recycle=1800,
    connect_args=_connect_args,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=Session)


def get_db_session() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
