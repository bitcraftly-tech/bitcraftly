from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

from app.db.session import SessionLocal
from app.models.tenant import Tenant
from app.services.tenant_service import extract_subdomain_from_host


class TenantMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next) -> Response:
        host = request.headers.get("x-forwarded-host") or request.headers.get("host")
        subdomain = extract_subdomain_from_host(host)

        if not subdomain:
            fallback = request.headers.get("x-tenant-subdomain")
            subdomain = fallback.strip().lower() if fallback else None

        request.state.tenant_subdomain = subdomain
        request.state.tenant = None

        if subdomain:
            db = SessionLocal()
            try:
                tenant = db.query(Tenant).filter(Tenant.subdomain == subdomain).first()
                request.state.tenant = tenant
            finally:
                db.close()

        return await call_next(request)
