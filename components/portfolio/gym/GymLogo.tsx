type GymLogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { icon: "h-7 w-7", text: "text-lg", sub: "text-[9px]" },
  md: { icon: "h-8 w-8", text: "text-xl", sub: "text-[10px]" },
  lg: { icon: "h-10 w-10", text: "text-2xl", sub: "text-xs" },
} as const;

/** FitRally wordmark + bolt mark */
export default function GymLogo({ className = "", size = "md" }: GymLogoProps) {
  const s = sizes[size];
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        className={`${s.icon} flex shrink-0 items-center justify-center rounded-lg bg-[var(--gym-brand)] text-white shadow-sm`}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-[55%] w-[55%]" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`${s.text} font-extrabold tracking-tight text-[var(--gym-text)]`}>
          Fit<span className="gym-brand-text">Rally</span>
        </span>
        <span className={`${s.sub} mt-0.5 font-semibold uppercase tracking-[0.18em] text-[var(--gym-muted)]`}>
          Train together
        </span>
      </span>
    </span>
  );
}
