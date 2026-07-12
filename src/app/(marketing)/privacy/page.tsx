import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How Bitcraftly handles your data and privacy.",
  path: ROUTES.privacy,
});

export default function PrivacyPage() {
  return (
    <MarketingPageShell
      title="Privacy Policy"
      description="How Bitcraftly handles your data and privacy."
      headingId="privacy-page-heading"
    />
  );
}
