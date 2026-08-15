import { Caudex, Playfair_Display, Source_Sans_3 } from 'next/font/google';

export const dayalCaudex = Caudex({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-caudex',
  display: 'swap',
  adjustFontFallback: true,
});

export const dayalPlayfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
  adjustFontFallback: true,
});

export const dayalSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dayal-sans',
  display: 'swap',
  adjustFontFallback: true,
});
