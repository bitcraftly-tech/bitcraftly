"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CONTAINER } from "@/lib/constants";

type NavPill = {
  name: string;
  icon: string;
  targetId: string;
  shellClass: string;
};

const navPills: NavPill[] = [
  { name: "Services", icon: "✨", targetId: "services", shellClass: "bg-indigo-500/10 border-indigo-500/30 hover:bg-indigo-500/20" },
  { name: "Portfolio", icon: "🖼️", targetId: "portfolio", shellClass: "bg-violet-500/10 border-violet-500/30 hover:bg-violet-500/20" },
  { name: "Why Us", icon: "⭐", targetId: "why-us", shellClass: "bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20" },
  { name: "Pricing", icon: "💳", targetId: "pricing", shellClass: "bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20" },
];

const trustChecks = [
  "18+ Years Experience",
  "Modern UI/UX",
  "Fast Delivery",
  "Mobile Friendly",
];

const showcase = [
  {
    title: "Business websites",
    desc: "Trust-first layouts, clear calls-to-action, and WhatsApp-ready contact flows.",
    stat: "Lead-focused builds",
    glow: "from-indigo-500/25 to-violet-500/10",
  },
  {
    title: "Ecommerce stores",
    desc: "Product storytelling, smooth checkout paths, and mobile-first shopping.",
    stat: "Sell online with confidence",
    glow: "from-violet-500/25 to-purple-500/10",
  },
  {
    title: "Mobile apps",
    desc: "Android & iOS experiences aligned with how your customers already behave on their phones.",
    stat: "Shipped as one roadmap",
    glow: "from-purple-500/25 to-fuchsia-500/10",
  },
  {
    title: "Maintenance & growth",
    desc: "Updates, SEO basics, and WhatsApp Business wiring so customers can reach you faster after launch.",
    stat: "Ongoing partnership",
    glow: "from-teal-500/25 to-emerald-500/10",
  },
  {
    title: "Customer enquiries",
    desc: "Quick replies on your site with a clean handoff to WhatsApp when customers want to talk to someone on your team.",
    stat: "Practical, not flashy",
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
            Website &amp; app solutions · Jamshedpur
          </span>
        </div>

        <h1 className="mt-6 font-[var(--font-playfair)] text-3xl font-semibold leading-tight text-text-primary dark:text-dark-text-primary sm:text-4xl lg:text-5xl">
          Professional Websites &amp; Apps That Grow Your Business
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary dark:text-dark-text-secondary lg:mx-0 lg:text-lg">
          Bitcraftly helps businesses in Jamshedpur &amp; across India build modern websites, ecommerce stores, mobile apps and practical digital solutions that drive real growth.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm italic leading-relaxed text-text-tertiary dark:text-dark-text-tertiary lg:mx-0">
          Clear scope, written estimates, and friendly English–Hinglish on calls or WhatsApp — whichever you prefer.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
          <Link
            href="/contact?intent=consultation&source=hero"
            className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Get Free Consultation
          </Link>
          <Link
            href="https://wa.me/919667710954"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-border-secondary px-6 py-3 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary dark:hover:border-dark-border-primary"
          >
            Chat on WhatsApp
          </Link>
        </div>

        <ul className="mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-text-secondary dark:text-dark-text-secondary lg:mx-0 lg:justify-start">
          {trustChecks.map((t) => (
            <li key={t} className="inline-flex items-center gap-1.5">
              <span className="text-emerald-600 dark:text-emerald-400" aria-hidden>
                ✔
              </span>
              {t}
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-4 max-w-xl text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary lg:mx-0">
          Led by a frontend developer with 18+ years of IT industry experience.
        </p>

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
      </div>
    </section>
  );
}
