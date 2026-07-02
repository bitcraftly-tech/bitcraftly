import Link from "next/link";

import { CONTAINER, SECTION_PY } from "@/lib/constants";

type PricingBottomCtaProps = {
  title: string;
  description: string;
  links: { href: string; label: string; primary?: boolean }[];
};

export default function PricingBottomCta({ title, description, links }: PricingBottomCtaProps) {
  return (
    <section className={`${CONTAINER} ${SECTION_PY}`}>
      <div className="bc-card mx-auto max-w-3xl p-6 text-center sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-primary dark:text-indigo-400">
          Next step
        </p>
        <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary">{title}</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
          {description}
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={link.primary ? "bc-btn bc-btn-primary w-full px-6 py-3 sm:w-auto" : "bc-btn bc-btn-secondary w-full px-6 py-3 sm:w-auto"}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
