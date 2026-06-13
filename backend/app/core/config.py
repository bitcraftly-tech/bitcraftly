from typing import Optional
from pathlib import Path

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    DATABASE_URL: Optional[str] = None
    SQLITE_URL: str = "sqlite:///./bitcraftly.db"

    app_name: str = "Lead Management API"
    api_prefix: str = "/api"
    app_env: str = "development"
    database_url: str = "sqlite:///./bitcraftly.db"
    cors_origins: str = "http://localhost:3000,http://localhost:3001,https://bitcraftly.com,https://www.bitcraftly.com"
    cors_origin_regex: str = r"^https:\/\/([a-z0-9-]+\.)*bitcraftly\.com$"
    public_base_url: str = "https://bitcraftly.com"
    auth_secret: str = Field(
        default="change-me-in-production",
        validation_alias="AUTH_SECRET",
    )
    access_token_expire_seconds: int = 60 * 60 * 24

    # Shared secret for NextAuth → FastAPI Google account sync (server-to-server only). Same value as AUTH_GOOGLE_SYNC_SECRET on the Next.js app.
    AUTH_GOOGLE_SYNC_SECRET: Optional[str] = None

    # Optional: auto-create admin on production startup (Render env)
    SEED_ADMIN_EMAIL: Optional[str] = None
    SEED_ADMIN_PASSWORD: Optional[str] = None
    SEED_ADMIN_NAME: str = "Analytics Test Admin"

    # Razorpay (https://dashboard.razorpay.com/app/keys) — server-side secret must never be exposed to the browser
    RAZORPAY_KEY_ID: Optional[str] = None
    RAZORPAY_KEY_SECRET: Optional[str] = None
    # Webhooks → Settings → Webhooks → signing secret (verify incoming webhook payloads)
    RAZORPAY_WEBHOOK_SECRET: Optional[str] = None

    @property
    def DB_URL(self) -> str:
        # Prefer explicitly configured DATABASE_URL across environments.
        url = self.DATABASE_URL or self.database_url or self.SQLITE_URL
        # Render/Heroku use postgresql:// — SQLAlchemy defaults to psycopg2; we ship psycopg v3.
        if url.startswith("postgresql://"):
            url = "postgresql+psycopg://" + url.removeprefix("postgresql://")
        elif url.startswith("postgres://"):
            url = "postgresql+psycopg://" + url.removeprefix("postgres://")
        # Make local sqlite path stable regardless of working directory.
        if url.startswith("sqlite:///./"):
            db_name = url.replace("sqlite:///./", "", 1)
            backend_dir = Path(__file__).resolve().parents[2]
            db_path = (backend_dir / db_name).as_posix()
            return f"sqlite:///{db_path}"
        return url

    @property
    def cors_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def is_sqlite(self) -> bool:
        return self.DB_URL.startswith("sqlite")

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT.lower() == "production"

    @field_validator("ENVIRONMENT", mode="before")
    @classmethod
    def normalize_environment(cls, value: str) -> str:
        return (value or "development").strip().lower()

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        populate_by_name=True,
    )


settings = Settings()
