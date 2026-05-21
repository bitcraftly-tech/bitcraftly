"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CONTAINER, whatsappUrl } from "@/lib/constants";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";
import { BRAND, HERO, TRUST_CHECKS } from "@/lib/siteContent";

type NavPill = {
  name: string;
  icon: string;
  targetId: string;
  shellClass: string;
};

const navPills: NavPill[] = [
  { name: "Services", icon: "✨", targetId: "services", shellClass: "bg-indigo-500/10 border-indigo-500/30 hover:bg-indigo-500/20" },
  { name: "Portfolio", icon: "🖼️", targetId: "portfolio", shellClass: "bg-violet-500/10 border-violet-500/30 hover:bg-violet-500/20" },
  { name: "Founder", icon: "👤", targetId: "founder", shellClass: "bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20" },
  { name: "Pricing", icon: "💳", targetId: "fast-packages", shellClass: "bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20" },
];

const showcase = [
  {
    title: "React & Next.js websites",
    desc: "Fast, SEO-friendly, mobile-first builds for startups and growing brands.",
    stat: "Premium frontend delivery",
    glow: "from-indigo-500/25 to-violet-500/10",
  },
  {
    title: "Business & local websites",
    desc: "Trust-first layouts, clear CTAs, and WhatsApp lead flows for clinics, gyms, and shops.",
    stat: "Lead-focused builds",
    glow: "from-violet-500/25 to-purple-500/10",
  },
  {
    title: "AI-powered solutions",
    desc: "Chatbots, smart forms, and automation-ready architecture — practical, not gimmicky.",
    stat: "AI-ready when it helps",
    glow: "from-purple-500/25 to-fuchsia-500/10",
  },
  {
    title: "Website redesign",
    desc: "Modern UI, better speed, and mobile UX without losing your SEO footing.",
    stat: "Refresh & optimize",
    glow: "from-teal-500/25 to-emerald-500/10",
  },
  {
    title: "Ongoing maintenance",
    desc: "Updates, fixes, and performance checks so your site stays reliable after launch.",
    stat: "Monthly care plans",
    glow: "from-slate-500/20 to-indigo-500/15",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % showcase.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  const item = useMemo(() => showcase[active], [active]);

  const scrollToSection = (targetId: string) => {
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="about"
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
            <button
              key={p.name}
              type="button"
              onClick={() => scrollToSection(p.targetId)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm text-text-primary transition dark:text-dark-text-primary ${p.shellClass}`}
            >
              <span>{p.icon}</span>
              <span className="font-medium">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br blur-3xl ${item.glow}`} />
        <div className="relative rounded-3xl border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">What we build</p>
            <div className="flex gap-1.5">
              {showcase.map((_, idx) => (
                <span key={idx} className={`h-1.5 w-6 rounded-full ${idx === active ? "bg-accent-primary" : "bg-border-secondary dark:bg-dark-border-secondary"}`} />
              ))}
            </div>
          </div>
          <div className="mt-5 rounded-2xl border border-border-primary bg-bg-secondary p-5 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
            <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-text-secondary dark:text-dark-text-secondary">{item.desc}</p>
            <div className="mt-4 inline-flex rounded-full bg-bg-card px-3 py-1.5 text-xs font-medium text-text-secondary dark:bg-dark-bg-card dark:text-dark-text-secondary">
              {item.stat}
            </div>
          </div>
        </div>

        <div className="relative mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-xl border border-border-primary bg-bg-secondary/90 p-2 dark:border-dark-border-primary dark:bg-dark-bg-secondary/90">
            <div className="aspect-[16/11] overflow-hidden rounded-lg border border-border-primary/60 bg-bg-card dark:border-dark-border-primary/60 dark:bg-dark-bg-card">
              <div className="flex h-3.5 shrink-0 items-center gap-1 border-b border-border-primary/40 bg-bg-secondary px-1.5 dark:border-dark-border-primary/40 dark:bg-dark-bg-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400/90" aria-hidden />
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400/90" aria-hidden />
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/80" aria-hidden />
              </div>
              <div className="grid h-[calc(100%-0.875rem)] grid-cols-12 gap-1 p-1.5">
                <div className="col-span-5 rounded bg-indigo-500/15 dark:bg-indigo-400/20" />
                <div className="col-span-7 space-y-1">
                  <div className="h-1.5 rounded bg-border-secondary dark:bg-dark-border-secondary" />
                  <div className="h-1.5 w-[82%] rounded bg-border-secondary/80 dark:bg-dark-border-secondary/80" />
                  <div className="mt-1.5 grid grid-cols-2 gap-1">
                    <div className="aspect-square rounded bg-violet-500/12 dark:bg-violet-400/15" />
                    <div className="aspect-square rounded bg-violet-500/12 dark:bg-violet-400/15" />
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-1.5 text-center text-[10px] font-medium text-text-tertiary dark:text-dark-text-tertiary">Website mockup</p>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-border-primary bg-bg-secondary/90 p-2 dark:border-dark-border-primary dark:bg-dark-bg-secondary/90">
            <div className="relative h-[7.25rem] w-[3.35rem] shrink-0 rounded-[1rem] border-[3px] border-border-primary bg-bg-card shadow-sm dark:border-dark-border-primary dark:bg-dark-bg-card">
              <div className="absolute left-1/2 top-1.5 h-1 w-6 -translate-x-1/2 rounded-full bg-border-secondary dark:bg-dark-border-secondary" aria-hidden />
              <div className="mx-1 mt-5 space-y-1 rounded-md bg-bg-secondary p-1 dark:bg-dark-bg-secondary">
                <div className="h-1 rounded bg-indigo-500/25 dark:bg-indigo-400/25" />
                <div className="h-6 rounded bg-gradient-to-br from-indigo-500/15 to-violet-500/10" />
                <div className="h-1 w-2/3 rounded bg-border-secondary/70 dark:bg-dark-border-secondary/70" />
              </div>
            </div>
            <p className="mt-auto pt-2 text-center text-[10px] font-medium text-text-tertiary dark:text-dark-text-tertiary">App preview</p>
          </div>

          <div className="rounded-xl border border-border-primary bg-bg-secondary/90 p-2 dark:border-dark-border-primary dark:bg-dark-bg-secondary/90">
            <div className="aspect-square overflow-hidden rounded-lg border border-border-primary/60 bg-bg-card dark:border-dark-border-primary/60 dark:bg-dark-bg-card">
              <div className="flex h-full flex-col bg-gradient-to-br from-slate-500/10 via-bg-secondary to-emerald-500/10 p-2 dark:from-slate-400/10 dark:via-dark-bg-secondary dark:to-emerald-500/10">
                <div className="h-2 w-2/3 rounded bg-text-primary/15 dark:bg-dark-text-primary/15" />
                <div className="mt-2 grid flex-1 grid-cols-2 gap-1">
                  <div className="rounded bg-teal-500/15 dark:bg-teal-400/15" />
                  <div className="rounded bg-indigo-500/15 dark:bg-indigo-400/15" />
                  <div className="col-span-2 rounded bg-violet-500/12 dark:bg-violet-400/15" />
                </div>
              </div>
            </div>
            <p className="mt-1.5 text-center text-[10px] font-medium text-text-tertiary dark:text-dark-text-tertiary">Recent work</p>
          </div>
        </div>
      </div>
    </section>
  );
}
