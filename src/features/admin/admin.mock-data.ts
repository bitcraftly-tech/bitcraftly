import type { AdminContentRow, AdminSettingsGroup, AdminStat } from "./admin.types";

/** Mock repository — replace with FastAPI services later. */
export const ADMIN_OVERVIEW_STATS: readonly AdminStat[] = [
  {
    id: "posts",
    label: "Blog posts",
    value: "5",
    hint: "Published + draft inventory",
  },
  {
    id: "cases",
    label: "Case studies",
    value: "6",
    hint: "Ready for portfolio surfaces",
  },
  {
    id: "services",
    label: "Services",
    value: "18",
    hint: "Catalog entries in marketing",
  },
  {
    id: "quotes",
    label: "Testimonials",
    value: "8",
    hint: "Social proof candidates",
  },
] as const;

export const ADMIN_BLOG_ROWS: readonly AdminContentRow[] = [
  {
    id: "blog-1",
    title: "Shipping AI product features without chaos",
    status: "published",
    updatedAt: "2026-07-10",
    owner: "Sanjay Kr. Singh",
    href: "/blog/shipping-ai-product-features-without-chaos",
  },
  {
    id: "blog-2",
    title: "Next.js App Router architecture for marketing sites",
    status: "published",
    updatedAt: "2026-07-08",
    owner: "Sanjay Kr. Singh",
    href: "/blog/nextjs-app-router-architecture-for-marketing-sites",
  },
  {
    id: "blog-3",
    title: "Draft: Enterprise CMS editorial workflow",
    status: "draft",
    updatedAt: "2026-07-14",
    owner: "Editor (preview)",
  },
  {
    id: "blog-4",
    title: "In review: Accessibility checklist for marketing pages",
    status: "review",
    updatedAt: "2026-07-12",
    owner: "Editor (preview)",
  },
] as const;

export const ADMIN_CASE_STUDY_ROWS: readonly AdminContentRow[] = [
  {
    id: "case-1",
    title: "SaaSPro Analytics Platform",
    status: "published",
    updatedAt: "2026-06-28",
    owner: "Sanjay Kr. Singh",
    href: "/work/saaspro-analytics-platform",
  },
  {
    id: "case-2",
    title: "RetailOps Commerce Suite",
    status: "published",
    updatedAt: "2026-06-20",
    owner: "Sanjay Kr. Singh",
  },
  {
    id: "case-3",
    title: "Draft: Manufacturing ERP pilot",
    status: "draft",
    updatedAt: "2026-07-11",
    owner: "Editor (preview)",
  },
] as const;

export const ADMIN_SERVICE_ROWS: readonly AdminContentRow[] = [
  {
    id: "svc-1",
    title: "AI Solutions",
    status: "published",
    updatedAt: "2026-07-01",
    owner: "Catalog",
    href: "/services/ai-solutions",
  },
  {
    id: "svc-2",
    title: "Website Development",
    status: "published",
    updatedAt: "2026-06-18",
    owner: "Catalog",
    href: "/services/website-development",
  },
  {
    id: "svc-3",
    title: "Draft: AI Agent Ops retainer",
    status: "draft",
    updatedAt: "2026-07-13",
    owner: "Editor (preview)",
  },
] as const;

export const ADMIN_TESTIMONIAL_ROWS: readonly AdminContentRow[] = [
  {
    id: "tm-1",
    title: "SaaSPro founder — dashboard confidence",
    status: "published",
    updatedAt: "2026-06-15",
    owner: "Work",
  },
  {
    id: "tm-2",
    title: "EduNext — cohort reporting praise",
    status: "published",
    updatedAt: "2026-05-30",
    owner: "Work",
  },
  {
    id: "tm-3",
    title: "Draft: Healthcare portal supervisor quote",
    status: "draft",
    updatedAt: "2026-07-09",
    owner: "Editor (preview)",
  },
] as const;

export const ADMIN_SETTINGS_GROUPS: readonly AdminSettingsGroup[] = [
  {
    id: "workspace",
    title: "Workspace",
    description: "Identity shown inside the admin shell.",
    fields: [
      {
        id: "org",
        label: "Organization",
        value: "Bitcraftly",
        readOnly: true,
      },
      {
        id: "env",
        label: "Environment",
        value: "UI preview",
        helper: "No FastAPI connection yet.",
        readOnly: true,
      },
    ],
  },
  {
    id: "integrations",
    title: "Integrations (planned)",
    description: "Wire these when backend and secrets are available.",
    fields: [
      {
        id: "cms",
        label: "CMS API",
        value: "Not configured",
        helper: "Future: FastAPI content endpoints",
        readOnly: true,
      },
      {
        id: "auth",
        label: "Auth provider",
        value: "JWT (planned)",
        helper: "Future: session gate on (admin) layout",
        readOnly: true,
      },
      {
        id: "media",
        label: "Media storage",
        value: "Not configured",
        helper: "Future: signed uploads",
        readOnly: true,
      },
    ],
  },
] as const;
