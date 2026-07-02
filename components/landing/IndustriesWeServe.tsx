import { CONTAINER, SECTION_PY_COMPACT, SECTION_SCROLL_MT } from "@/lib/constants";

const industries = [
  "Restaurants",
  "Gyms",
  "Schools",
  "Clinics",
  "Builders",
  "Residential Societies",
  "Local Businesses",
];

export default function IndustriesWeServe() {
  return (
    <section
      id="industries"
      className={`${CONTAINER} ${SECTION_SCROLL_MT} border-t border-border-primary ${SECTION_PY_COMPACT} dark:border-dark-border-primary`}
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text-secondary dark:text-dark-text-secondary">
          Industries we serve
        </p>
        <h2 className="mt-3 font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary sm:text-3xl">
          Trusted by local teams across India
        </h2>
        <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
          Websites and apps tailored to how you work — retail, education, healthcare, builders, societies and more — clear
          messaging and local-friendly structure, not generic templates.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
        {industries.map((name) => (
          <span
            key={name}
            className="rounded-full border border-border-primary bg-bg-card px-4 py-2 text-sm font-medium text-text-primary shadow-sm dark:border-dark-border-primary dark:bg-dark-bg-card dark:text-dark-text-primary"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
