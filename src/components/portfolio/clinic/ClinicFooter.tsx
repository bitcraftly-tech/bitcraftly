'use client';

import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from 'lucide-react';

import {
  CLINIC_BRAND,
  CLINIC_FOOTER_LINKS,
  CLINIC_SERVICES,
} from '@/app/portfolio/clinic-healthcare-showcase/clinic-data';

import ClinicLogoMark from './ClinicLogo';
import ClinicSectionAnchor from './ClinicSectionAnchor';

const SOCIALS = [
  { label: 'Facebook', icon: Facebook },
  { label: 'Instagram', icon: Instagram },
  { label: 'LinkedIn', icon: Linkedin },
  { label: 'YouTube', icon: Youtube },
];

export default function ClinicFooter() {
  return (
    <footer id="contact" className="bg-[#0b1c2c] text-slate-300">
      <div className="cl-container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <ClinicLogoMark className="h-9 w-9" />
              <span className="text-[0.95rem] font-bold text-white">{CLINIC_BRAND.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Clinic & Healthcare is committed to providing world-class healthcare with compassion
              and excellence.
            </p>
            <ul className="mt-6 flex items-center gap-2">
              {SOCIALS.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href="#contact"
                    aria-label={`${CLINIC_BRAND.name} on ${label}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-slate-300 transition hover:bg-[var(--cl-accent)] hover:text-[#04120f]"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="clinic-footer-links">
            <h2 id="clinic-footer-links" className="cl-h4 text-white">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5">
              {CLINIC_FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <ClinicSectionAnchor
                    href={link.href}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {link.label}
                  </ClinicSectionAnchor>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="clinic-footer-departments">
            <h2 id="clinic-footer-departments" className="cl-h4 text-white">
              Departments
            </h2>
            <ul className="mt-4 space-y-2.5">
              {CLINIC_SERVICES.slice(0, 6).map((service) => (
                <li key={service.title}>
                  <ClinicSectionAnchor
                    href="#services"
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {service.title}
                  </ClinicSectionAnchor>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="cl-h4 text-white">Contact Us</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cl-accent)]" aria-hidden />
                <a
                  href={`tel:${CLINIC_BRAND.phone.replace(/\s/g, '')}`}
                  className="transition hover:text-white"
                >
                  {CLINIC_BRAND.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cl-accent)]" aria-hidden />
                <a href={`mailto:${CLINIC_BRAND.email}`} className="transition hover:text-white">
                  {CLINIC_BRAND.email}
                </a>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cl-accent)]" aria-hidden />
                <span>{CLINIC_BRAND.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="cl-container flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
          <p>© 2026 {CLINIC_BRAND.name}. Fictional showcase built by Bitcraftly.</p>
          <p className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span aria-hidden>·</span>
            <span>Terms &amp; Conditions</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
