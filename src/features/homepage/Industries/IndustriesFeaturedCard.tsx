import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { IndustriesFeaturedContent } from "./industries.types";

interface IndustriesFeaturedCardProps {
  content: IndustriesFeaturedContent;
  className?: string;
}

export function IndustriesFeaturedCard({
  content,
  className,
}: IndustriesFeaturedCardProps) {
  return (
    <div
      className={cn(
        "industries-featured flex h-full min-h-[280px] flex-col",
        "rounded-[20px] p-[var(--space-4)] text-primary-foreground",
        className,
      )}
    >
      <p
        className={cn(
          "m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.16em]",
          "text-primary-foreground/80",
        )}
      >
        Featured
      </p>

      <h3
        className={cn(
          "mt-[var(--space-2)] mb-0 font-sans text-[24px] font-bold",
          "leading-[1.25] tracking-[-0.02em] text-primary-foreground",
          "sm:text-[28px]",
        )}
      >
        {content.title}
      </h3>

      <ul className="mt-[var(--space-3)] mb-0 flex list-none flex-col gap-[10px] p-0">
        {content.highlights.map((item) => (
          <li
            key={item}
            className={cn(
              "flex items-center gap-[10px]",
              "font-sans text-[15px] font-medium leading-[1.4]",
              "text-primary-foreground/95",
            )}
          >
            <span
              className={cn(
                "inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center",
                "rounded-full bg-primary-foreground/15",
              )}
              aria-hidden
            >
              <Icon
                name="check"
                size="sm"
                className="h-[12px] w-[12px] text-primary-foreground"
              />
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-[var(--space-4)]">
        <Link
          href={content.href}
          className={cn(
            "inline-flex h-[44px] items-center justify-center gap-[8px]",
            "rounded-[12px] px-[var(--space-3)] no-underline",
            "bg-background font-sans text-[14px] font-semibold text-foreground",
            "shadow-[0_8px_20px_-12px_rgb(15_23_42_/_0.45)]",
            "transition-opacity duration-[var(--duration-fast)] hover:opacity-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
          )}
        >
          {content.ctaLabel}
          <Icon
            name="arrow-right"
            size="sm"
            aria-hidden
            className="industries-featured-cta-icon h-[14px] w-[14px]"
          />
        </Link>
      </div>
    </div>
  );
}
