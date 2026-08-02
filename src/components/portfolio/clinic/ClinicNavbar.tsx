'use client';

import { useEffect, useRef, useState } from 'react';
import { CalendarCheck, Menu, Phone, X } from 'lucide-react';

import {
  CLINIC_BRAND,
  CLINIC_NAV_LINKS,
} from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

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
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{
        borderColor: 'var(--cl-border)',
        backgroundColor: 'color-mix(in srgb, var(--cl-surface) 88%, transparent)',
      }}
    >
      <div className="cl-container flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <ClinicSectionAnchor
          href="#top"
          className="flex items-center gap-2.5"
          aria-label={`${CLINIC_BRAND.name} home`}
        >
          <ClinicLogoMark className="h-9 w-9 shrink-0" />
          <span className="leading-tight">
            <span className="block text-[0.95rem] font-bold tracking-tight">
              {CLINIC_BRAND.name}
            </span>
            <span className="hidden text-[0.625rem] sm:block" style={{ color: 'var(--cl-faint)' }}>
              {CLINIC_BRAND.tagline}
            </span>
          </span>
        </ClinicSectionAnchor>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {CLINIC_NAV_LINKS.map((link) => (
              <li key={link.label}>
                <ClinicSectionAnchor
                  href={link.href}
                  className="block rounded-full px-2.5 py-2 text-sm font-medium whitespace-nowrap transition-colors hover:text-[var(--cl-primary)]"
                  style={{ color: 'var(--cl-muted)' }}
                >
                  {link.label}
                </ClinicSectionAnchor>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden 2xl:block">
            <a
              href={`tel:${CLINIC_BRAND.phone.replace(/\s/g, '')}`}
              className="cl-btn cl-btn--outline cl-btn--sm"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {CLINIC_BRAND.phone}
            </a>
          </div>
          <ClinicSectionAnchor href="#appointment" className="cl-btn cl-btn--primary cl-btn--sm">
            <CalendarCheck className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Book Appointment</span>
            <span className="sm:hidden">Book</span>
          </ClinicSectionAnchor>

          <div className="xl:hidden">
            <button
              ref={toggleRef}
              type="button"
              className="cl-rail-btn"
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
      </div>

      {open ? (
        <div
          ref={panelRef}
          id="clinic-mobile-nav"
          className="border-t xl:hidden"
          style={{ borderColor: 'var(--cl-border)', background: 'var(--cl-surface)' }}
        >
          <nav aria-label="Mobile" className="cl-container py-3">
            <ul className="grid gap-1">
              {CLINIC_NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <ClinicSectionAnchor
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-[var(--cl-surface-tint)] hover:text-[var(--cl-primary)]"
                    style={{ color: 'var(--cl-muted)' }}
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
