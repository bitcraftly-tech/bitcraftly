import Link from "next/link";

import { CONTAINER, whatsappUrl } from "@/lib/constants";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";
import { SERVICES, SERVICES_SECTION } from "@/lib/siteContent";

export default function ServicesGrid() {
  return (
    <section id="services" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-6 dark:border-dark-border-primary lg:py-8`}>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">{SERVICES_SECTION.eyebrow}</p>
        <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">{SERVICES_SECTION.headline}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">{SERVICES_SECTION.subheadline}</p>
        <p className="mt-3 max-w-3xl text-sm font-medium text-indigo-600/90 dark:text-indigo-400/90">{SERVICES_SECTION.premiumLine}</p>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">{SERVICES_SECTION.startupMessage}</p>
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">{SERVICES_SECTION.aiMessage}</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((item) => (
          <article
            key={item.title}
            className="flex flex-col rounded-2xl border border-border-primary bg-bg-card p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(2,6,23,0.08)] dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:shadow-[0_12px_26px_rgba(2,6,23,0.35)]"
          >
            <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border text-xl ${item.accent}`}>
              <span aria-hidden>{item.icon}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-text-primary dark:text-dark-text-primary">{item.title}</h3>
            <p className="sr-only">{item.seoLine}</p>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:hidden">{item.shortDesc}</p>
            <p className="mt-2 hidden text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:block">{item.desc}</p>
            <ul className="mt-3 space-y-1.5">
              {item.benefits.map((b) => (
                <li key={b} className="flex items-start gap-1.5 text-xs text-text-secondary dark:text-dark-text-secondary">
                  <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden>
                    ✔
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-4">
              <Link
                href={`/contact?service=${encodeURIComponent(item.contactSlug)}&intent=quote&source=services-card`}
                className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                {item.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex w-full flex-col gap-4 rounded-2xl border border-border-primary bg-bg-secondary/35 px-6 py-5 dark:border-dark-border-primary dark:bg-dark-bg-secondary/25 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{SERVICES_SECTION.sectionCta}</p>
          <p className="mt-1 max-w-2xl text-xs text-text-secondary dark:text-dark-text-secondary">{SERVICES_SECTION.sectionCtaBody}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/contact?intent=consultation&source=services-section"
            className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
          >
            {SERVICES_SECTION.sectionCtaPrimary}
          </Link>
          <Link
            href={whatsappUrl(WHATSAPP_MESSAGES.services)}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-border-secondary px-4 py-2.5 text-sm font-semibold text-text-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
          >
            {SERVICES_SECTION.sectionCtaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
