import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { ProcessCtaContent } from "./process.types";

interface ProcessSideCtaProps {
  content: ProcessCtaContent;
  className?: string;
}

export function ProcessSideCta({ content, className }: ProcessSideCtaProps) {
  return (
    <div
      className={cn(
        "process-side-cta flex w-full flex-col gap-[var(--space-3)]",
        "sm:flex-row sm:items-center sm:justify-between sm:gap-[var(--space-4)]",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <h3 className="process-side-cta-title">{content.title}</h3>
        <p className="process-side-cta-description">{content.description}</p>
      </div>

      <div className="flex shrink-0 items-center gap-[8px]">
        <Link
          href={content.href}
          className={cn(
            "process-side-cta-button inline-flex min-h-[48px] items-center justify-center",
            "rounded-[12px] px-[20px] no-underline",
            "font-sans text-[14px] font-semibold whitespace-nowrap",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
          )}
        >
          {content.buttonLabel}
        </Link>
        <Link
          href={content.href}
          aria-label={content.buttonLabel}
          className={cn(
            "process-side-cta-arrow inline-flex size-[48px] shrink-0 items-center justify-center",
            "rounded-[12px] no-underline",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
          )}
        >
          <Icon
            name="arrow-right"
            size="sm"
            aria-hidden
            className="h-[16px] w-[16px]"
          />
        </Link>
      </div>
    </div>
  );
}
