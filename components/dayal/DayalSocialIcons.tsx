type IconProps = {
  className?: string;
};

/** Simplified glyph — reads clearly at small sizes */
export function FacebookIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.6c-.3 0-1.4-.1-2.7-.1-2.7 0-4.6 1.6-4.6 4.6v2.6H7v3.3h2.3V22h4.2z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 7.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0-3.2c3.2 0 3.6 0 4.9.1 3.2.1 4.7 1.6 4.9 4.9.1 1.3.1 1.7.1 4.8s0 3.5-.1 4.8c-.2 3.1-1.7 4.6-4.9 4.9-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-3.2-.3-4.7-1.8-4.9-4.9-.1-1.3-.1-1.7-.1-4.8s0-3.5.1-4.8C2.4 3.7 3.9 2.2 7.1 2.1 8.4 2 8.8 2 12 2zm0 1.8c-3.1 0-3.5 0-4.7.1-2.4.1-3.5 1.2-3.6 3.6-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 2.4 1.2 3.5 3.6 3.6 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c2.4-.1 3.5-1.2 3.6-3.6.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-2.4-1.2-3.5-3.6-3.6-1.2-.1-1.6-.1-4.7-.1zm5.8 1.4a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
    </svg>
  );
}
