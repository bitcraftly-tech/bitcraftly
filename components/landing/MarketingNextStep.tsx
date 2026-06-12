import Link from "next/link";

import { CONTAINER } from "@/lib/constants";

type NextLink = {
  href: string;
  label: string;
  primary?: boolean;
};

type MarketingNextStepProps = {
  title: string;
  description: string;
  links: NextLink[];
};

export default function MarketingNextStep({ title, description, links }: MarketingNextStepProps) {
  return (
    <section className={`${CONTAINER} scroll-mt-24 border-t border-border-primary py-7 dark:border-dark-border-primary md:py-10`}>
      <div className="rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-indigo-50/80 via-bg-card to-bg-card p-6 dark:from-indigo-950/30 dark:via-dark-bg-card dark:to-dark-bg-card sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-600 dark:text-indigo-400">Next step</p>
        <h2 className="mt-2 font-[var(--font-playfair)] text-2xl text-text-primary dark:text-dark-text-primary">{title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">{description}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.primary
                  ? "inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  : "inline-flex items-center justify-center rounded-full border border-border-secondary px-5 py-2.5 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
