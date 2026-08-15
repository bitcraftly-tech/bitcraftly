import { Inter, Playfair_Display } from 'next/font/google';

/** Page-only fonts for ClayCraft crockery homepage. Not used globally. */
export const claycraftBody = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--cc-font-body',
});

export const claycraftDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--cc-font-display',
});
