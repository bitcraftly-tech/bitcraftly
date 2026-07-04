import Link from "next/link";

import { CONTAINER, SECTION_PY_CTA, SECTION_SCROLL_MT, whatsappUrl } from "@/lib/constants";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";
import { BRAND } from "@/lib/siteContent";

export default function FinalCTA() {
  return (
    <section
      id="contact-cta"
      className={`${CONTAINER} ${SECTION_SCROLL_MT} border-t border-border-primary ${SECTION_PY_CTA} dark:border-dark-border-primary`}
    >
      <div className="relative flex w-full flex-col gap-6 overflow-hidden rounded-3xl border border-border-primary bg-bg-card px-6 py-8 dark:border-dark-border-primary dark:bg-dark-bg-card sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />

        <div className="relative w-full text-left">
          <h2 className="w-full max-w-none font-[var(--font-playfair)] text-2xl font-semibold text-text-primary dark:text-dark-text-primary sm:text-3xl">
            {BRAND.ctaHeadline}
          </h2>
          <p className="mt-4 w-full max-w-none text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
            WhatsApp par quick sawal — ya free consultation book karo. Scope, timeline, aur written estimate clear milega.
          </p>
          <p className="mt-5 text-xs text-text-tertiary dark:text-dark-text-tertiary">
            Prefer a call?{" "}
            <a href="tel:+919667710954" className="font-semibold text-indigo-500 hover:text-indigo-400 dark:text-indigo-400">
              +91 96677 10954
            </a>
            {" · "}
            {BRAND.whatsappHours}
            {" · "}
            <Link href="/contact" className="font-semibold text-indigo-500 hover:text-indigo-400 dark:text-indigo-400">
              Contact form
            </Link>
          </p>
        </div>

        <div className="relative flex w-full flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[2.875rem] w-full items-center justify-center rounded-full bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgb(79_70_229_/_0.28)] transition hover:-translate-y-px hover:opacity-95 sm:w-auto"
          >
            Message on WhatsApp
          </Link>
          <Link
            href="/contact?intent=consultation&source=bottom-cta"
            className="inline-flex min-h-[2.875rem] w-full items-center justify-center rounded-full border border-border-secondary bg-bg-card px-6 py-2.5 text-sm font-semibold text-text-primary transition hover:-translate-y-px hover:bg-bg-secondary dark:border-dark-border-secondary dark:bg-dark-bg-card dark:text-dark-text-primary dark:hover:bg-dark-bg-secondary sm:w-auto"
          >
            Free consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
