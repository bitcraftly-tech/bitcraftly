"""Read-only migration source verification — never prints secrets or password hashes."""
from __future__ import annotations

import json
import os
import sqlite3
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BACKEND = ROOT / "backend"
SQLITE_PATH = BACKEND / "bitcraftly.db"

CANONICAL_ROLES = {"admin", "manager", "staff", "user"}


def load_backend_env_keys() -> dict[str, str]:
    env_path = BACKEND / ".env"
    keys: dict[str, str] = {}
    if not env_path.is_file():
        return keys
    for line in env_path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue
        key, value = stripped.split("=", 1)
        keys[key.strip()] = value.strip().strip('"').strip("'")
    return keys


def classify_database_url(url: str) -> dict[str, object]:
    if not url:
        return {"configured": False, "scheme": None, "is_sqlite": False, "is_postgresql": False}
    scheme = url.split("://", 1)[0].lower()
    is_sqlite = url.startswith("sqlite")
    is_pg = scheme in {"postgresql", "postgresql+psycopg", "postgres"}
    return {
        "configured": True,
        "scheme": scheme,
        "is_sqlite": is_sqlite,
        "is_postgresql": is_pg,
    }


def read_sqlite_users() -> dict[str, object]:
    if not SQLITE_PATH.is_file():
        return {"reachable": False, "count": 0, "users": []}

    conn = sqlite3.connect(SQLITE_PATH)
    try:
        cur = conn.cursor()
        cur.execute(
            "SELECT id, email, name, role, is_active, created_at FROM users ORDER BY id ASC"
        )
        rows = cur.fetchall()
    finally:
        conn.close()

    users = []
    for legacy_id, email, name, role, is_active, created_at in rows:
        users.append(
            {
                "legacy_id": legacy_id,
                "email": (email or "").strip().lower(),
                "name": (name or "").strip() or None,
                "role": str(role or "").strip().lower(),
                "is_active": bool(is_active),
                "created_at": created_at,
            }
        )

    return {"reachable": True, "path": "backend/bitcraftly.db", "count": len(users), "users": users}


def sanitize_pg_message(message: str) -> str:
    if "@" in message and "://" in message:
        return message.split("@", 1)[0] + "@…"
    return message[:500]


def pg_error_code(exc: BaseException) -> str | None:
    orig = getattr(exc, "orig", None)
    if orig is not None:
        code = getattr(orig, "pgcode", None) or getattr(orig, "sqlstate", None)
        if code:
            return str(code)
    return None


def read_render_users(database_url: str) -> dict[str, object]:
    if not database_url or database_url.startswith("sqlite"):
        return {
            "reachable": False,
            "reason": "DATABASE_URL_not_postgresql",
            "count": None,
            "users": [],
        }

    try:
        from sqlalchemy import create_engine, text
    except ImportError:
        return {
            "reachable": False,
            "reason": "sqlalchemy_unavailable",
            "count": None,
            "users": [],
        }

    url = database_url
    if url.startswith("postgresql://"):
        url = "postgresql+psycopg://" + url.removeprefix("postgresql://")
    elif url.startswith("postgres://"):
        url = "postgresql+psycopg://" + url.removeprefix("postgres://")

    try:
        engine = create_engine(url, connect_args={"connect_timeout": 10})
        with engine.connect() as conn:
            db_info = conn.execute(text("SELECT current_database(), current_schema()")).one()
            current_database = str(db_info[0])
            current_schema = str(db_info[1])

            table_rows = conn.execute(
                text(
                    """
                    SELECT table_schema, table_name
                    FROM information_schema.tables
                    WHERE table_type = 'BASE TABLE'
                      AND table_schema NOT IN ('pg_catalog', 'information_schema')
                    ORDER BY table_schema, table_name
                    """
                )
            ).fetchall()

            users_tables = [
                {"schema": row[0], "name": row[1]}
                for row in table_rows
                if row[1] == "users"
            ]

            if not users_tables:
                return {
                    "reachable": False,
                    "reason": "users_table_not_found",
                    "exception_class": "ProgrammingError",
                    "pgcode": "42P01",
                    "message": "relation users does not exist",
                    "operation": "locate_users_table",
                    "current_database": current_database,
                    "current_schema": current_schema,
                    "expected_table": "public.users",
                    "available_tables": [
                        {"schema": row[0], "name": row[1]} for row in table_rows
                    ],
                    "count": None,
                    "users": [],
                }

            users_schema = str(users_tables[0]["schema"])
            column_rows = conn.execute(
                text(
                    """
                    SELECT column_name, data_type, udt_name
                    FROM information_schema.columns
                    WHERE table_schema = :schema AND table_name = 'users'
                    ORDER BY ordinal_position
                    """
                ),
                {"schema": users_schema},
            ).fetchall()
            users_columns = [
                {"name": row[0], "data_type": row[1], "udt_name": row[2]}
                for row in column_rows
            ]

            result = conn.execute(
                text(
                    f"SELECT id, email, name, role::text AS role, is_active, created_at "
                    f"FROM {users_schema}.users ORDER BY id ASC"
                )
            )
            rows = result.fetchall()
    except Exception as exc:
        return {
            "reachable": False,
            "reason": type(exc).__name__,
            "exception_class": type(exc).__name__,
            "pgcode": pg_error_code(exc),
            "message": sanitize_pg_message(str(exc)),
            "operation": "select_users",
            "expected_table": "public.users",
            "count": None,
            "users": [],
        }

    users = []
    for legacy_id, email, name, role, is_active, created_at in rows:
        created = created_at.isoformat() if hasattr(created_at, "isoformat") else str(created_at)
        users.append(
            {
                "legacy_id": legacy_id,
                "email": (email or "").strip().lower(),
                "name": (name or "").strip() or None,
                "role": str(role or "").strip().lower(),
                "is_active": bool(is_active),
                "created_at": created,
            }
        )

    return {
        "reachable": True,
        "current_database": current_database,
        "current_schema": current_schema,
        "users_table": f"{users_schema}.users",
        "users_columns": users_columns,
        "count": len(users),
        "users": users,
    }


def summarize_users(users: list[dict[str, object]]) -> dict[str, object]:
    emails: dict[str, list[int]] = {}
    legacy_ids: list[int] = []
    unsupported_roles: list[dict[str, object]] = []

    for user in users:
        legacy_id = int(user["legacy_id"])
        email = str(user["email"])
        role = str(user["role"])
        legacy_ids.append(legacy_id)
        emails.setdefault(email, []).append(legacy_id)
        if role not in CANONICAL_ROLES:
            unsupported_roles.append({"legacy_id": legacy_id, "role": role})

    duplicate_emails = [
        {"email": email, "legacy_ids": ids} for email, ids in emails.items() if len(ids) > 1
    ]
    duplicate_legacy_ids = [
        lid for lid in legacy_ids if legacy_ids.count(lid) > 1
    ]

    return {
        "duplicate_emails": duplicate_emails,
        "duplicate_legacy_ids": sorted(set(duplicate_legacy_ids)),
        "unsupported_roles": unsupported_roles,
    }


def main() -> int:
    env_keys = load_backend_env_keys()
    database_url = env_keys.get("DATABASE_URL", "")
    environment = env_keys.get("ENVIRONMENT", "development")

    sqlite = read_sqlite_users()
    render = read_render_users(database_url)

    sqlite_summary = summarize_users(sqlite["users"]) if sqlite["users"] else {}
    render_summary = summarize_users(render["users"]) if render.get("users") else {}

    looks_local_only = False
    local_indicators: list[str] = []
    if sqlite["count"]:
        for user in sqlite["users"]:
            email = str(user["email"])
            if email.endswith(".local") or email.endswith("@example.com"):
                local_indicators.append(email)

    if sqlite["count"] and render["reachable"] is False:
        looks_local_only = True

    payload = {
        "backend_environment": environment,
        "database_url_classification": classify_database_url(database_url),
        "resolved_backend_db": "sqlite" if classify_database_url(database_url)["is_sqlite"] or not database_url else "postgresql",
        "local_sqlite": {
            "count": sqlite["count"],
            "summary": sqlite_summary,
            "users": sqlite["users"],
        },
        "render_postgresql": {
            "reachable": render["reachable"],
            "reason_if_unreachable": render.get("reason"),
            "exception_class": render.get("exception_class"),
            "pgcode": render.get("pgcode"),
            "message": render.get("message"),
            "operation": render.get("operation"),
            "current_database": render.get("current_database"),
            "current_schema": render.get("current_schema"),
            "expected_table": render.get("expected_table"),
            "users_table": render.get("users_table"),
            "users_columns": render.get("users_columns"),
            "available_tables": render.get("available_tables"),
            "count": render.get("count"),
            "summary": render_summary,
            "users": render.get("users", []),
        },
        "source_assessment": {
            "sqlite_appears_local_dev_only": looks_local_only,
            "local_dev_email_indicators": local_indicators,
            "render_production_inspectable": render["reachable"],
            "can_verify_production_authoritative_source": render["reachable"],
        },
    }

    print(json.dumps(payload, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
