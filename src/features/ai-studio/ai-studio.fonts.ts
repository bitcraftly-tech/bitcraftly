import { Tektur } from 'next/font/google';

/** Octagonal display face used by the Studio hero / section headlines. */
export const studioDisplayFont = Tektur({
  subsets: ['latin'],
  weight: '900',
  variable: '--studio-font-display',
  display: 'swap',
  adjustFontFallback: true,
});
