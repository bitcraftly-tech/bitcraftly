"use client";

import { useEffect, useMemo, useState } from "react";
import { CONTAINER } from "@/lib/constants";

type ServicePill = {
  name: string;
  icon: string;
  targetId: string;
  shellClass: string;
};

const servicePills: ServicePill[] = [
  { name: "Websites", icon: "🌐", targetId: "websites", shellClass: "bg-indigo-500/10 border-indigo-500/30 hover:bg-indigo-500/20" },
  { name: "Mobile Apps", icon: "📱", targetId: "mobile-apps", shellClass: "bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20" },
  { name: "AI Automation", icon: "🤖", targetId: "ai-automation", shellClass: "bg-pink-500/10 border-pink-500/30 hover:bg-pink-500/20" },
  { name: "Smart Parking", icon: "🚗", targetId: "smart-parking", shellClass: "bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20" },
];

const showcase = [
  {
    title: "Website Development",
    desc: "Lead capture + WhatsApp integration + SEO-ready structure.",
    stat: "Launch in 48 hours",
    glow: "from-indigo-500/25 to-purple-500/10",
  },
  {
    title: "Mobile App Development",
    desc: "Native and cross-platform apps for restaurants, salons, gyms and clinics.",
    stat: "iOS + Android delivery",
    glow: "from-purple-500/25 to-pink-500/10",
  },
  {
    title: "AI Automation",
    desc: "Chatbots, document processing and workflow automation for teams.",
    stat: "Cut repetitive work",
    glow: "from-pink-500/25 to-rose-500/10",
  },
  {
    title: "Smart Parking",
    desc: "Barcode-driven parking violation tracking with instant owner alerts.",
    stat: "Societies and malls ready",
    glow: "from-emerald-500/25 to-teal-500/10",
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
      className={`${CONTAINER} scroll-mt-24 grid min-h-[41vh] items-center gap-12 py-8 lg:grid-cols-2 lg:py-12`}
    >
      <div className="text-center lg:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-border-primary bg-bg-card px-4 py-2 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium uppercase tracking-[0.1em] text-text-secondary dark:text-dark-text-secondary">
            Digital Transformation Agency
          </span>
        </div>

        <h1 className="mt-6 font-[var(--font-playfair)] text-3xl font-semibold leading-tight text-text-primary dark:text-dark-text-primary sm:text-4xl lg:text-5xl">
          From websites to <span className="text-accent-primary">AI</span> —
          <br />
          every digital need your business has
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-text-secondary dark:text-dark-text-secondary lg:mx-0 lg:text-lg">
          We build websites, ship mobile apps, automate work with AI, and deliver smart parking solutions.
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-sm italic leading-relaxed text-text-tertiary dark:text-dark-text-tertiary lg:mx-0">
          WhatsApp / calls par English–Hinglish mix bilkul comfortable — timelines aur scope hamesha clear, likh kar confirm.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
          {servicePills.map((service) => (
            <button
              key={service.name}
              type="button"
              onClick={() => scrollToSection(service.targetId)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm text-text-primary transition dark:text-dark-text-primary ${service.shellClass}`}
            >
              <span>{service.icon}</span>
              <span className="font-medium">{service.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
          <button
            type="button"
            onClick={() => scrollToSection("websites")}
            className="rounded-xl bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
          >
            Explore Services
          </button>
          <button
            type="button"
            onClick={() => scrollToSection("contact-cta")}
            className="rounded-xl border border-border-secondary px-6 py-3 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary dark:hover:border-dark-border-primary"
          >
            Book Free Consultation
          </button>
        </div>
      </div>

      <div className="relative">
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br blur-3xl ${item.glow}`} />
        <div className="relative rounded-3xl border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">Live Service Showcase</p>
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
