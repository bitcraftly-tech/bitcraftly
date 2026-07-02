import { CONTAINER, SECTION_PY_COMPACT, SECTION_SCROLL_MT } from "@/lib/constants";
import { FAQ_ITEMS } from "@/lib/siteContent";

type FaqSectionProps = {
  showTopBorder?: boolean;
};

export default function FaqSection({ showTopBorder = true }: FaqSectionProps) {
  return (
    <section
      id="faq"
      className={`${CONTAINER} ${SECTION_SCROLL_MT} ${SECTION_PY_COMPACT} ${showTopBorder ? "border-t border-border-primary dark:border-dark-border-primary" : ""}`}
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">FAQ</p>
        <h2 className="mt-3 font-[var(--font-playfair)] text-3xl text-text-primary dark:text-dark-text-primary sm:text-4xl">
          Common questions — seedha jawab
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary sm:text-base">
          Aur sawal ho to WhatsApp par likh dena — English ya Hinglish dono chalega.
        </p>
      </div>
      <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-border-primary bg-bg-card p-4 dark:border-dark-border-primary dark:bg-dark-bg-card"
          >
            <summary className="cursor-pointer list-none text-sm font-semibold text-text-primary marker:content-none dark:text-dark-text-primary [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-3">
                {item.q}
                <span className="shrink-0 text-text-tertiary transition group-open:rotate-45 dark:text-dark-text-tertiary" aria-hidden>
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
