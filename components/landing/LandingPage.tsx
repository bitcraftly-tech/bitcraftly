import dynamic from "next/dynamic";

import Hero from "@/components/landing/Hero";
import LandingActionStrip from "@/components/landing/LandingActionStrip";
import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import PageReveal from "@/components/ui/PageReveal";

const HomePageHub = dynamic(() => import("@/components/landing/HomePageHub"));
const WebsiteAuditLeadMagnet = dynamic(() => import("@/components/landing/WebsiteAuditLeadMagnet"));
const PortfolioShowcase = dynamic(() => import("@/components/landing/PortfolioShowcase"));
const FinalCTA = dynamic(() => import("@/components/landing/FinalCTA"));

type LandingPageProps = {
  sectionId?: string;
};

export default function LandingPage({ sectionId }: LandingPageProps) {
  return (
    <MarketingPageLayout sectionId={sectionId}>
      <PageReveal index={1}>
        <Hero />
      </PageReveal>
      <PageReveal index={2}>
        <LandingActionStrip />
      </PageReveal>
      <PageReveal index={3}>
        <HomePageHub />
      </PageReveal>
      <PageReveal index={4}>
        <PortfolioShowcase />
      </PageReveal>
      <PageReveal index={5}>
        <WebsiteAuditLeadMagnet />
      </PageReveal>
      <PageReveal index={6}>
        <FinalCTA />
      </PageReveal>
    </MarketingPageLayout>
  );
}
