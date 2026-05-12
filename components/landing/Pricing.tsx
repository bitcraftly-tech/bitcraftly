import Link from "next/link";
import { CONTAINER } from "@/lib/constants";

type PricingPlan = {
  service: string;
  icon: string;
  accentClass: string;
  buttonClass: string;
  bulletClass: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
};

const plans: PricingPlan[] = [
  {
    service: "Business Website",
    icon: "🌐",
    accentClass: "text-indigo-500",
    buttonClass: "bg-indigo-600 text-white hover:bg-indigo-700",
    bulletClass: "bg-indigo-500",
    price: "₹15,000",
    period: "project estimate after scope call",
    features: ["Brand-led layout", "Mobile-first build", "Lead forms + WhatsApp", "SEO-ready structure", "Launch support"],
    cta: "Get Quote",
  },
  {
    service: "Ecommerce Website",
    icon: "🛒",
    accentClass: "text-violet-500",
    buttonClass: "bg-violet-600 text-white hover:bg-violet-700",
    bulletClass: "bg-violet-500",
    price: "₹35,000",
    period: "project estimate after scope call",
    features: ["Product catalog setup", "Checkout flow", "Payments guidance", "Performance-focused theme", "Handover training"],
    cta: "Get Quote",
  },
  {
    service: "Mobile App UI",
    icon: "📱",
    accentClass: "text-purple-500",
    buttonClass: "bg-purple-600 text-white hover:bg-purple-700",
    bulletClass: "bg-purple-500",
    price: "₹25,000",
    period: "project estimate after scope call",
    features: ["Screen flows & components", "Design system handoff", "Revisions within agreed scope", "Developer-ready assets", "Optional build support"],
    cta: "Get Quote",
  },
  {
    service: "Website Maintenance",
    icon: "🔧",
    accentClass: "text-teal-500",
    buttonClass: "bg-teal-600 text-white hover:bg-teal-700",
    bulletClass: "bg-teal-500",
    price: "₹5,000",
    period: "per month · updates, edits & checks",
    features: ["Security & plugin updates", "Small content edits", "Uptime checks", "Monthly health summary", "Priority WhatsApp channel"],
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
        Final numbers depend on pages, integrations, and content readiness — we confirm scope in writing (English or
        Hinglish) before work starts. Ecommerce website development and larger apps are quoted after a short discovery
        call.
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

            <ul className="mt-4 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <span className={`mt-2 h-1.5 w-1.5 rounded-full ${plan.bulletClass}`} />
                  <span>{feature}</span>
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

      <p className="mt-8 text-center text-sm text-text-secondary dark:text-dark-text-secondary">
        Transparent estimates · No surprise line items after kickoff
      </p>
    </section>
  );
}
