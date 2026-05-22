type PortfolioFilterIconProps = {
  name: string;
  className?: string;
};

export default function PortfolioFilterIcon({ name, className = "size-3.5" }: PortfolioFilterIconProps) {
  const c = className;
  switch (name) {
    case "grid":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="currentColor" aria-hidden>
          <rect x="1" y="1" width="6" height="6" rx="1" />
          <rect x="9" y="1" width="6" height="6" rx="1" />
          <rect x="1" y="9" width="6" height="6" rx="1" />
          <rect x="9" y="9" width="6" height="6" rx="1" />
        </svg>
      );
    case "react":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        </svg>
      );
    case "next":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M11.6 4H4v16h7.6V4zm1 0v16h8.4V4h-8.4z" opacity="0.9" />
        </svg>
      );
    case "ai":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zm-6 10l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3zm12 0l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
        </svg>
      );
    case "web":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
        </svg>
      );
    case "dash":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-10h8V3h-8v8z" opacity="0.85" />
        </svg>
      );
    case "landing":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M4 20V4l16 8-16 8z" />
        </svg>
      );
    case "mvp":
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
        </svg>
      );
    default:
      return (
        <svg className={c} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="3" />
        </svg>
      );
  }
}
