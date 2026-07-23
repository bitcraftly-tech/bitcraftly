import type { Metadata } from "next";
import { LegalDocumentPage, PRIVACY_DOCUMENT } from "@/features/legal";
import { ROUTES } from "@/constants/navigation";
import { buildBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { createPageMetadata } from "@/lib/seo/createPageMetadata";

export const metadata: Metadata = createPageMetadata({
  title: PRIVACY_DOCUMENT.title,
  description: PRIVACY_DOCUMENT.description,
  path: ROUTES.privacy,
});

export default function PrivacyPage() {
  const breadcrumbs = buildBreadcrumbs([
    { label: "Home", href: ROUTES.home },
    { label: "Privacy Policy" },
  ]);

  return (
    <LegalDocumentPage
      document={PRIVACY_DOCUMENT}
      headingId="privacy-page-heading"
      breadcrumbs={breadcrumbs}
      activeNav="privacy"
      cta={{
        heading: "Questions about your data?",
        description:
          "Email privacy@bitcraftly.com — or book a free consultation if you want to talk about a build.",
        tertiaryCta: { label: "Trust Center", href: ROUTES.trust },
        trust: [
          "privacy@bitcraftly.com",
          "Verified request handling",
          "Secure modern stack",
        ],
      }}
    />
  );
}
