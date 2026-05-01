import re

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.tenant import Tenant

RESERVED_SUBDOMAINS = {"www", "api", "admin", "app"}


def normalize_subdomain(value: str) -> str:
    lowered = value.strip().lower()
    normalized = re.sub(r"[^a-z0-9]", "", lowered)
    return normalized or "tenant"


def extract_subdomain_from_host(host: str | None) -> str | None:
    if not host:
        return None

    hostname = host.split(":")[0].lower().strip()
    if hostname.endswith(".localhost"):
        subdomain = hostname[: -len(".localhost")]
        return subdomain or None

    parts = hostname.split(".")
    if len(parts) < 3:
        return None

    subdomain = parts[0]
    if subdomain in RESERVED_SUBDOMAINS:
        return None
    return subdomain


def generate_unique_subdomain(db: Session, tenant_name: str) -> str:
    base_subdomain = normalize_subdomain(tenant_name)
    candidate = base_subdomain
    suffix = 2

    while True:
        exists = db.execute(
            select(Tenant.id).where(Tenant.subdomain == candidate)
        ).scalar_one_or_none()
        if exists is None:
            return candidate
        candidate = f"{base_subdomain}{suffix}"
        suffix += 1
