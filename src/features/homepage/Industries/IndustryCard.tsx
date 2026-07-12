import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { IconBox } from "@/components/ui/icon-box";
import { cn } from "@/lib/cn";
import type { HomepageIndustry } from "./industries.types";

interface IndustryCardProps {
  industry: HomepageIndustry;
  className?: string;
}

export function IndustryCard({ industry, className }: IndustryCardProps) {
  return (
    <Link
      href={industry.href}
      className={cn(
        "industries-card group flex h-full flex-col",
        "rounded-[20px] p-[var(--space-3)] no-underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        className,
      )}
    >
      <span className="industries-card-icon inline-flex">
        <IconBox
          icon={industry.icon}
          variant="default"
          size="md"
          className="industries-icon-box"
        />
      </span>

      <h3
        className={cn(
          "mt-[var(--space-2)] mb-0 font-sans text-[18px] font-bold",
          "leading-[1.3] tracking-[-0.015em] text-foreground",
        )}
      >
        {industry.title}
      </h3>

      <p
        className={cn(
          "mt-[var(--space-1)] mb-0 flex-1 font-sans text-[15px]",
          "font-normal leading-[1.55] text-muted-foreground",
        )}
      >
        {industry.description}
      </p>

      <span
        className={cn(
          "mt-[var(--space-2)] inline-flex items-center gap-[6px]",
          "font-sans text-[14px] font-semibold text-primary",
        )}
      >
        {industry.ctaLabel}
        <Icon
          name="arrow-right"
          size="sm"
          aria-hidden
          className="industries-card-cta-icon h-[14px] w-[14px]"
        />
      </span>
    </Link>
  );
}
