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
  featured?: boolean;
  launchOffer?: boolean;
};

const plans: PricingPlan[] = [
  {
    service: "Website",
    icon: "🌐",
    accentClass: "text-indigo-500",
    buttonClass: "bg-indigo-600 text-white hover:bg-indigo-700",
    bulletClass: "bg-indigo-500",
    price: "₹15,000",
    period: "one-time",
    features: ["5 pages included", "Mobile responsive", "Contact form + WhatsApp", "Free SSL + hosting guide", "1 month support"],
    cta: "Get Quote",
  },
  {
    service: "Mobile App",
    icon: "📱",
    accentClass: "text-purple-500",
    buttonClass: "bg-purple-600 text-white hover:bg-purple-700",
    bulletClass: "bg-purple-500",
    price: "₹59,000",
    period: "iOS + Android single codebase",
    features: ["React Native architecture", "Custom UI/UX", "Store submission", "Push notifications", "6 months support"],
    cta: "Get Quote",
    launchOffer: true,
  },
  {
    service: "AI Automation",
    icon: "🤖",
    accentClass: "text-pink-500",
    buttonClass: "bg-pink-600 text-white hover:bg-pink-700",
    bulletClass: "bg-pink-500",
    price: "Custom",
    period: "based on scope",
    features: ["Chatbot setup", "Workflow automation", "Document processing", "Team training", "Ongoing support"],
    cta: "Discuss Scope",
  },
  {
    service: "Smart Parking",
    icon: "🚗",
    accentClass: "text-emerald-500",
    buttonClass: "bg-emerald-600 text-white hover:bg-emerald-700",
    bulletClass: "bg-emerald-500",
    price: "Starts ₹29/car",
    period: "launch offer (first 3 months)",
    features: [
      "Launch: ₹29/car/month (min 100 cars, first 3 months)",
      "Standard: ₹49/car/month",
      "High-volume: ₹39/car/month (500+ cars)",
      "Car barcode profile + scan-to-call owner flow",
      "Admin reports · barcode sticker printing extra",
    ],
    cta: "Request Demo",
    featured: true,
    launchOffer: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className={`${CONTAINER} scroll-mt-24 py-14 md:py-20`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Pricing</p>
      <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
        Service-wise pricing
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => (
          <article
            key={plan.service}
            className={`group relative flex h-full transform-gpu flex-col rounded-xl bg-bg-card p-6 transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(2,6,23,0.12)] dark:bg-dark-bg-card dark:hover:shadow-[0_14px_26px_rgba(2,6,23,0.4)] ${
              plan.featured
                ? "border-2 border-emerald-500 hover:shadow-[0_20px_40px_rgba(16,185,129,0.25)]"
                : "border border-border-primary hover:border-border-secondary dark:border-dark-border-primary dark:hover:border-dark-border-secondary"
            }`}
          >
            {plan.featured ? (
              <span className="absolute -top-3 left-5 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                New Launch
              </span>
            ) : null}
            {plan.launchOffer ? (
              <span className="absolute right-4 top-4 rounded-full bg-purple-600 px-2.5 py-1 text-[11px] font-semibold text-white">
                Launch Offer
              </span>
            ) : null}
            <div className="text-3xl">{plan.icon}</div>
            <h3 className="mt-2 text-lg font-semibold text-text-primary dark:text-dark-text-primary">{plan.service}</h3>
            <p className={`mt-1 text-xs font-semibold uppercase tracking-[0.12em] ${plan.accentClass}`}>Bitcraftly service</p>
            <p className="mt-2 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary">{plan.price}</p>
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
        Transparent pricing with flexible project scope. No hidden charges.
      </p>
    </section>
  );
}
