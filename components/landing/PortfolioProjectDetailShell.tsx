import Link from "next/link";

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import PortfolioProjectCard from "@/components/landing/PortfolioProjectCard";
import { CONTAINER } from "@/lib/constants";
import type { PortfolioItem } from "@/lib/portfolioItems";

/** Root slug pages e.g. `/gym-website` — same chrome as `/portfolio/...` detail view */
export default function PortfolioProjectDetailShell({ item }: { item: PortfolioItem }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
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
            <div className="mx-auto mt-8 max-w-lg lg:max-w-xl">
              <PortfolioProjectCard item={item} showDetails />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
