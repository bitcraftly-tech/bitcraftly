import Link from 'next/link';
import type { ReactNode } from 'react';

import DayalContactInfo from '@/components/dayal/DayalContactInfo';
import DayalFollowUs from '@/components/dayal/DayalFollowUs';
import DayalLogo from '@/components/dayal/DayalLogo';
import DayalReveal from '@/components/dayal/DayalReveal';
import { DAYAL, FOOTER_ABOUT, FOOTER_LINKS } from '@/lib/dayal/data';

function FooterHeading({ children }: { children: ReactNode }) {
  return <p className="dayal-eyebrow mb-5 tracking-[0.22em]">{children}</p>;
}

export default function DayalFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[#0b1633]/8 bg-white text-[#0b1633]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_0%,rgba(200,164,107,0.08),transparent_50%)]"
        aria-hidden
      />

      <div className="dayal-container relative pt-12 pb-0">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
          {/* Brand + Follow Us */}
          <DayalReveal className="lg:col-span-4">
            <DayalLogo href="#home" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#5c6478]">{FOOTER_ABOUT}</p>
            <div className="dayal-gold-line mt-3 max-w-[3rem]" aria-hidden />
            <DayalFollowUs compact />
          </DayalReveal>

          {/* Quick links */}
          <DayalReveal delay={0.08} className="lg:col-span-2 lg:col-start-5">
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-[#5c6478] transition hover:text-[#c0392b] hover:pl-0.5"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </DayalReveal>

          {/* Contact + map — Head Office (Bistupur) is the default tab */}
          <DayalReveal delay={0.16} className="lg:col-span-6">
            <FooterHeading>Contact Info</FooterHeading>
            <DayalContactInfo />
          </DayalReveal>
        </div>

        <div className="mt-8 border-t border-[#0b1633]/10 py-5 sm:py-4">
          <div className="flex flex-col gap-1.5 text-center text-xs leading-snug text-[#5c6478] sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p>© 2025 {DAYAL.brand}. All rights reserved.</p>
            <p>
              Digital Experience by{' '}
              <Link
                href="/"
                className="font-medium text-[#c8a46b] transition hover:text-[#0b1633] hover:underline"
              >
                Bitcraftly
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
