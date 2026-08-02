import { cn } from '@/lib/cn';
import type { ButtonSize, ButtonVariant } from './types';

export type BcButtonVariant = ButtonVariant | 'soft';
export type BcButtonSize = ButtonSize | 'xl';

export type BcButtonOptions = {
  variant?: BcButtonVariant;
  size?: BcButtonSize;
  fullWidth?: boolean;
  pill?: boolean;
  /** Use on dark / footer surfaces */
  onInverse?: boolean;
  loading?: boolean;
  className?: string;
};

const variantClass: Record<BcButtonVariant, string> = {
  primary: 'bc-btn--primary',
  secondary: 'bc-btn--secondary',
  outline: 'bc-btn--outline',
  ghost: 'bc-btn--ghost',
  soft: 'bc-btn--soft',
  destructive: 'bc-btn--destructive',
};

const sizeClass: Record<BcButtonSize, string> = {
  sm: 'bc-btn--sm',
  md: 'bc-btn--md',
  lg: 'bc-btn--lg',
  xl: 'bc-btn--xl',
};

/**
 * Shared Bitcraftly button classes (logo theme).
 * Use for `<Button />`, `<Link>`, or raw `<button>` / `<a>`.
 *
 * @example
 * <Link className={bcButtonClassName({ variant: 'primary', size: 'lg' })} href="...">
 *   Explore
 * </Link>
 */
export function bcButtonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  pill = false,
  onInverse = false,
  loading = false,
  className,
}: BcButtonOptions = {}) {
  return cn(
    'bc-btn',
    variantClass[variant],
    sizeClass[size],
    fullWidth && 'bc-btn--block',
    pill && 'bc-btn--pill',
    onInverse && 'bc-btn--on-inverse',
    loading && 'button--loading',
    className,
  );
}
