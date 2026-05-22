export type JobDepartment = "engineering" | "design" | "product";
export type JobWorkMode = "remote" | "hybrid" | "onsite";
export type JobLevel = "mid" | "senior" | "lead";

export type JobOpening = {
  id: string;
  title: string;
  department: JobDepartment;
  level: JobLevel;
  workMode: JobWorkMode;
  employmentType: string;
  experience: string;
  skills: string[];
  salaryRange: string;
  description: string;
  featured?: boolean;
};

export const JOB_DEPARTMENTS: { id: JobDepartment | "all"; label: string }[] = [
  { id: "all", label: "All teams" },
  { id: "engineering", label: "Engineering" },
  { id: "design", label: "Design" },
  { id: "product", label: "Product" },
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: "senior-react",
    title: "Senior React.js Developer",
    department: "engineering",
    level: "senior",
    workMode: "remote",
    employmentType: "Full-time",
    experience: "5+ years",
    skills: ["React", "TypeScript", "Next.js", "Performance"],
    salaryRange: "₹12–18 LPA",
    description: "Own client-facing product UIs end-to-end — architecture, reviews, and shipping.",
    featured: true,
  },
  {
    id: "frontend-architect",
    title: "Frontend Architect",
    department: "engineering",
    level: "lead",
    workMode: "hybrid",
    employmentType: "Full-time",
    experience: "8+ years",
    skills: ["System design", "Next.js", "DX", "Mentorship"],
    salaryRange: "₹18–28 LPA",
    description: "Shape frontend standards across Bitcraftly projects and mentor the team.",
    featured: true,
  },
  {
    id: "python-developer",
    title: "Python Developer",
    department: "engineering",
    level: "mid",
    workMode: "remote",
    employmentType: "Full-time",
    experience: "2–5 years",
    skills: ["Python", "FastAPI", "SQLAlchemy", "REST APIs"],
    salaryRange: "₹8–16 LPA",
    description:
      "Build and maintain backend APIs, integrations, and automation for client products — FastAPI, databases, and clean service design.",
    featured: true,
  },
  {
    id: "nextjs-dev",
    title: "Next.js Developer",
    department: "engineering",
    level: "mid",
    workMode: "remote",
    employmentType: "Full-time",
    experience: "2–4 years",
    skills: ["Next.js", "App Router", "API routes", "Tailwind"],
    salaryRange: "₹8–14 LPA",
    description: "Build fast marketing sites, dashboards, and SaaS shells for SMB clients.",
  },
  {
    id: "ui-engineer",
    title: "UI Engineer",
    department: "engineering",
    level: "mid",
    workMode: "remote",
    employmentType: "Full-time · Contract",
    experience: "3–5 years",
    skills: ["CSS", "Motion", "Accessibility", "Design systems"],
    salaryRange: "₹9–15 LPA",
    description: "Bridge design and code — pixel-perfect, accessible, animated interfaces.",
  },
  {
    id: "ai-prompt-engineer",
    title: "AI Prompt Engineer",
    department: "product",
    level: "mid",
    workMode: "remote",
    employmentType: "Full-time",
    experience: "2–4 years",
    skills: ["Prompt design", "LLMs", "RAG", "Evals & testing"],
    salaryRange: "₹10–18 LPA",
    description:
      "Design, test, and refine prompts and AI workflows for client copilots, chatbots, and automation — strong writing plus structured experimentation.",
    featured: true,
  },
  {
    id: "ai-frontend",
    title: "AI Frontend Engineer",
    department: "product",
    level: "senior",
    workMode: "remote",
    employmentType: "Full-time",
    experience: "4+ years",
    skills: ["React", "LLM APIs", "Streaming UI", "Python basics"],
    salaryRange: "₹14–22 LPA",
    description: "Ship AI-powered web experiences — chat UIs, copilots, and automation dashboards.",
    featured: true,
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    department: "design",
    level: "mid",
    workMode: "hybrid",
    employmentType: "Full-time",
    experience: "3–6 years",
    skills: ["Figma", "Design systems", "Prototyping", "User research"],
    salaryRange: "₹7–12 LPA",
    description: "Lead discovery → delivery for client products with a founder-led review loop.",
  },
];

export function jobApplyHref(job: JobOpening): string {
  return `/careers/apply?role=${encodeURIComponent(job.title)}`;
}
