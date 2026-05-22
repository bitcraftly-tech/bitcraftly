"""add job applications table

Revision ID: a8f1b2c3d4e5
Revises: c3d4e5f6a7b8
Create Date: 2026-05-22 12:00:00.000000
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "a8f1b2c3d4e5"
down_revision: Union[str, None] = "c3d4e5f6a7b8"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "job_applications",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("full_name", sa.String(length=120), nullable=False),
        sa.Column("email", sa.String(length=150), nullable=False),
        sa.Column("phone", sa.String(length=15), nullable=False),
        sa.Column("city", sa.String(length=100), nullable=True),
        sa.Column("role_applied", sa.String(length=120), nullable=False),
        sa.Column("experience_years", sa.String(length=30), nullable=True),
        sa.Column("current_role", sa.String(length=150), nullable=True),
        sa.Column("notice_period", sa.String(length=60), nullable=True),
        sa.Column("expected_ctc", sa.String(length=80), nullable=True),
        sa.Column("skills", sa.Text(), nullable=True),
        sa.Column("portfolio_url", sa.String(length=500), nullable=True),
        sa.Column("github_url", sa.String(length=500), nullable=True),
        sa.Column("linkedin_url", sa.String(length=500), nullable=True),
        sa.Column("behance_url", sa.String(length=500), nullable=True),
        sa.Column("cover_letter", sa.Text(), nullable=True),
        sa.Column("resume_filename", sa.String(length=255), nullable=False),
        sa.Column("resume_stored_name", sa.String(length=255), nullable=False),
        sa.Column("resume_mime", sa.String(length=120), nullable=True),
        sa.Column("resume_size_bytes", sa.Integer(), nullable=True),
        sa.Column("source", sa.String(length=80), nullable=True, server_default="careers-apply"),
        sa.Column("stage", sa.String(length=20), nullable=False, server_default="new"),
        sa.Column("assigned_to", sa.String(length=120), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("is_contacted", sa.Boolean(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("(CURRENT_TIMESTAMP)"), nullable=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_job_applications_id"), "job_applications", ["id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_job_applications_id"), table_name="job_applications")
    op.drop_table("job_applications")
