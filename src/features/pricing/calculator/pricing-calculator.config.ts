import type {
  BudgetId,
  FeatureId,
  PageRange,
  TimelineId,
  WebsiteType,
} from "./pricing-calculator.schema";

export interface PricingOption<T extends string> {
  readonly id: T;
  readonly label: string;
  readonly description: string;
}

export const WEBSITE_TYPE_OPTIONS: readonly PricingOption<WebsiteType>[] = [
  {
    id: "marketing",
    label: "Marketing website",
    description: "Brand site with clear CTAs and lead capture",
  },
  {
    id: "business",
    label: "Business website",
    description: "Company pages, services, and enquiry flows",
  },
  {
    id: "ecommerce",
    label: "Ecommerce store",
    description: "Catalog, cart, and checkout experience",
  },
  {
    id: "web-app",
    label: "Web application",
    description: "Logged-in product workflows and dashboards",
  },
  {
    id: "saas",
    label: "SaaS product",
    description: "Multi-tenant product shell with billing-ready UX",
  },
] as const;

export const PAGE_RANGE_OPTIONS: readonly PricingOption<PageRange>[] = [
  { id: "1-5", label: "1–5 pages", description: "Lean launch footprint" },
  { id: "6-10", label: "6–10 pages", description: "Typical business site" },
  { id: "11-20", label: "11–20 pages", description: "Broader content map" },
  { id: "21-40", label: "21–40 pages", description: "Large content surface" },
  { id: "40+", label: "40+ pages", description: "Content-heavy or multi-section" },
] as const;

export const FEATURE_OPTIONS: readonly (PricingOption<FeatureId> & {
  readonly price: number;
})[] = [
  { id: "cms", label: "CMS / editable pages", description: "Content updates without deploys", price: 12000 },
  { id: "auth", label: "Authentication", description: "Sign-in and protected areas", price: 18000 },
  { id: "payments", label: "Payments", description: "Checkout or billing integrations", price: 22000 },
  { id: "blog", label: "Blog / resources", description: "Editorial listing and detail pages", price: 9000 },
  { id: "admin", label: "Admin panel", description: "Internal operators console", price: 28000 },
  { id: "seo", label: "Technical SEO pack", description: "Metadata, schema, sitemap hygiene", price: 8000 },
  { id: "analytics", label: "Analytics setup", description: "Events and conversion tracking", price: 6000 },
  { id: "ai-chat", label: "AI assistant", description: "Guided chat or concierge experience", price: 35000 },
  { id: "multilingual", label: "Multilingual", description: "Locale routing and content structure", price: 15000 },
  { id: "api", label: "Custom API integrations", description: "Third-party systems and webhooks", price: 20000 },
] as const;

export const TIMELINE_OPTIONS: readonly (PricingOption<TimelineId> & {
  readonly multiplier: number;
})[] = [
  {
    id: "flexible",
    label: "Flexible",
    description: "Best value · shared calendar",
    multiplier: 0.95,
  },
  {
    id: "standard",
    label: "Standard",
    description: "Balanced delivery pace",
    multiplier: 1,
  },
  {
    id: "fast",
    label: "Fast-track",
    description: "Compressed milestones",
    multiplier: 1.18,
  },
  {
    id: "rush",
    label: "Rush",
    description: "Priority capacity · highest cost",
    multiplier: 1.35,
  },
] as const;

export const BUDGET_OPTIONS: readonly PricingOption<BudgetId>[] = [
  { id: "under-25k", label: "Under ₹25,000", description: "Starter builds" },
  { id: "25k-50k", label: "₹25,000–₹50,000", description: "Lean business sites" },
  { id: "50k-1L", label: "₹50,000–₹1,00,000", description: "Feature-rich websites" },
  { id: "1L-2L", label: "₹1,00,000–₹2,00,000", description: "Product-grade builds" },
  { id: "2L-plus", label: "₹2,00,000+", description: "Complex platforms" },
  { id: "unsure", label: "Not sure yet", description: "We’ll recommend a fit" },
] as const;

export const WEBSITE_TYPE_BASE: Record<WebsiteType, number> = {
  marketing: 14999,
  business: 24999,
  ecommerce: 59999,
  "web-app": 89999,
  saas: 149999,
};

export const PAGE_RANGE_ADDON: Record<PageRange, number> = {
  "1-5": 0,
  "6-10": 8000,
  "11-20": 18000,
  "21-40": 32000,
  "40+": 52000,
};

export const PACKAGE_BANDS = [
  { max: 30000, name: "Starter Launch", summary: "Focused site with core CTAs and clean SEO foundations." },
  { max: 75000, name: "Growth Website", summary: "Broader content, conversion UX, and selective feature add-ons." },
  { max: 150000, name: "Business Platform", summary: "Richer workflows, integrations, and operator-ready surfaces." },
  { max: Number.POSITIVE_INFINITY, name: "Custom Product Build", summary: "Scoped product engineering with phased delivery." },
] as const;
