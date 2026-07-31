import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonType = 'button' | 'submit' | 'reset';

/**
 * Button props for the Bitcraftly design system.
 *
 * Future extension points (not implemented):
 * - `iconOnly` — icon-only buttons with required aria-label
 * - `asChild` — composition via Radix-style slot pattern
 * - `loadingText` — replace visible label while loading
 * - `tooltip` — associated tooltip trigger
 * - `data-analytics-*` — product analytics attributes
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  type?: ButtonType;
  href?: string;
  loading?: boolean;
  /** Visible label while loading (default: "Loading…"). */
  loadingText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  children: ReactNode;
}
