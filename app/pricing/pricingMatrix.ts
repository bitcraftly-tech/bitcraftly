import { STANDARD_PRICING_PLANS } from "@/lib/standardPricing";

export type CompareCell = "included" | "optional" | "none";

export type CompareFeature = {
  id: string;
  label: string;
  starter: CompareCell | string;
  professional: CompareCell | string;
  enterprise: CompareCell | string;
};

/** Core tiers — maps to existing standard plans (names unchanged in data). */
export const PRICING_TIERS = {
  starter: STANDARD_PRICING_PLANS[0],
  professional: STANDARD_PRICING_PLANS[1],
  enterprise: STANDARD_PRICING_PLANS[2],
} as const;

export const TIER_DISPLAY = [
  {
    key: "starter" as const,
    label: "Starter",
    plan: PRICING_TIERS.starter,
    support: "Email support",
  },
  {
    key: "professional" as const,
    label: "Professional",
    plan: PRICING_TIERS.professional,
    support: "Priority support",
    recommended: true,
  },
  {
    key: "enterprise" as const,
    label: "Enterprise",
    plan: PRICING_TIERS.enterprise,
    support: "Founder-led premium",
  },
];

export const FEATURE_COMPARE_ROWS: CompareFeature[] = [
  { id: "pages", label: "Website pages", starter: "Up to 5", professional: "Multi-page", enterprise: "Custom scale" },
  { id: "responsive", label: "Responsive design", starter: "included", professional: "included", enterprise: "included" },
  { id: "seo", label: "SEO", starter: "Basic", professional: "Advanced", enterprise: "Advanced" },
  { id: "cms", label: "CMS", starter: "none", professional: "included", enterprise: "included" },
  { id: "admin", label: "Admin panel", starter: "none", professional: "included", enterprise: "included" },
  { id: "payments", label: "Payment gateway", starter: "optional", professional: "optional", enterprise: "included" },
  { id: "whatsapp", label: "WhatsApp integration", starter: "included", professional: "included", enterprise: "included" },
  { id: "ai", label: "AI chatbot", starter: "none", professional: "optional", enterprise: "optional" },
  { id: "blog", label: "Blog", starter: "optional", professional: "included", enterprise: "included" },
  { id: "analytics", label: "Analytics", starter: "Basic", professional: "included", enterprise: "included" },
  { id: "forms", label: "Contact forms", starter: "included", professional: "included", enterprise: "included" },
  { id: "hosting", label: "Hosting support", starter: "Guidance", professional: "Guidance", enterprise: "Guidance" },
  { id: "maintenance", label: "Maintenance", starter: "optional", professional: "optional", enterprise: "optional" },
  { id: "revisions", label: "Revisions", starter: "1 round", professional: "2 rounds", enterprise: "Custom" },
  { id: "delivery", label: "Delivery time", starter: "1–2 weeks", professional: "1–2 weeks", enterprise: "2–4 weeks" },
  { id: "support", label: "Premium support", starter: "none", professional: "included", enterprise: "included" },
];

export function compareCellLabel(value: CompareCell | string): { text: string; kind: "check" | "dash" | "text" } {
  if (value === "included") return { text: "Included", kind: "check" };
  if (value === "optional") return { text: "Optional", kind: "text" };
  if (value === "none") return { text: "—", kind: "dash" };
  return { text: value, kind: "text" };
}
