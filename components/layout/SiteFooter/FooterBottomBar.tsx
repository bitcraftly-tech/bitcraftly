import Link from "next/link";

import CookieSettingsLink from "@/components/consent/CookieSettingsLink";
import VisitorCountBadge from "@/components/analytics/VisitorCountBadge";
import { WHATSAPP_HOURS } from "@/lib/constants";
import { FOOTER_MORE_LINKS } from "@/lib/footerLinks";
import { BRAND } from "@/lib/siteContent";

export default function FooterBottomBar() {
  return (
    <div className="bc-footer-bottom mt-6 border-t border-border-primary/80 pt-4 dark:border-dark-border-primary/80">
      <div className="bc-footer-bottom-grid">
        <div className="bc-footer-bottom-gutter hidden md:block" aria-hidden />

        <div className="bc-footer-bottom-content flex flex-col items-center gap-2 text-center">
          <nav
            aria-label="Footer legal and more"
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-text-tertiary dark:text-dark-text-tertiary"
          >
            {FOOTER_MORE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-1 py-0.5 transition hover:text-text-secondary dark:hover:text-dark-text-secondary"
              >
                {item.label}
              </Link>
            ))}
            <CookieSettingsLink className="rounded-md px-1 py-0.5 transition hover:text-text-secondary dark:hover:text-dark-text-secondary" />
          </nav>

          <div className="space-y-1">
            <p className="text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              20+ yrs · React &amp; Next.js · Founder-led
            </p>
            <p className="text-xs leading-relaxed text-text-secondary dark:text-dark-text-secondary">
              {BRAND.locationShort}
            </p>
            <p className="text-[11px] leading-relaxed text-text-tertiary dark:text-dark-text-tertiary">
              © 2026 Bitcraftly · WhatsApp {WHATSAPP_HOURS}
            </p>
          </div>

          <VisitorCountBadge />
        </div>

        <div className="bc-footer-bottom-gutter hidden md:block" aria-hidden />
      </div>
    </div>
  );
}
