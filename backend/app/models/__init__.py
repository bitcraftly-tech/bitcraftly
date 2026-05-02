from app.models.contact import ContactSubmission
from app.models.lead import Lead
from app.models.notification import Notification
from app.models.parking_report import ParkingReport
from app.models.payment import Payment
from app.models.qr_contact import QRContact
from app.models.tenant import Tenant
from app.models.user import User
from app.models.whatsapp_template import WhatsAppTemplate

__all__ = [
    "Lead",
    "Tenant",
    "QRContact",
    "WhatsAppTemplate",
    "ContactSubmission",
    "User",
    "Notification",
    "ParkingReport",
    "Payment",
]
