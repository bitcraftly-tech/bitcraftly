import Link from "next/link";
import PortfolioProjectCard from "@/components/landing/PortfolioProjectCard";
import { CONTAINER } from "@/lib/constants";
import { homePortfolioItems } from "@/lib/portfolioItems";

export default function PortfolioShowcase() {
  return (
    <section id="portfolio" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-6 dark:border-dark-border-primary lg:py-8`}>
      <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Recent projects</p>
          <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Live-style builds for shops, schools &amp; services
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-text-secondary dark:text-dark-text-secondary sm:text-base">
            Representative work across cloud kitchens, fitness, education and ecommerce — structured for mobile visitors,
            local SEO and WhatsApp enquiries (preview mockups shown).
          </p>
        </div>
        <Link href="/portfolio" className="text-sm font-semibold text-indigo-500 hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300">
          Full portfolio →
        </Link>
      </div>

      <div className="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {homePortfolioItems.map((p) => (
          <PortfolioProjectCard key={p.title} item={p} />
        ))}
      </div>
    </section>
  );
}
