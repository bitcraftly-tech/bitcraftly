import { useId } from "react";
import { Badge } from "@/components/ui/badge";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import type {
  SectionHeaderAlign,
  SectionHeaderMaxWidth,
  SectionHeaderProps,
} from "./types";

const alignStyles: Record<SectionHeaderAlign, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
};

const maxWidthStyles: Record<SectionHeaderMaxWidth, string> = {
  sm: "max-w-[var(--container-sm)]",
  md: "max-w-[var(--container-md)]",
  lg: "max-w-[var(--container-lg)]",
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  maxWidth = "md",
  headingLevel = 2,
  id,
  className,
  children,
}: SectionHeaderProps) {
  const generatedId = useId();
  const headingId = id ?? generatedId;
  const descriptionId = description ? `${headingId}-description` : undefined;
  const hasActions = Boolean(children);

  return (
    <header
      className={cn(
        "flex w-full flex-col gap-[var(--space-3)] md:gap-[var(--space-4)]",
        alignStyles[align],
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full flex-col gap-[var(--space-3)] md:gap-[var(--space-4)]",
          hasActions &&
            "sm:flex-row sm:items-end sm:justify-between sm:gap-[var(--space-4)]",
          align === "center" && hasActions && "sm:flex-col sm:items-center",
        )}
      >
        <div
          className={cn(
            "flex w-full flex-col gap-[var(--space-2)] md:gap-[var(--space-3)]",
            maxWidthStyles[maxWidth],
            align === "center" && "mx-auto",
          )}
        >
          {eyebrow ? (
            <Badge
              variant="primary"
              size="sm"
              className="uppercase tracking-[0.15em]"
            >
              {eyebrow}
            </Badge>
          ) : null}

          <Heading
            id={headingId}
            level={headingLevel}
            aria-describedby={descriptionId}
            className="text-balance"
          >
            {title}
          </Heading>

          {description ? (
            <Text
              id={descriptionId}
              size="lg"
              muted
              className="text-pretty leading-relaxed"
            >
              {description}
            </Text>
          ) : null}
        </div>

        {children ? (
          <div
            className={cn(
              "shrink-0",
              align === "center" && "flex justify-center",
            )}
          >
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
}
