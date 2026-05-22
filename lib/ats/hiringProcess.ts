import type { LucideIcon } from "lucide-react";
import {
  ClipboardCheck,
  FileSearch,
  Handshake,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";

export type HiringStep = {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  optional?: boolean;
};

export const HIRING_PROCESS_STEPS: HiringStep[] = [
  {
    id: "apply",
    step: 1,
    title: "Application Submission",
    description: "Multi-step form with resume, portfolio links, and role fit details.",
    icon: ClipboardCheck,
  },
  {
    id: "review",
    step: 2,
    title: "Portfolio & Resume Review",
    description: "Founder-led screening — we read every profile, not keyword bots.",
    icon: FileSearch,
  },
  {
    id: "intro",
    step: 3,
    title: "Intro Call",
    description: "30-minute culture and communication check — async-friendly, English-first.",
    icon: Phone,
  },
  {
    id: "technical",
    step: 4,
    title: "Technical Discussion",
    description: "Architecture, past projects, and how you ship under real client constraints.",
    icon: MessageCircle,
  },
  {
    id: "trial",
    step: 5,
    title: "Paid Trial Task",
    description: "Small scoped task with clear brief — paid where the role needs it.",
    icon: Sparkles,
    optional: true,
  },
  {
    id: "offer",
    step: 6,
    title: "Final Offer",
    description: "Compensation, start date, and onboarding into Bitcraftly delivery rhythm.",
    icon: Handshake,
  },
];

export const CULTURE_PILLARS = [
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
];

export const BENEFITS = [
  { title: "Flexible hours", body: "Async-first with focused sync windows when projects need it." },
  { title: "Learning budget", body: "Courses, conferences, and tools that level up your craft." },
  { title: "Real project ownership", body: "End-to-end delivery on SMB products — websites, apps, AI tooling." },
  { title: "Transparent comp", body: "Clear salary bands per role — discussed early, no games." },
  { title: "Paid trial tasks", body: "Respect your time — scoped paid evaluations when needed." },
  { title: "Long runway", body: "Studio model with recurring client work, not hype-cycle churn." },
];
