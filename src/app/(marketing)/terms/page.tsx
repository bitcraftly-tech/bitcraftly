import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Terms",
  description: "Terms of use for Bitcraftly services and websites.",
  path: ROUTES.terms,
});

export default function TermsPage() {
  return (
    <MarketingPageShell
      title="Terms"
      description="Terms of use for Bitcraftly services and websites."
      headingId="terms-page-heading"
    />
  );
}
