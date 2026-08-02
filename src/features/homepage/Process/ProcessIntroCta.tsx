import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import { PROCESS_VIEW_CTA } from './process.constants';

interface ProcessIntroCtaProps {
  className?: string;
}

export function ProcessIntroCta({ className }: ProcessIntroCtaProps) {
  return (
    <Link
      href={PROCESS_VIEW_CTA.href}
      className={cn(
        'group inline-flex items-center gap-[6px] no-underline',
        'font-sans text-[15px] font-semibold text-primary',
        'rounded-sm transition-colors duration-[var(--duration-fast)]',
        'hover:text-primary-hover',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        className,
      )}
    >
      {PROCESS_VIEW_CTA.label}
      <Icon
        name="arrow-right"
        size="sm"
        aria-hidden
        className={cn(
          'h-[14px] w-[14px]',
          'transition-transform duration-[var(--duration-normal)]',
          'group-hover:translate-x-[3px]',
        )}
      />
    </Link>
  );
}
