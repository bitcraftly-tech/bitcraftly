/** Careers ATS — application copy, steps, and API config */

export { ATS_PIPELINE_STAGES as ATS_STAGES } from "@/lib/ats/stages";

export const CAREER_APPLY_STEPS = [
  { id: "profile", title: "Your details", hint: "Name, email, phone, and location" },
  { id: "links", title: "Work & resume", hint: "Resume upload and profile links" },
  { id: "experience", title: "Experience", hint: "Years, compensation, and notice period" },
  { id: "story", title: "Your story", hint: "Why Bitcraftly and project highlights" },
  { id: "review", title: "Review", hint: "Confirm before you submit" },
] as const;

export type CareerApplyStepId = (typeof CAREER_APPLY_STEPS)[number]["id"];

/** Fallback when API is unavailable — prefer roles from GET /api/careers/roles */
export const CAREER_ROLES_FALLBACK = [
  "Senior React.js Developer",
  "Frontend Architect",
  "Next.js Developer",
  "Python Developer",
  "UI Engineer",
  "AI Frontend Engineer",
  "AI Prompt Engineer",
  "UI/UX Designer",
  "General application — open role",
] as const;

export const EXPERIENCE_OPTIONS = ["0–1 years", "1–3 years", "3–5 years", "5–8 years", "8+ years"] as const;

export const NOTICE_OPTIONS = [
  "Immediate",
  "15 days",
  "30 days",
  "60 days",
  "90+ days",
  "Not employed / flexible",
] as const;

export type CareerApplicationForm = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  roleApplied: string;
  experienceYears: string;
  currentRole: string;
  currentCtc: string;
  noticePeriod: string;
  expectedCtc: string;
  skills: string;
  portfolioUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  behanceUrl: string;
  whyJoin: string;
  projectLinks: string;
  coverLetter: string;
  resumeFile: File | null;
};

export const INITIAL_CAREER_APPLICATION: CareerApplicationForm = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  roleApplied: CAREER_ROLES_FALLBACK[CAREER_ROLES_FALLBACK.length - 1],
  experienceYears: EXPERIENCE_OPTIONS[1],
  currentRole: "",
  currentCtc: "",
  noticePeriod: NOTICE_OPTIONS[2],
  expectedCtc: "",
  skills: "",
  portfolioUrl: "",
  githubUrl: "",
  linkedinUrl: "",
  behanceUrl: "",
  whyJoin: "",
  projectLinks: "",
  coverLetter: "",
  resumeFile: null,
};

export const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
