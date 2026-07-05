"""
Read-only inspection of Render/local FastAPI users table.
Never prints password hashes, tokens, or secrets.

Usage (from repo root):
  python scripts/inspect_render_users.py
"""
from __future__ import annotations

import json
import os
import sys
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BACKEND = ROOT / "backend"
sys.path.insert(0, str(BACKEND))

os.chdir(BACKEND)

from app.models.user import User  # noqa: E402
from app.db.session import SessionLocal  # noqa: E402

CANONICAL_ROLES = {"admin", "manager", "staff", "user"}


def normalize_email(email: str | None) -> str:
    return (email or "").strip().lower()


def infer_auth_provider(user: User) -> str:
    """Heuristic only — Google users have random placeholder password hashes."""
    return "unknown"


def main() -> int:
    db = SessionLocal()
    try:
        rows = db.query(User).order_by(User.id.asc()).all()
    finally:
        db.close()

    role_counts: Counter[str] = Counter()
    active = 0
    inactive = 0
    missing_names = 0
    invalid_emails: list[int] = []
    unsupported_roles: list[dict[str, object]] = []
    email_map: dict[str, list[int]] = {}
    manifest_entries: list[dict[str, object]] = []
    migration_ready = 0

    for user in rows:
        email_norm = normalize_email(user.email)
        role_value = str(getattr(user.role, "value", user.role)).lower()
        role_counts[role_value] += 1

        if user.is_active:
            active += 1
        else:
            inactive += 1

        if not (user.name or "").strip():
            missing_names += 1

        if not email_norm or "@" not in email_norm:
            invalid_emails.append(user.id)

        canonical_role = role_value if role_value in CANONICAL_ROLES else "user"
        if role_value not in CANONICAL_ROLES:
            unsupported_roles.append({"legacy_id": user.id, "role": role_value})

        email_map.setdefault(email_norm, []).append(user.id)

        if email_norm and "@" in email_norm:
            migration_ready += 1
            manifest_entries.append(
                {
                    "legacy_id": user.id,
                    "email": email_norm,
                    "name": (user.name or "").strip() or None,
                    "canonical_role": canonical_role,
                    "is_active": bool(user.is_active),
                    "auth_provider": infer_auth_provider(user),
                    "legacy_created_at": user.created_at.isoformat() if user.created_at else None,
                }
            )

    duplicate_emails = [
        {"email": email, "legacy_ids": ids}
        for email, ids in email_map.items()
        if email and len(ids) > 1
    ]

    payload = {
        "total_source_users": len(rows),
        "active_users": active,
        "inactive_users": inactive,
        "role_counts": dict(role_counts),
        "auth_provider_counts": {"unknown": len(rows)},
        "duplicate_emails": duplicate_emails,
        "invalid_emails": invalid_emails,
        "unsupported_roles": unsupported_roles,
        "missing_names": missing_names,
        "migration_ready_count": migration_ready,
        "manifest": manifest_entries,
    }

    print(json.dumps(payload, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
