import Link from "next/link";

import FounderAvatar from "@/components/landing/FounderAvatar";
import { CONTAINER, FOUNDER_LINKEDIN_URL } from "@/lib/constants";
import { FOUNDER } from "@/lib/siteContent";

export default function FounderSection() {
  return (
    <section id="founder" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-6 dark:border-dark-border-primary lg:py-8`}>
      <div className="grid items-start gap-8 rounded-2xl border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card md:grid-cols-[auto_1fr] md:gap-10 md:p-8">
        <FounderAvatar size="lg" className="mx-auto md:mx-0" />
        <div className="text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
            Founder-led studio
          </p>
          <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary sm:text-3xl">
            {FOUNDER.name}
          </h2>
          <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">{FOUNDER.title}</p>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{FOUNDER.bio}</p>
          <p className="mt-3 text-sm italic leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">{FOUNDER.bioHinglish}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Link
              href="/contact?intent=consultation&source=founder"
              className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Talk to the founder
            </Link>
            <Link href="/team" className="rounded-xl border border-border-secondary px-5 py-2.5 text-sm font-semibold text-text-primary dark:border-dark-border-secondary dark:text-dark-text-primary">
              About Bitcraftly
            </Link>
            {FOUNDER_LINKEDIN_URL ? (
              <a
                href={FOUNDER_LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
              >
                LinkedIn →
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
