import json

from sqlalchemy.orm import Session

from app.models.job_role import JobRole

DEFAULT_JOB_ROLES: list[dict] = [
    {
        "slug": "senior-react",
        "title": "Senior React.js Developer",
        "department": "engineering",
        "level": "senior",
        "work_mode": "remote",
        "employment_type": "Full-time",
        "experience": "5+ years",
        "skills": ["React", "TypeScript", "Next.js", "Performance"],
        "salary_range": "₹12–18 LPA",
        "description": "Own client-facing product UIs end-to-end — architecture, reviews, and shipping.",
        "featured": True,
        "sort_order": 10,
    },
    {
        "slug": "frontend-architect",
        "title": "Frontend Architect",
        "department": "engineering",
        "level": "lead",
        "work_mode": "hybrid",
        "employment_type": "Full-time",
        "experience": "8+ years",
        "skills": ["System design", "Next.js", "DX", "Mentorship"],
        "salary_range": "₹18–28 LPA",
        "description": "Shape frontend standards across Bitcraftly projects and mentor the team.",
        "featured": True,
        "sort_order": 20,
    },
    {
        "slug": "python-developer",
        "title": "Python Developer",
        "department": "engineering",
        "level": "mid",
        "work_mode": "remote",
        "employment_type": "Full-time",
        "experience": "2–5 years",
        "skills": ["Python", "FastAPI", "SQLAlchemy", "REST APIs"],
        "salary_range": "₹8–16 LPA",
        "description": "Build and maintain backend APIs, integrations, and automation for client products — FastAPI, databases, and clean service design.",
        "featured": True,
        "sort_order": 35,
    },
    {
        "slug": "nextjs-dev",
        "title": "Next.js Developer",
        "department": "engineering",
        "level": "mid",
        "work_mode": "remote",
        "employment_type": "Full-time",
        "experience": "2–4 years",
        "skills": ["Next.js", "App Router", "API routes", "Tailwind"],
        "salary_range": "₹8–14 LPA",
        "description": "Build fast marketing sites, dashboards, and SaaS shells for SMB clients.",
        "featured": False,
        "sort_order": 30,
    },
    {
        "slug": "ui-engineer",
        "title": "UI Engineer",
        "department": "engineering",
        "level": "mid",
        "work_mode": "remote",
        "employment_type": "Full-time · Contract",
        "experience": "3–5 years",
        "skills": ["CSS", "Motion", "Accessibility", "Design systems"],
        "salary_range": "₹9–15 LPA",
        "description": "Bridge design and code — pixel-perfect, accessible, animated interfaces.",
        "featured": False,
        "sort_order": 40,
    },
    {
        "slug": "ai-frontend",
        "title": "AI Frontend Engineer",
        "department": "product",
        "level": "senior",
        "work_mode": "remote",
        "employment_type": "Full-time",
        "experience": "4+ years",
        "skills": ["React", "LLM APIs", "Streaming UI", "Python basics"],
        "salary_range": "₹14–22 LPA",
        "description": "Ship AI-powered web experiences — chat UIs, copilots, and automation dashboards.",
        "featured": True,
        "sort_order": 50,
    },
    {
        "slug": "ai-prompt-engineer",
        "title": "AI Prompt Engineer",
        "department": "product",
        "level": "mid",
        "work_mode": "remote",
        "employment_type": "Full-time",
        "experience": "2–4 years",
        "skills": ["Prompt design", "LLMs", "RAG", "Evals & testing"],
        "salary_range": "₹10–18 LPA",
        "description": "Design, test, and refine prompts and AI workflows for client copilots, chatbots, and automation — strong writing plus structured experimentation.",
        "featured": True,
        "sort_order": 55,
    },
    {
        "slug": "ui-ux-designer",
        "title": "UI/UX Designer",
        "department": "design",
        "level": "mid",
        "work_mode": "hybrid",
        "employment_type": "Full-time",
        "experience": "3–6 years",
        "skills": ["Figma", "Design systems", "Prototyping", "User research"],
        "salary_range": "₹7–12 LPA",
        "description": "Lead discovery → delivery for client products with a founder-led review loop.",
        "featured": False,
        "sort_order": 60,
    },
]


def _role_from_item(item: dict) -> JobRole:
    return JobRole(
        slug=item["slug"],
        title=item["title"],
        department=item["department"],
        level=item["level"],
        work_mode=item["work_mode"],
        employment_type=item["employment_type"],
        experience=item["experience"],
        skills=json.dumps(item["skills"]),
        salary_range=item["salary_range"],
        description=item["description"],
        featured=item["featured"],
        is_active=True,
        sort_order=item["sort_order"],
    )


def ensure_job_roles_seed(db: Session) -> int:
    """Seed default roles: full insert if empty, otherwise add any missing slugs."""
    created = 0
    if db.query(JobRole).count() == 0:
        for item in DEFAULT_JOB_ROLES:
            db.add(_role_from_item(item))
            created += 1
        db.commit()
        return created

    for item in DEFAULT_JOB_ROLES:
        if db.query(JobRole).filter(JobRole.slug == item["slug"]).first():
            continue
        db.add(_role_from_item(item))
        created += 1
    if created:
        db.commit()
    return created
