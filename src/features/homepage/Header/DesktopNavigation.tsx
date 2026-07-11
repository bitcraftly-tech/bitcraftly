import { HEADER_NAV_ID, HEADER_NAV_LINKS } from "./header.constants";
import { NavigationLink } from "./NavigationLink";

export function DesktopNavigation() {
  return (
    <nav
      id={HEADER_NAV_ID}
      aria-label="Main navigation"
      className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-[var(--space-0-5)] lg:flex"
    >
      {HEADER_NAV_LINKS.map((link) => (
        <NavigationLink key={link.href} href={link.href} label={link.label} />
      ))}
    </nav>
  );
}
