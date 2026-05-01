"""add contact pipeline fields

Revision ID: b7a8d2f1c4e9
Revises: f9c2a0d4b1e7
Create Date: 2026-05-01 19:22:00.000000
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "b7a8d2f1c4e9"
down_revision: Union[str, None] = "f9c2a0d4b1e7"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "contact_submissions",
        sa.Column("stage", sa.String(length=20), nullable=False, server_default="new"),
    )
    op.add_column(
        "contact_submissions",
        sa.Column("assigned_to", sa.String(length=120), nullable=True),
    )


def downgrade() -> None:
    op.drop_column("contact_submissions", "assigned_to")
    op.drop_column("contact_submissions", "stage")
