import { CONTAINER } from "@/lib/constants";

type PricingPlan = {
  name: string;
  price: string;
  setupFee: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: "₹1,499/mo",
    setupFee: "Setup fee: ₹3,000",
    features: ["Single location website", "Lead capture forms", "Basic dashboard reporting"],
    cta: "Choose Starter",
  },
  {
    name: "Growth",
    price: "₹2,999/mo",
    setupFee: "Setup fee: ₹4,000",
    features: ["WhatsApp automation", "Advanced lead pipeline", "Demo generator access"],
    cta: "Choose Growth",
    featured: true,
  },
  {
    name: "Pro",
    price: "₹4,999/mo",
    setupFee: "Setup fee: ₹5,000",
    features: ["Multi-branch management", "AI response assistant", "Priority support"],
    cta: "Choose Pro",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className={`${CONTAINER} py-14 md:py-20`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Pricing</p>
      <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">Seedha aur transparent</h2>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`relative rounded-xl bg-bg-card p-6 dark:bg-dark-bg-card ${
              plan.featured ? "border-2 border-blue-600" : "border border-border-primary dark:border-dark-border-primary"
            }`}
          >
            {plan.featured ? (
              <span className="absolute -top-3 left-5 rounded-full bg-[#2B5CE6] px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
            ) : null}
            <h3 className="text-lg font-semibold text-text-primary dark:text-dark-text-primary">{plan.name}</h3>
            <p className="mt-2 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary">{plan.price}</p>
            <p className="mt-1 text-sm text-text-tertiary dark:text-dark-text-tertiary">{plan.setupFee}</p>

            <ul className="mt-4 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-text-tertiary dark:bg-dark-text-tertiary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className={`mt-6 w-full rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                plan.featured
                  ? "bg-[#2B5CE6] text-white hover:bg-[#2B5CE6]/90"
                  : "border border-border-primary text-text-primary hover:border-border-secondary dark:border-dark-border-primary dark:text-dark-text-primary dark:hover:border-dark-border-secondary"
              }`}
            >
              {plan.cta}
            </button>
          </article>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-text-secondary dark:text-dark-text-secondary">
        Sirf 3 extra customers = ₹1,499 cost cover. Baaki sab profit.
      </p>
    </section>
  );
}
