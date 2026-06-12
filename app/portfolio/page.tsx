import ShowcaseLink from "@/components/portfolio/ShowcaseLink";

import Footer from "@/components/landing/Footer";
import MarketingNextStep from "@/components/landing/MarketingNextStep";
import MarketingPageIntro from "@/components/landing/MarketingPageIntro";
import Navbar from "@/components/landing/Navbar";
import { CONTAINER } from "@/lib/constants";
import { PAGE_INTROS } from "@/lib/pageSequences";

import { buildPageMetadata } from "@/lib/seoMetadata";

import PortfolioContent from "./PortfolioContent";
import PortfolioHashRedirect from "./PortfolioHashRedirect";

export const metadata = buildPageMetadata("portfolio");

export default function PortfolioPage() {
  const intro = PAGE_INTROS.portfolio;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PortfolioHashRedirect />
        <section className="border-b border-[#e8ecef] bg-white py-1.5">
          <div className={`${CONTAINER} text-xs text-[#95a5a6]`}>
            <ShowcaseLink href="/" className="hover:text-[#7f8c8d] hover:underline">
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
      <Footer />
    </div>
  );
}
