"""add parking report flow tables

Revision ID: e1a2c3d4f5a6
Revises: b7a8d2f1c4e9
Create Date: 2026-05-01 23:36:00.000000
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "e1a2c3d4f5a6"
down_revision: Union[str, None] = "b7a8d2f1c4e9"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("qr_contacts", sa.Column("owner_name", sa.String(length=120), nullable=True))
    op.add_column("qr_contacts", sa.Column("vehicle_number", sa.String(length=32), nullable=True))
    op.add_column("qr_contacts", sa.Column("default_issue", sa.String(length=160), nullable=True))
    op.create_index(op.f("ix_qr_contacts_vehicle_number"), "qr_contacts", ["vehicle_number"], unique=False)

    op.create_table(
        "parking_reports",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("tenant_id", sa.Integer(), nullable=False),
        sa.Column("qr_contact_id", sa.Integer(), nullable=False),
        sa.Column("issue_type", sa.String(length=120), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="open"),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("reporter_phone", sa.String(length=24), nullable=True),
        sa.Column("resolved_by_user_id", sa.Integer(), nullable=True),
        sa.Column("resolved_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("CURRENT_TIMESTAMP"), nullable=False),
        sa.ForeignKeyConstraint(["qr_contact_id"], ["qr_contacts.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_parking_reports_id"), "parking_reports", ["id"], unique=False)
    op.create_index(op.f("ix_parking_reports_tenant_id"), "parking_reports", ["tenant_id"], unique=False)
    op.create_index(op.f("ix_parking_reports_qr_contact_id"), "parking_reports", ["qr_contact_id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_parking_reports_qr_contact_id"), table_name="parking_reports")
    op.drop_index(op.f("ix_parking_reports_tenant_id"), table_name="parking_reports")
    op.drop_index(op.f("ix_parking_reports_id"), table_name="parking_reports")
    op.drop_table("parking_reports")

    op.drop_index(op.f("ix_qr_contacts_vehicle_number"), table_name="qr_contacts")
    op.drop_column("qr_contacts", "default_issue")
    op.drop_column("qr_contacts", "vehicle_number")
    op.drop_column("qr_contacts", "owner_name")
