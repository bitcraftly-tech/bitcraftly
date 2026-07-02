import Link from "next/link";

import FounderAvatar from "@/components/landing/FounderAvatar";
import { CONTAINER, FOUNDER_LINKEDIN_URL, SECTION_PY_COMPACT, SECTION_SCROLL_MT, whatsappUrl } from "@/lib/constants";
import { WHATSAPP_MESSAGES } from "@/lib/leadGen";
import { FOUNDER } from "@/lib/siteContent";

export default function FounderSection() {
  return (
    <section id="founder" className={`${CONTAINER} ${SECTION_SCROLL_MT} border-t border-border-primary ${SECTION_PY_COMPACT} dark:border-dark-border-primary`}>
      <div className="space-y-6">
        <article className="overflow-hidden rounded-2xl border border-border-primary bg-bg-card dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-start lg:gap-8">
            <FounderAvatar size="lg" className="mx-auto shrink-0 lg:mx-0" />

            <div className="min-w-0 flex-1 text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
                {FOUNDER.sectionEyebrow}
              </p>
              <h2 className="mt-2 font-[var(--font-playfair)] text-2xl leading-snug text-text-primary dark:text-dark-text-primary sm:text-3xl">
                {FOUNDER.introHeadline}
              </h2>

              <div className="mt-4 rounded-xl border border-border-primary/70 bg-bg-secondary/45 px-4 py-3 dark:border-dark-border-primary/70 dark:bg-dark-bg-secondary/35 sm:px-5">
                <p className="text-sm font-semibold leading-relaxed text-text-primary dark:text-dark-text-primary">
                  Led by {FOUNDER.name} — {FOUNDER.yearsExperience} years in frontend &amp; product delivery.
                </p>
                <p className="mt-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">{FOUNDER.shortTitle}</p>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary md:hidden">
                {FOUNDER.mobileConcise}
              </p>
              <p className="mt-4 hidden text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary md:block">
                {FOUNDER.introParagraph}
              </p>

              <div className="mt-6 flex flex-col gap-4 border-t border-border-primary/80 pt-6 dark:border-dark-border-primary/80 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:justify-start lg:gap-x-6 lg:gap-y-3">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <Link
                    href="/contact?intent=consultation&source=founder"
                    className="bc-btn bc-btn-primary px-5 py-2.5 text-sm"
                  >
                    {FOUNDER.primaryCta}
                  </Link>
                  <Link
                    href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bc-btn bc-btn-secondary px-5 py-2.5 text-sm"
                  >
                    {FOUNDER.secondaryCta}
                  </Link>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm font-semibold sm:justify-start">
                  <Link href="/team" className="text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400">
                    Meet the founder →
                  </Link>
                  {FOUNDER_LINKEDIN_URL ? (
                    <a
                      href={FOUNDER_LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
                    >
                      {FOUNDER.linkedInLabel} →
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="rounded-2xl border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card md:p-8">
          <div className="space-y-4 text-center sm:text-left">
            <div className="rounded-xl border border-border-primary/80 bg-bg-secondary/50 px-4 py-4 dark:border-dark-border-primary/80 dark:bg-dark-bg-secondary/40 sm:px-5">
              <p className="text-base font-semibold text-text-primary dark:text-dark-text-primary">{FOUNDER.name}</p>
              <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">{FOUNDER.title}</p>
              <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">{FOUNDER.shortBio}</p>
            </div>

            <p className="hidden text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary md:block">{FOUNDER.story}</p>

            <div className="hidden rounded-xl border border-border-primary/80 bg-bg-card p-4 dark:border-dark-border-primary/80 dark:bg-dark-bg-card md:block sm:p-5">
              <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{FOUNDER.authorityHeadline}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{FOUNDER.authorityBio}</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {FOUNDER.authorityBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                    <span className="mt-0.5 shrink-0 font-semibold text-indigo-600 dark:text-indigo-400" aria-hidden>
                      →
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm font-medium text-indigo-600/90 dark:text-indigo-400/90">{FOUNDER.premiumLine}</p>
            <p className="text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{FOUNDER.premiumPositioning}</p>
            <p className="text-sm italic leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">{FOUNDER.bioHinglish}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border-primary bg-bg-secondary/40 p-6 dark:border-dark-border-primary dark:bg-dark-bg-secondary/30 md:p-8">
          <h3 className="font-[var(--font-playfair)] text-xl text-text-primary dark:text-dark-text-primary">{FOUNDER.whyStartedTitle}</h3>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{FOUNDER.whyStarted}</p>
        </div>

        <div>
          <h3 className="font-[var(--font-playfair)] text-lg text-text-primary dark:text-dark-text-primary">Experience & expertise</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {FOUNDER.experienceHighlights.map((item) => (
              <li
                key={item.title}
                className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card"
              >
                <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">{item.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FOUNDER.achievements.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card"
            >
              <p className="font-[var(--font-playfair)] text-xl font-semibold text-text-primary dark:text-dark-text-primary">{item.value}</p>
              <p className="mt-1 text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">{item.label}</p>
            </div>
          ))}
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {FOUNDER.trustPoints.map((point) => (
            <li
              key={point}
              className="flex items-start gap-2 rounded-xl border border-border-primary bg-bg-card p-4 text-sm leading-relaxed text-text-secondary dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-secondary"
            >
              <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden>
                ✔
              </span>
              {point}
            </li>
          ))}
        </ul>

        {FOUNDER_LINKEDIN_URL ? (
          <div className="rounded-2xl border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">LinkedIn</p>
            <p className="mt-2 font-[var(--font-playfair)] text-lg text-text-primary dark:text-dark-text-primary">{FOUNDER.name}</p>
            <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">{FOUNDER.shortTitle}</p>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{FOUNDER.linkedInSummary}</p>
            <a
              href={FOUNDER_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              {FOUNDER.linkedInLabel} →
            </a>
          </div>
        ) : null}

        <div className="flex w-full flex-col gap-4 rounded-2xl border border-border-primary bg-bg-card px-6 py-6 dark:border-dark-border-primary dark:bg-dark-bg-card sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="text-left">
            <p className="font-[var(--font-playfair)] text-lg font-semibold text-text-primary dark:text-dark-text-primary">{FOUNDER.ctaTitle}</p>
            <p className="mt-2 max-w-2xl text-sm text-text-secondary dark:text-dark-text-secondary">{FOUNDER.ctaBody}</p>
            <p className="mt-2 text-xs text-text-tertiary dark:text-dark-text-tertiary">{FOUNDER.ctaMicrocopy}</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="/contact?intent=consultation&source=founder-cta"
              className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
            >
              {FOUNDER.primaryCta}
            </Link>
            <Link
              href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-border-secondary px-5 py-2.5 text-sm font-semibold text-text-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
            >
              {FOUNDER.secondaryCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
