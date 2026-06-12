import type { Metadata } from "next";
import dynamic from "next/dynamic";

import MarketingNextStep from "@/components/landing/MarketingNextStep";
import MarketingPageIntro from "@/components/landing/MarketingPageIntro";
import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import FadeInOnView from "@/components/ui/FadeInOnView";
import { PAGE_INTROS } from "@/lib/pageSequences";
import { SITE_URL } from "@/lib/seo";

const FaqSection = dynamic(() => import("@/components/landing/FaqSection"));
const FreeConsultationSection = dynamic(() => import("@/components/landing/FreeConsultationSection"));

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers on pricing, timelines, revisions, hosting, and how Bitcraftly delivers website projects.",
  alternates: { canonical: `${SITE_URL}/faq` },
};

export default function FaqPage() {
  const intro = PAGE_INTROS.faq;

  return (
    <MarketingPageLayout>
      <MarketingPageIntro
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        steps={intro.steps}
      />
      <FadeInOnView delayMs={30}>
        <FaqSection showTopBorder={false} />
      </FadeInOnView>
      <FadeInOnView delayMs={60}>
        <FreeConsultationSection />
      </FadeInOnView>
      <MarketingNextStep
        title="Still deciding?"
        description="FAQ ke baad pricing compare karna sabse fast tareeka hai — package choose karke 1-minute quote form bharo."
        links={[
          { href: "/pricing#pricing-compare", label: "Compare packages →", primary: true },
          { href: "/contact?intent=consultation&source=faq-page", label: "Free consultation" },
        ]}
      />
    </MarketingPageLayout>
  );
}
