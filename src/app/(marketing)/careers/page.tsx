import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Careers",
  description: "Join Bitcraftly and help build AI-powered digital products.",
  path: ROUTES.careers,
});

export default function CareersPage() {
  return (
    <MarketingPageShell
      title="Careers"
      description="Join Bitcraftly and help build AI-powered digital products."
      headingId="careers-page-heading"
    />
  );
}
