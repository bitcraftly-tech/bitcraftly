"""add business phone to tenants

Revision ID: a1c9f4b2de31
Revises: 691080110d45
Create Date: 2026-04-27 15:29:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "a1c9f4b2de31"
down_revision: Union[str, None] = "691080110d45"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("tenants", sa.Column("business_phone", sa.String(length=32), nullable=True))


def downgrade() -> None:
    op.drop_column("tenants", "business_phone")
