import Link from "next/link";
import { CONTAINER } from "@/lib/constants";

type PricingPlan = {
  service: string;
  icon: string;
  accentClass: string;
  buttonClass: string;
  price: string;
  period: string;
  /** Optional one line under the period — delivery or positioning, kept subtle */
  subtleLine?: string;
  whatsIncluded: string[];
  cta: string;
};

const plans: PricingPlan[] = [
  {
    service: "Business Website",
    icon: "🌐",
    accentClass: "text-indigo-500",
    buttonClass: "bg-indigo-600 text-white hover:bg-indigo-700",
    price: "₹15,000",
    period: "project estimate after scope call",
    subtleLine: "Delivery: 5–7 Days",
    whatsIncluded: ["Up to 5 pages", "Mobile responsive", "WhatsApp integration", "Basic SEO", "Simple admin for edits"],
    cta: "Get Quote",
  },
  {
    service: "Ecommerce Website",
    icon: "🛒",
    accentClass: "text-violet-500",
    buttonClass: "bg-violet-600 text-white hover:bg-violet-700",
    price: "₹35,000",
    period: "project estimate after scope call",
    subtleLine: "Best for growing businesses",
    whatsIncluded: ["Product catalog & categories", "Mobile checkout flow", "Payments setup guidance", "WhatsApp order enquiries", "Launch handoff"],
    cta: "Get Quote",
  },
  {
    service: "Mobile App UI/UX",
    icon: "📱",
    accentClass: "text-purple-500",
    buttonClass: "bg-purple-600 text-white hover:bg-purple-700",
    price: "₹25,000",
    period: "project estimate after scope call",
    whatsIncluded: ["Key screen flows", "UI components & states", "Developer-ready handoff", "Revisions within scope", "Optional build support"],
    cta: "Get Quote",
  },
  {
    service: "Website Maintenance",
    icon: "🔧",
    accentClass: "text-teal-500",
    buttonClass: "bg-teal-600 text-white hover:bg-teal-700",
    price: "₹5,000",
    period: "per month · updates, edits & checks",
    whatsIncluded: ["Security & CMS/plugin updates", "Small content edits", "Uptime checks", "Monthly summary", "Priority WhatsApp Support"],
    cta: "Discuss Plan",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className={`${CONTAINER} scroll-mt-24 py-7 md:py-10`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Pricing</p>
      <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
        Clear starting points
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
        Starting-from prices below — final quote depends on pages, features and content readiness. We confirm scope in
        writing (English or Hinglish) before work starts. Larger ecommerce and app builds are quoted after a short
        discovery call.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <article
            key={plan.service}
            className="group relative flex h-full transform-gpu flex-col rounded-xl border border-border-primary bg-bg-card p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(2,6,23,0.12)] dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:shadow-[0_14px_26px_rgba(2,6,23,0.4)] hover:border-border-secondary dark:hover:border-dark-border-secondary"
          >
            <div className="text-3xl">{plan.icon}</div>
            <h3 className="mt-2 text-lg font-semibold text-text-primary dark:text-dark-text-primary">{plan.service}</h3>
            <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.12em] ${plan.accentClass}`}>Bitcraftly</p>
            {plan.service === "Website Maintenance" ? (
              <>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary dark:text-dark-text-secondary">
                  Per month
                </p>
                <p className="mt-1 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary">{plan.price}</p>
              </>
            ) : (
              <>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary dark:text-dark-text-secondary">
                  Starting from
                </p>
                <p className="mt-1 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary">{plan.price}</p>
              </>
            )}
            <p className="mt-1 text-sm text-text-tertiary dark:text-dark-text-tertiary">{plan.period}</p>
            {plan.subtleLine ? (
              <p className="mt-2 text-xs leading-snug text-text-tertiary dark:text-dark-text-tertiary">
                {plan.subtleLine}
              </p>
            ) : null}

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary dark:text-dark-text-secondary">
              What&apos;s included
            </p>
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
          Custom pricing available for larger projects.
        </p>
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
          Transparent estimates · No surprise line items after kickoff
        </p>
      </div>
    </section>
  );
}
