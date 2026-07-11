import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { TextLink } from "@/components/patterns/text-link";
import { cn } from "@/lib/cn";
import { DesktopNavigation } from "./DesktopNavigation";
import {
  HEADER_BOOK_CALL,
  HEADER_CTA,
  HEADER_ID,
} from "./header.constants";
import "./header.css";
import { Logo } from "./Logo";
import { MobileNavigation } from "./MobileNavigation";

export function HeaderSection() {
  return (
    <header
      id={HEADER_ID}
      className={cn(
        "header-root sticky top-0 z-[var(--z-sticky)] w-full border-b backdrop-blur-xl",
        "transition-[background-color,border-color] duration-300",
      )}
    >
      <Container className="relative flex items-center justify-between gap-[var(--space-2)] py-[var(--space-2)] lg:gap-[var(--space-6)]">
        <Logo />

        <DesktopNavigation />

        <div className="flex items-center gap-[var(--space-1)] sm:gap-[var(--space-2)]">
          <TextLink
            href={HEADER_BOOK_CALL.href}
            variant="muted"
            underlineOnHover={false}
            className="hidden text-sm lg:inline-flex"
          >
            {HEADER_BOOK_CALL.label}
          </TextLink>

          <Button
            href={HEADER_CTA.href}
            size="sm"
            className={cn(
              "header-brand-gradient shrink-0 rounded-xl border-0 text-primary-foreground shadow-md hover:opacity-95",
              "sm:h-10 sm:px-4 sm:text-base",
            )}
            iconRight={<Icon name="arrow-right" size="sm" aria-hidden />}
          >
            {HEADER_CTA.label}
          </Button>

          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
