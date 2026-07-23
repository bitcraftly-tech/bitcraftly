import Link from "next/link";
import { CookiePreferencesButton } from "@/features/legal";
import "@/features/legal/cookie-prefs.css";
import { cn } from "@/lib/cn";
import { FOOTER_COPYRIGHT, FOOTER_TRUST_LINKS } from "./footer.constants";

export function FooterBottom({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-[10px] text-center sm:flex-row sm:justify-between sm:text-left",
        className,
      )}
    >
      <nav
        className="flex flex-wrap items-center justify-center gap-x-[12px] gap-y-[6px]"
        aria-label="Trust Center"
      >
        {FOOTER_TRUST_LINKS.map((link) =>
          link.kind === "cookies" ? (
            <CookiePreferencesButton
              key={link.id}
              className={cn(
                "footer-muted rounded-md px-1 py-0.5",
                "font-sans text-[12px] font-semibold text-muted-foreground",
                "transition-colors hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              )}
            />
          ) : (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "footer-muted rounded-md px-1 py-0.5 no-underline",
                "font-sans text-[12px] font-semibold text-muted-foreground",
                "transition-colors hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              )}
            >
              {link.label}
            </Link>
          ),
        )}
      </nav>
      <p
        className={cn(
          "footer-muted",
          "font-sans text-[12px] font-[var(--font-weight-normal)]",
          "leading-[var(--line-height-normal)]",
        )}
      >
        {FOOTER_COPYRIGHT}
      </p>
    </div>
  );
}
