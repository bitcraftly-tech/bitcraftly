import Link from "next/link";

import { CONTAINER } from "@/lib/constants";
import { HOME_HUB_LINKS } from "@/lib/marketingRoutes";

export default function HomePageHub() {
  return (
    <section className={`${CONTAINER} scroll-mt-24 py-7 md:py-10`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
        Explore Bitcraftly
      </p>
      <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
        Find what you need in one click
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
        Start with pricing if you are planning a new website — then explore services, portfolio, or book a free
        consultation.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_HUB_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex h-full flex-col rounded-2xl border p-5 transition duration-300 hover:-translate-y-0.5 ${
              item.featured
                ? "border-indigo-500/40 bg-indigo-50/50 ring-1 ring-indigo-500/20 hover:border-indigo-500/50 hover:shadow-[0_12px_28px_rgba(79,70,229,0.18)] dark:border-indigo-400/30 dark:bg-indigo-950/25"
                : "border-border-primary bg-bg-card hover:border-indigo-500/30 hover:shadow-[0_12px_28px_rgba(79,70,229,0.12)] dark:border-dark-border-primary dark:bg-dark-bg-card"
            }`}
          >
            {item.featured ? (
              <span className="mb-1 w-fit rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Start here
              </span>
            ) : null}
            <span className="text-2xl">{item.icon}</span>
            <h3 className="mt-3 text-lg font-semibold text-text-primary group-hover:text-indigo-600 dark:text-dark-text-primary dark:group-hover:text-indigo-400">
              {item.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              {item.description}
            </p>
            <span className="mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {item.cta ?? "Learn more →"}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
