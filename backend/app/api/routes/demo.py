from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from app.api.deps import CurrentTenant, DBSession
from app.models.tenant import Tenant
from app.schemas.demo import DemoCreateRequest, DemoCreateResponse
from app.schemas.tenant import TenantResponse
from app.services.tenant_service import generate_unique_subdomain

router = APIRouter(prefix="/demo", tags=["demo"])


@router.post("/create", response_model=DemoCreateResponse, status_code=status.HTTP_201_CREATED)
def create_demo(payload: DemoCreateRequest, db: DBSession) -> DemoCreateResponse:
    subdomain = generate_unique_subdomain(db, payload.business_name)
    tenant = Tenant(name=payload.business_name, subdomain=subdomain)
    db.add(tenant)

    try:
        db.commit()
    except IntegrityError as exc:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Could not create a unique demo slug. Please retry.",
        ) from exc

    db.refresh(tenant)
    return DemoCreateResponse(
        success=True,
        demo_url=f"https://{tenant.subdomain}.bitcraftly.com",
    )


@router.get("/tenant", response_model=TenantResponse, status_code=status.HTTP_200_OK)
def get_tenant_context(tenant: CurrentTenant) -> TenantResponse:
    return TenantResponse.model_validate(tenant)


@router.get("/tenant/{subdomain}", response_model=TenantResponse, status_code=status.HTTP_200_OK)
def get_tenant_by_subdomain(subdomain: str, db: DBSession) -> TenantResponse:
    tenant = db.execute(select(Tenant).where(Tenant.subdomain == subdomain)).scalar_one_or_none()
    if tenant is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Tenant not found")
    return TenantResponse.model_validate(tenant)
