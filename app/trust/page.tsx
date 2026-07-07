import type { Metadata } from "next";

import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import TrustCenterDocuments from "@/components/trust/TrustCenterDocuments";
import TrustCenterHero from "@/components/trust/TrustCenterHero";
import { CONTAINER } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Trust Center",
  description:
    "Bitcraftly Trust Center — business, delivery, quality, security, privacy, and responsible AI commitments.",
  robots: { index: true, follow: true },
};

export default function TrustCenterPage() {
  return (
    <MarketingPageLayout breadcrumb={[{ label: "Home", href: "/" }, { label: "Trust Center" }]}>
      <TrustCenterHero />
      <section className={`${CONTAINER} pb-10 sm:pb-14`}>
        <TrustCenterDocuments />
      </section>
    </MarketingPageLayout>
  );
}
