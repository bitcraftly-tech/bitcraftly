import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Industries",
  description:
    "Industry-focused digital engineering for SaaS, e-commerce, education, healthcare, and enterprise teams.",
  path: ROUTES.industries,
});

export default function IndustriesPage() {
  return (
    <MarketingPageShell
      title="Industries"
      description="See how Bitcraftly partners with teams across industries to ship reliable, AI-ready digital products."
      headingId="industries-page-heading"
    />
  );
}
