type IconProps = { className?: string };

export function FacebookIcon({ className = 'size-3' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.6c-.3 0-1.4-.1-2.7-.1-2.7 0-4.6 1.6-4.6 4.6v2.6H7v3.3h2.3V22h4.2z" />
    </svg>
  );
}

export function XIcon({ className = 'size-3' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-4.2-5.5L7.5 22H2.4l7.3-8.3L1 2h6.9l3.8 5 4.2-5zm-1.2 18h1.7L7.1 4H5.2l12.5 16z" />
    </svg>
  );
}

export function LinkedInIcon({ className = 'size-3' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3v9zM6.5 8.3A1.8 1.8 0 118.3 6.5 1.8 1.8 0 016.5 8.3zM19 19h-3v-4.4c0-1.1 0-2.5-1.5-2.5s-1.7 1.2-1.7 2.4V19h-3v-9h2.9v1.2h0a3.2 3.2 0 012.9-1.6c3.1 0 3.7 2 3.7 4.6V19z" />
    </svg>
  );
}

export function InstagramIcon({ className = 'size-3' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 7.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6zm0-3.2c3.2 0 3.6 0 4.9.1 3.2.1 4.7 1.6 4.9 4.9.1 1.3.1 1.7.1 4.8s0 3.5-.1 4.8c-.2 3.1-1.7 4.6-4.9 4.9-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-3.2-.3-4.7-1.8-4.9-4.9-.1-1.3-.1-1.7-.1-4.8s0-3.5.1-4.8C2.4 3.7 3.9 2.2 7.1 2.1 8.4 2 8.8 2 12 2zm0 1.8c-3.1 0-3.5 0-4.7.1-2.4.1-3.5 1.2-3.6 3.6-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 2.4 1.2 3.5 3.6 3.6 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c2.4-.1 3.5-1.2 3.6-3.6.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-2.4-1.2-3.5-3.6-3.6-1.2-.1-1.6-.1-4.7-.1zm5.8 1.4a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
    </svg>
  );
}

export function YoutubeIcon({ className = 'size-3' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18 5 12 5 12 5s-6 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C6 19 12 19 12 19s6 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}

export const RPYTECH_SOCIAL_ICONS = [
  FacebookIcon,
  XIcon,
  InstagramIcon,
  LinkedInIcon,
  YoutubeIcon,
] as const;
export const RPYTECH_FOOTER_SOCIAL_ICONS = [
  FacebookIcon,
  XIcon,
  InstagramIcon,
  YoutubeIcon,
  LinkedInIcon,
] as const;
