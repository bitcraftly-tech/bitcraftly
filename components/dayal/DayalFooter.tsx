import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import DayalFollowUs from "@/components/dayal/DayalFollowUs";
import { DAYAL, FOOTER_ABOUT, FOOTER_LINKS } from "@/lib/dayal/data";

export default function DayalFooter() {
  return (
    <footer className="dayal-footer text-white">
      <div className="dayal-container py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="dayal-serif text-2xl font-semibold">{DAYAL.brand}</p>
            <div
              className="mt-3 h-px w-12"
              style={{ background: "linear-gradient(90deg, var(--dayal-gold), transparent)" }}
            />
            <p className="mt-5 text-sm leading-relaxed text-white/60">{FOOTER_ABOUT}</p>
          </div>
          <div>
            <p className="dayal-eyebrow !text-[var(--dayal-gold-light)] before:bg-[var(--dayal-gold)]">
              Quick Links
            </p>
            <ul className="mt-6 space-y-2.5">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-white/70 transition hover:text-[color:var(--dayal-gold)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="dayal-eyebrow !text-[var(--dayal-gold-light)] before:bg-[var(--dayal-gold)]">
              Contact Info
            </p>
            <ul className="mt-6 space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--dayal-gold)" }} />
                <span>
                  <span className="block font-medium text-white/90">Head Office</span>
                  {DAYAL.officeAddress}
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--dayal-gold)" }} />
                <span>
                  <span className="block font-medium text-white/90">Site Address</span>
                  {DAYAL.siteAddress}
                </span>
              </li>
              {DAYAL.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="flex items-center gap-2 transition hover:text-[color:var(--dayal-gold)]"
                  >
                    <Phone className="h-4 w-4 shrink-0" style={{ color: "var(--dayal-gold)" }} />
                    {phone.display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${DAYAL.email}`}
                  className="flex items-center gap-2 transition hover:text-[color:var(--dayal-gold)]"
                >
                  <Mail className="h-4 w-4" style={{ color: "var(--dayal-gold)" }} />
                  {DAYAL.email}
                </a>
              </li>
            </ul>
          </div>
          <DayalFollowUs />
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-center text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© 2025 Dayal Builders. All rights reserved.</p>
          <p>
            Digital Experience by{" "}
            <Link href="/" className="transition hover:text-[color:var(--dayal-gold)] hover:underline">
              Bitcraftly
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
