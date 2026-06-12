import type { Metadata } from "next";
import dynamic from "next/dynamic";

import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import FadeInOnView from "@/components/ui/FadeInOnView";
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
  return (
    <MarketingPageLayout>
      <FadeInOnView delayMs={30}>
        <ServicesGrid />
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
    </MarketingPageLayout>
  );
}
