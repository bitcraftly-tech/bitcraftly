import { Icon } from '@/components/ui/icon';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { NavigationLinkProps } from './header.types';

export function NavigationLink({
  href,
  label,
  isActive = false,
  hasDropdown = false,
  onClick,
  className,
}: NavigationLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      onClick={onClick}
      className={cn(
        'header-nav-item relative inline-flex items-center gap-[4px] py-[8px] no-underline',
        'font-sans text-[13px] font-medium leading-none tracking-[-0.01em] whitespace-nowrap',
        'transition-colors duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        isActive ? 'header-nav-active text-primary' : 'text-foreground/80 hover:text-primary',
        className,
      )}
    >
      <span>{label}</span>
      {hasDropdown ? (
        <Icon
          name="chevron-down"
          size="sm"
          aria-hidden
          className={cn(
            'h-[14px] w-[14px] [stroke-width:1.75]',
            isActive ? 'text-primary opacity-100' : 'opacity-70',
          )}
        />
      ) : null}
    </Link>
  );
}
