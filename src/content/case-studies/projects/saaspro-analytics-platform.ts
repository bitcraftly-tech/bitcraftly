import type { CaseStudy } from "../types";

export const CS_SAASPRO: CaseStudy = {
  slug: "saaspro-analytics-platform",
  title: "SaaSPro Analytics Platform",
  subtitle: "Operator-grade SaaS control plane for subscription businesses",
  excerpt:
    "A production-shaped analytics and billing workspace that helped the founding team validate workflows before a full rebuild.",
  description:
    "Bitcraftly designed and engineered a Next.js SaaS dashboard with billing UX, cohort analytics, and role-aware operator flows for a B2B subscription product.",
  coverImage: "/work/projects/saaspro-dashboard.webp",
  coverImageAlt: "SaaSPro analytics dashboard with revenue and cohort charts",
  client: {
    name: "SaaSPro",
    industry: "B2B SaaS",
    size: "11–50 employees",
    location: "Bengaluru, India",
  },
  engagement: {
    role: "Product engineering partner",
    duration: "14 weeks",
    year: 2025,
  },
  problem:
    "The founding team needed a credible product surface for enterprise demos, but their prototype could not support billing states, permissions, or trustworthy analytics.",
  challenges: [
    "Demo-quality UI had to feel production-ready without over-building",
    "Billing and seat management required clear empty, trial, and paid states",
    "Analytics views needed believable data models for sales conversations",
    "Timeline pressure left little room for rework after stakeholder reviews",
  ],
  solution:
    "We shipped a typed Next.js App Router shell with Server Components for data-heavy views, client islands for filters, and a Stripe-ready billing module. Architecture docs and component contracts let their internal team extend the product after handoff.",
  approach: [
    "Mapped operator journeys for founders, finance, and support roles",
    "Modeled subscription and usage entities before UI polish",
    "Built analytics cards against fixtures that mirror production shapes",
    "Documented extension points for auth, billing webhooks, and audit logs",
  ],
  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "PostgreSQL",
    "Stripe",
  ],
  architecture: [
    {
      id: "edge",
      title: "App Router edge",
      description:
        "Thin route files compose feature modules with metadata and JSON-LD.",
    },
    {
      id: "domain",
      title: "Domain modules",
      description:
        "Billing, analytics, and workspace settings isolated behind typed services.",
    },
    {
      id: "data",
      title: "Data contracts",
      description:
        "Fixture-first models ready to swap to PostgreSQL repositories without UI rewrites.",
    },
  ],
  features: [
    "Revenue and retention overview",
    "Cohort and funnel analytics",
    "Seat and plan management UI",
    "Role-based navigation shells",
    "Export-ready reporting layouts",
  ],
  screenshots: [
    {
      id: "dashboard",
      src: "/work/projects/saaspro-dashboard.webp",
      alt: "SaaSPro main analytics dashboard",
      caption: "Executive overview with revenue, churn, and active seats",
    },
    {
      id: "billing",
      src: "/solutions-hero.webp",
      alt: "Billing and plan management workspace",
      caption: "Plan states designed for trial, active, and past-due accounts",
    },
  ],
  results: {
    summary:
      "The team closed two enterprise pilots using the new workspace and reduced design-to-demo cycle time for subsequent features.",
    metrics: [
      { id: "ttm", value: "−38%", label: "Time to investor-ready demo" },
      { id: "pilots", value: "2", label: "Enterprise pilots closed" },
      { id: "handoff", value: "3 days", label: "Engineering handoff ramp" },
    ],
  },
  testimonial: {
    quote:
      "Bitcraftly gave us a dashboard that looked and behaved like a real product. Our sales calls stopped being prototype tours.",
    name: "Ananya Mehra",
    role: "Co-founder",
    company: "SaaSPro",
  },
  relatedSlugs: [
    "medanta-care-ops-portal",
    "retailops-commerce-suite",
    "edunext-learning-platform",
  ],
  tags: ["SaaS", "Analytics", "Billing", "Dashboards"],
  seoTitle: "SaaSPro Analytics Platform Case Study | Bitcraftly",
  seoDescription:
    "How Bitcraftly built a Next.js SaaS analytics and billing platform that helped SaaSPro run enterprise demos with production-grade UX.",
};
