type GymLogoProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

/** FitRally wordmark + bolt mark — sizes via CSS (avoid missing --spacing-7 utilities). */
export default function GymLogo({ className = '', size = 'md' }: GymLogoProps) {
  return (
    <span className={`gym-logo gym-logo--${size} ${className}`.trim()}>
      <span className="gym-logo__mark" aria-hidden>
        <svg viewBox="0 0 24 24" fill="none" className="gym-logo__bolt">
          <path
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"
          />
        </svg>
      </span>
      <span className="gym-logo__text">
        <span className="gym-logo__name">
          Fit<span className="gym-brand-text">Rally</span>
        </span>
        <span className="gym-logo__tagline">Train together</span>
      </span>
    </span>
  );
}
