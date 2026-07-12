import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { TechnologiesCta } from "./technologies.types";

interface TechnologiesCtaLinkProps {
  cta: TechnologiesCta;
  className?: string;
}

/** Text-link CTA — matches Services / homepage section rhythm. */
export function TechnologiesCtaLink({
  cta,
  className,
}: TechnologiesCtaLinkProps) {
  return (
    <Link
      href={cta.href}
      className={cn(
        "group inline-flex items-center gap-[6px] no-underline",
        "font-sans text-[15px] font-semibold text-primary",
        "rounded-sm transition-colors duration-[var(--duration-fast)]",
        "hover:text-primary-hover",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        className,
      )}
    >
      {cta.label}
      <Icon
        name="arrow-right"
        size="sm"
        aria-hidden
        className={cn(
          "h-[14px] w-[14px]",
          "transition-transform duration-[var(--duration-normal)]",
          "group-hover:translate-x-[3px]",
        )}
      />
    </Link>
  );
}
