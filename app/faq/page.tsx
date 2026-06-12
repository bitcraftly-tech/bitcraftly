import type { Metadata } from "next";
import dynamic from "next/dynamic";

import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import FadeInOnView from "@/components/ui/FadeInOnView";
import { SITE_URL } from "@/lib/seo";

const FaqSection = dynamic(() => import("@/components/landing/FaqSection"));
const FreeConsultationSection = dynamic(() => import("@/components/landing/FreeConsultationSection"));

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers on pricing, timelines, revisions, hosting, and how Bitcraftly delivers website projects.",
  alternates: { canonical: `${SITE_URL}/faq` },
};

export default function FaqPage() {
  return (
    <MarketingPageLayout>
      <FadeInOnView delayMs={30}>
        <FaqSection />
      </FadeInOnView>
      <FadeInOnView delayMs={60}>
        <FreeConsultationSection />
      </FadeInOnView>
    </MarketingPageLayout>
  );
}
