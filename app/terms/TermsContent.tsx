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
    body: "By using Bitcraftly's website and services, you agree to these terms. If you disagree, please do not use our site or engage our services.",
  },
  {
    id: "services",
    label: "Services",
    title: "Services",
    body: "Bitcraftly is a website and app development agency. We provide website development, ecommerce solutions, mobile app UI/UX design, ongoing maintenance, and custom digital solutions for businesses, typically on a project or engagement basis as agreed in writing.",
  },
  {
    id: "payments-refunds",
    label: "Payments & Refunds",
    title: "Payments & Refunds",
    body: "Project payments are milestone-based unless agreed otherwise in your quote or contract. Advance payments are non-refundable once project work has started, except where required by applicable law.",
  },
  {
    id: "prohibited-use",
    label: "Prohibited Use",
    title: "Prohibited Use",
    body: "Clients may not use Bitcraftly services for illegal, harmful or fraudulent activities. You agree not to misuse deliverables (including code or integrations) in ways that violate law or third-party rights.",
  },
  {
    id: "termination",
    label: "Termination",
    title: "Termination",
    body: "We may suspend or stop work where these terms are breached, invoices remain unpaid, or there is misuse. Where reasonable, we will give notice before ending an engagement, except in cases of abuse, illegality, or serious security risk.",
  },
  {
    id: "liability",
    label: "Liability",
    title: "Liability",
    body: "To the fullest extent permitted by law, Bitcraftly is not liable for indirect or consequential losses. Our total liability for any claim relating to our services is limited to the fees you paid Bitcraftly for the services directly related to that claim in the twelve months before you notified us.",
  },
  {
    id: "governing-law",
    label: "Governing Law",
    title: "Governing Law",
    body: "These terms are governed by the laws of India. Disputes are subject to the jurisdiction of courts in Jharkhand, unless a written agreement between you and Bitcraftly says otherwise.",
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
      <section className="bg-text-primary py-7 dark:bg-dark-bg-secondary">
        <div className={CONTAINER}>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70">Legal</p>
          <h1 className="mt-3 font-[var(--font-playfair)] text-4xl text-white sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-sm text-white/70">Last updated: May 2026</p>
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
