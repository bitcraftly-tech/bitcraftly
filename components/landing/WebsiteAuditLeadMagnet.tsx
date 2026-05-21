import Link from "next/link";

import { CONTAINER, whatsappUrl } from "@/lib/constants";
import { WEBSITE_AUDIT, WHATSAPP_MESSAGES } from "@/lib/leadGen";

export default function WebsiteAuditLeadMagnet() {
  return (
    <section id={WEBSITE_AUDIT.id} className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-6 dark:border-dark-border-primary lg:py-8`}>
      <div className="rounded-2xl border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card md:p-8">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-600 dark:text-emerald-400">{WEBSITE_AUDIT.eyebrow}</p>
            <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary sm:text-3xl">{WEBSITE_AUDIT.headline}</h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{WEBSITE_AUDIT.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/contact?intent=${WEBSITE_AUDIT.formIntent}&source=audit-magnet`}
                className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
              >
                {WEBSITE_AUDIT.primaryCta}
              </Link>
              <Link
                href={whatsappUrl(WHATSAPP_MESSAGES.audit)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-border-secondary px-5 py-2.5 text-sm font-semibold text-text-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
              >
                {WEBSITE_AUDIT.secondaryCta}
              </Link>
            </div>
          </div>
          <div className="rounded-xl border border-border-primary bg-bg-secondary/40 p-5 dark:border-dark-border-primary dark:bg-dark-bg-secondary/30">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-tertiary dark:text-dark-text-tertiary">You receive</p>
            <ul className="mt-3 space-y-3">
              {WEBSITE_AUDIT.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400" aria-hidden>
                    →
                  </span>
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs italic text-text-tertiary dark:text-dark-text-tertiary">
              Audit is a practical review — not an automated PDF spam funnel. Real feedback from the founder.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
