from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings

engine = create_engine(
    settings.DB_URL,
    pool_pre_ping=True,
    pool_recycle=1800,
    connect_args={"check_same_thread": False} if settings.is_sqlite else {},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine, class_=Session)


def get_db_session() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
