import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { DesktopNavSlot } from "./DesktopNavSlot";
import { HEADER_BOOK_CALL, HEADER_CTA } from "./header.constants";
import { HeaderRoot } from "./HeaderRoot";
import { Logo } from "./Logo";
import { MobileNavSlot } from "./MobileNavSlot";

const headerButtonBase = cn(
  "inline-flex h-[44px] w-auto shrink-0 items-center justify-center",
  "rounded-[12px] text-[14px] font-medium leading-none whitespace-nowrap no-underline",
  "transition-colors duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

export function HeaderSection() {
  return (
    <HeaderRoot>
      <Container
        size="xl"
        className="grid h-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-[20px] xl:gap-x-[24px]"
      >
        <div className="min-w-0 shrink-0">
          <Logo />
        </div>

        <div className="relative flex min-w-0 items-center justify-center px-[4px]">
          <DesktopNavSlot />
        </div>

        <div className="relative z-10 flex shrink-0 items-center gap-[12px]">
          <Link
            href={HEADER_BOOK_CALL.href}
            className={cn(
              headerButtonBase,
              "hidden gap-[6px] border border-[var(--border)] bg-background px-[16px] text-foreground shadow-none",
              "hover:border-border-strong hover:bg-surface xl:inline-flex",
            )}
          >
            <Icon
              name="calendar"
              size="sm"
              aria-hidden
              className="h-[16px] w-[16px]"
            />
            {HEADER_BOOK_CALL.label}
          </Link>

          <Link
            href={HEADER_CTA.href}
            className={cn(
              headerButtonBase,
              "header-brand-gradient gap-[6px] border-0 px-[18px] text-primary-foreground",
              "header-cta-shadow hover:-translate-y-px hover:opacity-95",
              "transition-[opacity,transform,box-shadow] duration-200",
            )}
          >
            {HEADER_CTA.label}
            <Icon
              name="arrow-right"
              size="sm"
              aria-hidden
              className="h-[16px] w-[16px]"
            />
          </Link>

          <MobileNavSlot />
        </div>
      </Container>
    </HeaderRoot>
  );
}
