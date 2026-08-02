import {
  SCHOOL_FULL_NAME,
  SCHOOL_TAGLINE,
} from '@/app/portfolio/school-website-showcase/school-demo-data';

type SchoolLogoProps = {
  className?: string;
  size?: 'sm' | 'md';
  variant?: 'default' | 'light';
};

const sizes = {
  sm: { shield: 'h-10 w-10', title: 'text-sm', sub: 'text-[9px]' },
  md: { shield: 'h-12 w-12', title: 'text-base', sub: 'text-[10px]' },
} as const;

export default function SchoolLogo({
  className = '',
  size = 'md',
  variant = 'default',
}: SchoolLogoProps) {
  const s = sizes[size];
  const light = variant === 'light';
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={`${s.shield} relative flex shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--school-navy)] to-[#1a3d6b] text-[var(--school-orange)] shadow-md`}
        aria-hidden
      >
        <svg viewBox="0 0 32 36" className="h-[70%] w-[70%]" fill="currentColor">
          <path d="M16 2L3 9v8l13 7 13-7V9L16 2zm0 4.2l8.5 4.9v4.6L16 18.5 7.5 15.7v-4.6L16 6.2zM5 20.5V28l11 6 11-6v-7.5l-11 6-11-6z" />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={`${s.title} font-[var(--font-playfair)] font-bold uppercase tracking-wide ${light ? 'text-white' : 'text-[var(--school-navy)]'}`}
        >
          {SCHOOL_FULL_NAME}
        </span>
        <span
          className={`${s.sub} font-medium italic ${light ? 'text-white/70' : 'text-[var(--school-muted)]'}`}
        >
          {SCHOOL_TAGLINE}
        </span>
      </span>
    </span>
  );
}
