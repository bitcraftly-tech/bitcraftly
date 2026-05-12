import { CONTAINER } from "@/lib/constants";

const reasons = [
  { title: "18+ Years Experience", desc: "Battle-tested delivery across industries and budgets." },
  { title: "100+ Projects Completed", desc: "From storefronts to institutions — shipped and supported." },
  { title: "Affordable Pricing", desc: "Clear quotes, no surprise line items after kickoff." },
  { title: "Fast Delivery", desc: "Lean process so you launch while the opportunity is hot." },
  { title: "Dedicated Support", desc: "Post-launch fixes and guidance on hosting, SEO, and content." },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-6 dark:border-dark-border-primary lg:py-8`}>
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Why choose us</p>
          <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Built for owners who want results, not jargon
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
            Whether you need an app development company in Jamshedpur or a partner for ecommerce website development
            across India, we keep communication simple and timelines realistic.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {reasons.map((r) => (
            <article
              key={r.title}
              className="rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card"
            >
              <p className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">{r.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{r.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
