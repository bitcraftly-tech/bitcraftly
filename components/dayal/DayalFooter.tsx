import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import DayalFollowUs from "@/components/dayal/DayalFollowUs";
import DayalFooterMap from "@/components/dayal/DayalFooterMap";
import DayalLogo from "@/components/dayal/DayalLogo";
import { DAYAL, FOOTER_ABOUT, FOOTER_LINKS } from "@/lib/dayal/data";

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <p className="dayal-eyebrow mb-5 tracking-[0.22em]">{children}</p>
  );
}

export default function DayalFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[#0b1633]/8 bg-white text-[#0b1633]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_100%_0%,rgba(200,164,107,0.08),transparent_50%)]"
        aria-hidden
      />

      <div className="dayal-container relative pt-14 pb-0 lg:pt-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
          {/* Brand + Follow Us */}
          <div className="lg:col-span-4">
            <DayalLogo href="#home" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#5c6478]">{FOOTER_ABOUT}</p>
            <div className="dayal-gold-line mt-3 max-w-[3rem]" aria-hidden />
            <DayalFollowUs compact />
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2 lg:col-start-5">
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-[#5c6478] transition hover:text-[#c0392b] hover:pl-0.5"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + map */}
          <div className="lg:col-span-6">
            <FooterHeading>Contact Info</FooterHeading>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <ul className="space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c8a46b]" aria-hidden />
                  <span className="text-[#5c6478]">
                    <span className="mb-0.5 block text-xs font-semibold uppercase tracking-wide text-[#0b1633]">
                      Head Office
                    </span>
                    {DAYAL.officeAddress}
                  </span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c8a46b]" aria-hidden />
                  <span className="text-[#5c6478]">
                    <span className="mb-0.5 block text-xs font-semibold uppercase tracking-wide text-[#0b1633]">
                      Site Address
                    </span>
                    {DAYAL.siteAddress}
                  </span>
                </li>
                {DAYAL.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a
                      href={`tel:${phone.tel}`}
                      className="flex items-center gap-3 text-[#5c6478] transition hover:text-[#c0392b]"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-[#c8a46b]" aria-hidden />
                      {phone.display}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${DAYAL.email}`}
                    className="flex items-center gap-3 break-all text-[#5c6478] transition hover:text-[#c0392b]"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[#c8a46b]" aria-hidden />
                    {DAYAL.email}
                  </a>
                </li>
              </ul>

              <DayalFooterMap />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#0b1633]/10 py-4">
          <div className="flex flex-col gap-1.5 text-center text-xs leading-snug text-[#5c6478] sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p>© 2025 {DAYAL.brand}. All rights reserved.</p>
            <p>
              Digital Experience by{" "}
              <Link
                href="/"
                className="font-medium text-[#c8a46b] transition hover:text-[#0b1633] hover:underline"
              >
                Bitcraftly
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
