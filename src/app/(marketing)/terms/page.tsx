import type { Metadata } from "next";
import { LegalDocumentPage, TERMS_DOCUMENT } from "@/features/legal";
import { ROUTES } from "@/constants/navigation";
import { buildBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: TERMS_DOCUMENT.title,
  description: TERMS_DOCUMENT.description,
  path: ROUTES.terms,
});

export default function TermsPage() {
  const breadcrumbs = buildBreadcrumbs([
    { label: "Home", href: ROUTES.home },
    { label: "Terms of Service" },
  ]);

  return (
    <LegalDocumentPage
      document={TERMS_DOCUMENT}
      headingId="terms-page-heading"
      breadcrumbs={breadcrumbs}
      activeNav="terms"
      cta={{
        heading: "Ready to work with Bitcraftly?",
        description:
          "Review the terms, then book a free consultation — clear scope before we start.",
        tertiaryCta: { label: "View services", href: ROUTES.services },
        trust: [
          "Written quotes",
          "Milestone-based payments",
          "Founder-led delivery",
        ],
      }}
    />
  );
}
