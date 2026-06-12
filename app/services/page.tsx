import type { Metadata } from "next";
import dynamic from "next/dynamic";

import MarketingNextStep from "@/components/landing/MarketingNextStep";
import MarketingPageIntro from "@/components/landing/MarketingPageIntro";
import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import MarketingPageNav from "@/components/landing/MarketingPageNav";
import FadeInOnView from "@/components/ui/FadeInOnView";
import { PAGE_INTROS, SERVICES_PAGE_NAV } from "@/lib/pageSequences";
import { SITE_URL } from "@/lib/seo";

const ServicesGrid = dynamic(() => import("@/components/landing/ServicesGrid"));
const IndustriesWeServe = dynamic(() => import("@/components/landing/IndustriesWeServe"));
const Features = dynamic(() => import("@/components/landing/Features"));
const DemoStrip = dynamic(() => import("@/components/landing/DemoStrip"));

export const metadata: Metadata = {
  title: "Web Development Services",
  description:
    "React & Next.js websites, mobile app UI, AI integrations, and SEO-focused builds for startups and local businesses.",
  alternates: { canonical: `${SITE_URL}/services` },
};

export default function ServicesPage() {
  const intro = PAGE_INTROS.services;

  return (
    <MarketingPageLayout>
      <MarketingPageIntro
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        steps={intro.steps}
      />
      <MarketingPageNav items={SERVICES_PAGE_NAV} ariaLabel="Services page sections" />
      <FadeInOnView delayMs={30}>
        <ServicesGrid showTopBorder={false} />
      </FadeInOnView>
      <FadeInOnView delayMs={60}>
        <IndustriesWeServe />
      </FadeInOnView>
      <FadeInOnView delayMs={90}>
        <Features />
      </FadeInOnView>
      <FadeInOnView delayMs={120}>
        <DemoStrip />
      </FadeInOnView>
      <MarketingNextStep
        title="Ready for pricing?"
        description="Services samajh aa gaye — ab packages compare karo ya seedha quote lo. Portfolio mein similar work bhi dekho."
        links={[
          { href: "/pricing#pricing-compare", label: "Compare packages →", primary: true },
          { href: "/portfolio", label: "View portfolio" },
          { href: "/contact?intent=quote&source=services-page", label: "Get quote" },
        ]}
      />
    </MarketingPageLayout>
  );
}
