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

/** Global card inset baseline — see tokens.css (--card-padding-*). */
const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  baseline: "card-padding",
  sm: "card-padding",
  md: "card-padding",
  lg: "card-padding",
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
