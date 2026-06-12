import dynamic from "next/dynamic";

import MarketingNextStep from "@/components/landing/MarketingNextStep";
import MarketingPageIntro from "@/components/landing/MarketingPageIntro";
import MarketingPageLayout from "@/components/landing/MarketingPageLayout";
import MarketingPageNav from "@/components/landing/MarketingPageNav";
import FadeInOnView from "@/components/ui/FadeInOnView";
import { ABOUT_PAGE_NAV, PAGE_INTROS } from "@/lib/pageSequences";
import { buildPageMetadata } from "@/lib/seoMetadata";

const WhyChooseUs = dynamic(() => import("@/components/landing/WhyChooseUs"));
const HowWeWork = dynamic(() => import("@/components/landing/HowWeWork"));
const FounderSection = dynamic(() => import("@/components/landing/FounderSection"));

export const metadata = buildPageMetadata("about");

export default function AboutPage() {
  const intro = PAGE_INTROS.about;

  return (
    <MarketingPageLayout>
      <MarketingPageIntro
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        steps={intro.steps}
      />
      <MarketingPageNav items={ABOUT_PAGE_NAV} ariaLabel="About page sections" />
      <FadeInOnView delayMs={30}>
        <WhyChooseUs showTopBorder={false} />
      </FadeInOnView>
      <FadeInOnView delayMs={60}>
        <HowWeWork />
      </FadeInOnView>
      <FadeInOnView delayMs={90}>
        <FounderSection />
      </FadeInOnView>
      <MarketingNextStep
        title="Ab pricing dekho ya quote lo"
        description="Trust clear hai — agla step package choose karna ya free consultation book karna."
        links={[
          { href: "/pricing", label: "View pricing →", primary: true },
          { href: "/portfolio", label: "See portfolio" },
          { href: "/contact?intent=consultation&source=about-page", label: "Free consultation" },
        ]}
      />
    </MarketingPageLayout>
  );
}
