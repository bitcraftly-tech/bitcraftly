import Link from "next/link";
import { CookiePreferencesButton } from "@/features/legal/CookiePreferencesButton";
import { ROUTES } from "@/constants/navigation";
import { cn } from "@/lib/cn";
import "./legal-site-nav.css";

export type LegalSiteNavActive = "trust" | "privacy" | "terms" | "cookies";

interface LegalSiteNavProps {
  active: LegalSiteNavActive;
  className?: string;
}

const focusRing = cn(
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

const LINK_CLASS = cn(
  "legal-site-nav__link font-sans text-[13px] font-semibold no-underline",
  "text-muted-foreground transition-colors hover:text-primary",
  focusRing,
);

/**
 * Trust row — Trust Center · Privacy · Terms · Cookies (footer parity).
 */
export function LegalSiteNav({ active, className }: LegalSiteNavProps) {
  return (
    <nav
      aria-label="Legal and trust"
      className={cn("legal-site-nav", className)}
    >
      <Link
        href={ROUTES.trust}
        className={cn(LINK_CLASS, active === "trust" && "legal-site-nav__link--active")}
        aria-current={active === "trust" ? "page" : undefined}
      >
        Trust Center
      </Link>
      <Link
        href={ROUTES.privacy}
        className={cn(LINK_CLASS, active === "privacy" && "legal-site-nav__link--active")}
        aria-current={active === "privacy" ? "page" : undefined}
      >
        Privacy
      </Link>
      <Link
        href={ROUTES.terms}
        className={cn(LINK_CLASS, active === "terms" && "legal-site-nav__link--active")}
        aria-current={active === "terms" ? "page" : undefined}
      >
        Terms
      </Link>
      <CookiePreferencesButton
        className={cn(
          LINK_CLASS,
          "legal-site-nav__cookies border-0 bg-transparent p-0",
          active === "cookies" && "legal-site-nav__link--active",
        )}
      >
        Cookies
      </CookiePreferencesButton>
    </nav>
  );
}
