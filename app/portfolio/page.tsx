import ShowcaseLink from "@/components/portfolio/ShowcaseLink";

import SiteFooter from "@/components/layout/SiteFooter";
import MarketingNextStep from "@/components/landing/MarketingNextStep";
import MarketingPageIntro from "@/components/landing/MarketingPageIntro";
import Navbar from "@/components/landing/Navbar";
import { CONTAINER, PAGE_MAIN, PAGE_SHELL } from "@/lib/constants";
import { PAGE_INTROS } from "@/lib/pageSequences";

import { buildPageMetadata } from "@/lib/seoMetadata";

import PortfolioContent from "./PortfolioContent";
import PortfolioHashRedirect from "./PortfolioHashRedirect";

export const metadata = buildPageMetadata("portfolio");

export default function PortfolioPage() {
  const intro = PAGE_INTROS.portfolio;

  return (
    <div className={PAGE_SHELL}>
      <Navbar />
      <main className={PAGE_MAIN}>
        <PortfolioHashRedirect />
        <section className="border-b border-border-primary bg-bg-primary py-1.5 dark:border-dark-border-primary dark:bg-dark-bg-primary">
          <div className={`${CONTAINER} text-xs text-text-tertiary dark:text-dark-text-tertiary`}>
            <ShowcaseLink href="/" className="hover:text-text-secondary hover:underline dark:hover:text-dark-text-secondary">
              Home
            </ShowcaseLink>
            <span className="px-2">/</span> Portfolio
          </div>
        </section>
        <MarketingPageIntro
          eyebrow={intro.eyebrow}
          title={intro.title}
          description={intro.description}
          steps={intro.steps}
        />
        <PortfolioContent />
        <MarketingNextStep
          title="Like what you see?"
          description="Similar project chahiye ho to pricing par package choose karo — ya case study se seedha quote request bhejo."
          links={[
            { href: "/pricing#pricing-compare", label: "Compare packages →", primary: true },
            { href: "/contact?intent=quote&source=portfolio-page", label: "Get quote" },
          ]}
        />
      </main>
      <SiteFooter />
    </div>
  );
}
