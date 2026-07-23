import { Container } from "@/components/ui/container";
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
      className="footer-surface"
    >
      <Container size="xl">
        {/* Mobile / tablet */}
        <div className="footer-column-grid flex flex-col xl:hidden">
          <FooterBrand />
          <FooterNavigation stacked />
          <FooterContact />
        </div>

        {/*
          Desktop — 6 columns (newsletter moved above footer):
          Brand | Services | Solutions | Resources | Company | Contact Us
        */}
        <div
          className="footer-column-grid--desktop hidden items-start xl:grid xl:grid-cols-[minmax(200px,1.2fr)_repeat(4,minmax(0,1fr))_minmax(160px,0.9fr)] xl:justify-between"
        >
          <FooterBrand />
          <FooterNavigation linksOnly />
          <FooterCompanyColumn />
          <FooterContact />
        </div>

        <FooterBottom className="footer-bottom" />
      </Container>
    </footer>
  );
}
