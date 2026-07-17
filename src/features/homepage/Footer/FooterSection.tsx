import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { FOOTER_ID } from "./footer.constants";
import { FooterBottom } from "./FooterBottom";
import { FooterBrand } from "./FooterBrand";
import { FooterContact } from "./FooterContact";
import {
  FooterCompanyColumn,
  FooterNavigation,
} from "./FooterNavigation";

export function FooterSection() {
  return (
    <footer
      id={FOOTER_ID}
      className={cn("footer-surface", "pt-[var(--space-2)] pb-[var(--space-2)]")}
    >
      <Container size="xl">
        {/* Mobile / tablet */}
        <div className="flex flex-col gap-[var(--space-3)] xl:hidden">
          <FooterBrand />
          <FooterNavigation stacked />
          <FooterContact />
        </div>

        {/*
          Desktop — 6 columns (newsletter moved above footer):
          Brand | Services | Solutions | Resources | Company | Contact Us
        */}
        <div
          className={cn(
            "hidden items-start xl:grid",
            "xl:grid-cols-[minmax(200px,1.2fr)_repeat(4,minmax(0,1fr))_minmax(160px,0.9fr)]",
            "xl:gap-x-[var(--space-1)] xl:justify-between",
          )}
        >
          <FooterBrand />
          <FooterNavigation linksOnly />
          <FooterCompanyColumn />
          <FooterContact />
        </div>

        <FooterBottom className="mt-[18px]" />
      </Container>
    </footer>
  );
}
