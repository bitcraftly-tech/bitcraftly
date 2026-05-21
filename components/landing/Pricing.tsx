import Link from "next/link";
import { CONTAINER } from "@/lib/constants";

type PricingPlan = {
  service: string;
  icon: string;
  accentClass: string;
  buttonClass: string;
  price: string;
  period: string;
  subtleLine?: string;
  isMonthly?: boolean;
  isHourly?: boolean;
  highlight?: boolean;
  whatsIncluded: string[];
  cta: string;
};

const plans: PricingPlan[] = [
  {
    service: "Starter Business Website",
    icon: "🌐",
    accentClass: "text-indigo-500",
    buttonClass: "bg-indigo-600 text-white hover:bg-indigo-700",
    price: "₹7,999",
    period: "one-time · scope confirmed in writing",
    subtleLine: "Best for new local businesses",
    whatsIncluded: ["Responsive website", "WhatsApp integration", "Basic SEO setup", "Contact form", "Mobile optimized"],
    cta: "Get Quote",
  },
  {
    service: "Professional Business Website",
    icon: "⭐",
    accentClass: "text-violet-500",
    buttonClass: "bg-violet-600 text-white hover:bg-violet-700",
    price: "₹14,999",
    period: "one-time · scope confirmed in writing",
    subtleLine: "Most chosen for growing brands",
    highlight: true,
    whatsIncluded: [
      "Premium responsive design",
      "Multi-page website",
      "SEO optimization",
      "Speed optimization",
      "WhatsApp & social integration",
      "Admin panel / basic CMS",
    ],
    cta: "Get Quote",
  },
  {
    service: "Premium React/Next.js Website",
    icon: "⚛️",
    accentClass: "text-purple-500",
    buttonClass: "bg-purple-600 text-white hover:bg-purple-700",
    price: "₹29,999+",
    period: "custom quote after discovery",
    subtleLine: "Startups & scalable products",
    whatsIncluded: [
      "React.js or Next.js development",
      "Modern UI/UX",
      "Performance optimization",
      "API integration",
      "Scalable architecture",
      "AI-ready setup",
    ],
    cta: "Book Discovery",
  },
  {
    service: "Website Redesign Service",
    icon: "🎨",
    accentClass: "text-rose-500",
    buttonClass: "bg-rose-600 text-white hover:bg-rose-700",
    price: "₹12,999+",
    period: "depends on current site size",
    whatsIncluded: ["Modern redesign", "Mobile optimization", "Speed improvement", "UI enhancement", "SEO improvements"],
    cta: "Get Quote",
  },
  {
    service: "AI-Powered Website Solutions",
    icon: "✨",
    accentClass: "text-indigo-600 dark:text-indigo-400",
    buttonClass: "bg-indigo-600 text-white hover:bg-indigo-700",
    price: "₹19,999+",
    period: "scoped after AI workflow review",
    whatsIncluded: [
      "AI chatbot integration",
      "AI-assisted workflows",
      "Smart lead forms",
      "AI content assistance",
      "Automation-ready architecture",
    ],
    cta: "Discuss AI Scope",
  },
  {
    service: "Monthly Website Maintenance",
    icon: "🔧",
    accentClass: "text-teal-500",
    buttonClass: "bg-teal-600 text-white hover:bg-teal-700",
    price: "₹2,999",
    period: "per month · recurring support",
    isMonthly: true,
    whatsIncluded: ["Website updates", "Bug fixing", "Technical support", "Performance monitoring", "Content updates"],
    cta: "Discuss Plan",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className={`${CONTAINER} scroll-mt-24 py-7 md:py-10`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Standard pricing</p>
      <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
        Flexible packages &amp; custom builds
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
        Need a fixed fast-launch offer? See{" "}
        <a href="#fast-packages" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
          fast-launch packages
        </a>{" "}
        above. Standard starting prices below — final quote depends on pages, features, and content readiness. Scope likh ke confirm hota hai
        (English ya Hinglish) before work starts. Frontend consulting at{" "}
        <span className="font-semibold text-text-primary dark:text-dark-text-primary">₹1,500/hour</span>.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.service}
            className={`group relative flex h-full transform-gpu flex-col rounded-xl border bg-bg-card p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(2,6,23,0.12)] dark:bg-dark-bg-card dark:hover:shadow-[0_14px_26px_rgba(2,6,23,0.4)] ${
              plan.highlight
                ? "border-indigo-500/40 ring-1 ring-indigo-500/20 dark:border-indigo-400/30"
                : "border-border-primary hover:border-border-secondary dark:border-dark-border-primary dark:hover:border-dark-border-secondary"
            }`}
          >
            {plan.highlight ? (
              <span className="absolute -top-2.5 right-4 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Popular
              </span>
            ) : null}
            <div className="text-3xl">{plan.icon}</div>
            <h3 className="mt-2 text-lg font-semibold text-text-primary dark:text-dark-text-primary">{plan.service}</h3>
            <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.12em] ${plan.accentClass}`}>Bitcraftly</p>
            {plan.isMonthly ? (
              <>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary dark:text-dark-text-secondary">Per month</p>
                <p className="mt-1 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary">{plan.price}</p>
              </>
            ) : (
              <>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary dark:text-dark-text-secondary">Starting from</p>
                <p className="mt-1 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary">{plan.price}</p>
              </>
            )}
            <p className="mt-1 text-sm text-text-tertiary dark:text-dark-text-tertiary">{plan.period}</p>
            {plan.subtleLine ? (
              <p className="mt-2 text-xs leading-snug text-text-tertiary dark:text-dark-text-tertiary">{plan.subtleLine}</p>
            ) : null}

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">What&apos;s included</p>
            <ul className="mt-2 space-y-2">
              {plan.whatsIncluded.map((line) => (
                <li key={line} className="flex items-start gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <span className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden>
                    ✔
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-6">
              <Link
                href={`/contact?service=${encodeURIComponent(plan.service)}&intent=quote&source=pricing-card`}
                className={`inline-flex w-full cursor-pointer items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition duration-300 ease-out group-hover:brightness-105 ${plan.buttonClass}`}
              >
                {plan.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 space-y-2 text-center">
        <p className="text-xs leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">
          Custom SaaS frontends, ecommerce, and mobile apps quoted after a short discovery call.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
          Written estimates · No surprise line items after kickoff · Founder-led delivery
        </p>
      </div>
    </section>
  );
}
