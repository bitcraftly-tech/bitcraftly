import { CONTAINER } from "@/lib/constants";

type FeatureItem = {
  number: string;
  title: string;
  description: string;
};

const features: FeatureItem[] = [
  { number: "01", title: "Lead Generation", description: "SEO-ready pages aur smart forms se regular high-intent leads capture karein." },
  { number: "02", title: "WhatsApp Automation", description: "Auto follow-ups aur reminders se response time kam, conversion rate high." },
  { number: "03", title: "QR Contact System", description: "QR scan se instant inquiry, booking aur walk-in conversion track karein." },
  { number: "04", title: "Demo Generator", description: "Client-specific preview minutes mein, sales pitch ko instantly strong banaye." },
  { number: "05", title: "Admin Dashboard", description: "Leads, revenue aur team activity ek clean panel mein daily monitor karein." },
  { number: "06", title: "AI Integration", description: "AI replies aur content suggestions se operations fast aur consistent rakhein." },
];

export default function Features() {
  return (
    <section id="features" className={`${CONTAINER} py-14 md:py-20`}>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Core Systems</p>
      <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">Har zaroorat ka jawab</h2>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.number}
            className="rounded-xl border border-border-primary bg-bg-card p-5 transition hover:bg-bg-secondary dark:border-dark-border-primary dark:bg-dark-bg-card dark:hover:bg-dark-bg-secondary"
          >
            <p className="font-[var(--font-playfair)] text-4xl text-text-tertiary/50 dark:text-dark-text-tertiary/60">{feature.number}</p>
            <h3 className="mt-3 text-sm font-semibold text-text-primary dark:text-dark-text-primary">{feature.title}</h3>
            <p className="mt-2 text-sm leading-6 text-text-secondary dark:text-dark-text-secondary">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
