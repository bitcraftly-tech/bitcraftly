import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import { DesktopNavSlot } from "./DesktopNavSlot";
import { HEADER_CTA } from "./header.constants";
import { HeaderElement } from "./HeaderElement";
import { Logo } from "./Logo";
import { MobileNavSlot } from "./MobileNavSlot";

const headerCtaClassName = cn(
  "inline-flex h-[44px] shrink-0 items-center justify-center gap-[8px]",
  "rounded-[12px] border-0 bg-primary px-[18px]",
  "font-sans text-[14px] font-semibold leading-none whitespace-nowrap text-primary-foreground no-underline",
  "shadow-[0_8px_20px_-10px_color-mix(in_srgb,var(--primary)_55%,transparent)]",
  "transition-[background-color,box-shadow,transform] duration-200",
  "hover:bg-primary/90 hover:-translate-y-px",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

export function HeaderSection() {
  return (
    <HeaderElement>
      <Container
        size="xl"
        className={cn(
          "flex h-full min-w-0 w-full items-center justify-between gap-2 sm:gap-3",
          "xl:grid xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:items-center xl:justify-normal xl:gap-x-[20px] 2xl:gap-x-[24px]",
        )}
      >
        <div className="min-w-0 flex-1 basis-0 xl:flex-none">
          <Logo priority />
        </div>

        <div className="relative hidden min-w-0 items-center justify-center px-[4px] xl:flex">
          <DesktopNavSlot />
        </div>

        <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-3 xl:justify-self-end">
          <div className="hidden items-center xl:flex">
            <Link href={HEADER_CTA.href} className={headerCtaClassName}>
              {HEADER_CTA.label}
              <Icon
                name="arrow-right"
                size="sm"
                aria-hidden
                className="h-[15px] w-[15px]"
              />
            </Link>
          </div>

          <MobileNavSlot />
        </div>
      </Container>
    </HeaderElement>
  );
}
