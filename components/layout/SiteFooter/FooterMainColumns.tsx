import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import BitcraftlyLogoMarkImage from "@/components/brand/BitcraftlyLogoMarkImage";
import FooterServiceLinks from "@/components/landing/FooterServiceLinks";
import SocialLinks from "@/components/landing/SocialLinks";
import { PRIMARY_LOCATION, whatsappUrl } from "@/lib/constants";
import { FOOTER_EXPLORE_LINKS } from "@/lib/footerLinks";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";
import { BRAND } from "@/lib/siteContent";

function FooterColumnTitle({ children }: { children: ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-primary dark:text-dark-text-primary">
        {children}
      </p>
      <div className="mt-2.5 h-0.5 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" aria-hidden />
    </div>
  );
}

function FooterLinkList({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="mt-5 space-y-3 text-sm text-text-secondary dark:text-dark-text-secondary">
      {links.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="group inline-flex items-center gap-1 transition hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <span>{item.label}</span>
            <ArrowUpRight
              className="size-3 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-70"
              aria-hidden
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function FooterMainColumns() {
  return (
    <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 xl:gap-12">
      <div className="sm:col-span-2 lg:col-span-1">
        <div className="flex items-start gap-3">
          <BitcraftlyLogoMarkImage size="xs" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-[var(--font-playfair)] text-lg font-semibold text-text-primary dark:text-dark-text-primary">
              Bitcraftly
            </span>
            <span className="mt-0.5 text-[10px] font-medium leading-snug text-text-tertiary dark:text-dark-text-tertiary">
              {BRAND.headerTaglineShort}
            </span>
          </span>
        </div>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-secondary dark:text-dark-text-secondary">
          Founder-led React &amp; Next.js websites for startups and local businesses — Ghaziabad, India &amp; remote.
        </p>
        <SocialLinks
          className="mt-6"
          iconClassName="!h-8 !w-8 !rounded-xl !border-border-primary/80 !bg-white/60 !shadow-sm backdrop-blur-sm dark:!border-dark-border-primary/80 dark:!bg-dark-bg-secondary/60"
        />
      </div>

      <div>
        <FooterColumnTitle>Explore</FooterColumnTitle>
        <FooterLinkList links={FOOTER_EXPLORE_LINKS} />
      </div>

      <div>
        <FooterColumnTitle>Services &amp; pricing</FooterColumnTitle>
        <FooterServiceLinks />
      </div>

      <div>
        <FooterColumnTitle>Contact</FooterColumnTitle>
        <ul className="mt-5 space-y-3.5 text-sm text-text-secondary dark:text-dark-text-secondary">
          <li>
            <a
              href="tel:+919667710954"
              data-analytics-source="footer-call"
              className="group inline-flex items-start gap-2.5 transition hover:text-text-primary dark:hover:text-dark-text-primary"
            >
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-border-primary/80 bg-white/70 text-indigo-600 dark:border-dark-border-primary/80 dark:bg-dark-bg-secondary/70 dark:text-indigo-400">
                <Phone className="size-3.5" aria-hidden />
              </span>
              <span className="pt-1 font-medium">+91 96677 10954</span>
            </a>
          </li>
          <li>
            <a
              href="mailto:hello@bitcraftly.com"
              data-analytics-source="footer-email"
              className="group inline-flex items-start gap-2.5 transition hover:text-text-primary dark:hover:text-dark-text-primary"
            >
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-border-primary/80 bg-white/70 text-indigo-600 dark:border-dark-border-primary/80 dark:bg-dark-bg-secondary/70 dark:text-indigo-400">
                <Mail className="size-3.5" aria-hidden />
              </span>
              <span className="pt-1">hello@bitcraftly.com</span>
            </a>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg border border-border-primary/80 bg-white/70 text-indigo-600 dark:border-dark-border-primary/80 dark:bg-dark-bg-secondary/70 dark:text-indigo-400">
              <MapPin className="size-3.5" aria-hidden />
            </span>
            <span className="pt-1 leading-relaxed">{PRIMARY_LOCATION}</span>
          </li>
          <li className="pt-1">
            <Link
              href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
              target="_blank"
              rel="noreferrer"
              data-wa-source="footer-contact-whatsapp"
              className="group inline-flex items-center gap-1.5 font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
            >
              Chat on WhatsApp
              <ArrowUpRight className="size-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
