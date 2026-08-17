import ShowcaseAnchor from '@bitcraftly/showcase-shared/ShowcaseAnchor';
import ShowcaseLink from '@bitcraftly/showcase-shared/ShowcaseLink';
import { Bot, Globe2, MessageCircle, ShieldCheck } from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

const FOOTER_COLUMNS = [
  {
    title: 'Platform',
    links: [
      { label: 'How it works', href: '#journey' },
      { label: 'Live demo', href: '#live-demo' },
      { label: 'Capabilities', href: '#capabilities' },
    ],
  },
  {
    title: 'Outcomes',
    links: [
      { label: 'Operator metrics', href: '#outcomes' },
      { label: 'Integrations', href: '#languages' },
      { label: 'Guest care', href: '#capabilities' },
    ],
  },
] as const;

const CHIPS = [
  { label: 'English · हिंदी · Hinglish', icon: Globe2 },
  { label: 'WhatsApp ready', icon: MessageCircle },
  { label: 'Menu-grounded answers', icon: ShieldCheck },
] as const;

/** Footer for the Tasting Desk AI showcase — mirrors the header chrome. */
export default function RestaurantShowcaseFooter() {
  return (
    <footer className="ra-footer">
      <div className={`${CONTAINER} ra-footer__inner`}>
        <div className="ra-footer__brand">
          <p className="ra-footer__mark">
            <span aria-hidden>
              <Bot size={20} />
            </span>
            <strong>Tasting Desk AI</strong>
          </p>
          <p>
            A conversational host for restaurants — menu discovery, ordering, reservations, and
            guest care in one intelligence layer.
          </p>
          <ul className="ra-footer__chips">
            {CHIPS.map(({ label, icon: Icon }) => (
              <li key={label}>
                <Icon size={13} aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="ra-footer__columns">
          {FOOTER_COLUMNS.map((column) => (
            <nav key={column.title} aria-labelledby={`ra-footer-${column.title.toLowerCase()}`}>
              <h2 id={`ra-footer-${column.title.toLowerCase()}`}>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <ShowcaseAnchor href={link.href}>{link.label}</ShowcaseAnchor>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-labelledby="ra-footer-work">
            <h2 id="ra-footer-work">Work with us</h2>
            <ul>
              <li>
                <ShowcaseLink href="/contact?intent=consultation&source=restaurant-ai-chatbot-showcase">
                  Start a project
                </ShowcaseLink>
              </li>
              <li>
                <ShowcaseLink href="/services">Bitcraftly services</ShowcaseLink>
              </li>
              <li>
                <ShowcaseLink href="/portfolio">More showcases</ShowcaseLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className={`${CONTAINER} ra-footer__bar`}>
        <p>
          Designed &amp; developed by{' '}
          <ShowcaseLink href="https://bitcraftly.com/">Bitcraftly</ShowcaseLink>
        </p>
        <small>
          UI mockup for portfolio preview · fictional brand · metrics illustrative · © 2026
        </small>
      </div>
    </footer>
  );
}
