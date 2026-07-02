import { CONTAINER, SECTION_PY_COMPACT, SECTION_SCROLL_MT } from "@/lib/constants";
import { EXAMPLE_TESTIMONIAL, WHY_CHOOSE } from "@/lib/siteContent";

type WhyChooseUsProps = {
  showTopBorder?: boolean;
};

export default function WhyChooseUs({ showTopBorder = true }: WhyChooseUsProps) {
  return (
    <section
      id="why-us"
      className={`${CONTAINER} ${SECTION_SCROLL_MT} ${SECTION_PY_COMPACT} ${showTopBorder ? "border-t border-border-primary dark:border-dark-border-primary" : ""}`}
    >
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">Why choose us</p>
          <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
            Built for owners &amp; founders who want results, not jargon
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
            Local business ho ya India-wide startup — communication simple, timelines realistic, aur code maintainable jo aage
            scale kar sake. Ghaziabad se delivery, clients poore India aur remote.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {WHY_CHOOSE.map((r) => (
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
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">What clients say</p>
        <p className="mt-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">
          Real named reviews add karte hi yahan update ho jayega — abhi sample format:
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[EXAMPLE_TESTIMONIAL, EXAMPLE_TESTIMONIAL, EXAMPLE_TESTIMONIAL].map((t, i) => (
            <blockquote
              key={`${t.attribution}-${i}`}
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
