import type { Metadata } from "next";
import { PricingLandingPage, PRICING_LANDING_META } from "@/features/pricing";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: PRICING_LANDING_META.title,
  description: PRICING_LANDING_META.description,
  path: PRICING_LANDING_META.path,
});

export default function PricingPage() {
  return <PricingLandingPage />;
}
