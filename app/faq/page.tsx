import dynamic from "next/dynamic";

import MarketingNextStep from "@/components/landing/MarketingNextStep";
import MarketingPageIntro from "@/components/landing/MarketingPageIntro";
import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import { PAGE_INTROS } from "@/lib/pageSequences";
import FaqJsonLd from "@/components/seo/FaqJsonLd";
import { buildPageMetadata } from "@/lib/seoMetadata";

const FaqSection = dynamic(() => import("@/components/landing/FaqSection"));
const FreeConsultationSection = dynamic(() => import("@/components/landing/FreeConsultationSection"));

export const metadata = buildPageMetadata("faq");

export default function FaqPage() {
  const intro = PAGE_INTROS.faq;

  return (
    <MarketingPageLayout breadcrumb={[{ label: "Home", href: "/" }, { label: "FAQ" }]}>
      <FaqJsonLd />
      <MarketingPageIntro
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        steps={intro.steps}
      />
      <FaqSection showTopBorder={false} />
      <FreeConsultationSection />
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
