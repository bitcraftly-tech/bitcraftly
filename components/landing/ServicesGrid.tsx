import { CONTAINER } from "@/lib/constants";
import { SERVICES } from "@/lib/siteContent";

export default function ServicesGrid() {
  return (
    <section id="services" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-6 dark:border-dark-border-primary lg:py-8`}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Services</p>
        <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
          React, Next.js &amp; AI-powered solutions for modern businesses
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
          Founder-led frontend studio from Ghaziabad — clear scope, solid delivery, and support for startups, local businesses,
          clinics, gyms, coaches, and agencies. English ya Hinglish — jo aapko comfortable ho.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-border-primary bg-bg-card p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(2,6,23,0.08)] dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:shadow-[0_12px_26px_rgba(2,6,23,0.35)]"
          >
            <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border text-xl ${item.accent}`}>
              <span aria-hidden>{item.icon}</span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-text-primary dark:text-dark-text-primary">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
