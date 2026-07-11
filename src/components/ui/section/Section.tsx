import { cn } from "@/lib/cn";
import type {
  SectionBackground,
  SectionElement,
  SectionProps,
  SectionSpacing,
} from "./section.types";

const backgroundStyles: Record<SectionBackground, string> = {
  default: "bg-background text-foreground",
  surface: "bg-surface text-surface-foreground",
  muted: "bg-surface text-muted-foreground",
  none: "",
};

const spacingStyles: Record<SectionSpacing, string> = {
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
        spacingStyles[spacing],
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
