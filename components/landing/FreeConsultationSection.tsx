import Link from "next/link";

import { CONTAINER, whatsappUrl } from "@/lib/constants";
import { FREE_CONSULTATION, WHATSAPP_MESSAGES } from "@/lib/leadGen";

export default function FreeConsultationSection() {
  return (
    <section id={FREE_CONSULTATION.id} className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-6 dark:border-dark-border-primary lg:py-8`}>
      <div className="grid gap-8 rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/8 via-bg-card to-purple-500/8 p-6 dark:from-indigo-500/10 dark:via-dark-bg-card dark:to-purple-500/10 md:grid-cols-[1fr_auto] md:items-center md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">{FREE_CONSULTATION.eyebrow}</p>
          <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary sm:text-3xl">{FREE_CONSULTATION.headline}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{FREE_CONSULTATION.body}</p>
          <ul className="mt-4 space-y-2">
            {FREE_CONSULTATION.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>
                  ✔
                </span>
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-text-tertiary dark:text-dark-text-tertiary">{FREE_CONSULTATION.microcopy}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
          <Link
            href="/contact?intent=consultation&source=free-consultation"
            className="inline-flex justify-center rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            {FREE_CONSULTATION.primaryCta}
          </Link>
          <Link
            href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center rounded-xl border border-border-secondary px-6 py-3 text-sm font-semibold text-text-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
          >
            {FREE_CONSULTATION.secondaryCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
