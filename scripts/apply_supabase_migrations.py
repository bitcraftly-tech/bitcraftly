"""
Apply Supabase SQL migrations using a direct Postgres connection (server-only).

Requires SUPABASE_DB_URL in environment (.env.local loaded by caller).
Never prints connection strings or secrets.

Usage (from repo root):
  python scripts/apply_supabase_migrations.py [--files supabase/migrations/0001_foundation.sql,...]
"""
from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]


def load_env_local() -> None:
    env_path = ROOT / ".env.local"
    if not env_path.exists():
        return
    for line in env_path.read_text(encoding="utf-8").splitlines():
        trimmed = line.strip()
        if not trimmed or trimmed.startswith("#") or "=" not in trimmed:
            continue
        key, value = trimmed.split("=", 1)
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key, value)


def mask_db_host(url: str) -> str:
    try:
        parsed = urlparse(url)
        host = parsed.hostname or "unknown-host"
        return host
    except Exception:
        return "invalid-url"


def split_sql_statements(sql: str) -> list[str]:
    """Split on semicolons outside dollar-quoted blocks."""
    statements: list[str] = []
    current: list[str] = []
    in_dollar = False
    dollar_tag = ""

    for line in sql.splitlines():
        if not in_dollar:
            match = re.search(r"\$(\w*)\$", line)
            if match:
                in_dollar = True
                dollar_tag = match.group(0)
        elif dollar_tag and dollar_tag in line:
            in_dollar = False
            dollar_tag = ""

        current.append(line)
        if not in_dollar and line.rstrip().endswith(";"):
            stmt = "\n".join(current).strip()
            if stmt:
                statements.append(stmt)
            current = []

    tail = "\n".join(current).strip()
    if tail:
        statements.append(tail)
    return statements


def verify_project_host(url: str) -> None:
    host = mask_db_host(url)
    if "supabase" not in host:
        raise RuntimeError(f"Refusing to apply migrations: database host does not look like Supabase ({host}).")


def inspect_existing_users_table(cur) -> None:
    cur.execute(
        """
        SELECT column_name, data_type
        FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'users'
        ORDER BY ordinal_position
        """
    )
    cols = cur.fetchall()
    if not cols:
        return

    expected = {
        "id": "uuid",
        "legacy_id": "bigint",
        "email": "text",
        "name": "text",
        "role": "text",
        "is_active": "boolean",
        "auth_provider": "text",
        "legacy_created_at": "timestamp with time zone",
        "created_at": "timestamp with time zone",
        "updated_at": "timestamp with time zone",
    }
    found = {name: dtype for name, dtype in cols}
    for key, dtype in expected.items():
        if key not in found:
            raise RuntimeError(f"Incompatible existing public.users: missing column {key}")
        if found[key] != dtype:
            raise RuntimeError(
                f"Incompatible existing public.users: column {key} is {found[key]}, expected {dtype}"
            )

    cur.execute("SELECT COUNT(*) FROM public.users")
    (count,) = cur.fetchone()
    if count and count > 0:
        raise RuntimeError("Refusing to apply migration: public.users already contains rows.")


def verify_post_apply(cur) -> dict[str, object]:
    cur.execute("SELECT COUNT(*) FROM public.users")
    (row_count,) = cur.fetchone()

    cur.execute(
        """
        SELECT relrowsecurity
        FROM pg_class
        WHERE relname = 'users' AND relnamespace = 'public'::regnamespace
        """
    )
    rls = cur.fetchone()
    rls_enabled = bool(rls and rls[0])

    cur.execute(
        """
        SELECT COUNT(*)
        FROM pg_policies
        WHERE schemaname = 'public' AND tablename = 'users'
        """
    )
    (policy_count,) = cur.fetchone()

    cur.execute(
        """
        SELECT COUNT(*)
        FROM pg_constraint
        WHERE conrelid = 'public.users'::regclass AND conname = 'users_role_check'
        """
    )
    (role_constraint,) = cur.fetchone()

    cur.execute(
        """
        SELECT COUNT(*)
        FROM pg_indexes
        WHERE schemaname = 'public' AND tablename = 'users' AND indexname = 'users_email_key'
        """
    )
    (email_unique,) = cur.fetchone()

    cur.execute(
        """
        SELECT COUNT(*)
        FROM pg_indexes
        WHERE schemaname = 'public' AND tablename = 'users' AND indexname = 'users_legacy_id_key'
        """
    )
    (legacy_unique,) = cur.fetchone()

    cur.execute(
        """
        SELECT COUNT(*)
        FROM pg_trigger
        WHERE tgname = 'users_set_updated_at'
        """
    )
    (trigger_count,) = cur.fetchone()

    return {
        "row_count": row_count,
        "rls_enabled": rls_enabled,
        "policy_count": policy_count,
        "role_constraint": bool(role_constraint),
        "email_unique": bool(email_unique),
        "legacy_id_unique": bool(legacy_unique),
        "updated_at_trigger": bool(trigger_count),
    }


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--files",
        default="supabase/migrations/0001_foundation.sql,supabase/migrations/0002_users.sql",
        help="Comma-separated migration files relative to repo root",
    )
    args = parser.parse_args()

    load_env_local()
    db_url = (os.environ.get("SUPABASE_DB_URL") or os.environ.get("DATABASE_URL") or "").strip()
    if not db_url:
        print("FAIL — SUPABASE_DB_URL is not configured.", file=sys.stderr)
        return 1

    verify_project_host(db_url)

    try:
        import psycopg
    except ImportError:
        print("FAIL — psycopg is required (install backend/requirements.txt).", file=sys.stderr)
        return 1

    files = [ROOT / part.strip() for part in args.files.split(",") if part.strip()]
    for file_path in files:
        if not file_path.exists():
            print(f"FAIL — migration file not found: {file_path.name}", file=sys.stderr)
            return 1

    host = mask_db_host(db_url)
    print(f"Applying migrations to Supabase host: {host}")

    with psycopg.connect(db_url) as conn:
        with conn.cursor() as cur:
            inspect_existing_users_table(cur)
            for file_path in files:
                sql = file_path.read_text(encoding="utf-8")
                for statement in split_sql_statements(sql):
                    cur.execute(statement)
            conn.commit()
            verification = verify_post_apply(cur)

    print("PASS — migrations applied.")
    print(
        {
            "host": host,
            "files": [f.name for f in files],
            "verification": verification,
        }
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
