import type { CaseStudy } from "../types";

export const CS_SHRISHTI: CaseStudy = {
  slug: "shrishti-cloud-kitchen",
  title: "Shrishti Cloud Kitchen",
  subtitle: "Ordering and kitchen operations for a multi-brand cloud kitchen",
  excerpt:
    "A high-intent ordering experience paired with kitchen-facing workflows that reduced order mishaps during peak hours.",
  description:
    "Bitcraftly delivered a customer ordering site and internal ops views for Shrishti Cloud Kitchen, focused on menu clarity, delivery ETA honesty, and kitchen throughput.",
  coverImage: "/portfolio-hero.webp",
  coverImageAlt: "Cloud kitchen ordering and operations product showcase",
  client: {
    name: "Shrishti Cloud Kitchen",
    industry: "Food & Hospitality",
    size: "1–10 employees",
    location: "Noida, India",
  },
  engagement: {
    role: "Full-stack product build",
    duration: "10 weeks",
    year: 2025,
  },
  problem:
    "Orders were fragmented across WhatsApp and third-party apps, creating kitchen bottlenecks and inconsistent customer communication.",
  challenges: [
    "Peak-hour load needed fast menu browsing on mid-range phones",
    "Kitchen staff required simple status flows without training overhead",
    "Brand needed trustworthy ETAs instead of optimistic promises",
    "Menu changes had to publish quickly without developer intervention",
  ],
  solution:
    "We built a mobile-first ordering storefront with structured menus, cart recovery, and a lightweight kitchen board. Content updates ship through a constrained admin workflow so operations can move without breaking layout integrity.",
  approach: [
    "Observed dinner-rush kitchen flow before wireframes",
    "Prioritized LCP for hero and menu imagery with WebP assets",
    "Separated customer and kitchen surfaces with shared order status model",
    "Added WhatsApp handoff for high-intent assistance without abandoning the cart",
  ],
  techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL"],
  architecture: [
    {
      id: "storefront",
      title: "Customer storefront",
      description: "SSR menu pages with client islands for cart interactions.",
    },
    {
      id: "ops",
      title: "Kitchen board",
      description: "Status-driven queue for prep, dispatch, and exceptions.",
    },
    {
      id: "comms",
      title: "Comms layer",
      description: "Order confirmations and WhatsApp-assisted recovery paths.",
    },
  ],
  features: [
    "Structured multi-brand menus",
    "Cart and checkout guidance",
    "Kitchen status board",
    "ETA messaging patterns",
    "WhatsApp-assisted support entry",
  ],
  screenshots: [
    {
      id: "storefront",
      src: "/portfolio-hero.webp",
      alt: "Shrishti ordering storefront",
      caption: "Mobile-first menu browsing tuned for peak dinner traffic",
    },
    {
      id: "ops",
      src: "/services-hero.webp",
      alt: "Kitchen operations board",
      caption: "Simple status flow for prep and dispatch",
    },
  ],
  results: {
    summary:
      "Order mishandling dropped during rush windows, and the team moved most direct orders off unstructured WhatsApp threads.",
    metrics: [
      { id: "mishaps", value: "−42%", label: "Order mishaps in peak hours" },
      { id: "direct", value: "+31%", label: "Direct online orders" },
      { id: "eta", value: "18%", label: "Fewer ETA complaints" },
    ],
  },
  testimonial: {
    quote:
      "The kitchen finally sees the same truth customers see. Bitcraftly understood the rush-hour reality, not just the pretty screens.",
    name: "Rahul Verma",
    role: "Founder",
    company: "Shrishti Cloud Kitchen",
  },
  relatedSlugs: [
    "saaspro-analytics-platform",
    "retailops-commerce-suite",
    "locallead-services-engine",
  ],
  tags: ["Hospitality", "Ordering", "Operations", "Mobile Web"],
  seoTitle: "Shrishti Cloud Kitchen Case Study | Bitcraftly",
  seoDescription:
    "Case study: Bitcraftly built ordering and kitchen ops workflows for Shrishti Cloud Kitchen to reduce peak-hour mishaps.",
};
