import ShowcaseLink from "@/components/portfolio/ShowcaseLink";

import PortfolioProjectCard from "@/components/landing/PortfolioProjectCard";
import { CONTAINER } from "@/lib/constants";
import { portfolioPageItems } from "@/lib/portfolioItems";

export default function PortfolioContent() {
  return (
    <div className="bg-bg-primary text-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary">
      <section className={`${CONTAINER} py-10 md:py-14`}>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Portfolio</p>
        <h1 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl md:text-5xl">
          Websites &amp; stores built for real businesses
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary dark:text-dark-text-secondary">
          Sample directions we ship for clients in Jamshedpur and across India — every project gets custom structure,
          content, and integrations. Below are industry-style mockups; your build is scoped after a short discovery
          call.
        </p>
        <p className="mt-3 max-w-3xl text-sm text-text-tertiary dark:text-dark-text-tertiary">
          Looking for ecommerce website development or a lean brochure site? Use these cards as conversation starters,
          not fixed templates.
        </p>
      </section>

      <section className={`${CONTAINER} border-t border-border-primary pb-12 dark:border-dark-border-primary`}>
        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioPageItems.map((item) => (
            <PortfolioProjectCard key={item.title} item={item} showDetails />
          ))}
        </div>
      </section>

      <section className={`${CONTAINER} border-t border-border-primary py-10 dark:border-dark-border-primary`}>
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border-primary bg-bg-card px-6 py-10 text-center dark:border-dark-border-primary dark:bg-dark-bg-card sm:px-10">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
          <div className="relative">
            <h2 className="font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary sm:text-3xl">
              Want something similar for your business?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-text-secondary dark:text-dark-text-secondary">
              Share your sector, timeline, and budget band — we reply with a clear next step.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ShowcaseLink
                href="/contact?intent=consultation&source=portfolio-page"
                className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Get Free Consultation
              </ShowcaseLink>
              <ShowcaseLink
                href="https://wa.me/919667710954"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-border-secondary px-6 py-3 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary dark:hover:border-dark-border-primary"
              >
                Chat on WhatsApp
              </ShowcaseLink>
            </div>
            <p className="mt-6 text-xs text-text-tertiary dark:text-dark-text-tertiary">
              <ShowcaseLink href="/" className="font-semibold text-indigo-500 hover:text-indigo-400 dark:text-indigo-400">
                ← Back to home
              </ShowcaseLink>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
