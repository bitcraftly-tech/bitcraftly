from fastapi import APIRouter, HTTPException, status
from sqlalchemy.exc import SQLAlchemyError

from app.api.deps import DBSession
from app.schemas.lead import LeadCreate, LeadResponse
from app.services.lead_service import create_lead as create_lead_service
from app.services.lead_service import list_leads as list_leads_service

router = APIRouter(prefix="/leads", tags=["leads"])


@router.post("", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
def create_lead(payload: LeadCreate, db: DBSession) -> LeadResponse:
    try:
        lead = create_lead_service(db, payload)
    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save lead",
        ) from exc
    return LeadResponse.model_validate(lead)


@router.get("", response_model=list[LeadResponse], status_code=status.HTTP_200_OK)
def list_leads(db: DBSession) -> list[LeadResponse]:
    try:
        leads = list_leads_service(db)
    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch leads",
        ) from exc
    return [LeadResponse.model_validate(item) for item in leads]
