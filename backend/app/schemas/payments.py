from datetime import datetime

from pydantic import BaseModel, Field


class RazorpayOrderCreateRequest(BaseModel):
    """Amount in smallest currency unit (paise for INR)."""

    amount_paise: int = Field(ge=100, le=50_000_000, description="Minimum ₹1 (100 paise)")
    currency: str = Field(default="INR", min_length=3, max_length=3)


class RazorpayOrderCreateResponse(BaseModel):
    order_id: str
    amount: int
    currency: str
    key_id: str


class RazorpayVerifyRequest(BaseModel):
    razorpay_order_id: str = Field(min_length=8)
    razorpay_payment_id: str = Field(min_length=8)
    razorpay_signature: str = Field(min_length=8)


class RazorpayVerifyResponse(BaseModel):
    ok: bool
    message: str


class PaymentRecord(BaseModel):
    id: int
    razorpay_order_id: str
    razorpay_payment_id: str | None
    amount_paise: int
    currency: str
    status: str
    created_at: datetime

    model_config = {"from_attributes": True}
