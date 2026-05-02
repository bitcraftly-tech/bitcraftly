"""Razorpay Orders + payment verification, webhooks, and persisted payment rows."""

from __future__ import annotations

import json
import time
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.orm import Session

from app.api.deps import require_roles
from app.core.config import settings
from app.db.session import get_db_session
from app.models.payment import Payment
from app.models.user import User, UserRole
from app.schemas.payments import (
    PaymentRecord,
    RazorpayOrderCreateRequest,
    RazorpayOrderCreateResponse,
    RazorpayVerifyRequest,
    RazorpayVerifyResponse,
)
from app.services import razorpay_http

router = APIRouter(prefix="/payments", tags=["payments"])


def _razorpay_keys() -> tuple[str, str]:
    key_id = (settings.RAZORPAY_KEY_ID or "").strip()
    key_secret = (settings.RAZORPAY_KEY_SECRET or "").strip()
    if not key_id or not key_secret:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Payments are not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.",
        )
    return key_id, key_secret


def _webhook_secret() -> str:
    secret = (settings.RAZORPAY_WEBHOOK_SECRET or settings.RAZORPAY_KEY_SECRET or "").strip()
    if not secret:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Webhooks require RAZORPAY_WEBHOOK_SECRET (or RAZORPAY_KEY_SECRET as fallback).",
        )
    return secret


@router.get("/me", response_model=list[PaymentRecord])
def list_my_payments(
    db: Session = Depends(get_db_session),
    current_user: User = Depends(require_roles(UserRole.ADMIN, UserRole.MANAGER)),
    limit: int = 50,
) -> list[Payment]:
    lim = min(max(limit, 1), 100)
    rows = (
        db.query(Payment)
        .filter(Payment.user_id == current_user.id)
        .order_by(Payment.created_at.desc())
        .limit(lim)
        .all()
    )
    return rows


@router.post("/razorpay/order", response_model=RazorpayOrderCreateResponse)
def create_razorpay_order(
    payload: RazorpayOrderCreateRequest,
    db: Session = Depends(get_db_session),
    current_user: User = Depends(require_roles(UserRole.ADMIN, UserRole.MANAGER)),
) -> RazorpayOrderCreateResponse:
    """
    Create a Razorpay order. The browser should open Checkout with the returned `order_id` and `key_id`.
    """
    key_id, key_secret = _razorpay_keys()
    receipt = f"bfc_{current_user.id}_{int(time.time())}"
    currency = payload.currency.upper()

    try:
        order = razorpay_http.create_order(
            key_id,
            key_secret,
            amount_paise=payload.amount_paise,
            currency=currency,
            receipt=receipt,
            notes={
                "user_id": str(current_user.id),
                "email": current_user.email or "",
            },
        )
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Razorpay order failed: {exc!s}",
        ) from exc

    oid = order.get("id")
    if not oid:
        raise HTTPException(status_code=status.HTTP_502_BAD_GATEWAY, detail="Invalid response from Razorpay.")

    row = Payment(
        user_id=current_user.id,
        razorpay_order_id=oid,
        amount_paise=int(order.get("amount", payload.amount_paise)),
        currency=str(order.get("currency", currency)),
        status="pending",
    )
    db.add(row)
    db.commit()

    return RazorpayOrderCreateResponse(
        order_id=oid,
        amount=int(order.get("amount", payload.amount_paise)),
        currency=str(order.get("currency", currency)),
        key_id=key_id,
    )


@router.post("/razorpay/verify", response_model=RazorpayVerifyResponse)
def verify_razorpay_payment(
    payload: RazorpayVerifyRequest,
    db: Session = Depends(get_db_session),
    current_user: User = Depends(require_roles(UserRole.ADMIN, UserRole.MANAGER)),
) -> RazorpayVerifyResponse:
    """Verify Checkout signature after successful payment (always verify on the server)."""
    row = (
        db.query(Payment)
        .filter(
            Payment.razorpay_order_id == payload.razorpay_order_id,
            Payment.user_id == current_user.id,
        )
        .first()
    )
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Payment order not found.")

    if row.status == "paid":
        return RazorpayVerifyResponse(ok=True, message="Payment already recorded.")

    _, key_secret = _razorpay_keys()
    try:
        razorpay_http.verify_checkout_signature(
            payload.razorpay_order_id,
            payload.razorpay_payment_id,
            payload.razorpay_signature,
            key_secret,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Payment verification failed: {exc!s}",
        ) from exc

    row.razorpay_payment_id = payload.razorpay_payment_id
    row.status = "paid"
    db.add(row)
    db.commit()

    return RazorpayVerifyResponse(ok=True, message="Payment verified successfully.")


def _payment_entity_from_webhook(data: dict[str, Any]) -> dict[str, Any] | None:
    try:
        ent = data["payload"]["payment"]["entity"]
        return ent if isinstance(ent, dict) else None
    except (KeyError, TypeError):
        return None


@router.post("/razorpay/webhook")
async def razorpay_webhook(request: Request, db: Session = Depends(get_db_session)) -> dict[str, str]:
    """
    Razorpay server-to-server notifications. Configure URL in Razorpay Dashboard → Webhooks.
    Uses X-Razorpay-Signature with your webhook secret.
    """
    body_bytes = await request.body()
    raw_body = body_bytes.decode("utf-8")
    signature = request.headers.get("X-Razorpay-Signature") or ""

    _razorpay_keys()  # ensure keys configured
    webhook_secret = _webhook_secret()

    try:
        razorpay_http.verify_webhook_body_signature(raw_body, signature, webhook_secret)
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid webhook signature")

    try:
        data = json.loads(raw_body)
    except json.JSONDecodeError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JSON")

    event = data.get("event")
    payment_entity = _payment_entity_from_webhook(data)

    if payment_entity:
        order_id = payment_entity.get("order_id")
        pay_id = payment_entity.get("id")
        amount = payment_entity.get("amount")
        cur = (payment_entity.get("currency") or "INR")[:3].upper()

        if order_id:
            row = db.query(Payment).filter(Payment.razorpay_order_id == order_id).first()
            if row:
                if pay_id:
                    row.razorpay_payment_id = str(pay_id)
                if isinstance(amount, int):
                    row.amount_paise = amount
                row.currency = cur
                if event == "payment.captured":
                    row.status = "paid"
                elif event == "payment.failed":
                    row.status = "failed"
                db.add(row)
                db.commit()

    return {"status": "ok"}
