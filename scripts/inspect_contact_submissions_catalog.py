"""Read-only catalog inspection for public.contact_submissions — no secrets printed."""
from __future__ import annotations

import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ENV_LOCAL = ROOT / ".env.local"


def load_env_local() -> None:
    if not ENV_LOCAL.is_file():
        return
    for line in ENV_LOCAL.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue
        key, value = stripped.split("=", 1)
        value = value.strip().strip('"').strip("'")
        os.environ.setdefault(key.strip(), value)


def main() -> int:
    load_env_local()
    url = os.environ.get("SUPABASE_DB_URL", "").strip()
    if not url:
        print(json.dumps({"error": "SUPABASE_DB_URL_not_set"}))
        return 1

    import psycopg

    with psycopg.connect(url) as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT COUNT(*)
                FROM information_schema.tables
                WHERE table_schema = 'public' AND table_name = 'contact_submissions'
                """
            )
            table_exists = cur.fetchone()[0] == 1

            cur.execute(
                """
                SELECT relrowsecurity
                FROM pg_class
                WHERE relname = 'contact_submissions'
                  AND relnamespace = 'public'::regnamespace
                """
            )
            rls_row = cur.fetchone()
            rls_enabled = bool(rls_row and rls_row[0])

            cur.execute(
                """
                SELECT COUNT(*)
                FROM pg_policies
                WHERE schemaname = 'public' AND tablename = 'contact_submissions'
                """
            )
            policy_count = cur.fetchone()[0]

            if table_exists:
                cur.execute(
                    """
                    SELECT COUNT(*)
                    FROM pg_constraint
                    WHERE conrelid = 'public.contact_submissions'::regclass
                      AND conname = 'contact_submissions_stage_check'
                    """
                )
                stage_constraint = cur.fetchone()[0] == 1

                cur.execute(
                    """
                    SELECT COUNT(*)
                    FROM pg_indexes
                    WHERE schemaname = 'public' AND tablename = 'contact_submissions'
                    """
                )
                index_count = cur.fetchone()[0]

                cur.execute("SELECT COUNT(*) FROM public.contact_submissions")
                row_count = cur.fetchone()[0]
            else:
                stage_constraint = False
                index_count = 0
                row_count = 0

            cur.execute("SELECT COUNT(*) FROM public.users")
            users_count = cur.fetchone()[0]

    print(
        json.dumps(
            {
                "table_exists": table_exists,
                "rls_enabled": rls_enabled,
                "policy_count": policy_count,
                "stage_constraint": stage_constraint,
                "index_count": index_count,
                "row_count": row_count,
                "users_count": users_count,
            }
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
