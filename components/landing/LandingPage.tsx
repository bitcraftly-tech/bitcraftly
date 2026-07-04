import dynamic from "next/dynamic";

import Hero from "@/components/landing/Hero";
import LandingActionStrip from "@/components/landing/LandingActionStrip";
import MarketingPageLayout from "@/components/landing/MarketingPageLayout";

const HomePageHub = dynamic(() => import("@/components/landing/HomePageHub"));
const WebsiteAuditLeadMagnet = dynamic(() => import("@/components/landing/WebsiteAuditLeadMagnet"));
const PortfolioShowcase = dynamic(() => import("@/components/landing/PortfolioShowcase"));
const FinalCTA = dynamic(() => import("@/components/landing/FinalCTA"));

type LandingPageProps = {
  sectionId?: string;
};

export default function LandingPage({ sectionId }: LandingPageProps) {
  return (
    <MarketingPageLayout sectionId={sectionId} showFooterCta={false}>
      <Hero />
      <LandingActionStrip />
      <HomePageHub />
      <PortfolioShowcase />
      <WebsiteAuditLeadMagnet />
      <FinalCTA />
    </MarketingPageLayout>
  );
}
