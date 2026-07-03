import Link from "next/link";

import { whatsappUrl, WHATSAPP_HOURS } from "@/lib/constants";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";

export default function FooterCtaBand() {
  return (
    <div className="bc-footer-cta relative overflow-hidden rounded-2xl border border-indigo-500/15 bg-gradient-to-br from-white via-indigo-50/40 to-violet-50/30 px-5 py-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_16px_48px_-16px_rgba(79,70,229,0.18)] dark:border-indigo-400/15 dark:from-indigo-950/30 dark:via-dark-bg-card dark:to-violet-950/20 sm:px-8 sm:py-8">
      <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-indigo-400/15 blur-3xl dark:bg-indigo-500/10" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 -left-12 size-48 rounded-full bg-violet-400/10 blur-3xl dark:bg-violet-500/10" aria-hidden />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
            Ready to start?
          </p>
          <h2 className="mt-2.5 font-[var(--font-playfair)] text-xl font-semibold leading-snug text-text-primary dark:text-dark-text-primary sm:text-2xl">
            Packages from ₹8,999 — written quote before payment
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
            Compare pricing, pick a package, or WhatsApp Sanjay — same-day reply {WHATSAPP_HOURS}.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2.5">
          <Link href="/pricing#pricing-compare" className="bc-btn bc-btn-primary px-5 py-2.5 text-sm shadow-[0_4px_14px_rgba(79,70,229,0.25)]">
            View pricing →
          </Link>
          <Link
            href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
            target="_blank"
            rel="noreferrer"
            data-wa-source="footer-cta-whatsapp"
            className="bc-btn bc-btn-secondary px-5 py-2.5 text-sm"
          >
            WhatsApp
          </Link>
          <Link
            href="/contact?intent=quote&source=footer-cta"
            className="rounded-full border border-border-secondary bg-white/80 px-5 py-2.5 text-sm font-semibold text-text-primary backdrop-blur-sm transition hover:border-indigo-300 hover:bg-white dark:border-dark-border-secondary dark:bg-dark-bg-card/80 dark:text-dark-text-primary dark:hover:border-indigo-500/40"
          >
            Get quote
          </Link>
        </div>
      </div>
    </div>
  );
}
