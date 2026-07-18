"""ensure contact_submissions table and pipeline columns

Revision ID: f2a8c1d9e0b3
Revises: d1e2f3a4b5c6
Create Date: 2026-07-18 20:50:00.000000
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "f2a8c1d9e0b3"
down_revision: Union[str, None] = "d1e2f3a4b5c6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    tables = set(inspector.get_table_names())

    if "contact_submissions" not in tables:
        op.create_table(
            "contact_submissions",
            sa.Column("id", sa.Integer(), nullable=False),
            sa.Column("name", sa.String(length=100), nullable=False),
            sa.Column("business_name", sa.String(length=150), nullable=False),
            sa.Column("business_type", sa.String(length=50), nullable=False),
            sa.Column("phone", sa.String(length=15), nullable=False),
            sa.Column("email", sa.String(length=150), nullable=True),
            sa.Column("message", sa.Text(), nullable=True),
            sa.Column("source", sa.String(length=50), nullable=True),
            sa.Column("is_contacted", sa.Boolean(), nullable=False, server_default=sa.false()),
            sa.Column("stage", sa.String(length=20), nullable=False, server_default="new"),
            sa.Column("assigned_to", sa.String(length=120), nullable=True),
            sa.Column("notes", sa.Text(), nullable=True),
            sa.Column(
                "created_at",
                sa.DateTime(timezone=True),
                server_default=sa.text("now()"),
                nullable=True,
            ),
            sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
            sa.PrimaryKeyConstraint("id"),
        )
        op.create_index(op.f("ix_contact_submissions_id"), "contact_submissions", ["id"], unique=False)
        return

    existing = {col["name"] for col in inspector.get_columns("contact_submissions")}
    if "is_contacted" not in existing:
        op.add_column(
            "contact_submissions",
            sa.Column("is_contacted", sa.Boolean(), nullable=False, server_default=sa.false()),
        )
    if "stage" not in existing:
        op.add_column(
            "contact_submissions",
            sa.Column("stage", sa.String(length=20), nullable=False, server_default="new"),
        )
    if "assigned_to" not in existing:
        op.add_column(
            "contact_submissions",
            sa.Column("assigned_to", sa.String(length=120), nullable=True),
        )
    if "notes" not in existing:
        op.add_column("contact_submissions", sa.Column("notes", sa.Text(), nullable=True))
    if "email" not in existing:
        op.add_column("contact_submissions", sa.Column("email", sa.String(length=150), nullable=True))
    if "message" not in existing:
        op.add_column("contact_submissions", sa.Column("message", sa.Text(), nullable=True))
    if "source" not in existing:
        op.add_column("contact_submissions", sa.Column("source", sa.String(length=50), nullable=True))
    if "updated_at" not in existing:
        op.add_column(
            "contact_submissions",
            sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        )


def downgrade() -> None:
    # Non-destructive: leave the table in place.
    pass
