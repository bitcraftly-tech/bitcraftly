"use client";

import { cn } from "@/lib/cn";
import { ButtonSpinner } from "./ButtonSpinner";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./button.types";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-primary",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary-hover focus-visible:ring-secondary",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-surface focus-visible:ring-border",
  ghost:
    "bg-transparent text-foreground hover:bg-surface focus-visible:ring-border",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 gap-1.5 px-3 text-sm",
  md: "h-10 gap-2 px-4 text-base",
  lg: "h-12 gap-2.5 px-6 text-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const isDisabled = disabled ?? loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-disabled={isDisabled || undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {loading ? (
        <>
          <ButtonSpinner
            className={size === "sm" ? "size-3.5" : size === "lg" ? "size-5" : undefined}
          />
          <span className="sr-only">Loading</span>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}
