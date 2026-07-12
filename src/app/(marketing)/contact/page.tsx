import type { Metadata } from "next";
import { MarketingPageShell } from "@/components/patterns/marketing-page-shell";
import { ROUTES } from "@/constants/navigation";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Book a call or request a free consultation with the Bitcraftly team.",
  path: ROUTES.contact,
});

export default function ContactPage() {
  return (
    <MarketingPageShell
      title="Contact"
      description="Tell us about your project. Book a call or request a free consultation — we typically respond within one business day."
      headingId="contact-page-heading"
    />
  );
}
