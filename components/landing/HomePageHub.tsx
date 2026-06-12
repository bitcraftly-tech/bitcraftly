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
        Sab kuch alag pages par — home clean rakha hai
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
        Services, pricing calculator, about, portfolio, FAQ — har section apni dedicated page par. Yahan se seedha jao jo
        chahiye.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {HOME_HUB_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex h-full flex-col rounded-2xl border border-border-primary bg-bg-card p-5 transition duration-300 hover:-translate-y-0.5 hover:border-indigo-500/30 hover:shadow-[0_12px_28px_rgba(79,70,229,0.12)] dark:border-dark-border-primary dark:bg-dark-bg-card"
          >
            <span className="text-2xl">{item.icon}</span>
            <h3 className="mt-3 text-lg font-semibold text-text-primary group-hover:text-indigo-600 dark:text-dark-text-primary dark:group-hover:text-indigo-400">
              {item.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              {item.description}
            </p>
            <span className="mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400">Open page →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
