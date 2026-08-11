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
] as const;

export default function ClinicFooter() {
  return (
    <footer id="contact" className="cl-footer">
      <div className="cl-container cl-footer__main">
        <div className="cl-footer__grid">
          <div className="cl-footer__brand">
            <ClinicSectionAnchor href="#top" className="cl-footer__logo">
              <ClinicLogoMark className="cl-footer__mark" />
              <span className="cl-footer__brand-name">{CLINIC_BRAND.name}</span>
            </ClinicSectionAnchor>
            <p className="cl-footer__tagline">
              Clinic & Healthcare is committed to providing world-class healthcare with compassion
              and excellence.
            </p>
            <ul className="cl-footer__socials">
              {SOCIALS.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href="#contact"
                    aria-label={`${CLINIC_BRAND.name} on ${label}`}
                    className="cl-footer__social"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="clinic-footer-links">
            <h2 id="clinic-footer-links" className="cl-footer__heading">
              Quick Links
            </h2>
            <ul className="cl-footer__list">
              {CLINIC_FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <ClinicSectionAnchor href={link.href} className="cl-footer__link">
                    {link.label}
                  </ClinicSectionAnchor>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="clinic-footer-departments">
            <h2 id="clinic-footer-departments" className="cl-footer__heading">
              Departments
            </h2>
            <ul className="cl-footer__list">
              {CLINIC_SERVICES.slice(0, 6).map((service) => (
                <li key={service.title}>
                  <ClinicSectionAnchor href="#services" className="cl-footer__link">
                    {service.title}
                  </ClinicSectionAnchor>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="cl-footer__heading">Contact Us</h2>
            <ul className="cl-footer__contact">
              <li>
                <Phone className="cl-footer__contact-icon" aria-hidden />
                <a href={`tel:${CLINIC_BRAND.phone.replace(/\s/g, '')}`}>{CLINIC_BRAND.phone}</a>
              </li>
              <li>
                <Mail className="cl-footer__contact-icon" aria-hidden />
                <a href={`mailto:${CLINIC_BRAND.email}`}>{CLINIC_BRAND.email}</a>
              </li>
              <li>
                <MapPin className="cl-footer__contact-icon" aria-hidden />
                <span>{CLINIC_BRAND.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="cl-footer__bar">
        <div className="cl-container cl-footer__bar-inner">
          <p>© 2026 {CLINIC_BRAND.name}. Fictional showcase built by Bitcraftly.</p>
          <p className="cl-footer__legal">
            <span>Privacy Policy</span>
            <span aria-hidden>·</span>
            <span>Terms &amp; Conditions</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
