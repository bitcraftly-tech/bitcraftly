import { ROUTES } from "@/constants/navigation";
import type {
  HomepageTechnology,
  TechnologiesCta,
} from "./technologies.types";

const TECHNOLOGIES_BASE = ROUTES.services;

export function getTechnologyHref(_slug: string): string {
  return ROUTES.services;
}

export const TECHNOLOGIES_SECTION_ID = "technologies";
export const TECHNOLOGIES_HEADING_ID = "technologies-heading";

export const TECHNOLOGIES_LABEL = "Tech Stack";

export const TECHNOLOGIES_HEADING_LINE_1 = "Modern Technologies";
export const TECHNOLOGIES_HEADING_LINE_2 = "We Build With";

export const TECHNOLOGIES_DESCRIPTION =
  "Production stacks for AI products, SaaS, and high-performance web platforms.";

export const HOMEPAGE_TECHNOLOGIES: readonly HomepageTechnology[] = [
  {
    id: "react",
    name: "React",
    category: "Frontend Library",
    href: getTechnologyHref("react"),
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "SSR Framework",
    href: getTechnologyHref("nextjs"),
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Typed JavaScript",
    href: getTechnologyHref("typescript"),
  },
  {
    id: "tailwind-css",
    name: "Tailwind CSS",
    category: "Utility CSS",
    href: getTechnologyHref("tailwind-css"),
  },
  {
    id: "vuejs",
    name: "Vue.js",
    category: "Frontend Framework",
    href: getTechnologyHref("vuejs"),
  },
  {
    id: "nodejs",
    name: "Node.js",
    category: "Backend Runtime",
    href: getTechnologyHref("nodejs"),
  },
  {
    id: "python",
    name: "Python",
    category: "Backend Language",
    href: getTechnologyHref("python"),
  },
  {
    id: "nestjs",
    name: "NestJS",
    category: "Node Framework",
    href: getTechnologyHref("nestjs"),
  },
  {
    id: "express",
    name: "Express",
    category: "API Framework",
    href: getTechnologyHref("express"),
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Python API",
    href: getTechnologyHref("fastapi"),
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "NoSQL Database",
    href: getTechnologyHref("mongodb"),
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Database",
    href: getTechnologyHref("postgresql"),
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "Relational DB",
    href: getTechnologyHref("mysql"),
  },
  {
    id: "redis",
    name: "Redis",
    category: "In-Memory Cache",
    href: getTechnologyHref("redis"),
  },
  {
    id: "firebase",
    name: "Firebase",
    category: "Backend Platform",
    href: getTechnologyHref("firebase"),
  },
  {
    id: "aws",
    name: "AWS",
    category: "Cloud Platform",
    href: getTechnologyHref("aws"),
  },
  {
    id: "azure",
    name: "Azure",
    category: "Cloud Platform",
    href: getTechnologyHref("azure"),
  },
  {
    id: "google-cloud",
    name: "Google Cloud",
    category: "Cloud Platform",
    href: getTechnologyHref("google-cloud"),
  },
  {
    id: "docker",
    name: "Docker",
    category: "Container",
    href: getTechnologyHref("docker"),
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    category: "Orchestration",
    href: getTechnologyHref("kubernetes"),
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "AI Models",
    href: getTechnologyHref("openai"),
  },
  {
    id: "gemini",
    name: "Gemini",
    category: "AI Models",
    href: getTechnologyHref("gemini"),
  },
  {
    id: "claude",
    name: "Claude",
    category: "AI Models",
    href: getTechnologyHref("claude"),
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "AI Framework",
    href: getTechnologyHref("langchain"),
  },
  {
    id: "pinecone",
    name: "Pinecone",
    category: "Vector Database",
    href: getTechnologyHref("pinecone"),
  },
  {
    id: "react-native",
    name: "React Native",
    category: "Mobile Apps",
    href: getTechnologyHref("react-native"),
  },
  {
    id: "flutter",
    name: "Flutter",
    category: "Mobile Apps",
    href: getTechnologyHref("flutter"),
  },
] as const;

export const TECHNOLOGIES_INTRO_CTA: TechnologiesCta = {
  label: "View Full Tech Stack",
  href: TECHNOLOGIES_BASE,
};
