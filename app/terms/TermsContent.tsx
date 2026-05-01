"use client";

import { useEffect, useMemo, useState } from "react";

import { CONTAINER } from "@/lib/constants";

type TermsSection = {
  id: string;
  label: string;
  title: string;
  body: string;
};

const sections: TermsSection[] = [
  {
    id: "acceptance",
    label: "Acceptance",
    title: "Acceptance",
    body: "By using Bitcraftly, you agree to these terms. If you disagree, please do not use the platform.",
  },
  {
    id: "services",
    label: "Services",
    title: "Services",
    body: "We provide website generation, WhatsApp automation, lead capture systems, and QR workflows for local businesses.",
  },
  {
    id: "payments-refunds",
    label: "Payments & Refunds",
    title: "Payments & Refunds",
    body: "Subscriptions are billed monthly in advance. No refunds are provided for partial months. Cancel anytime and service continues till billing cycle end. Setup fee is non-refundable after work begins.",
  },
  {
    id: "prohibited-use",
    label: "Prohibited Use",
    title: "Prohibited Use",
    body: "No illegal activity, no spam through WhatsApp automation, and no resale without written permission except approved reseller program.",
  },
  {
    id: "termination",
    label: "Termination",
    title: "Termination",
    body: "Accounts violating terms may be suspended or terminated. A 7-day notice is issued except in abuse or security risk cases.",
  },
  {
    id: "liability",
    label: "Liability",
    title: "Liability",
    body: "Bitcraftly is not liable for indirect or consequential losses. Total liability is capped at fees paid in the last three months.",
  },
  {
    id: "governing-law",
    label: "Governing Law",
    title: "Governing Law",
    body: "These terms are governed by the laws of India. All disputes are subject to the jurisdiction of Jharkhand courts.",
  },
];

export default function TermsContent() {
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
      <section className="bg-text-primary py-14 dark:bg-dark-bg-secondary">
        <div className={CONTAINER}>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">Legal</p>
          <h1 className="mt-3 font-[var(--font-playfair)] text-4xl text-white sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-white/70">Effective from January 2025</p>
        </div>
      </section>

      <section className="py-10">
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
