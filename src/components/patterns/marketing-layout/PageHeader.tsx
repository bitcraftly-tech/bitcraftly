import type { ReactNode } from "react";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/cn";

export interface PageHeaderProps {
  headingId: string;
  title: ReactNode;
  description?: ReactNode;
  eyebrow?: ReactNode;
  breadcrumbs?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

/**
 * Standard page-level header (H1) for marketing routes.
 * Aligns with Homepage typography scale via Heading / Text.
 */
export function PageHeader({
  headingId,
  title,
  description,
  eyebrow,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("w-full", className)}>
      {breadcrumbs ? (
        <div className="mb-[var(--space-4)]">{breadcrumbs}</div>
      ) : null}

      {eyebrow ? (
        <div className="mb-[var(--space-1-5,0.75rem)]">{eyebrow}</div>
      ) : null}

      <Heading id={headingId} level={1} className="max-w-3xl text-balance">
        {title}
      </Heading>

      {description ? (
        <Text muted className="mt-[var(--space-2)] max-w-2xl text-pretty">
          {description}
        </Text>
      ) : null}

      {actions ? (
        <div className="mt-[var(--space-5)] flex flex-wrap gap-[var(--space-1-5,0.75rem)]">
          {actions}
        </div>
      ) : null}
    </header>
  );
}
