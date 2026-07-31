import type { ReactElement, SVGProps } from 'react';
import { cn } from '@/lib/cn';
import type { TrustedByIconId } from './trusted-by.types';

type IconSvgProps = SVGProps<SVGSVGElement>;

function IconBase({ className, children, ...props }: IconSvgProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={cn('h-[26px] w-[26px] shrink-0', className)}
      {...props}
    >
      {children}
    </svg>
  );
}

function SparklesIcon(props: IconSvgProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3 13.4 8.2 18.5 9.5 13.4 10.8 12 16 10.6 10.8 5.5 9.5 10.6 8.2 12 3Z" />
      <path d="M18.2 14 19 16.6 21.5 17.5 19 18.4 18.2 21 17.4 18.4 14.9 17.5 17.4 16.6 18.2 14Z" />
    </IconBase>
  );
}

function LayersIcon(props: IconSvgProps) {
  return (
    <IconBase {...props}>
      <path d="m12 3.5 8 4.5-8 4.5-8-4.5 8-4.5Z" />
      <path d="m4 12 8 4.5 8-4.5" />
      <path d="m4 15.5 8 4.5 8-4.5" />
    </IconBase>
  );
}

function GaugeIcon(props: IconSvgProps) {
  return (
    <IconBase {...props}>
      <path d="M5.2 16a8 8 0 1 1 13.6 0" />
      <path d="M12 16 15.8 9.5" />
      <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

function ShieldCheckIcon(props: IconSvgProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3c2.3 1.2 4.6 1.8 7 1.8v6.4c0 4.3-2.9 7.1-7 8.6-4.1-1.5-7-4.3-7-8.6V4.8C7.4 4.8 9.7 4.2 12 3Z" />
      <path d="m9 12 2.1 2.1L15.5 9.7" />
    </IconBase>
  );
}

function TrendUpIcon(props: IconSvgProps) {
  return (
    <IconBase {...props}>
      <path d="m3.5 16.5 6-6 3.5 3.5 7.5-7.5" />
      <path d="M15 6.5h5v5" />
    </IconBase>
  );
}

function HandshakeIcon(props: IconSvgProps) {
  return (
    <IconBase {...props}>
      <path d="M12 14.5c1.2 1.1 3 1.1 4.2 0l2.3-2.2a2.1 2.1 0 0 0-3-3l-1 .9" />
      <path d="M12 14.5c-1.2 1.1-3 1.1-4.2 0L5.5 12.3a2.1 2.1 0 1 1 3-3l1 .9" />
      <path d="M9.2 8.8 11 7a2 2 0 0 1 2.8 0l1.2 1.2" />
      <path d="m8.5 15.8-1.3 1.3a2 2 0 1 1-2.8-2.8l1.1-1.1" />
      <path d="m15.5 15.8 1.3 1.3a2 2 0 1 0 2.8-2.8l-1.1-1.1" />
    </IconBase>
  );
}

const ICONS: Record<TrustedByIconId, (props: IconSvgProps) => ReactElement> = {
  sparkles: SparklesIcon,
  layers: LayersIcon,
  gauge: GaugeIcon,
  'shield-check': ShieldCheckIcon,
  'trend-up': TrendUpIcon,
  handshake: HandshakeIcon,
};

export function TrustedByIcon({ id, className }: { id: TrustedByIconId; className?: string }) {
  const Comp = ICONS[id];
  return <Comp className={className} />;
}
