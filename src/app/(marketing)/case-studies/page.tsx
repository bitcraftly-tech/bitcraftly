import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Case Studies",
  description: "Outcomes and delivery stories from Bitcraftly projects.",
  path: ROUTES.caseStudies,
});

export default function CaseStudiesPage() {
  return (
    <MarketingPageShell
      title="Case Studies"
      description="Outcomes and delivery stories from Bitcraftly projects."
      headingId="case-studies-page-heading"
    />
  );
}
