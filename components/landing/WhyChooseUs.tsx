import { CONTAINER } from "@/lib/constants";

const reasons = [
  { title: "18+ Years Experience", desc: "Battle-tested delivery across industries and budgets." },
  { title: "100+ Projects Completed", desc: "From storefronts to institutions — shipped and supported." },
  { title: "Affordable Pricing", desc: "Clear quotes, no surprise line items after kickoff." },
  { title: "Fast Delivery", desc: "Lean process so you launch while the opportunity is hot." },
  { title: "Dedicated Support", desc: "Post-launch fixes and guidance on hosting, SEO, and content." },
];

const testimonials = [
  {
    quote:
      "Bitcraftly ne hamare business ke liye modern website banayi aur customer inquiries increase hui — WhatsApp par messages bhi zyada aane lage.",
    initials: "PK",
    attribution: "Retail store owner · Jamshedpur",
  },
  {
    quote:
      "Website ka design modern aur mobile friendly tha. Support bhi kaafi fast mila — chhoti edits bhi time par ho gayi.",
    initials: "AR",
    attribution: "School administrator · Jamshedpur",
  },
  {
    quote:
      "Hamari clinic ke liye clean layout aur appointment form — patients ko trust feel hota hai. Phone calls ke saath online enquiries bhi balanced ho gayi.",
    initials: "NS",
    attribution: "Clinic owner · East Singhbhum",
  },
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
            Whether you need website development in Jamshedpur or ecommerce and apps across India, we keep communication
            simple and timelines realistic — a trustworthy partner for local businesses.
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

      <div className="mt-12 border-t border-border-primary pt-10 dark:border-dark-border-primary">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
          What owners say
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote
              key={t.attribution}
              className="rounded-xl border border-border-primary bg-bg-card p-5 dark:border-dark-border-primary dark:bg-dark-bg-card"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-bg-secondary text-xs font-semibold text-text-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary"
                  aria-hidden
                >
                  {t.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm leading-relaxed text-text-primary dark:text-dark-text-primary">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 text-xs font-medium text-text-secondary dark:text-dark-text-secondary">{t.attribution}</footer>
                </div>
              </div>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
