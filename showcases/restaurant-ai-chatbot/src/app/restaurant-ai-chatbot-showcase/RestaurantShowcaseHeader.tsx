import ShowcaseAnchor from '@bitcraftly/showcase-shared/ShowcaseAnchor';
import { Bot, Sparkles } from 'lucide-react';

import { CONTAINER } from '@/lib/constants';

const NAV_LINKS = [
  { label: 'How it works', href: '#journey' },
  { label: 'Live demo', href: '#live-demo' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Outcomes', href: '#outcomes' },
] as const;

/** Sticky glass header for the Tasting Desk AI showcase. */
export default function RestaurantShowcaseHeader() {
  return (
    <header className="ra-header">
      <div className={`${CONTAINER} ra-header__bar`}>
        <ShowcaseAnchor href="#hero" className="ra-header__brand">
          <span className="ra-header__mark" aria-hidden>
            <Bot size={20} />
          </span>
          <span className="ra-header__brand-text">
            <strong>
              Tasting Desk <em>AI</em>
            </strong>
            <small>Restaurant AI host platform</small>
          </span>
        </ShowcaseAnchor>

        <nav className="ra-header__nav" aria-label="Showcase sections">
          {NAV_LINKS.map((link) => (
            <ShowcaseAnchor key={link.href} href={link.href} className="ra-header__link">
              {link.label}
            </ShowcaseAnchor>
          ))}
        </nav>

        <div className="ra-header__actions">
          <span className="ra-header__pill">
            <i aria-hidden />
            Live preview
          </span>
          <ShowcaseAnchor href="#live-demo" className="ra-button ra-button--primary ra-header__cta">
            <Sparkles size={15} aria-hidden />
            Try the demo
          </ShowcaseAnchor>
        </div>
      </div>
    </header>
  );
}
