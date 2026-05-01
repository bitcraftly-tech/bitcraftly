from typing import Optional
from pathlib import Path

from pydantic import field_validator
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
    auth_secret: str = "change-me-in-production"
    access_token_expire_seconds: int = 60 * 60 * 24

    @property
    def DB_URL(self) -> str:
        # Prefer explicitly configured DATABASE_URL across environments.
        url = self.DATABASE_URL or self.database_url or self.SQLITE_URL
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
    )


settings = Settings()
