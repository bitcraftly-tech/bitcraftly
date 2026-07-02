import dynamic from "next/dynamic";
import Link from "next/link";
import { CreditCard, LayoutGrid, Sparkles, User } from "lucide-react";
import type { ReactNode } from "react";

import { CONTAINER, SECTION_SCROLL_MT, whatsappUrl } from "@/lib/constants";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";
import { BRAND, HERO, TRUST_CHECKS } from "@/lib/siteContent";

const HeroShowcase = dynamic(() => import("@/components/landing/HeroShowcase"), {
  loading: () => (
    <div
      className="bc-skeleton min-h-[220px] rounded-2xl border border-border-primary dark:border-dark-border-primary lg:min-h-[280px]"
      aria-hidden
    />
  ),
});

type NavPill = {
  name: string;
  icon: ReactNode;
  href: string;
};

const navPills: NavPill[] = [
  { name: "Pricing", icon: <CreditCard className="size-3.5" aria-hidden />, href: "/pricing" },
  { name: "Services", icon: <Sparkles className="size-3.5" aria-hidden />, href: "/services" },
  { name: "Portfolio", icon: <LayoutGrid className="size-3.5" aria-hidden />, href: "/portfolio" },
  { name: "About", icon: <User className="size-3.5" aria-hidden />, href: "/about" },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className={`${CONTAINER} ${SECTION_SCROLL_MT} grid min-h-0 items-center gap-6 py-4 sm:min-h-[41vh] lg:grid-cols-2 lg:py-6`}
    >
      <div className="min-w-0 text-center lg:text-left">
        <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-border-primary bg-bg-card px-3 py-2 sm:px-4 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-text-secondary sm:text-xs sm:tracking-[0.1em] dark:text-dark-text-secondary">
            <span className="sm:hidden">{HERO.mobileBadge}</span>
            <span className="hidden sm:inline">{HERO.badge}</span>
          </span>
        </div>

        <h1 className="mt-5 text-balance break-words font-sans-brand text-[1.65rem] font-semibold leading-[1.15] text-text-primary sm:mt-6 sm:text-3xl sm:font-[var(--font-playfair)] md:text-4xl lg:text-5xl dark:text-dark-text-primary">
          <span className="sm:hidden">{HERO.mobileHeadline}</span>
          <span className="hidden sm:inline">{HERO.headline}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-text-secondary sm:mt-5 sm:text-base sm:leading-7 lg:mx-0 lg:text-lg dark:text-dark-text-secondary">
          {HERO.subheadline}
        </p>
        <p className="mx-auto mt-2 max-w-2xl text-xs italic leading-relaxed text-text-tertiary sm:mt-3 sm:text-sm lg:mx-0 dark:text-dark-text-tertiary">
          {HERO.trustLine} — {BRAND.whatsappHours}.
        </p>

        <div className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center lg:mx-0 lg:justify-start">
          <Link
            href="/contact?intent=consultation&source=hero"
            className="bc-btn bc-btn-primary w-full px-6 py-3 sm:w-auto"
          >
            {HERO.primaryCta}
          </Link>
          <Link
            href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
            data-wa-source="hero-whatsapp"
            target="_blank"
            rel="noreferrer"
            className="bc-btn bc-btn-secondary w-full px-6 py-3 sm:w-auto"
          >
            {HERO.secondaryCta}
          </Link>
        </div>

        <ul className="mx-auto mt-4 grid max-w-md grid-cols-2 gap-x-2 gap-y-2 text-left text-[11px] text-text-secondary sm:mt-5 sm:max-w-xl sm:flex sm:flex-wrap sm:justify-center sm:gap-x-4 sm:gap-y-2 sm:text-xs lg:mx-0 lg:justify-start dark:text-dark-text-secondary">
          {TRUST_CHECKS.map((t) => (
            <li key={t} className="inline-flex min-w-0 items-center gap-1.5">
              <span className="shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden>
                ✔
              </span>
              <span className="min-w-0">{t}</span>
            </li>
          ))}
        </ul>

        <div className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible lg:justify-start [&::-webkit-scrollbar]:hidden">
          {navPills.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border border-border-primary/80 bg-bg-card/90 px-4 py-2 text-xs font-medium text-text-secondary shadow-sm transition hover:border-indigo-500/35 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary dark:border-dark-border-primary/80 dark:bg-dark-bg-card/90 dark:text-dark-text-secondary dark:hover:border-indigo-400/35 dark:hover:text-indigo-400"
            >
              {p.icon}
              <span>{p.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="min-w-0">
        <HeroShowcase />
      </div>
    </section>
  );
}
