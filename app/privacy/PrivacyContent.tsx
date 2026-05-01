"use client";

import { useEffect, useMemo, useState } from "react";

import { CONTAINER } from "@/lib/constants";

type PrivacySection = {
  id: string;
  label: string;
  title: string;
  body: string;
};

const sections: PrivacySection[] = [
  {
    id: "data-collection",
    label: "Data Collection",
    title: "Data Collection",
    body: "We collect business name, contact details, website usage data, and WhatsApp interaction logs to operate and improve Bitcraftly services.",
  },
  {
    id: "how-we-use-data",
    label: "How We Use Data",
    title: "How We Use Data",
    body: "We use data to provide services, send weekly performance reports, and continuously improve platform experience and outcomes.",
  },
  {
    id: "data-storage",
    label: "Data Storage",
    title: "Data Storage",
    body: "Data is stored on secure infrastructure using Render and PostgreSQL. We maintain encryption at rest and access controls.",
  },
  {
    id: "third-party-services",
    label: "Third Party Services",
    title: "Third Party Services",
    body: "Our platform may integrate with OpenAI, WhatsApp Business API, Cloudflare, and Vercel for core functionality and delivery.",
  },
  {
    id: "your-rights",
    label: "Your Rights",
    title: "Your Rights",
    body: "You may request data export, deletion, or correction at any time. We process verified requests as quickly as possible.",
  },
  {
    id: "contact-us",
    label: "Contact Us",
    title: "Contact Us",
    body: "For privacy-related requests, contact us at privacy@bitcraftly.com.",
  },
];

export default function PrivacyContent() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const ids = useMemo(() => sections.map((section) => section.id), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [ids]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="bg-bg-primary dark:bg-dark-bg-primary">
      <section className="bg-text-primary py-7 dark:bg-dark-bg-secondary">
        <div className={CONTAINER}>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">Legal</p>
          <h1 className="mt-3 font-[var(--font-playfair)] text-4xl text-white sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-sm text-white/70">Last updated: January 2025</p>
        </div>
      </section>

      <section className="py-5">
        <div className={`${CONTAINER} grid gap-10 md:grid-cols-[220px_1fr]`}>
          <aside className="hidden md:block">
            <div className="sticky top-24 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollToSection(section.id)}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm transition ${
                    activeSection === section.id
                      ? "bg-bg-secondary text-text-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary"
                      : "text-text-tertiary hover:text-text-primary dark:text-dark-text-tertiary dark:hover:text-dark-text-primary"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </aside>

          <div className="space-y-10">
            {sections.map((section) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-24 rounded-lg border border-border-primary bg-bg-card p-6 dark:border-dark-border-primary dark:bg-dark-bg-card sm:p-7"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text-tertiary dark:text-dark-text-tertiary">{section.label}</p>
                <h2 className="mt-2 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary">{section.title}</h2>
                <p className="mt-4 text-sm leading-7 text-text-secondary dark:text-dark-text-secondary">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
