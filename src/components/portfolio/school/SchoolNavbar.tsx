'use client';

import { Clock, Mail, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';

import { useSchoolDemo } from '@/app/portfolio/school-website-showcase/SchoolDemoContext';
import {
  formatVisitorCount,
  SCHOOL_EMAIL,
  SCHOOL_HOURS,
  SCHOOL_PHONE,
  SCHOOL_PHONE_DISPLAY,
} from '@/app/portfolio/school-website-showcase/school-demo-data';
import { CONTAINER } from '@/lib/constants';

import SchoolLogo from './SchoolLogo';

const NAV = [
  { label: 'Home', id: 'top' },
  { label: 'About Us', id: 'about' },
  { label: 'Academics', id: 'programs' },
  { label: 'Admissions', id: 'enquiry-form' },
  { label: 'Campus Life', id: 'campus-life' },
  { label: 'Facilities', id: 'facilities' },
  { label: 'News & Events', id: 'news-events' },
  { label: 'Contact Us', id: 'contact' },
] as const;

const LOGINS = ['Parent Login', 'Student Login', 'Staff Login'] as const;
export default function SchoolNavbar() {
  const { scrollToSection, scrollToEnquiry, showToast, visitorCount } = useSchoolDemo();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  const go = (id: string, label: string) => {
    setActiveNav(label);
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
    else if (id === 'enquiry-form') scrollToEnquiry();
    else scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="school-top-bar text-xs text-white">
        <div className={`${CONTAINER} flex flex-wrap items-center justify-between gap-2 py-2`}>
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 opacity-90">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {SCHOOL_HOURS}
            </span>
            <a
              href={`mailto:${SCHOOL_EMAIL}`}
              className="inline-flex items-center gap-1.5 hover:text-[var(--school-orange)]"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">{SCHOOL_EMAIL}</span>
            </a>
            <a
              href={`tel:${SCHOOL_PHONE}`}
              className="inline-flex items-center gap-1.5 hover:text-[var(--school-orange)]"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {SCHOOL_PHONE_DISPLAY}
            </a>
            <span className="hidden opacity-75 md:inline" title="Site visitors">
              Visitors: {formatVisitorCount(visitorCount)}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {LOGINS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => showToast(`${l} · demo portal`)}
                className="hover:text-[var(--school-orange)]"
              >
                {l}
              </button>
            ))}
            <span className="hidden h-4 w-px bg-white/30 sm:block" aria-hidden />
            {['F', 'I', 'Y'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => showToast(`Social · demo`)}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30 text-[10px] font-bold hover:border-[var(--school-orange)]"
                aria-label={`Social ${s}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="school-bg-card border-b school-border shadow-sm">
        <div
          className={`${CONTAINER} grid grid-cols-[auto_1fr_auto] items-center gap-2 py-3 lg:gap-4`}
        >
          <button type="button" onClick={() => go('top', 'Home')} className="min-w-0 text-left">
            <SchoolLogo size="sm" />
          </button>

          <nav className="hidden justify-center xl:flex" aria-label="Main">
            <div className="flex flex-nowrap items-center justify-center gap-x-1 lg:gap-x-2 xl:gap-x-3">
              {NAV.map((item) => (
                <button
                  key={`${item.id}-${item.label}`}
                  type="button"
                  onClick={() => go(item.id, item.label)}
                  className={`whitespace-nowrap px-1.5 py-1 text-xs font-semibold transition lg:text-sm ${
                    activeNav === item.label
                      ? 'text-[var(--school-orange)]'
                      : 'text-[var(--school-text)] hover:text-[var(--school-orange)]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={scrollToEnquiry}
              className="school-btn-primary hidden shrink-0 rounded-md px-4 py-2.5 text-xs font-bold uppercase lg:inline-flex"
            >
              Enquire Now
            </button>
            <button
              type="button"
              className="rounded-md p-2 xl:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="school-border border-t px-4 py-4 xl:hidden">
            <div className="flex flex-col gap-1">
              {NAV.map((item) => (
                <button
                  key={`m-${item.label}`}
                  type="button"
                  className="py-2 text-left text-sm font-medium"
                  onClick={() => go(item.id, item.label)}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={scrollToEnquiry}
                className="school-btn-primary mt-3 rounded-md py-2.5 text-sm font-bold uppercase"
              >
                Enquire Now
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
