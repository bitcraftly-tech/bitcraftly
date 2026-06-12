import Link from "next/link";

import { CONTAINER } from "@/lib/constants";

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

export default function PricingFaqStrip() {
  return (
    <section id="pricing-faq" className={`${CONTAINER} scroll-mt-28 border-t border-border-primary py-7 dark:border-dark-border-primary md:py-10`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
        Pricing FAQ
      </p>
      <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
        Common pricing questions
      </h2>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {PRICING_FAQ.map((item) => (
          <article
            key={item.q}
            className="rounded-xl border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card"
          >
            <h3 className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{item.q}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{item.a}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          href="/faq"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
        >
          More FAQs →
        </Link>
        <Link
          href="/contact?intent=consultation&source=pricing-faq"
          className="rounded-full border border-border-secondary px-4 py-2 text-sm font-semibold text-text-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
        >
          Book free consultation
        </Link>
      </div>
    </section>
  );
}
