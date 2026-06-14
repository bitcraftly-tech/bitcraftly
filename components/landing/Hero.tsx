import dynamic from "next/dynamic";
import Link from "next/link";
import { CreditCard, LayoutGrid, Sparkles, User } from "lucide-react";
import type { ReactNode } from "react";

import { CONTAINER, whatsappUrl } from "@/lib/constants";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";
import { BRAND, HERO, TRUST_CHECKS } from "@/lib/siteContent";

const HeroShowcase = dynamic(() => import("@/components/landing/HeroShowcase"), {
  loading: () => (
    <div
      className="min-h-[220px] rounded-2xl border border-border-primary bg-bg-card/60 dark:border-dark-border-primary dark:bg-dark-bg-card/60 lg:min-h-[280px]"
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
      className={`${CONTAINER} scroll-mt-24 grid min-h-[41vh] items-center gap-6 py-4 lg:grid-cols-2 lg:py-6`}
    >
      <div className="text-center lg:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-bg-card px-4 py-2 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium uppercase tracking-[0.1em] text-text-secondary dark:text-dark-text-secondary">
            {HERO.badge}
          </span>
        </div>

        <h1 className="mt-6 font-sans-brand text-3xl font-semibold leading-tight text-text-primary dark:text-dark-text-primary sm:font-[var(--font-playfair)] sm:text-4xl lg:text-5xl">
          <span className="sm:hidden">{HERO.mobileHeadline}</span>
          <span className="hidden sm:inline">{HERO.headline}</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary dark:text-dark-text-secondary lg:mx-0 lg:text-lg">
          {HERO.subheadline}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm italic leading-relaxed text-text-tertiary dark:text-dark-text-tertiary lg:mx-0">
          {HERO.trustLine} — {BRAND.whatsappHours}.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
          <Link
            href="/contact?intent=consultation&source=hero"
            className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            {HERO.primaryCta}
          </Link>
          <Link
            href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
            data-wa-source="hero-whatsapp"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-border-secondary px-6 py-3 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary dark:hover:border-dark-border-primary"
          >
            {HERO.secondaryCta}
          </Link>
        </div>

        <ul className="mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-text-secondary dark:text-dark-text-secondary lg:mx-0 lg:justify-start">
          {TRUST_CHECKS.map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>
                ✔
              </span>
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
          {navPills.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-border-primary/80 bg-bg-card/90 px-3 py-2 text-xs font-medium text-text-secondary shadow-sm transition hover:border-indigo-500/35 hover:text-indigo-600 dark:border-dark-border-primary/80 dark:bg-dark-bg-card/90 dark:text-dark-text-secondary dark:hover:border-indigo-400/35 dark:hover:text-indigo-400"
            >
              {p.icon}
              <span>{p.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <HeroShowcase />
    </section>
  );
}
