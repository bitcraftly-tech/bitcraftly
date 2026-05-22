"""add job_roles table

Revision ID: b9c2d3e4f5a6
Revises: a8f1b2c3d4e5
Create Date: 2026-05-22 14:00:00.000000
"""

import json
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "b9c2d3e4f5a6"
down_revision: Union[str, None] = "a8f1b2c3d4e5"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

SEED = [
    ("senior-react", "Senior React.js Developer", "engineering", "senior", "remote", "Full-time", "5+ years",
     '["React", "TypeScript", "Next.js", "Performance"]', "₹12–18 LPA",
     "Own client-facing product UIs end-to-end — architecture, reviews, and shipping.", 1, 1, 10),
    ("frontend-architect", "Frontend Architect", "engineering", "lead", "hybrid", "Full-time", "8+ years",
     '["System design", "Next.js", "DX", "Mentorship"]', "₹18–28 LPA",
     "Shape frontend standards across Bitcraftly projects and mentor the team.", 1, 1, 20),
    ("nextjs-dev", "Next.js Developer", "engineering", "mid", "remote", "Full-time", "2–4 years",
     '["Next.js", "App Router", "API routes", "Tailwind"]', "₹8–14 LPA",
     "Build fast marketing sites, dashboards, and SaaS shells for SMB clients.", 0, 1, 30),
    ("ui-engineer", "UI Engineer", "engineering", "mid", "remote", "Full-time · Contract", "3–5 years",
     '["CSS", "Motion", "Accessibility", "Design systems"]', "₹9–15 LPA",
     "Bridge design and code — pixel-perfect, accessible, animated interfaces.", 0, 1, 40),
    ("ai-frontend", "AI Frontend Engineer", "product", "senior", "remote", "Full-time", "4+ years",
     '["React", "LLM APIs", "Streaming UI", "Python basics"]', "₹14–22 LPA",
     "Ship AI-powered web experiences — chat UIs, copilots, and automation dashboards.", 1, 1, 50),
    ("ui-ux-designer", "UI/UX Designer", "design", "mid", "hybrid", "Full-time", "3–6 years",
     '["Figma", "Design systems", "Prototyping", "User research"]', "₹7–12 LPA",
     "Lead discovery → delivery for client products with a founder-led review loop.", 0, 1, 60),
]


def upgrade() -> None:
    op.create_table(
        "job_roles",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("slug", sa.String(length=80), nullable=False),
        sa.Column("title", sa.String(length=120), nullable=False),
        sa.Column("department", sa.String(length=40), nullable=False, server_default="engineering"),
        sa.Column("level", sa.String(length=20), nullable=False, server_default="mid"),
        sa.Column("work_mode", sa.String(length=20), nullable=False, server_default="remote"),
        sa.Column("employment_type", sa.String(length=80), nullable=False, server_default="Full-time"),
        sa.Column("experience", sa.String(length=60), nullable=False),
        sa.Column("skills", sa.Text(), nullable=False, server_default="[]"),
        sa.Column("salary_range", sa.String(length=80), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("featured", sa.Boolean(), nullable=False, server_default="0"),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default="1"),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("(CURRENT_TIMESTAMP)"), nullable=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_job_roles_id"), "job_roles", ["id"], unique=False)
    op.create_index(op.f("ix_job_roles_slug"), "job_roles", ["slug"], unique=True)
    op.create_index(op.f("ix_job_roles_is_active"), "job_roles", ["is_active"], unique=False)

    roles = sa.table(
        "job_roles",
        sa.column("slug", sa.String),
        sa.column("title", sa.String),
        sa.column("department", sa.String),
        sa.column("level", sa.String),
        sa.column("work_mode", sa.String),
        sa.column("employment_type", sa.String),
        sa.column("experience", sa.String),
        sa.column("skills", sa.Text),
        sa.column("salary_range", sa.String),
        sa.column("description", sa.Text),
        sa.column("featured", sa.Boolean),
        sa.column("is_active", sa.Boolean),
        sa.column("sort_order", sa.Integer),
    )
    op.bulk_insert(
        roles,
        [
            {
                "slug": s[0],
                "title": s[1],
                "department": s[2],
                "level": s[3],
                "work_mode": s[4],
                "employment_type": s[5],
                "experience": s[6],
                "skills": s[7],
                "salary_range": s[8],
                "description": s[9],
                "featured": bool(s[10]),
                "is_active": bool(s[11]),
                "sort_order": s[12],
            }
            for s in SEED
        ],
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_job_roles_is_active"), table_name="job_roles")
    op.drop_index(op.f("ix_job_roles_slug"), table_name="job_roles")
    op.drop_index(op.f("ix_job_roles_id"), table_name="job_roles")
    op.drop_table("job_roles")
