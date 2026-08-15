import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
} from './Rpy2SocialIcons';

const NAV_COLS = [
  {
    title: 'Useful Links',
    links: [
      { label: 'About Us', href: 'https://rpytech.in/index.php/about' },
      { label: 'Director Message', href: 'https://rpytech.in/index.php/about' },
      {
        label: 'Certificate Verification',
        href: 'https://rpytech.in/index.php/certificate-verification',
      },
      {
        label: 'Marksheet Verification',
        href: 'https://rpytech.in/index.php/marksheet-verification',
      },
    ],
  },
  {
    title: 'Quick Access',
    links: [
      { label: 'Admin Login', href: 'https://rpytech.in/index.php/admin-login' },
      { label: 'Student Login', href: 'https://rpytech.in/index.php/student-login' },
      { label: 'Apply Franchise', href: 'https://rpytech.in/index.php/franchise' },
      { label: 'Franchise List', href: 'https://rpytech.in/index.php/franchise-list' },
    ],
  },
  {
    title: 'Our Courses',
    links: [
      { label: 'Industrial Safety', href: 'https://rpytech.in/index.php/courses' },
      { label: 'Fire & Safety', href: 'https://rpytech.in/index.php/courses' },
      { label: 'QA / QC', href: 'https://rpytech.in/index.php/courses' },
      { label: 'Welding', href: 'https://rpytech.in/index.php/courses' },
      { label: 'NDT Level II', href: 'https://rpytech.in/index.php/courses' },
      { label: 'HVAC', href: 'https://rpytech.in/index.php/courses' },
    ],
  },
];

const SOCIALS = [
  { Icon: FacebookIcon, label: 'Facebook', href: '#' },
  { Icon: TwitterIcon, label: 'Twitter', href: '#' },
  { Icon: YoutubeIcon, label: 'YouTube', href: '#' },
  { Icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
  { Icon: InstagramIcon, label: 'Instagram', href: '#' },
];

export default function Rpy2Footer() {
  return (
    <footer className="rpyv2-footer" aria-label="Site footer">
      {/* ── CTA Band ── */}
      <div className="rpyv2-footer-cta-band">
        <div className="rpyv2-container rpyv2-footer-cta-inner">
          <div className="rpyv2-footer-cta-text">
            <p className="rpyv2-footer-cta-eyebrow">Ready to get certified?</p>
            <h2 className="rpyv2-footer-cta-heading">Start Your Career Journey Today</h2>
          </div>
          <a
            href="https://rpytech.in/index.php/courses"
            target="_blank"
            rel="noopener noreferrer"
            className="rpyv2-footer-cta-btn"
          >
            Explore Courses <ArrowRight size={15} />
          </a>
        </div>
      </div>

      {/* ── Main body ── */}
      <div className="rpyv2-footer-body">
        <div className="rpyv2-container">
          <div className="rpyv2-footer-main">
            {/* Brand column */}
            <div className="rpyv2-footer-brand-col">
              <div className="rpyv2-footer-brand-row">
                <div className="rpyv2-footer-logo-mark" aria-hidden>
                  RPY
                </div>
                <div className="rpyv2-footer-brand-name">
                  RPY<span>Tech</span>
                </div>
              </div>
              <p className="rpyv2-footer-tagline">
                Permanent Proud Yellow Educational &amp; Welfare Trust. Empowering skills, building
                careers, transforming lives.
              </p>

              {/* Social row */}
              <div className="rpyv2-footer-social" aria-label="Social links">
                {SOCIALS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="rpyv2-footer-social-btn"
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={13} aria-hidden />
                  </a>
                ))}
              </div>
            </div>

            {/* Nav columns */}
            {NAV_COLS.map(({ title, links }) => (
              <nav key={title} aria-label={title}>
                <h3 className="rpyv2-footer-col-title">{title}</h3>
                <ul className="rpyv2-footer-links">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* ── Contact strip ── */}
          <div className="rpyv2-footer-contact-strip">
            <a href="tel:7061005611" className="rpyv2-footer-contact-pill">
              <span className="rpyv2-footer-contact-pill-icon" aria-hidden>
                <Phone size={13} />
              </span>
              <span>7061005611, 8235436410</span>
            </a>
            <a href="mailto:rtitechnicalinstitute@gmail.com" className="rpyv2-footer-contact-pill">
              <span className="rpyv2-footer-contact-pill-icon" aria-hidden>
                <Mail size={13} />
              </span>
              <span>rtitechnicalinstitute@gmail.com</span>
            </a>
            <div className="rpyv2-footer-contact-pill">
              <span className="rpyv2-footer-contact-pill-icon" aria-hidden>
                <MapPin size={13} />
              </span>
              <span>
                Shyama Market, 1st Floor, Near Ghosh &amp; Sinha Petrol Pump, Mirganj, Gopalganj,
                Bihar 841438
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="rpyv2-footer-bottom">
        <div className="rpyv2-container rpyv2-footer-bottom-inner">
          <p className="rpyv2-footer-copy">
            &copy; 2024 RPY Technical &amp; Training Services Pvt. Ltd. All Rights Reserved.
          </p>
          <div className="rpyv2-footer-bottom-right">
            <nav className="rpyv2-footer-legal" aria-label="Legal links">
              <a href="#">Privacy Policy</a>
              <span aria-hidden>·</span>
              <a href="#">Terms &amp; Conditions</a>
            </nav>
            <span className="rpyv2-footer-built" aria-label="Built by Bitcraftly">
              Built by{' '}
              <a href="https://bitcraftly.com" target="_blank" rel="noopener noreferrer">
                Bitcraftly
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
