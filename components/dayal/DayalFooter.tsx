import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import DayalFollowUs from "@/components/dayal/DayalFollowUs";
import { DAYAL, FOOTER_ABOUT, FOOTER_LINKS } from "@/lib/dayal/data";

export default function DayalFooter() {
  return (
    <footer className="bg-[#0b1633] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="dayal-serif text-xl font-semibold">{DAYAL.brand}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">{FOOTER_ABOUT}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#c8a46b]">
              Quick Links
            </p>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/75 transition hover:text-[#c8a46b]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#c8a46b]">
              Contact Info
            </p>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c8a46b]" />
                <span>
                  <span className="block font-medium text-white/90">Office Address</span>
                  {DAYAL.officeAddress}
                </span>
              </li>
              {DAYAL.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`} className="flex items-center gap-2 hover:text-[#c8a46b]">
                    <Phone className="h-4 w-4 shrink-0 text-[#c8a46b]" />
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${DAYAL.email}`}
                  className="flex items-center gap-2 hover:text-[#c8a46b]"
                >
                  <Mail className="h-4 w-4 text-[#c8a46b]" />
                  {DAYAL.email}
                </a>
              </li>
            </ul>
          </div>
          <DayalFollowUs />
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-8 text-center text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© 2026 Dayal Builders. All rights reserved.</p>
          <p>
            Digital Experience by{" "}
            <Link href="/" className="text-[#c8a46b] hover:underline">
              Bitcraftly
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
