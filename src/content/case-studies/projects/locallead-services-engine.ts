import type { CaseStudy } from "../types";

export const CS_LOCALLEAD: CaseStudy = {
  slug: "locallead-services-engine",
  title: "LocalLead Services Engine",
  subtitle: "Lead capture and routing for local service businesses",
  excerpt:
    "A lead engine that qualified inbound demand and routed high-intent enquiries to the right partner teams.",
  description:
    "Bitcraftly built a lead capture and routing engine for LocalLead, helping local service networks convert inbound traffic with clearer qualification and faster response.",
  coverImage: "/opengraph-image.webp",
  coverImageAlt: "Lead routing and qualification dashboard",
  client: {
    name: "LocalLead",
    industry: "Local Services Marketplace",
    size: "Startup",
    location: "Pune, India",
  },
  engagement: {
    role: "Growth product engineering",
    duration: "9 weeks",
    year: 2025,
  },
  problem:
    "High-intent form traffic was drowning partner inboxes without qualification, so response quality and conversion both suffered.",
  challenges: [
    "Partners had uneven response SLAs",
    "Lead forms needed trust without friction",
    "Routing rules changed by city and service category",
    "Founders needed visibility into leaky funnel stages",
  ],
  solution:
    "We launched a qualification-first capture flow, rule-based routing, and partner response dashboards. Founders see funnel leakage by city and category without exporting CSVs.",
  approach: [
    "Reduced form fields while keeping qualification signals",
    "Encoded city/service routing as data, not hard-coded pages",
    "Added SLA timers and reminder cues for partners",
    "Instrumented funnel events for weekly growth reviews",
  ],
  techStack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Tailwind CSS"],
  architecture: [
    {
      id: "capture",
      title: "Capture layer",
      description: "SEO landing pages with validated lead forms.",
    },
    {
      id: "routing",
      title: "Routing engine",
      description: "Rule tables for city, category, and partner capacity.",
    },
    {
      id: "ops",
      title: "Partner ops",
      description: "Response queues with SLA visibility and reminders.",
    },
  ],
  features: [
    "Qualification-first lead forms",
    "City and category routing",
    "Partner response queues",
    "SLA timers and reminders",
    "Funnel analytics for founders",
  ],
  screenshots: [
    {
      id: "funnel",
      src: "/opengraph-image.webp",
      alt: "Lead funnel analytics",
      caption: "Founder view of capture-to-response leakage",
    },
    {
      id: "queue",
      src: "/twitter-image.webp",
      alt: "Partner response queue",
      caption: "SLA-aware partner queues",
    },
  ],
  results: {
    summary:
      "Partners responded faster to qualified leads, and founders could finally see where demand was leaking by city.",
    metrics: [
      { id: "response", value: "−41%", label: "Median partner response time" },
      { id: "qualify", value: "+29%", label: "Qualified lead rate" },
      { id: "convert", value: "+17%", label: "Lead-to-booking conversion" },
    ],
  },
  testimonial: {
    quote:
      "We stopped drowning partners in junk leads. Bitcraftly made the funnel measurable and the routing rules maintainable.",
    name: "Karan Desai",
    role: "Founder",
    company: "LocalLead",
  },
  relatedSlugs: [
    "retailops-commerce-suite",
    "shrishti-cloud-kitchen",
    "saaspro-analytics-platform",
  ],
  tags: ["Leads", "Marketplace", "Growth", "Routing"],
  seoTitle: "LocalLead Services Engine Case Study | Bitcraftly",
  seoDescription:
    "Case study: Bitcraftly built a qualification and routing engine that improved LocalLead partner response and conversion.",
};
