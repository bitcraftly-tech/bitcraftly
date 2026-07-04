import Link from "next/link";
import { ArrowRight } from "lucide-react";

import MarketingSectionLink from "@/components/landing/MarketingSectionLink";

import { whatsappUrl, WHATSAPP_HOURS } from "@/lib/constants";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";

export default function FooterCtaBand() {
  return (
    <div className="bc-footer-cta mb-10 md:mb-12">
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/10 bg-gradient-to-br from-slate-50 via-white to-indigo-50/70 p-[1px] shadow-[0_8px_40px_-20px_rgba(79,70,229,0.22)] dark:border-indigo-400/10 dark:from-dark-bg-secondary/80 dark:via-dark-bg-card dark:to-indigo-950/25">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_0%_0%,rgba(99,102,241,0.14),transparent_55%),radial-gradient(ellipse_50%_45%_at_100%_100%,rgba(139,92,246,0.1),transparent_50%)] dark:bg-[radial-gradient(ellipse_70%_55%_at_0%_0%,rgba(99,102,241,0.18),transparent_55%),radial-gradient(ellipse_50%_45%_at_100%_100%,rgba(139,92,246,0.12),transparent_50%)]"
          aria-hidden
        />

        <div className="relative flex flex-col gap-8 rounded-[calc(1.5rem-1px)] bg-white/75 px-6 py-8 backdrop-blur-sm dark:bg-dark-bg-card/80 sm:px-9 sm:py-10">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/15 bg-indigo-500/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-700 dark:border-indigo-400/20 dark:bg-indigo-500/10 dark:text-indigo-300">
              Ready to start?
            </div>
            <h2 className="mt-4 w-full max-w-none font-[var(--font-playfair)] text-2xl font-semibold leading-snug text-text-primary dark:text-dark-text-primary sm:text-[1.75rem]">
              Packages from ₹8,999 — written quote before payment
            </h2>
            <p className="mt-3 w-full max-w-none text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
              Compare pricing, pick a package, or WhatsApp Sanjay — same-day reply {WHATSAPP_HOURS}.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 border-t border-border-primary/50 pt-6 dark:border-dark-border-primary/50 sm:flex-row sm:flex-wrap sm:items-center">
            <MarketingSectionLink
              path="/pricing"
              sectionId="pricing-compare"
              className="marketing-hero-btn marketing-hero-btn--primary"
            >
              View pricing
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </MarketingSectionLink>            <Link
              href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
              target="_blank"
              rel="noreferrer"
              data-wa-source="footer-cta-whatsapp"
              className="marketing-hero-btn marketing-hero-btn--secondary"
            >
              WhatsApp
            </Link>
            <Link
              href="/contact?intent=quote&source=footer-cta"
              className="marketing-hero-btn marketing-hero-btn--secondary"
            >
              Get quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
