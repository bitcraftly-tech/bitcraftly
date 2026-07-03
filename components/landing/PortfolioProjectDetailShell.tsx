import Link from "next/link";

import SiteFooter from "@/components/layout/SiteFooter";
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
        <section className="border-b border-border-primary bg-bg-card py-1.5 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className={`${CONTAINER} text-xs text-text-tertiary dark:text-dark-text-tertiary`}>
            <Link href="/" className="hover:text-text-secondary hover:underline dark:hover:text-dark-text-secondary">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link href="/portfolio" className="hover:text-text-secondary hover:underline dark:hover:text-dark-text-secondary">
              Portfolio
            </Link>
            <span className="px-2">/</span>
            <span className="text-text-secondary dark:text-dark-text-secondary">{item.title}</span>
          </div>
        </section>

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
