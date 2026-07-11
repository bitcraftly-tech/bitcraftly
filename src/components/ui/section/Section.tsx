import { cn } from "@/lib/cn";
import { Container } from "../container";
import { buildResponsiveClasses } from "../typography/utils";
import type {
  SectionBackground,
  SectionElement,
  SectionProps,
  SectionSpacing,
} from "./types";

const backgroundStyles: Record<SectionBackground, string> = {
  default: "bg-background text-foreground",
  surface: "bg-surface text-surface-foreground",
  muted: "bg-surface text-muted-foreground",
  primary: "bg-primary text-primary-foreground",
};

const spacingStyles: Record<SectionSpacing, string> = {
  none: "py-0",
  sm: "py-[var(--space-4)]",
  md: "py-[var(--space-6)]",
  lg: "py-[var(--space-8)]",
  xl: "py-[var(--space-12)]",
};

export function Section({
  background = "default",
  spacing = "lg",
  as: Component = "section",
  className,
  children,
  ...props
}: SectionProps) {
  const Element = Component as SectionElement;

  return (
    <Element
      className={cn(
        backgroundStyles[background],
        buildResponsiveClasses(spacing, spacingStyles, "lg"),
        className,
      )}
      {...props}
    >
      <Container>{children}</Container>
    </Element>
  );
}
