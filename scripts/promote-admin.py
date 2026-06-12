#!/usr/bin/env python3
"""Promote a production user to admin role (Render PostgreSQL).

Usage:
  $env:DATABASE_URL="postgresql://..."
  python scripts/promote-admin.py your@email.com
"""

from __future__ import annotations

import os
import sys

from sqlalchemy import create_engine, text


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python scripts/promote-admin.py user@example.com", file=sys.stderr)
        sys.exit(1)

    email = sys.argv[1].strip().lower()
    database_url = os.environ.get("DATABASE_URL", "").strip()
    if not database_url:
        print("Missing DATABASE_URL (Render PostgreSQL connection string).", file=sys.stderr)
        sys.exit(1)
    if database_url.startswith("sqlite"):
        print("DATABASE_URL points to SQLite — use production Postgres URL from Render.", file=sys.stderr)
        sys.exit(1)

    engine = create_engine(database_url)
    with engine.begin() as conn:
        result = conn.execute(
            text("UPDATE users SET role = 'admin' WHERE lower(email) = :email"),
            {"email": email},
        )
        if result.rowcount == 0:
            print(f"No user found for {email}. Sign up on production first.", file=sys.stderr)
            sys.exit(1)

    print(f"✓ {email} is now admin. Log out and log in again on bitcraftly.com.")


if __name__ == "__main__":
    main()
