import Link from 'next/link';
import { Instagram, Linkedin, Youtube } from 'lucide-react';

import ShowcaseAnchor from '@/components/portfolio/ShowcaseAnchor';
import { CONTAINER } from '@/lib/constants';
import { newTabProps } from '@/lib/newTabLink';

import GymLogo from './GymLogo';

const COLS = [
  {
    title: 'Fitness',
    links: [
      { label: 'Group classes', href: '#formats' },
      { label: 'Gyms', href: '#centers' },
      { label: 'Sports', href: '#formats' },
      { label: 'At home', href: '#bmi' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About FitRally', href: '#top' },
      { label: 'Careers', href: '#top' },
      { label: 'Blog', href: '#transform' },
      { label: 'Contact', href: '#top' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQs', href: '#faq' },
      { label: 'Health tips', href: '#tips' },
      { label: 'Offers', href: '#passes' },
      { label: 'Corporate', href: '#top' },
    ],
  },
] as const;

const SOCIAL = [
  { Icon: Instagram, label: 'FitRally on Instagram', href: 'https://bitcraftly.com/' },
  { Icon: Youtube, label: 'FitRally on YouTube', href: 'https://bitcraftly.com/' },
  { Icon: Linkedin, label: 'FitRally on LinkedIn', href: 'https://bitcraftly.com/' },
] as const;

export default function GymFooter() {
  return (
    <footer className="gym-footer">
      <div className={`${CONTAINER} gym-footer__grid`}>
        <div className="gym-footer__brand">
          <div className="gym-footer__mark" aria-hidden />
          <div className="gym-footer__brand-inner">
            <GymLogo size="md" />
            <p className="gym-footer__blurb">
              One membership. Many ways to train — group formats, gyms, and coaches near you.
            </p>
            <div className="gym-footer__social">
              {SOCIAL.map(({ Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="gym-footer__social-btn"
                  aria-label={label}
                  {...newTabProps(href)}
                >
                  <Icon className="gym-footer__social-icon" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {COLS.map((col) => (
          <nav key={col.title} className="gym-footer__col" aria-label={col.title}>
            <h2 className="gym-footer__heading">{col.title}</h2>
            <ul className="gym-footer__list">
              {col.links.map((link) => (
                <li key={link.label}>
                  <ShowcaseAnchor href={link.href} className="gym-footer__link">
                    {link.label}
                  </ShowcaseAnchor>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="gym-footer__bar">
        <div className={`${CONTAINER} gym-footer__bar-inner`}>
          <p className="gym-footer__copy">
            © {new Date().getFullYear()} FitRally showcase · Fictional brand · Demo only
          </p>
          <p className="gym-footer__credit">
            Built by{' '}
            <Link
              href="https://bitcraftly.com/"
              className="gym-footer__credit-link"
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
