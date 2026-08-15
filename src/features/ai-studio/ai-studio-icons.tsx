/**
 * Studio icon primitives — inline SVG, mirrored from the bitcraftly-ai-studio app
 * so the ported hero / modules sections keep identical iconography.
 */

import type { SVGProps } from 'react';

export type StudioIconProps = SVGProps<SVGSVGElement>;

function base(props: StudioIconProps) {
  return {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    'aria-hidden': true as const,
    ...props,
  };
}

export function DashboardIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

export function ReelsIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <path d="M10 9.5v5l4.5-2.5L10 9.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function PostsIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="16" height="16" rx="2.5" />
      <path d="M8 9h8M8 12h8M8 15h5" />
    </svg>
  );
}

export function ImagesIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M3 16l5-4 4 3 3-2 6 4" />
    </svg>
  );
}

export function VideosIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="M16 10l5-3v10l-5-3v-4z" />
    </svg>
  );
}

export function AnalyticsIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 19V5M4 19h16" />
      <path d="M8 16v-5M12 16V8M16 16v-3" />
    </svg>
  );
}

export function SettingsIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

export function BannerIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 14h18M7 9h4" />
    </svg>
  );
}

export function BlogIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 4h10l4 4v12H5V4z" />
      <path d="M14 4v4h4M8 12h8M8 15h6" />
    </svg>
  );
}

export function BoltIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SparkIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
    </svg>
  );
}

export function LayersIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5" />
      <path d="M3 16l9 5 9-5" />
    </svg>
  );
}

export function ShieldIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3l8 3v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3z" />
    </svg>
  );
}

export function ArrowRightIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function CalendarIcon(props: StudioIconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}
