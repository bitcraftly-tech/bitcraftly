import dynamic from "next/dynamic";

import Hero from "@/components/landing/Hero";
import HomeBottomCta from "@/components/landing/HomeBottomCta";
import HomePageHub from "@/components/landing/HomePageHub";
import HomePerformanceStrip from "@/components/landing/HomePerformanceStrip";
import MarketingPageLayout from "@/components/landing/MarketingPageLayout";

const WebsiteAuditLeadMagnet = dynamic(() => import("@/components/landing/WebsiteAuditLeadMagnet"));
const PortfolioShowcase = dynamic(() => import("@/components/landing/PortfolioShowcase"));

type LandingPageProps = {
  sectionId?: string;
};

export default function LandingPage({ sectionId }: LandingPageProps) {
  return (
    <MarketingPageLayout sectionId={sectionId} variant="landing">
      <div className="lp-revamp bg-white text-[#1e293b]">
        <Hero />
        <HomePageHub />
        <PortfolioShowcase revampLayout />
        <HomePerformanceStrip />
        <WebsiteAuditLeadMagnet />
        <HomeBottomCta />
      </div>
    </MarketingPageLayout>
  );
}
