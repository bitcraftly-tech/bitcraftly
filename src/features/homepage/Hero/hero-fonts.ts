import { Dancing_Script } from 'next/font/google';

/** Artistic script for the hero focus line (image2 lockup). */
export const heroHandFont = Dancing_Script({
  variable: '--font-hero-hand',
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});
