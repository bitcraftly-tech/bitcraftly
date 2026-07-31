import type { ReactNode } from 'react';
import { Icon, type IconName } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import './hero-compositions.css';

export function HeroStage({
  children,
  className,
  minHeightClass = 'lg:min-h-[380px]',
  /** Decorative compositions should not enter the accessibility tree. */
  decorative = true,
}: {
  children: ReactNode;
  className?: string;
  minHeightClass?: string;
  decorative?: boolean;
}) {
  return (
    <div
      className={cn('mh-stage', minHeightClass, className)}
      aria-hidden={decorative || undefined}
    >
      <div className="mh-glow" aria-hidden />
      <div className="mh-glow-soft" aria-hidden />
      {children}
    </div>
  );
}

export function FloatMetricCard({
  title,
  value,
  hint,
  icon,
  className,
}: {
  title: string;
  value: string;
  hint?: string;
  icon: IconName;
  className?: string;
}) {
  return (
    <div className={cn('mh-float', className)} aria-hidden>
      <span className="mh-float-icon">
        <Icon name={icon} size="sm" className="h-[14px] w-[14px]" />
      </span>
      <div className="min-w-0">
        <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          {title}
        </p>
        <p className="m-0 mt-[2px] font-sans text-[15px] font-bold leading-none tracking-[-0.02em] text-foreground">
          {value}
        </p>
        {hint ? (
          <p className="m-0 mt-[4px] font-sans text-[11px] text-muted-foreground">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}

export function BrowserWindow({
  url,
  children,
  className,
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mh-panel', className)}>
      <div className="mh-browser-chrome">
        <div className="mh-browser-dots" aria-hidden>
          <span />
          <span />
          <span />
        </div>
        <div className="mh-browser-url">{url}</div>
      </div>
      <div className="p-[12px]">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('mh-phone', className)}>
      <div className="mh-phone-notch" aria-hidden />
      <div className="p-[10px] pt-[8px]">{children}</div>
    </div>
  );
}
