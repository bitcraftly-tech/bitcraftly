"""Razorpay REST API + signature checks without the official SDK (avoids pkg_resources / Python edge versions)."""

from __future__ import annotations

import base64
import hashlib
import hmac
import json
from typing import Any

import requests

RAZORPAY_API_BASE = "https://api.razorpay.com"


def _basic_auth_header(key_id: str, key_secret: str) -> str:
    raw = f"{key_id}:{key_secret}".encode("utf-8")
    return "Basic " + base64.b64encode(raw).decode("ascii")


def create_order(
    key_id: str,
    key_secret: str,
    *,
    amount_paise: int,
    currency: str,
    receipt: str,
    notes: dict[str, str],
    timeout_seconds: float = 30,
) -> dict[str, Any]:
    payload = {
        "amount": amount_paise,
        "currency": currency.upper(),
        "receipt": receipt[:40],
        "notes": notes,
    }
    r = requests.post(
        f"{RAZORPAY_API_BASE}/v1/orders",
        data=json.dumps(payload),
        headers={
            "Authorization": _basic_auth_header(key_id, key_secret),
            "Content-Type": "application/json",
        },
        timeout=timeout_seconds,
    )
    if not r.ok:
        try:
            err = r.json()
            detail = err.get("error", {}).get("description") or r.text
        except json.JSONDecodeError:
            detail = r.text or str(r.status_code)
        raise RuntimeError(f"Razorpay HTTP {r.status_code}: {detail}")
    return r.json()


def verify_checkout_signature(order_id: str, payment_id: str, signature: str, key_secret: str) -> None:
    msg = f"{order_id}|{payment_id}".encode("utf-8")
    expected = hmac.new(key_secret.encode("utf-8"), msg, hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, signature):
        raise ValueError("Invalid payment signature")


def verify_webhook_body_signature(raw_body: str, signature: str, webhook_secret: str) -> None:
    expected = hmac.new(webhook_secret.encode("utf-8"), raw_body.encode("utf-8"), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected, signature):
        raise ValueError("Invalid webhook signature")
