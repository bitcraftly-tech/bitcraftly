import Link from "next/link";

import CookieSettingsLink from "@/components/consent/CookieSettingsLink";
import VisitorCountBadge from "@/components/analytics/VisitorCountBadge";
import BitcraftlyLogoMarkImage from "@/components/brand/BitcraftlyLogoMarkImage";
import FooterServiceLinks from "@/components/landing/FooterServiceLinks";
import SocialLinks from "@/components/landing/SocialLinks";
import { CONTAINER, PRIMARY_LOCATION, whatsappUrl, WHATSAPP_HOURS } from "@/lib/constants";
import { FOOTER_EXPLORE_LINKS, FOOTER_MORE_LINKS } from "@/lib/footerLinks";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";
import { BRAND } from "@/lib/siteContent";

function FooterLinkList({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="mt-4 space-y-2.5 text-sm text-text-secondary dark:text-dark-text-secondary">
      {links.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="transition hover:text-indigo-600 dark:hover:text-indigo-400">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default async function Footer() {
  return (
    <footer className="border-t border-border-primary bg-bg-card dark:border-dark-border-primary dark:bg-dark-bg-card">
      <div className={`${CONTAINER} py-8 md:py-10`}>
        <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-50/70 via-bg-card to-bg-card px-5 py-6 dark:from-indigo-950/25 dark:via-dark-bg-card dark:to-dark-bg-card sm:px-8 sm:py-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-indigo-600 dark:text-indigo-400">
                Ready to start?
              </p>
              <h2 className="mt-2 font-[var(--font-playfair)] text-xl font-semibold leading-snug text-text-primary dark:text-dark-text-primary sm:text-2xl">
                Packages from ₹8,999 — written quote before payment
              </h2>
              <p className="mt-2 text-sm text-text-secondary dark:text-dark-text-secondary">
                Compare pricing, pick a package, or WhatsApp Sanjay — same-day reply {WHATSAPP_HOURS}.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2.5">
              <Link
                href="/pricing#pricing-compare"
                className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                View pricing →
              </Link>
              <Link
                href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
                target="_blank"
                rel="noreferrer"
                data-wa-source="footer-cta-whatsapp"
                className="rounded-full border border-border-secondary px-5 py-2.5 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
              >
                WhatsApp
              </Link>
              <Link
                href="/contact?intent=quote&source=footer-cta"
                className="rounded-full border border-border-secondary px-5 py-2.5 text-sm font-semibold text-text-primary transition hover:border-border-primary dark:border-dark-border-secondary dark:text-dark-text-primary"
              >
                Get quote
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-start gap-3">
              <BitcraftlyLogoMarkImage size="xs" />
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="font-[var(--font-playfair)] text-lg font-semibold text-text-primary dark:text-dark-text-primary">Bitcraftly</span>
                <span className="mt-0.5 text-[10px] font-medium leading-snug text-text-tertiary dark:text-dark-text-tertiary">
                  {BRAND.headerTaglineShort}
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              Founder-led React &amp; Next.js websites for startups and local businesses — Ghaziabad, India &amp; remote.
            </p>
            <SocialLinks className="mt-5" />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-primary dark:text-dark-text-primary">Explore</p>
            <FooterLinkList links={FOOTER_EXPLORE_LINKS} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-primary dark:text-dark-text-primary">Services &amp; pricing</p>
            <FooterServiceLinks />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-primary dark:text-dark-text-primary">Contact</p>
            <ul className="mt-4 space-y-2.5 text-sm text-text-secondary dark:text-dark-text-secondary">
              <li>
                <a
                  href="tel:+919667710954"
                  data-analytics-source="footer-call"
                  className="font-medium hover:text-text-primary dark:hover:text-dark-text-primary"
                >
                  +91 96677 10954
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@bitcraftly.com"
                  data-analytics-source="footer-email"
                  className="hover:text-text-primary dark:hover:text-dark-text-primary"
                >
                  hello@bitcraftly.com
                </a>
              </li>
              <li>{PRIMARY_LOCATION}</li>
              <li className="pt-1">
                <Link
                  href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
                  target="_blank"
                  rel="noreferrer"
                  data-wa-source="footer-contact-whatsapp"
                  className="inline-flex font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  Chat on WhatsApp →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="bc-footer-bottom mt-10 flex flex-col items-center gap-3 border-t border-border-primary pt-6 text-center max-md:pb-24 md:pb-0 dark:border-dark-border-primary">
          <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
            18+ yrs · React &amp; Next.js · Founder-led · {BRAND.locationShort}
          </p>
          <nav aria-label="Footer legal and more" className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-text-tertiary dark:text-dark-text-tertiary">
            {FOOTER_MORE_LINKS.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-text-secondary dark:hover:text-dark-text-secondary">
                {item.label}
              </Link>
            ))}
            <CookieSettingsLink />
          </nav>
          <VisitorCountBadge />
          <p className="text-[11px] text-text-tertiary dark:text-dark-text-tertiary">
            © 2026 Bitcraftly · WhatsApp {WHATSAPP_HOURS}
          </p>
        </div>
      </div>
    </footer>
  );
}
