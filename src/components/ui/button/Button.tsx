import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { ButtonProps, ButtonSize, ButtonVariant } from './types';
import type { ReactNode } from 'react';
import './button.css';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover focus-visible:ring-primary',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-hover focus-visible:ring-secondary',
  outline:
    'border border-border bg-transparent text-foreground hover:bg-surface active:bg-surface focus-visible:ring-border',
  ghost:
    'bg-transparent text-foreground hover:bg-surface active:bg-surface focus-visible:ring-border',
  destructive:
    'bg-error text-error-foreground hover:opacity-90 active:opacity-80 focus-visible:ring-error',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 gap-1.5 px-3 text-sm',
  md: 'h-10 gap-2 px-4 text-base',
  lg: 'h-12 gap-2.5 px-6 text-lg',
};

function ButtonIcon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center" aria-hidden="true">
      {children}
    </span>
  );
}

function getButtonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  className,
}: Pick<ButtonProps, 'variant' | 'size' | 'fullWidth' | 'loading' | 'className'>) {
  return cn(
    'inline-flex items-center justify-center rounded-md font-medium no-underline transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
    loading && 'button--loading',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    className,
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  href,
  loading = false,
  loadingText = 'Loading…',
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
    loading,
    className,
  });

  const content = loading ? (
    <span>{loadingText}</span>
  ) : (
    <>
      {iconLeft ? <ButtonIcon>{iconLeft}</ButtonIcon> : null}
      {children}
      {iconRight ? <ButtonIcon>{iconRight}</ButtonIcon> : null}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-disabled={isDisabled || undefined}
        className={cn(buttonClassName, isDisabled && 'pointer-events-none opacity-50')}
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
