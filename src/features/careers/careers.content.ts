import { ROUTES } from "@/constants/navigation";

export type CareerTeam = "engineering" | "design" | "product";
export type CareerLevel = "mid" | "senior" | "lead";

export interface CareerRole {
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
  readonly team: CareerTeam;
  readonly level: CareerLevel;
  readonly experience: string;
  readonly employment: string;
  readonly compensation: string;
  readonly location: string;
  readonly skills: readonly string[];
  readonly featured?: boolean;
  readonly badge?: "REMOTE" | "HYBRID";
}

export const CAREERS_APPLY_HREF = `${ROUTES.careers}/apply`;

export function getCareersApplyHref(roleSlug?: string | null): string {
  if (!roleSlug || roleSlug === "general") {
    return CAREERS_APPLY_HREF;
  }
  return `${CAREERS_APPLY_HREF}?role=${encodeURIComponent(roleSlug)}`;
}

export const CAREER_ROLES: readonly CareerRole[] = [
  {
    slug: "senior-react-developer",
    title: "Senior React.js Developer",
    summary:
      "Own client-facing product UIs end-to-end — architecture, reviews, and shipping.",
    team: "engineering",
    level: "senior",
    experience: "5+ years",
    employment: "Full-time",
    compensation: "₹12–18 LPA",
    location: "Remote-first · India",
    skills: ["React", "TypeScript", "Next.js", "Performance"],
    featured: true,
  },
  {
    slug: "frontend-architect",
    title: "Frontend Architect",
    summary:
      "Shape frontend standards across Bitcraftly projects and mentor the team.",
    team: "engineering",
    level: "lead",
    experience: "8+ years",
    employment: "Full-time",
    compensation: "₹18–28 LPA",
    location: "Remote-first · India",
    skills: ["System design", "Next.js", "DX", "Mentorship"],
    featured: true,
  },
  {
    slug: "python-developer",
    title: "Python Developer",
    summary:
      "Build and maintain backend APIs, integrations, and automation for client products — FastAPI, databases, and clean service design.",
    team: "engineering",
    level: "mid",
    experience: "2–5 years",
    employment: "Full-time",
    compensation: "₹8–16 LPA",
    location: "Remote-first · India",
    skills: ["Python", "FastAPI", "SQLAlchemy", "REST APIs"],
    featured: true,
  },
  {
    slug: "nextjs-developer",
    title: "Next.js Developer",
    summary:
      "Build fast marketing sites, dashboards, and SaaS shells for SMB clients.",
    team: "engineering",
    level: "mid",
    experience: "2–4 years",
    employment: "Full-time",
    compensation: "₹8–14 LPA",
    location: "Remote-first · India",
    skills: ["Next.js", "App Router", "API routes", "Tailwind"],
    badge: "REMOTE",
  },
  {
    slug: "ui-engineer",
    title: "UI Engineer",
    summary:
      "Bridge design and code — pixel-perfect, accessible, animated interfaces.",
    team: "engineering",
    level: "mid",
    experience: "3–5 years",
    employment: "Full-time · Contract",
    compensation: "₹9–15 LPA",
    location: "Remote-first · India",
    skills: ["CSS", "Motion", "Accessibility", "Design systems"],
    badge: "REMOTE",
  },
  {
    slug: "ai-prompt-engineer",
    title: "AI Prompt Engineer",
    summary:
      "Design, test, and refine prompts and AI workflows for client copilots, chatbots, and automation — strong writing plus structured experimentation.",
    team: "product",
    level: "mid",
    experience: "2–4 years",
    employment: "Full-time",
    compensation: "₹10–18 LPA",
    location: "Remote-first · India",
    skills: ["Prompt design", "LLMs", "RAG", "Evals & testing"],
    featured: true,
  },
  {
    slug: "ai-frontend-engineer",
    title: "AI Frontend Engineer",
    summary:
      "Ship AI-powered web experiences — chat UIs, copilots, and automation dashboards.",
    team: "engineering",
    level: "senior",
    experience: "4+ years",
    employment: "Full-time",
    compensation: "₹14–22 LPA",
    location: "Remote-first · India",
    skills: ["React", "LLM APIs", "Streaming UI", "Python basics"],
    featured: true,
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    summary:
      "Lead discovery → delivery for client products with a founder-led review loop.",
    team: "design",
    level: "mid",
    experience: "3–6 years",
    employment: "Full-time",
    compensation: "₹7–12 LPA",
    location: "Remote-first · India",
    skills: ["Figma", "Design systems", "Prototyping", "User research"],
    badge: "HYBRID",
    featured: true,
  },
] as const;

export function getCareerRoleBySlug(slug: string): CareerRole | undefined {
  return CAREER_ROLES.find((role) => role.slug === slug);
}

export const CAREER_PROCESS_STEPS = [
  {
    title: "Application Submission",
    body: "Multi-step form with resume, portfolio links, and role fit details.",
  },
  {
    title: "Portfolio & Resume Review",
    body: "Founder-led screening — we read every profile, not keyword bots.",
  },
  {
    title: "Intro Call",
    body: "30-minute culture and communication check — async-friendly, English-first.",
  },
  {
    title: "Technical Discussion",
    body: "Architecture, past projects, and how you ship under real client constraints.",
  },
  {
    title: "Paid Trial Task",
    body: "Small scoped task with clear brief — paid where the role needs it.",
    optional: true,
  },
  {
    title: "Final Offer",
    body: "Compensation, start date, and onboarding into Bitcraftly delivery rhythm.",
  },
] as const;

export const CAREER_CULTURE = [
  {
    title: "Founder-led hiring",
    body: "Sanjay reviews every application personally — no outsourced recruiting pipeline.",
  },
  {
    title: "Builder culture",
    body: "Small team, high ownership. You ship features clients use, not internal slide decks.",
  },
  {
    title: "Remote-first, NCR overlap",
    body: "Work from anywhere with sensible overlap for India delivery and client calls.",
  },
  {
    title: "Modern stack discipline",
    body: "Next.js, TypeScript, Python/FastAPI — we invest in craft and clear communication.",
  },
] as const;

export const CAREER_BENEFITS = [
  {
    title: "Flexible hours",
    body: "Async-first with focused sync windows when projects need it.",
  },
  {
    title: "Learning budget",
    body: "Courses, conferences, and tools that level up your craft.",
  },
  {
    title: "Real project ownership",
    body: "End-to-end delivery on SMB products — websites, apps, AI tooling.",
  },
  {
    title: "Transparent comp",
    body: "Clear salary bands per role — discussed early, no games.",
  },
  {
    title: "Paid trial tasks",
    body: "Respect your time — scoped paid evaluations when needed.",
  },
  {
    title: "Long runway",
    body: "Studio model with recurring client work, not hype-cycle churn.",
  },
] as const;
