import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ButtonProps, ButtonSize, ButtonVariant } from "./types";
import type { ReactNode } from "react";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover focus-visible:ring-primary",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-hover focus-visible:ring-secondary",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-surface active:bg-surface focus-visible:ring-border",
  ghost:
    "bg-transparent text-foreground hover:bg-surface active:bg-surface focus-visible:ring-border",
  destructive:
    "bg-error text-error-foreground hover:opacity-90 active:opacity-80 focus-visible:ring-error",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 gap-1.5 px-3 text-sm",
  md: "h-10 gap-2 px-4 text-base",
  lg: "h-12 gap-2.5 px-6 text-lg",
};

const spinnerSizeStyles: Record<ButtonSize, string> = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
};

function ButtonSpinner({ size }: { size: ButtonSize }) {
  return (
    <svg
      className={cn("shrink-0 animate-spin", spinnerSizeStyles[size])}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function ButtonIcon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center" aria-hidden="true">
      {children}
    </span>
  );
}

function getButtonClassName({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: Pick<ButtonProps, "variant" | "size" | "fullWidth" | "className">) {
  return cn(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && "w-full",
    className,
  );
}

export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  href,
  loading = false,
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  className,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const buttonClassName = getButtonClassName({
    variant,
    size,
    fullWidth,
    className,
  });

  const content = (
    <>
      {loading ? <ButtonSpinner size={size} /> : null}
      {loading ? <span className="sr-only">Loading</span> : null}
      {!loading && iconLeft ? <ButtonIcon>{iconLeft}</ButtonIcon> : null}
      {children}
      {!loading && iconRight ? <ButtonIcon>{iconRight}</ButtonIcon> : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-disabled={isDisabled || undefined}
        className={cn(buttonClassName, isDisabled && "pointer-events-none opacity-50")}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={buttonClassName}
      {...props}
    >
      {content}
    </button>
  );
}
