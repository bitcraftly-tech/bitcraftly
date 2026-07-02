import Link from "next/link";

import { CONTAINER, SECTION_PY, SECTION_SCROLL_MT } from "@/lib/constants";

const PRICING_FAQ = [
  {
    q: "Kitne din mein website ready ho sakti hai?",
    a: "Fast-launch: Landing Page 48 hours, Business Website 5 days, clinic/gym/coach packs 5–7 days (content ready hona chahiye). Standard plans discovery ke baad timeline likh ke confirm hote hain.",
  },
  {
    q: "React/Next.js chahiye ya simple website kaafi hai?",
    a: "Local business ke liye Professional package often enough hai. Startups, SaaS, ya future scale ke liye Premium React/Next.js recommend karte hain.",
  },
  {
    q: "Maintenance plan optional hai?",
    a: "Haan — launch ke baad ₹2,999/month se updates, fixes, aur monitoring available hai.",
  },
  {
    q: "Final price calculator se alag kyun ho sakti hai?",
    a: "Calculator ballpark deta hai. Custom pages, copywriting, integrations, ya content delays final quote badal sakte hain — isliye written scope pehle confirm hota hai.",
  },
] as const;

export default function PricingFaq() {
  return (
    <section id="pricing-faq" className={`${CONTAINER} ${SECTION_SCROLL_MT} border-t border-border-primary ${SECTION_PY} dark:border-dark-border-primary`}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
          FAQ
        </p>
        <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
          Common pricing questions
        </h2>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {PRICING_FAQ.map((item) => (
          <article key={item.q} className="bc-card p-5 sm:p-6">
            <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{item.q}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{item.a}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link href="/faq" className="text-sm font-semibold text-accent-primary hover:opacity-90 dark:text-indigo-400">
          More FAQs →
        </Link>
        <Link
          href="/contact?intent=consultation&source=pricing-faq"
          className="bc-btn bc-btn-secondary px-5 py-2.5 text-sm"
        >
          Book free consultation
        </Link>
      </div>
    </section>
  );
}
