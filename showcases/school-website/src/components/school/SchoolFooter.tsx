'use client';

import Link from 'next/link';
import { useState } from 'react';

import { useSchoolDemo } from '@bitcraftly/showcase-school-website/app/school-website-showcase/SchoolDemoContext';
import {
  FOOTER_QUICK,
  FOOTER_USEFUL,
  formatVisitorCount,
  SCHOOL_ADDRESS,
  SCHOOL_EMAIL,
  SCHOOL_FULL_NAME,
  SCHOOL_PHONE,
  SCHOOL_PHONE_DISPLAY,
} from '@bitcraftly/showcase-school-website/app/school-website-showcase/school-demo-data';
import { CONTAINER } from '@/lib/constants';
import { newTabProps } from '@/lib/newTabLink';

import SchoolLogo from './SchoolLogo';

export default function SchoolFooter() {
  const { scrollToSection, showToast, handleUsefulLink, visitorCount } = useSchoolDemo();
  const [email, setEmail] = useState('');

  const goLink = (label: string) => {
    const map: Record<string, string> = {
      'About Us': 'about',
      Academics: 'programs',
      Admissions: 'enquiry-form',
      'Campus Life': 'campus-life',
      'News & Events': 'news-events',
      Facilities: 'facilities',
      'Contact Us': 'contact',
    };
    const id = map[label] ?? 'about';
    if (id === 'enquiry-form')
      document
        .getElementById('enquiry-form')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    else scrollToSection(id);
  };

  return (
    <footer className="school-bg-footer text-white">
      <div className={`${CONTAINER} grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5`}>
        <div className="lg:col-span-1">
          <SchoolLogo variant="light" size="sm" />
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            {SCHOOL_FULL_NAME} — CBSE affiliated co-educational school delivering holistic learning
            since 1999. Fictional demo by Bitcraftly.
          </p>
          <div className="mt-4 flex gap-2">
            {['F', 'I', 'Y'].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => showToast(`Social · demo`)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-xs font-bold hover:border-[var(--school-orange)]"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-[var(--school-orange)]">Quick Links</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {FOOTER_QUICK.map((l) => (
              <li key={l}>
                <button type="button" onClick={() => goLink(l)} className="hover:text-white">
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-[var(--school-orange)]">Useful Links</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {FOOTER_USEFUL.map((l) => (
              <li key={l.label}>
                <button
                  type="button"
                  onClick={() => handleUsefulLink(l.action)}
                  className="hover:text-white"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-[var(--school-orange)]">Contact Us</p>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            <li>{SCHOOL_ADDRESS}</li>
            <li>
              <a href={`tel:${SCHOOL_PHONE}`} className="hover:text-[var(--school-orange)]">
                {SCHOOL_PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={`mailto:${SCHOOL_EMAIL}`} className="hover:text-[var(--school-orange)]">
                {SCHOOL_EMAIL}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-[var(--school-orange)]">Newsletter</p>
          <p className="mt-2 text-sm text-white/70">
            Subscribe for campus updates and admission alerts.
          </p>
          <form
            className="mt-4 flex gap-0 overflow-hidden rounded-lg"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.trim()) return;
              showToast('Subscribed · demo only');
              setEmail('');
            }}
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Your email"
              className="min-w-0 flex-1 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/50 outline-none"
            />
            <button
              type="submit"
              className="school-btn-orange px-4 text-lg font-bold"
              aria-label="Subscribe"
            >
              →
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div
          className={`${CONTAINER} flex flex-col items-center justify-between gap-3 text-center text-xs text-white/55 sm:flex-row`}
        >
          <p>
            © {new Date().getFullYear()} {SCHOOL_FULL_NAME}. All rights reserved. ·{' '}
            {formatVisitorCount(visitorCount)} visitors
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => showToast('Privacy policy · demo')}
              className="hover:text-white"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => showToast('Terms · demo')}
              className="hover:text-white"
            >
              Terms & Conditions
            </button>
          </div>
          <p>
            Built by{' '}
            <Link
              href="https://bitcraftly.com/"
              className="text-[var(--school-orange)] hover:underline"
              {...newTabProps('https://bitcraftly.com/')}
            >
              Bitcraftly
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
