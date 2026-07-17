import type { CaseStudy } from "../types";

export const CS_RETAILOPS: CaseStudy = {
  slug: "retailops-commerce-suite",
  title: "RetailOps Commerce Suite",
  subtitle: "Catalog, merchandising, and fulfillment visibility for multi-store retail",
  excerpt:
    "A commerce operations suite that connected store teams to a coherent catalog and fulfillment picture.",
  description:
    "Bitcraftly engineered a retail operations suite covering catalog governance, merchandising workflows, and fulfillment status for a multi-store retailer.",
  coverImage: "/business-solutions-saas.webp",
  coverImageAlt: "Retail commerce operations suite dashboard",
  client: {
    name: "RetailOps India",
    industry: "Retail & Ecommerce",
    size: "50–200 employees",
    location: "Mumbai, India",
  },
  engagement: {
    role: "Commerce platform partner",
    duration: "16 weeks",
    year: 2024,
  },
  problem:
    "Store and warehouse teams used disconnected tools, causing catalog conflicts and delayed fulfillment updates during campaigns.",
  challenges: [
    "Catalog ownership spanned marketing and warehouse roles",
    "Campaign launches needed safer publish gates",
    "Fulfillment status had to stay trustworthy under surge",
    "Legacy ERP data quality was inconsistent",
  ],
  solution:
    "We introduced a governed catalog workflow, merchandising calendars, and fulfillment boards with explicit publish states. Dirty ERP records are quarantined instead of silently breaking storefronts.",
  approach: [
    "Mapped campaign launch rituals with merchandising leads",
    "Introduced draft → review → publish states for catalog changes",
    "Built anomaly alerts for stock and SLA breaches",
    "Designed for progressive ERP cleanup rather than perfect data day one",
  ],
  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Redis",
    "Tailwind CSS",
  ],
  architecture: [
    {
      id: "catalog",
      title: "Catalog service",
      description: "Versioned product records with review workflows.",
    },
    {
      id: "fulfillment",
      title: "Fulfillment boards",
      description: "Store and warehouse status surfaces with SLA timers.",
    },
    {
      id: "sync",
      title: "ERP sync adapters",
      description: "Quarantine-first ingestion for incomplete legacy records.",
    },
  ],
  features: [
    "Catalog governance workflow",
    "Merchandising calendar",
    "Fulfillment SLA boards",
    "Campaign publish gates",
    "Exception queues for dirty data",
  ],
  screenshots: [
    {
      id: "catalog",
      src: "/business-solutions-saas.webp",
      alt: "Catalog governance workspace",
      caption: "Review gates before catalog publish",
    },
    {
      id: "fulfillment",
      src: "/business-solutions-crm.webp",
      alt: "Fulfillment visibility board",
      caption: "Shared fulfillment status across stores",
    },
  ],
  results: {
    summary:
      "Campaign launches became more predictable, and fulfillment exceptions were caught earlier in the week instead of on launch day.",
    metrics: [
      { id: "conflicts", value: "−35%", label: "Catalog conflicts" },
      { id: "sla", value: "+19%", label: "On-time fulfillment" },
      { id: "launch", value: "2 days", label: "Faster campaign readiness" },
    ],
  },
  testimonial: {
    quote:
      "Bitcraftly didn’t pretend our ERP was clean. They built around reality and still gave merchandising the control it needed.",
    name: "Imran Sheikh",
    role: "Head of Ecommerce Ops",
    company: "RetailOps India",
  },
  relatedSlugs: [
    "saaspro-analytics-platform",
    "locallead-services-engine",
    "shrishti-cloud-kitchen",
  ],
  tags: ["Retail", "Ecommerce", "Catalog", "Fulfillment"],
  seoTitle: "RetailOps Commerce Suite Case Study | Bitcraftly",
  seoDescription:
    "Case study: Bitcraftly built catalog governance and fulfillment visibility for RetailOps India’s multi-store commerce team.",
};
