import Link from "next/link";

import { CONTAINER } from "@/lib/constants";

export type MarketingBreadcrumbItem = {
  label: string;
  href?: string;
};

type MarketingBreadcrumbProps = {
  items: readonly MarketingBreadcrumbItem[];
};

export default function MarketingBreadcrumb({ items }: MarketingBreadcrumbProps) {
  if (!items.length) return null;

  return (
    <section
      className="bc-marketing-breadcrumb border-b border-border-primary bg-bg-primary py-1.5 dark:border-dark-border-primary dark:bg-dark-bg-primary"
      data-skip-scroll-reveal
    >
      <nav aria-label="Breadcrumb" className={`${CONTAINER} text-xs text-text-tertiary dark:text-dark-text-tertiary`}>
        <ol className="flex flex-wrap items-center">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={`${item.label}-${index}`} className="flex min-w-0 items-center">
                {index > 0 ? (
                  <span className="px-2" aria-hidden>
                    /
                  </span>
                ) : null}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="truncate hover:text-text-secondary hover:underline dark:hover:text-dark-text-secondary"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="truncate" aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </section>
  );
}
