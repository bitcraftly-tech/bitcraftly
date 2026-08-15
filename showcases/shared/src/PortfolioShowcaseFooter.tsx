import Link from 'next/link';

import { CONTAINER } from '@/lib/constants';
import { newTabProps } from '@/lib/newTabLink';
import type { ShowcaseTheme } from '@/lib/portfolioShowcaseThemes';

type Props = {
  theme: ShowcaseTheme;
};

export default function PortfolioShowcaseFooter({ theme }: Props) {
  return (
    <footer className={theme.footerBar}>
      <div className={`${CONTAINER} py-10 md:py-12`}>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          <div className="min-w-0">
            <p className={theme.footerHeading}>{theme.fictionalBrand}</p>
            <p className={`mt-3 ${theme.footerMuted}`}>{theme.fictionalTagline}</p>
          </div>
          {theme.footerColumns.map((col) => (
            <div key={col.title}>
              <p className={theme.footerSectionLabel}>{col.title}</p>
              <ul className={`mt-4 space-y-2.5 ${theme.footerMuted}`}>
                {col.links.map((link) => (
                  <li key={`${col.title}-${link.label}`}>
                    <a href={link.href} className={theme.footerLink} {...newTabProps(link.href)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`mt-10 border-t pt-8 text-center ${theme.footerBorder}`}>
          <p className={`text-xs sm:text-sm ${theme.footerMuted}`}>
            Designed &amp; developed by{' '}
            <Link
              href="https://bitcraftly.com/"
              className={`font-semibold ${theme.footerLink}`}
              {...newTabProps('https://bitcraftly.com/')}
            >
              Bitcraftly
            </Link>
          </p>
          <p className={`mt-3 text-[11px] leading-relaxed ${theme.footerMuted}`}>
            UI mockup for portfolio preview · fictional brand unless linked to a live client site ·
            © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
