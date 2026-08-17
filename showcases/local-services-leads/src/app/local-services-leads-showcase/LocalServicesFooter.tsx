import ShowcaseAnchor from '@bitcraftly/showcase-shared/ShowcaseAnchor';
import ShowcaseLink from '@bitcraftly/showcase-shared/ShowcaseLink';
import { Wrench } from 'lucide-react';

import { CONTAINER, SUPPORT_PHONE_DISPLAY } from '@/lib/constants';

const FOOTER_COLUMNS = [
  {
    id: 'services',
    title: 'Services',
    links: [
      { label: 'Plumbing', href: '#services' },
      { label: 'Electrician', href: '#services' },
      { label: 'AC repair', href: '#services' },
      { label: 'Deep cleaning', href: '#services' },
    ],
  },
  {
    id: 'company',
    title: 'How we work',
    links: [
      { label: 'Dispatch flow', href: '#process' },
      { label: 'Operator outcomes', href: '#proof' },
      { label: 'Pricing plans', href: '#pricing' },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    links: [
      { label: 'Request a visit', href: '#booking' },
      { label: 'Coverage zones', href: '#zones' },
    ],
  },
] as const;

/** Showcase footer — mirrors the header anchors so in-page navigation stays reachable. */
export default function LocalServicesFooter() {
  return (
    <footer className="lsx-footer">
      <div className={`${CONTAINER} lsx-footer__inner`}>
        <div className="lsx-footer__brand">
          <p className="lsx-footer__mark">
            <span aria-hidden>
              <Wrench size={19} strokeWidth={2} />
            </span>
            <strong>Steel City Home Pros</strong>
          </p>
          <p>
            Verified plumbers, electricians, AC technicians and cleaners across Jamshedpur — quoted
            on WhatsApp before a single bolt is turned.
          </p>
          <p className="lsx-footer__phone">
            <ShowcaseAnchor
              href={`tel:${SUPPORT_PHONE_DISPLAY.replace(/\s/g, '')}`}
              className="lsx-btn lsx-btn--ghost"
            >
              {SUPPORT_PHONE_DISPLAY}
            </ShowcaseAnchor>
          </p>
        </div>

        <div className="lsx-footer__columns">
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.id} aria-labelledby={`lsx-footer-${column.id}`}>
              <h2 id={`lsx-footer-${column.id}`}>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <ShowcaseAnchor href={link.href}>{link.label}</ShowcaseAnchor>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className={`${CONTAINER} lsx-footer__bar`}>
        <small>
          Steel City Home Pros is a fictional brand · zones and pricing are illustrative · UI
          specimen by Bitcraftly.
        </small>
        <ShowcaseLink href="/contact?intent=consultation&source=local-services-leads-showcase">
          Talk to Bitcraftly about this funnel
        </ShowcaseLink>
      </div>
    </footer>
  );
}
