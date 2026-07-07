import Link from "next/link";

import SiteFooter from "@/components/layout/SiteFooter";
import MarketingBreadcrumb from "@/components/landing/MarketingBreadcrumb";
import Navbar from "@/components/landing/Navbar";
import PortfolioCaseStudy from "@/components/landing/PortfolioCaseStudy";
import PortfolioProjectCard from "@/components/landing/PortfolioProjectCard";
import { CONTAINER, PAGE_MAIN, PAGE_SHELL } from "@/lib/constants";
import type { PortfolioItem } from "@/lib/portfolioItems";

/** Root slug pages e.g. `/gym-website` — portfolio detail + case study */
export default function PortfolioProjectDetailShell({ item }: { item: PortfolioItem }) {
  return (
    <div className={PAGE_SHELL}>
      <Navbar />
      <main className={PAGE_MAIN}>
        <MarketingBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Portfolio", href: "/portfolio" },
            { label: item.title },
          ]}
        />

        <div className="bg-bg-primary text-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary">
          <section className={`${CONTAINER} py-8 md:py-10`}>
            <Link
              href="/portfolio"
              className="inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              ← All portfolio
            </Link>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Case study</p>
            <h1 className="mt-2 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">{item.title}</h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary dark:text-dark-text-secondary">{item.cardLine}</p>

            <div className="mt-8 max-w-lg lg:max-w-xl">
              <PortfolioProjectCard item={item} showDetails />
            </div>

            <PortfolioCaseStudy item={item} />
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
