"""add python developer job role

Revision ID: c0d1e2f3a4b5
Revises: b9c2d3e4f5a6
Create Date: 2026-05-22 16:00:00.000000
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "c0d1e2f3a4b5"
down_revision: Union[str, None] = "b9c2d3e4f5a6"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    conn = op.get_bind()
    exists = conn.execute(
        sa.text("SELECT 1 FROM job_roles WHERE slug = :slug"),
        {"slug": "python-developer"},
    ).fetchone()
    if exists:
        return
    op.execute(
        sa.text(
            """
            INSERT INTO job_roles (
                slug, title, department, level, work_mode, employment_type,
                experience, skills, salary_range, description, featured, is_active, sort_order
            ) VALUES (
                'python-developer', 'Python Developer', 'engineering', 'mid', 'remote', 'Full-time',
                '2–5 years', '["Python", "FastAPI", "SQLAlchemy", "REST APIs"]', '₹8–16 LPA',
                'Build and maintain backend APIs, integrations, and automation for client products — FastAPI, databases, and clean service design.',
                1, 1, 35
            )
            """
        )
    )


def downgrade() -> None:
    op.execute(sa.text("DELETE FROM job_roles WHERE slug = 'python-developer'"))
