'use client';

import { useEffect, useState } from 'react';
import ShowcaseAnchor from '@bitcraftly/showcase-shared/ShowcaseAnchor';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { PhoneCall, Wrench } from 'lucide-react';

import { CONTAINER, SUPPORT_PHONE_DISPLAY } from '@/lib/constants';

import { NAV_LINKS } from './local-services.content';

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

/** Sticky header with a scroll-progress rail and section-aware navigation. */
export default function LocalServicesHeader() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  const [stuck, setStuck] = useState(false);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (node): node is HTMLElement => node !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.01, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="lsx-header" data-stuck={stuck}>
      <div className={`${CONTAINER} lsx-header__bar`}>
        <ShowcaseAnchor href="#top" className="lsx-header__brand">
          <span className="lsx-header__mark" aria-hidden>
            <Wrench size={19} strokeWidth={2} />
          </span>
          <span className="lsx-header__brand-text">
            <strong>Steel City Home Pros</strong>
            <small>Verified crews · Jamshedpur</small>
          </span>
        </ShowcaseAnchor>

        <nav className="lsx-header__nav" aria-label="Showcase sections">
          {NAV_LINKS.map((link) => (
            <ShowcaseAnchor
              key={link.href}
              href={link.href}
              className="lsx-header__link"
              data-active={activeId === link.href.slice(1)}
              aria-current={activeId === link.href.slice(1) ? 'true' : undefined}
            >
              {link.label}
            </ShowcaseAnchor>
          ))}
        </nav>

        <div className="lsx-header__actions">
          <a
            href={`tel:${SUPPORT_PHONE_DISPLAY.replace(/\s/g, '')}`}
            className="lsx-header__phone"
            aria-label={`Call ${SUPPORT_PHONE_DISPLAY}`}
          >
            <PhoneCall size={15} aria-hidden />
            {SUPPORT_PHONE_DISPLAY}
          </a>
          <ShowcaseAnchor href="#booking" className="lsx-btn lsx-btn--primary lsx-header__cta">
            Book a visit
          </ShowcaseAnchor>
        </div>
      </div>

      <motion.span
        className="lsx-header__progress"
        style={{ scaleX: reduceMotion ? scrollYProgress : progress }}
        aria-hidden
      />
    </header>
  );
}
