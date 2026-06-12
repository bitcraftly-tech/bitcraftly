import { FAST_PACKAGES } from "@/lib/fastPackages";
import { STANDARD_PRICING_PLANS } from "@/lib/standardPricing";

export type PricingCompareRow = {
  id: string;
  name: string;
  icon: string;
  price: string;
  timeline: string;
  bestFor: string;
  group: "Fast launch" | "Standard";
  highlight?: boolean;
  popularLabel?: string;
  contactSlug: string;
};

export const PRICING_COMPARE_ROWS: PricingCompareRow[] = [
  ...FAST_PACKAGES.map((pkg) => ({
    id: pkg.id,
    name: pkg.name,
    icon: pkg.icon,
    price: pkg.price,
    timeline: pkg.timelineShort,
    bestFor: pkg.bestFor,
    group: "Fast launch" as const,
    highlight: pkg.highlight,
    popularLabel: pkg.popularLabel,
    contactSlug: pkg.contactSlug,
  })),
  ...STANDARD_PRICING_PLANS.filter((plan) => !plan.isMonthly).map((plan) => ({
    id: plan.service,
    name: plan.service,
    icon: plan.icon,
    price: plan.price,
    timeline: plan.timeline,
    bestFor: plan.bestFor,
    group: "Standard" as const,
    highlight: plan.highlight,
    popularLabel: plan.highlight ? "Popular" : undefined,
    contactSlug: plan.service,
  })),
];

export const FEATURED_FAST_PACKAGE = FAST_PACKAGES.find((pkg) => pkg.highlight) ?? FAST_PACKAGES[0];
