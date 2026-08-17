import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  Mail,
  MapPinned,
  MessageCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import DayalFollowUs from '@bitcraftly/showcase-dayal-builders/components/DayalFollowUs';
import DayalLogo from '@bitcraftly/showcase-dayal-builders/components/DayalLogo';
import DayalReveal from '@bitcraftly/showcase-dayal-builders/components/DayalReveal';
import DayalSectionLink from '@bitcraftly/showcase-dayal-builders/components/DayalSectionLink';
import { DAYAL, FOOTER_ABOUT, FOOTER_COLUMNS } from '@bitcraftly/showcase-dayal-builders/lib/data';

function FooterHeading({ children }: { children: ReactNode }) {
  return <p className="dayal-footer__heading">{children}</p>;
}

const FOOTER_PROOF = [
  {
    icon: Building2,
    label: 'Since 1999',
    detail: 'Built on continuity',
  },
  {
    icon: MapPinned,
    label: 'Jamshedpur',
    detail: 'Local market expertise',
  },
  {
    icon: ShieldCheck,
    label: 'Guided buying',
    detail: 'From shortlist to handover',
  },
] as const;

export default function DayalFooter() {
  const whatsappUrl = `https://wa.me/${DAYAL.whatsapp}?text=${encodeURIComponent(
    'Hi Dayal Builders, I would like to know more about your properties.',
  )}`;

  return (
    <footer className="dayal-footer">
      <div className="dayal-footer__blueprint" aria-hidden />
      <div className="dayal-footer__glow" aria-hidden />

      <div className="dayal-container relative">
        <DayalReveal className="dayal-footer__cta">
          <div className="dayal-footer__cta-copy">
            <p className="dayal-footer__kicker">Your next address starts here</p>
            <h2>Let&apos;s find a home that feels right.</h2>
            <p>
              Speak with our property team for current availability, indicative pricing and a guided
              site visit.
            </p>
          </div>
          <div className="dayal-footer__cta-actions">
            <DayalSectionLink href="#contact" className="dayal-footer__cta-primary">
              <CalendarDays aria-hidden />
              Schedule a visit
              <ArrowUpRight aria-hidden />
            </DayalSectionLink>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dayal-footer__cta-secondary"
            >
              <MessageCircle aria-hidden />
              WhatsApp us
            </a>
          </div>
        </DayalReveal>

        <ul className="dayal-footer__proof" aria-label="Why choose Dayal Builders">
          {FOOTER_PROOF.map(({ icon: Icon, label, detail }) => (
            <li key={label}>
              <span className="dayal-footer__proof-icon" aria-hidden>
                <Icon />
              </span>
              <span>
                <strong>{label}</strong>
                <small>{detail}</small>
              </span>
            </li>
          ))}
        </ul>

        <div className="dayal-footer__top">
          <DayalReveal className="dayal-footer__brand">
            <DayalLogo href="#home" />
            <p className="dayal-footer__about">{FOOTER_ABOUT}</p>
            <p className="dayal-footer__registration">Jamshedpur, Jharkhand · Since 1999</p>
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
                          <span>{link.label}</span>
                          <ArrowUpRight aria-hidden />
                        </a>
                      ) : (
                        <DayalSectionLink href={link.href} className="dayal-footer__link">
                          <span>{link.label}</span>
                        </DayalSectionLink>
                      )}
                    </li>
                  ))}
                </ul>
              </DayalReveal>
            ))}
          </nav>
        </div>

        <DayalReveal delay={0.1} className="dayal-footer__reach">
          <p className="dayal-footer__kicker">Talk to us</p>
          <ul className="dayal-footer__reach-list">
            {DAYAL.phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`}>
                  <Phone aria-hidden />
                  {phone.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${DAYAL.email}`}>
                <Mail aria-hidden />
                {DAYAL.email}
              </a>
            </li>
            <li>
              <DayalSectionLink href="#location">
                <MapPinned aria-hidden />
                Office &amp; site map
              </DayalSectionLink>
            </li>
          </ul>
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
