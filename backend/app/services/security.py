import base64
import hashlib
import hmac
import json
import secrets
import time
from typing import Any


def hash_password(password: str) -> str:
    salt = secrets.token_hex(16)
    dk = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt.encode("utf-8"), 100_000)
    return f"pbkdf2_sha256$100000${salt}${dk.hex()}"


def verify_password(password: str, password_hash: str) -> bool:
    try:
        algorithm, iterations, salt, stored_hash = password_hash.split("$", 3)
        if algorithm != "pbkdf2_sha256":
            return False
        dk = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            salt.encode("utf-8"),
            int(iterations),
        )
        return hmac.compare_digest(dk.hex(), stored_hash)
    except Exception:
        return False


def _b64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("utf-8")


def _b64url_decode(data: str) -> bytes:
    padding = "=" * (-len(data) % 4)
    return base64.urlsafe_b64decode(f"{data}{padding}")


def create_access_token(payload: dict[str, Any], secret: str, expires_in_seconds: int = 60 * 60 * 24) -> str:
    header = {"alg": "HS256", "typ": "JWT"}
    now = int(time.time())
    full_payload = {**payload, "iat": now, "exp": now + expires_in_seconds}

    header_segment = _b64url_encode(json.dumps(header, separators=(",", ":")).encode("utf-8"))
    payload_segment = _b64url_encode(json.dumps(full_payload, separators=(",", ":")).encode("utf-8"))
    signing_input = f"{header_segment}.{payload_segment}".encode("utf-8")
    signature = hmac.new(secret.encode("utf-8"), signing_input, hashlib.sha256).digest()
    signature_segment = _b64url_encode(signature)
    return f"{header_segment}.{payload_segment}.{signature_segment}"


def verify_access_token(token: str, secret: str) -> dict[str, Any] | None:
    try:
        parts = token.split(".")
        if len(parts) != 3:
            return None
        header_segment, payload_segment, signature_segment = parts
        signing_input = f"{header_segment}.{payload_segment}".encode("utf-8")
        expected_signature = hmac.new(secret.encode("utf-8"), signing_input, hashlib.sha256).digest()
        provided_signature = _b64url_decode(signature_segment)
        if not hmac.compare_digest(provided_signature, expected_signature):
            return None

        payload_bytes = _b64url_decode(payload_segment)
        payload = json.loads(payload_bytes.decode("utf-8"))
        exp = int(payload.get("exp", 0))
        if exp <= int(time.time()):
            return None
        return payload
    except Exception:
        return None
