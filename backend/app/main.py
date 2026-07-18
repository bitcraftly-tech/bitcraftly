from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.api.api import api_router
from app.api.routes.qr import public_qr_router
from app.core.config import settings
from app.db.bootstrap import ensure_contact_schema, ensure_dev_schema, ensure_prod_admin_user, ensure_sqlite_dev_user
from app.db.session import engine
from app.middleware.tenant import TenantMiddleware
from app.models import contact as contact_model  # noqa: F401
from app.models import notification as notification_model  # noqa: F401
from app.models import user as user_model  # noqa: F401
from app.models import payment as payment_model  # noqa: F401
from app.models import job_role as job_role_model  # noqa: F401
from app.routers import careers, contact

app = FastAPI(title=settings.app_name)
app.include_router(public_qr_router)
app.add_middleware(TenantMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_origin_regex=settings.cors_origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    if settings.is_production and settings.is_sqlite:
        raise RuntimeError("SQLite is not allowed in production. Configure DATABASE_URL for PostgreSQL.")
    if settings.is_production and settings.auth_secret == "change-me-in-production":
        raise RuntimeError("Set a strong AUTH_SECRET in production.")

    ensure_contact_schema()
    ensure_dev_schema()
    ensure_sqlite_dev_user()
    ensure_prod_admin_user()


@app.get("/health")
def health() -> dict[str, str]:
    """Liveness probe — must respond quickly for Render deploy health checks."""
    db_status = "ok"
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
    except Exception:
        # App is up; DB may still be linking — return 200 so deploy is not stuck for minutes.
        db_status = "error"
    return {"status": "ok", "database": db_status, "environment": settings.ENVIRONMENT}


app.include_router(api_router, prefix=settings.api_prefix)
app.include_router(contact.router)
app.include_router(careers.router)
