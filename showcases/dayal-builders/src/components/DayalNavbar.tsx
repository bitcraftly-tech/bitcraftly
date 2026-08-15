'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import DayalLogo from '@bitcraftly/showcase-dayal-builders/components/DayalLogo';
import DayalSectionLink from '@bitcraftly/showcase-dayal-builders/components/DayalSectionLink';
import { NAV_LINKS } from '@bitcraftly/showcase-dayal-builders/lib/data';

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace('#', ''));

export default function DayalNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(`#${id}`);
        },
        { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkClass = (href: string, mobile = false) => {
    const isActive = active === href;
    if (mobile) {
      return `dayal-nav__link dayal-nav__link--mobile${isActive ? ' is-active' : ''}`;
    }
    return `dayal-nav__link${isActive ? ' is-active' : ''}`;
  };

  return (
    <>
      <header
        className={`dayal-header${scrolled ? ' is-scrolled' : ' is-over-hero'}${open ? ' is-menu-open' : ''}`}
      >
        <div className="dayal-container dayal-header__inner">
          <DayalLogo priority className="min-w-0" />

          <nav className="dayal-header__nav" aria-label="Main">
            {NAV_LINKS.map((link) => (
              <DayalSectionLink key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </DayalSectionLink>
            ))}
          </nav>

          <div className="dayal-header__actions">
            <DayalSectionLink href="#contact" className="dayal-btn-primary dayal-header__cta">
              <Calendar className="h-4 w-4 shrink-0" aria-hidden />
              <span className="hidden sm:inline">Let&apos;s Connect</span>
              <span className="sm:hidden">Connect</span>
            </DayalSectionLink>
            <button
              type="button"
              className="dayal-header__menu-btn"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-[#0b1633]/55 backdrop-blur-sm"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="dayal-mobile-nav absolute right-0 top-0 flex h-[100dvh] max-h-[100dvh] w-[min(100%,320px)] flex-col overflow-hidden bg-[#f7f6f3] shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              aria-label="Mobile"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-[#0b1633]/8 px-5 py-4 pt-[max(1rem,env(safe-area-inset-top))]">
                <DayalLogo className="min-w-0" />
                <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="dayal-mobile-nav__scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 touch-pan-y">
                <ul className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href}>
                      <DayalSectionLink
                        href={link.href}
                        className={linkClass(link.href, true)}
                        onClick={() => setOpen(false)}
                      >
                        {link.label}
                      </DayalSectionLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="shrink-0 border-t border-[#0b1633]/8 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <DayalSectionLink
                  href="#contact"
                  className="dayal-btn-primary w-full"
                  onClick={() => setOpen(false)}
                >
                  <Calendar className="h-4 w-4" aria-hidden />
                  Let&apos;s Connect
                </DayalSectionLink>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
