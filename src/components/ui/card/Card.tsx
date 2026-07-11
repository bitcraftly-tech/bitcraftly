import { cn } from "@/lib/cn";
import { buildResponsiveClasses } from "../typography/utils";
import type { CardElement, CardPadding, CardProps, CardVariant } from "./types";

const variantStyles: Record<CardVariant, string> = {
  default:
    "border border-border bg-background text-foreground shadow-sm",
  outlined:
    "border border-border-strong bg-background text-foreground",
  elevated:
    "border border-border bg-background text-foreground shadow-lg",
  glass:
    "border border-border/80 bg-background/70 text-foreground shadow-sm backdrop-blur-md",
};

const paddingStyles: Record<CardPadding, string> = {
  sm: "p-[var(--space-2)]",
  md: "p-[var(--space-3)]",
  lg: "p-[var(--space-4)]",
};

export function Card({
  variant = "default",
  padding = "md",
  as: Component = "div",
  className,
  children,
  ...props
}: CardProps) {
  const Element = Component as CardElement;

  return (
    <Element
      className={cn(
        "rounded-xl",
        variantStyles[variant],
        buildResponsiveClasses(padding, paddingStyles, "md"),
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
