import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Resources",
  description:
    "Guides, FAQ, and insights from Bitcraftly on product engineering, AI, and digital growth.",
  path: ROUTES.resources,
});

export default function ResourcesPage() {
  return (
    <MarketingPageShell
      title="Resources"
      description="Practical resources to help you plan, build, and scale AI-powered digital products."
      headingId="resources-page-heading"
    />
  );
}
