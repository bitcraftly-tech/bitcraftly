import { MarketingIllustratedHero } from "@/components/patterns/hero-compositions";
import { JsonLdScript } from "@/components/patterns/json-ld";
import { PageShell } from "@/components/patterns/marketing-layout";
import { buildAboutBreadcrumbs } from "@/lib/seo/breadcrumbs";
import { ABOUT_HERO, ABOUT_LANDING_META } from "./about.content";
import { buildAboutJsonLd } from "./about-schema";
import { AboutHeroVisual } from "./AboutHeroVisual";
import { AboutFaqSection } from "./AboutFaqSection";
import {
  AboutCtaSection,
  AboutCultureSection,
  AboutFeaturedCaseSection,
  AboutLeadershipSection,
  AboutMissionVisionSection,
  AboutProcessSection,
  AboutStorySection,
  AboutTechnologySection,
  AboutTestimonialsSection,
  AboutTrustedBySection,
  AboutTrustSection,
  AboutValuesSection,
} from "./AboutSections";
import "./about.css";

/**
 * About landing — enterprise company story, culture, and trust.
 */
export function AboutLandingPage() {
  const breadcrumbs = buildAboutBreadcrumbs();

  return (
    <PageShell className="about-page">
      <JsonLdScript data={buildAboutJsonLd()} />

      <MarketingIllustratedHero
        breadcrumbs={breadcrumbs}
        headingId={ABOUT_HERO.headingId}
        eyebrow={ABOUT_HERO.eyebrow}
        title={ABOUT_HERO.title}
        titleHighlight={ABOUT_HERO.titleHighlight}
        description={ABOUT_HERO.description}
        supporting={ABOUT_HERO.supporting}
        primaryCta={ABOUT_HERO.primaryCta}
        secondaryCta={ABOUT_HERO.secondaryCta}
        trustItems={[...ABOUT_HERO.trustItems]}
        stats={[...ABOUT_HERO.stats]}
        statsAriaLabel="Bitcraftly highlights"
        metaLayout="stats-first"
        renderVisual={() => <AboutHeroVisual />}
      />

      <AboutStorySection />
      <AboutTrustedBySection />
      <AboutMissionVisionSection />
      <AboutValuesSection />
      <AboutLeadershipSection />
      <AboutCultureSection />
      <AboutTechnologySection />
      <AboutFeaturedCaseSection />
      <AboutProcessSection />
      <AboutTrustSection />
      <AboutTestimonialsSection />
      <AboutFaqSection />
      <AboutCtaSection />
    </PageShell>
  );
}

export { ABOUT_LANDING_META };
