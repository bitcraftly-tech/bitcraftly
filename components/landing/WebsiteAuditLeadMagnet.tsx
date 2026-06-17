import Image from "next/image";
import Link from "next/link";

import { CONTAINER, whatsappUrl } from "@/lib/constants";
import { WEBSITE_AUDIT, WHATSAPP_MESSAGES } from "@/lib/leadGen";
import { MASCOT } from "@/lib/mascotAssets";

export default function WebsiteAuditLeadMagnet() {
  return (
    <section id={WEBSITE_AUDIT.id} className={`${CONTAINER} scroll-mt-24 py-8 md:py-10`}>
      <div className="overflow-hidden rounded-[24px] border border-[#ddd6fe] bg-gradient-to-br from-[#f5f3ff] via-[#ede9fe] to-[#e0e7ff] p-6 md:p-8 lg:p-10">
        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr_0.9fr]">
          <div className="relative mx-auto w-full max-w-[240px] lg:max-w-none">
            <Image
              src={MASCOT.audit}
              alt="BitBot reviewing your website"
              width={320}
              height={400}
              className="lp-audit-robot-img h-auto w-full object-contain"
            />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#7c3aed]">Free lead magnet</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#2c3e50] sm:text-3xl">
              {WEBSITE_AUDIT.headline}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5b6470]">{WEBSITE_AUDIT.body}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/contact?intent=${WEBSITE_AUDIT.formIntent}&source=audit-magnet`}
                className="rounded-xl bg-gradient-to-r from-[#6366f1] to-[#7c3aed] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
              >
                {WEBSITE_AUDIT.primaryCta}
              </Link>
              <Link
                href={whatsappUrl(WHATSAPP_MESSAGES.audit)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-[#c4b5fd] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#4c1d95] backdrop-blur-sm"
              >
                {WEBSITE_AUDIT.secondaryCta}
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/70 bg-white/75 p-5 shadow-sm backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-[#8e44ad]">You receive:</p>
            <ul className="mt-4 space-y-3">
              {WEBSITE_AUDIT.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-[#4a5568]">
                  <span className="mt-0.5 text-emerald-600" aria-hidden>
                    ✔
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
