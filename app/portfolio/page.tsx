import SiteFooter from "@/components/layout/SiteFooter";
import MarketingBreadcrumb from "@/components/landing/MarketingBreadcrumb";
import MarketingNextStep from "@/components/landing/MarketingNextStep";
import MarketingPageIntro from "@/components/landing/MarketingPageIntro";
import Navbar from "@/components/landing/Navbar";
import { PAGE_MAIN, PAGE_SHELL } from "@/lib/constants";
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
        <MarketingBreadcrumb items={[{ label: "Home", href: "/" }, { label: "Portfolio" }]} />
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
