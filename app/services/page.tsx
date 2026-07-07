import dynamic from "next/dynamic";

import MarketingNextStep from "@/components/landing/MarketingNextStep";
import MarketingPageIntro from "@/components/landing/MarketingPageIntro";
import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import MarketingPageNav from "@/components/landing/MarketingPageNav";
import SkipScrollReveal from "@/components/landing/SkipScrollReveal";
import { PAGE_INTROS, SERVICES_PAGE_NAV } from "@/lib/pageSequences";
import { buildPageMetadata } from "@/lib/seoMetadata";

const ServicesGrid = dynamic(() => import("@/components/landing/ServicesGrid"));
const IndustriesWeServe = dynamic(() => import("@/components/landing/IndustriesWeServe"));
const Features = dynamic(() => import("@/components/landing/Features"));
const DemoStrip = dynamic(() => import("@/components/landing/DemoStrip"));

export const metadata = buildPageMetadata("services");

export default function ServicesPage() {
  const intro = PAGE_INTROS.services;

  return (
    <MarketingPageLayout breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}>
      <MarketingPageIntro
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        steps={intro.steps}
      />
      <SkipScrollReveal>
        <MarketingPageNav items={SERVICES_PAGE_NAV} ariaLabel="Services page sections" />
      </SkipScrollReveal>
      <ServicesGrid showTopBorder={false} />
      <IndustriesWeServe />
      <Features />
      <DemoStrip />
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
