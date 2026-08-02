import { hasMegaMenu } from '@/constants/navigation';
import { cn } from '@/lib/cn';
import { HEADER_NAV_ID, HEADER_NAV_LINKS } from './header.constants';

/**
 * SSR/loading shell matching desktop nav chrome (no mega-menu JS).
 * Every item remains a real link so crawlability and no-JS access are preserved.
 */
export function DesktopNavFallback() {
  return (
    <nav
      id={HEADER_NAV_ID}
      aria-label="Main navigation"
      className="relative flex max-w-full min-w-0 flex-nowrap items-center justify-center gap-x-[10px] text-[13px]"

    >
      {HEADER_NAV_LINKS.map((link) => {
        const hasDropdownMenu = hasMegaMenu(link);

        return (
          <a
            key={`${link.label}-${link.href}`}
            href={link.href}
            className={cn(
              'header-nav-item relative inline-flex items-center gap-[4px] py-[8px] no-underline',
              'font-sans text-[13px] font-medium leading-none tracking-[-0.01em] whitespace-nowrap',
              'text-foreground',
            )}
          >
            <span>{link.label}</span>
            {hasDropdownMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-[14px] w-[14px] shrink-0 opacity-70"
                aria-hidden
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            ) : null}
          </a>
        );
      })}
    </nav>
  );
}
