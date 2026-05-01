"""add user role column

Revision ID: f9c2a0d4b1e7
Revises: a1c9f4b2de31
Create Date: 2026-04-27 16:20:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "f9c2a0d4b1e7"
down_revision: Union[str, None] = "a1c9f4b2de31"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


user_role_enum = sa.Enum("admin", "manager", "user", name="userrole")


def upgrade() -> None:
    op.add_column("users", sa.Column("role", user_role_enum, nullable=False, server_default="user"))


def downgrade() -> None:
    op.drop_column("users", "role")
