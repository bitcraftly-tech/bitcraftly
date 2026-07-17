import { cn } from "@/lib/cn";
import type { BadgeElement, BadgeProps, BadgeSize, BadgeVariant } from "./types";

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "border border-border bg-surface text-surface-foreground",
  primary:
    "border border-primary/20 bg-primary/10 text-primary",
  secondary:
    "border border-transparent bg-secondary text-secondary-foreground",
  success:
    "border border-success/20 bg-success-subtle text-[#14532d] dark:text-[#bbf7d0]",
  warning:
    "border border-warning/20 bg-warning-subtle text-warning",
  outline:
    "border border-border bg-transparent text-foreground",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-[var(--space-1)] py-[var(--space-0-5)] text-xs font-semibold",
  md: "px-[var(--space-2)] py-[var(--space-1)] text-sm font-semibold",
  lg: "px-[var(--space-3)] py-[var(--space-1)] text-base font-semibold",
};

export function Badge({
  variant = "default",
  size = "md",
  as: Component = "span",
  className,
  children,
  ...props
}: BadgeProps) {
  const Element = Component as BadgeElement;

  return (
    <Element
      className={cn(
        "inline-flex items-center justify-center rounded-full leading-normal",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
