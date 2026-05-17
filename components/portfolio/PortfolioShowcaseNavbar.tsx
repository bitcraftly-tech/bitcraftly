import Link from "next/link";

import { CONTAINER } from "@/lib/constants";
import { newTabProps } from "@/lib/newTabLink";
import type { ShowcaseTheme } from "@/lib/portfolioShowcaseThemes";

type Props = {
  theme: ShowcaseTheme;
};

export default function PortfolioShowcaseNavbar({ theme }: Props) {
  const ctaIsAnchor = theme.navCtaHref.startsWith("#");

  return (
    <header className={theme.navBar}>
      <nav className={`${CONTAINER} flex flex-wrap items-center justify-between gap-4 py-3.5`} aria-label={`${theme.fictionalBrand} navigation`}>
        <a href="#" className="flex min-w-0 flex-col gap-0.5">
          <span className={theme.navBrand}>{theme.fictionalBrand}</span>
          <span className={theme.navBrandSub}>Official website preview</span>
        </a>

        <div className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 sm:gap-x-6">
          {theme.navLinks.map((link) => (
            <a key={`${link.href}-${link.label}`} href={link.href} className={theme.navLink} {...newTabProps(link.href)}>
              {link.label}
            </a>
          ))}
          {ctaIsAnchor ? (
            <a href={theme.navCtaHref} className={theme.navCtaClass}>
              {theme.navCtaLabel}
            </a>
          ) : (
            <Link href={theme.navCtaHref} className={theme.navCtaClass} {...newTabProps(theme.navCtaHref)}>
              {theme.navCtaLabel}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
