from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select

from app.api.deps import DBSession, require_roles
from app.models.tenant import Tenant
from app.models.user import User, UserRole
from app.schemas.tenant import TenantResponse, TenantUpdate

router = APIRouter(prefix="/tenant", tags=["tenant"])


@router.get("/{slug}", response_model=TenantResponse, status_code=status.HTTP_200_OK)
def get_tenant_by_slug(slug: str, db: DBSession) -> TenantResponse:
    tenant = db.execute(select(Tenant).where(Tenant.subdomain == slug.lower())).scalar_one_or_none()
    if tenant is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tenant not found")
    return TenantResponse.model_validate(tenant)


@router.patch("/{slug}", response_model=TenantResponse, status_code=status.HTTP_200_OK)
def update_tenant_by_slug(
    slug: str,
    payload: TenantUpdate,
    db: DBSession,
    _: User = Depends(require_roles(UserRole.ADMIN, UserRole.MANAGER)),
) -> TenantResponse:
    tenant = db.execute(select(Tenant).where(Tenant.subdomain == slug.lower())).scalar_one_or_none()
    if tenant is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tenant not found")
    tenant.name = payload.name
    tenant.business_phone = payload.business_phone
    db.add(tenant)
    db.commit()
    db.refresh(tenant)
    return TenantResponse.model_validate(tenant)
