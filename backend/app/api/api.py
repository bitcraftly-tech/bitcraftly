from fastapi import APIRouter

from app.api.routes.auth import router as auth_router
from app.api.routes.demo import router as demo_router
from app.api.routes.lead import router as lead_router
from app.api.routes.lead_automation import router as lead_automation_router
from app.api.routes.notifications import router as notifications_router
from app.api.routes.parking_reports import router as parking_reports_router
from app.api.routes.qr import qr_api_router as qr_router
from app.api.routes.tenant import router as tenant_router
from app.api.routes.templates import router as templates_router
from app.api.routes.payments import router as payments_router

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(notifications_router)
api_router.include_router(parking_reports_router)
api_router.include_router(demo_router)
api_router.include_router(lead_router)
api_router.include_router(lead_automation_router)
api_router.include_router(qr_router)
api_router.include_router(tenant_router)
api_router.include_router(templates_router)
api_router.include_router(payments_router)
