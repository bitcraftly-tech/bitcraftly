import Link from 'next/link';
import { cn } from '@/lib/cn';
import { bcButtonClassName } from './buttonVariants';
import type { ButtonProps } from './types';
import type { ReactNode } from 'react';

function ButtonIcon({ children }: { children: ReactNode }) {
  return (
    <span className="bc-btn__icon" aria-hidden="true">
      {children}
    </span>
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
  const buttonClassName = bcButtonClassName({
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
