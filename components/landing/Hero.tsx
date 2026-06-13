import dynamic from "next/dynamic";
import Link from "next/link";

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
  icon: string;
  href: string;
  shellClass: string;
};

const navPills: NavPill[] = [
  { name: "Pricing", icon: "💳", href: "/pricing", shellClass: "bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20" },
  { name: "Services", icon: "✨", href: "/services", shellClass: "bg-indigo-500/10 border-indigo-500/30 hover:bg-indigo-500/20" },
  { name: "Portfolio", icon: "🖼️", href: "/portfolio", shellClass: "bg-violet-500/10 border-violet-500/30 hover:bg-violet-500/20" },
  { name: "About", icon: "👤", href: "/about", shellClass: "bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20" },
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

        <h1 className="mt-6 font-[var(--font-playfair)] text-3xl font-semibold leading-tight text-text-primary dark:text-dark-text-primary sm:text-4xl lg:text-5xl">
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

        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
          {navPills.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm text-text-primary transition dark:text-dark-text-primary ${p.shellClass}`}
            >
              <span>{p.icon}</span>
              <span className="font-medium">{p.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <HeroShowcase />
    </section>
  );
}
