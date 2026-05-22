"""add ai prompt engineer job role

Revision ID: d1e2f3a4b5c6
Revises: c0d1e2f3a4b5
Create Date: 2026-05-22 17:00:00.000000
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "d1e2f3a4b5c6"
down_revision: Union[str, None] = "c0d1e2f3a4b5"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    conn = op.get_bind()
    exists = conn.execute(
        sa.text("SELECT 1 FROM job_roles WHERE slug = :slug"),
        {"slug": "ai-prompt-engineer"},
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
                'ai-prompt-engineer', 'AI Prompt Engineer', 'product', 'mid', 'remote', 'Full-time',
                '2–4 years', '["Prompt design", "LLMs", "RAG", "Evals & testing"]', '₹10–18 LPA',
                'Design, test, and refine prompts and AI workflows for client copilots, chatbots, and automation — strong writing plus structured experimentation.',
                1, 1, 55
            )
            """
        )
    )


def downgrade() -> None:
    op.execute(sa.text("DELETE FROM job_roles WHERE slug = 'ai-prompt-engineer'"))
