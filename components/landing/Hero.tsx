import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import HeroBitBotPromo from "@/components/landing/HeroBitBotPromo";
import HeroRobotVisual from "@/components/landing/HeroRobotVisual";
import { CONTAINER, whatsappUrl } from "@/lib/constants";
import { WHATSAPP_MESSAGES } from "@/lib/whatsappFunnel";
import { HERO, HERO_FEATURE_CHECKS, HERO_TRUST_PILLS } from "@/lib/siteContent";

function Headline() {
  const parts = HERO.headline.split(HERO.headlineAccent);
  const mobileParts = HERO.mobileHeadline.split(HERO.headlineAccent);
  const accent = <span className="text-[#7c3aed]">{HERO.headlineAccent}</span>;

  return (
    <h1 className="text-[2rem] font-bold leading-[1.1] tracking-tight text-[#1e293b] sm:text-4xl lg:text-[2.65rem]">
      <span className="sm:hidden">
        {mobileParts[0]}
        {accent}
        {mobileParts[1] ?? ""}
      </span>
      <span className="hidden sm:inline">
        {parts[0]}
        {accent}
        {parts[1] ?? ""}
      </span>
    </h1>
  );
}

export default function Hero() {
  return (
    <section id="hero" className={`${CONTAINER} scroll-mt-24 lp-hero py-10 md:py-12 lg:py-14`}>
      <div className="lp-hero__grid">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#bbf7d0] bg-[#ecfdf5] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#166534]">{HERO.badge}</span>
          </div>

          <div className="mt-6">
            <Headline />
          </div>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#64748b] lg:mx-0">{HERO.subheadline}</p>

          <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-x-6 gap-y-2.5 text-left text-sm text-[#475569] lg:mx-0">
            {HERO_FEATURE_CHECKS.map((column) => (
              <div key={column[0]} className="flex flex-col gap-2.5">
                {column.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <span className="text-emerald-600" aria-hidden>
                      ✔
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href="/contact?intent=consultation&source=hero"
              className="inline-flex items-center gap-2 rounded-xl bg-[#4f46e5] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-10px_rgba(79,70,229,0.55)] transition hover:bg-[#4338ca]"
            >
              {HERO.primaryCta}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href={whatsappUrl(WHATSAPP_MESSAGES.consultation)}
              data-wa-source="hero-whatsapp"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-6 py-3.5 text-sm font-semibold text-[#1e293b] shadow-sm transition hover:border-[#c7d2fe]"
            >
              <MessageCircle className="size-4 text-[#25D366]" aria-hidden />
              {HERO.secondaryCta}
            </Link>
          </div>

          <ul className="mx-auto mt-5 flex max-w-2xl flex-wrap justify-center gap-2 lg:mx-0 lg:justify-start">
            {HERO_TRUST_PILLS.map((pill) => (
              <li
                key={pill}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#e8ecef] bg-[#f8fafc] px-3 py-1.5 text-[11px] font-medium text-[#64748b]"
              >
                <span className="text-emerald-600" aria-hidden>
                  ✔
                </span>
                {pill}
              </li>
            ))}
          </ul>
        </div>

        <div className="lp-hero__visual">
          <HeroRobotVisual />
        </div>

        <HeroBitBotPromo />
      </div>
    </section>
  );
}
