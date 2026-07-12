import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import { cn } from "@/lib/cn";

interface MarketingBreadcrumbsProps {
  items: readonly BreadcrumbItem[];
  className?: string;
}

export function MarketingBreadcrumbs({
  items,
  className,
}: MarketingBreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("w-full", className)}>
      <ol className="flex flex-wrap items-center gap-[6px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-[6px]">
              {index > 0 ? (
                <Icon
                  name="chevron-right"
                  size="sm"
                  aria-hidden
                  className="h-[12px] w-[12px] text-muted-foreground"
                />
              ) : null}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="font-sans text-[13px] font-medium text-muted-foreground no-underline transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="font-sans text-[13px] font-medium text-foreground"
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
