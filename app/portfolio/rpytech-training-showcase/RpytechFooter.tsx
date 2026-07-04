import Link from "next/link";

import ShowcaseLink from "@/components/portfolio/ShowcaseLink";
import { Mail, MapPin, Phone, QrCode } from "lucide-react";
import { Poppins } from "next/font/google";

import {
  RPYTECH,
  RPYTECH_CONTAINER,
  RPYTECH_FLOATING_ACTIONS,
  RPYTECH_FOOTER_COURSES,
  RPYTECH_FOOTER_QUICK,
  RPYTECH_FOOTER_VERIFY,
} from "@/lib/rpytechShowcaseData";

import RpytechBrandLockup from "./RpytechBrandLockup";
import { RPYTECH_FOOTER_SOCIAL_ICONS } from "./RpytechSocialIcons";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RpytechFooter() {
  return (
    <footer className={`${poppins.className} rpytech-footer`}>
      <div className="rpytech-footer-main">
        <div className={RPYTECH_CONTAINER}>
          <div className="rpytech-footer-top">
            <div className="rpytech-footer-brand">
              <RpytechBrandLockup footer />
              <p>{RPYTECH.footerBlurb}</p>
              <div className="rpytech-footer-social">
                {RPYTECH_FOOTER_SOCIAL_ICONS.map((Icon, i) => (
                  <span key={i} aria-hidden>
                    <Icon />
                  </span>
                ))}
              </div>
            </div>

            <div className="rpytech-footer-col">
              <h4>QUICK LINKS</h4>
              <ul>
                {RPYTECH_FOOTER_QUICK.map((l) => (
                  <li key={l}>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rpytech-footer-col">
              <h4>COURSES</h4>
              <ul>
                {RPYTECH_FOOTER_COURSES.map((l) => (
                  <li key={l}>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rpytech-footer-col">
              <h4>VERIFICATION</h4>
              <ul>
                {RPYTECH_FOOTER_VERIFY.map((l) => (
                  <li key={l}>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rpytech-footer-col rpytech-footer-contact">
              <h4>CONTACT INFO</h4>
              <div className="rpytech-footer-contact-wrap">
                <div className="rpytech-footer-contact-details">
                  <ul>
                    <li>
                      <Phone className="size-3.5 shrink-0 text-[var(--rpytech-orange)]" />
                      {RPYTECH.phone}
                    </li>
                    <li>
                      <Mail className="size-3.5 shrink-0 text-[var(--rpytech-orange)]" />
                      {RPYTECH.email}
                    </li>
                    <li>
                      <MapPin className="size-3.5 shrink-0 text-[var(--rpytech-orange)]" />
                      {RPYTECH.address}
                    </li>
                  </ul>
                  <div className="rpytech-footer-qr">
                    <QrCode className="size-12 text-[#ccc]" />
                  </div>
                  <p className="rpytech-footer-qr-label">Scan to Verify Certificate</p>
                </div>

                <div className="rpytech-footer-actions">
                  {RPYTECH_FLOATING_ACTIONS.map((action) => {
                    if (action.label === "Call Now") {
                      return (
                        <a
                          key={action.label}
                          href={`tel:${RPYTECH.phone.replace(/\s/g, "")}`}
                          className="rpytech-footer-action rpytech-footer-action--navy"
                        >
                          <Phone className="size-4 shrink-0" />
                          {action.label}
                        </a>
                      );
                    }
                    if (action.label === "WhatsApp") {
                      return (
                        <a
                          key={action.label}
                          href={`https://wa.me/${RPYTECH.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rpytech-footer-action rpytech-footer-action--green"
                        >
                          {action.label}
                        </a>
                      );
                    }
                    return (
                      <ShowcaseLink key={action.label} href="#contact" className="rpytech-footer-action rpytech-footer-action--orange">
                        {action.label}
                      </ShowcaseLink>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rpytech-footer-bottom">
        <div className={`${RPYTECH_CONTAINER} rpytech-footer-bottom-row`}>
          <span className="rpytech-footer-bottom-start">
            © {RPYTECH.copyrightYear} {RPYTECH.legalName} All Rights Reserved.
          </span>
          <div className="rpytech-footer-bottom-end">
            <span>Privacy Policy</span>
            <span className="rpytech-footer-bottom-sep">|</span>
            <span>Terms & Conditions</span>
            <span className="rpytech-footer-bottom-sep">|</span>
            <Link href="/portfolio" className="rpytech-footer-portfolio-link">
              Bitcraftly Portfolio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
