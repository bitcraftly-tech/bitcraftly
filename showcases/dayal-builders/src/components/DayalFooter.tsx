import Link from 'next/link';
import type { ReactNode } from 'react';

import DayalContactInfo from '@bitcraftly/showcase-dayal-builders/components/DayalContactInfo';
import DayalFollowUs from '@bitcraftly/showcase-dayal-builders/components/DayalFollowUs';
import DayalLogo from '@bitcraftly/showcase-dayal-builders/components/DayalLogo';
import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import DayalSectionLink from '@bitcraftly/showcase-dayal-builders/components/DayalSectionLink';
import { DAYAL, FOOTER_ABOUT, FOOTER_COLUMNS } from '@bitcraftly/showcase-dayal-builders/lib/data';

function FooterHeading({ children }: { children: ReactNode }) {
  return <p className="dayal-footer__heading">{children}</p>;
}

export default function DayalFooter() {
  return (
    <footer className="dayal-footer">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_0%_0%,rgba(200,164,107,0.09),transparent_55%)]"
        aria-hidden
      />

      <div className="dayal-container relative">
        {/* Top — brand + navigation */}
        <div className="dayal-footer__top">
          <DayalReveal className="dayal-footer__brand">
            <DayalLogo href="#home" />
            <p className="dayal-footer__about">{FOOTER_ABOUT}</p>
            <DayalFollowUs compact />
          </DayalReveal>

          <nav className="dayal-footer__nav" aria-label="Footer">
            {FOOTER_COLUMNS.map((column, index) => (
              <DayalReveal
                key={column.title}
                delay={0.05 * (index + 1)}
                className="dayal-footer__col"
              >
                <FooterHeading>{column.title}</FooterHeading>
                <ul className="dayal-footer__list">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.href}`}>
                      {link.href.startsWith('http') ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="dayal-footer__link"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <DayalSectionLink href={link.href} className="dayal-footer__link">
                          {link.label}
                        </DayalSectionLink>
                      )}
                    </li>
                  ))}
                </ul>
              </DayalReveal>
            ))}
          </nav>
        </div>

        {/* Contact band — full width, balanced */}
        <DayalReveal delay={0.12} className="dayal-footer__contact">
          <FooterHeading>Contact</FooterHeading>
          <DayalContactInfo />
        </DayalReveal>

        <div className="dayal-footer__bottom">
          <p>© 2026 {DAYAL.brand}. All rights reserved.</p>
          <p>
            Digital Experience by{' '}
            <Link href="/" className="dayal-footer__credit">
              Bitcraftly
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
