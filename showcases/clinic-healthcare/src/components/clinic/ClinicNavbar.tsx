'use client';

import { useEffect, useRef, useState } from 'react';
import { CalendarCheck, Menu, Phone, X } from 'lucide-react';

import {
  CLINIC_BRAND,
  CLINIC_NAV_LINKS,
} from '@bitcraftly/showcase-clinic-healthcare/app/clinic-healthcare-showcase/clinic-data';

import ClinicLogoMark from './ClinicLogo';
import ClinicSectionAnchor from './ClinicSectionAnchor';

export default function ClinicNavbar() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="cl-header">
      <div className="cl-container cl-header__bar">
        <ClinicSectionAnchor
          href="#top"
          className="cl-header__brand"
          aria-label={`${CLINIC_BRAND.name} home`}
        >
          <ClinicLogoMark className="cl-header__mark" />
          <span className="cl-header__brand-text">
            <span className="cl-header__brand-name">{CLINIC_BRAND.name}</span>
            <span className="cl-header__brand-tagline">{CLINIC_BRAND.tagline}</span>
          </span>
        </ClinicSectionAnchor>

        <nav aria-label="Primary" className="cl-header__nav">
          <ul className="cl-header__links">
            {CLINIC_NAV_LINKS.map((link) => (
              <li key={link.label}>
                <ClinicSectionAnchor href={link.href} className="cl-header__link">
                  {link.label}
                </ClinicSectionAnchor>
              </li>
            ))}
          </ul>
        </nav>

        <div className="cl-header__actions">
          <a
            href={`tel:${CLINIC_BRAND.phone.replace(/\s/g, '')}`}
            className="cl-btn cl-btn--outline cl-btn--sm cl-header__phone"
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span>{CLINIC_BRAND.phone}</span>
          </a>
          <ClinicSectionAnchor href="#appointment" className="cl-btn cl-btn--primary cl-btn--sm">
            <CalendarCheck className="h-4 w-4" aria-hidden />
            <span className="cl-header__book-label">Book Appointment</span>
            <span className="cl-header__book-short">Book</span>
          </ClinicSectionAnchor>

          <button
            ref={toggleRef}
            type="button"
            className="cl-header__menu-btn"
            aria-expanded={open}
            aria-controls="clinic-mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div ref={panelRef} id="clinic-mobile-nav" className="cl-header__panel">
          <nav aria-label="Mobile" className="cl-container cl-header__panel-inner">
            <ul className="cl-header__panel-links">
              {CLINIC_NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <ClinicSectionAnchor
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="cl-header__panel-link"
                  >
                    {link.label}
                  </ClinicSectionAnchor>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href={`tel:${CLINIC_BRAND.phone.replace(/\s/g, '')}`}
                  className="cl-btn cl-btn--outline cl-btn--block cl-btn--sm"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {CLINIC_BRAND.phone}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
