import Link from "next/link";
import { CONTAINER, SECTION_PY_CTA, SECTION_SCROLL_MT, whatsappUrl } from "@/lib/constants";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";
import { BRAND } from "@/lib/siteContent";

export default function FinalCTA() {
  return (
    <section id="contact-cta" className={`${CONTAINER} ${SECTION_SCROLL_MT} border-t border-border-primary ${SECTION_PY_CTA} dark:border-dark-border-primary`}>
      <div className="relative w-full overflow-hidden rounded-3xl border border-border-primary bg-bg-card px-6 py-8 dark:border-dark-border-primary dark:bg-dark-bg-card sm:px-8 sm:py-10 md:flex md:items-center md:justify-between md:gap-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10" />
        <div className="relative min-w-0 flex-1 text-left">
          <h2 className="font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary sm:text-3xl md:max-w-2xl">
            {BRAND.ctaHeadline}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
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
        <div className="relative mt-8 flex shrink-0 flex-wrap items-center gap-3 md:mt-0 md:justify-end">
          <Link
            href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
            target="_blank"
            rel="noreferrer"
            className="bc-btn bc-btn-primary w-full px-6 py-3 sm:w-auto"
          >
            Message on WhatsApp
          </Link>
          <Link
            href="/contact?intent=consultation&source=bottom-cta"
            className="bc-btn bc-btn-secondary w-full px-6 py-3 sm:w-auto"
          >
            Free consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
