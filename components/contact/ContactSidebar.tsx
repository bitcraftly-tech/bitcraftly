import type { ReactNode } from "react";

import { CP_ACCENT, CP_CARD } from "@/lib/contactPageTheme";
import type { ContactPageMode } from "@/lib/contactPageModes";
import { FREE_CONSULTATION, TRUST_INQUIRY } from "@/lib/leadGen";
import { FOUNDER } from "@/lib/siteContent";

type ContactSidebarProps = {
  timeline: readonly string[];
  contactCards: ReactNode;
  headline: string;
  subheadline: string;
  mode?: ContactPageMode;
  serviceName?: string;
};

export default function ContactSidebar({
  timeline,
  contactCards,
  headline,
  subheadline,
  mode = "default",
  serviceName,
}: ContactSidebarProps) {
  const isFocused = mode !== "default";
  const isQuote = mode === "quote";

  return (
    <aside className={`lg:col-span-5 ${isQuote ? "order-2 lg:order-1" : ""}`}>
      <div className="lg:sticky lg:top-20">
        <div className="space-y-6">
          <div>
            {serviceName && mode === "quote" ? (
              <span className="inline-block border border-[#C7D2FE] bg-[#EEF2FF] px-3 py-1 text-xs font-semibold text-[#4F46E5]">
                {serviceName}
              </span>
            ) : null}
            <h1 className={`font-[var(--font-playfair)] font-semibold leading-tight text-[#4F46E5] ${serviceName && mode === "quote" ? "mt-3" : ""} text-3xl sm:text-4xl lg:text-[2.35rem]`}>
              {headline}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#6B7280]">{subheadline}</p>
            <p className="mt-2 text-xs text-[#9CA3AF]">Hindi–English mix message bilkul theek hai — padh kar hi reply karte hain.</p>
          </div>

          {isQuote ? null : <div className="space-y-3">{contactCards}</div>}

          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <span className="size-2.5 shrink-0 rounded-full bg-[#25D366]" />
            Usually replies within 2 hours
          </div>

          {isQuote ? null : (
            <div className={CP_CARD + " p-5"}>
              <p className="text-sm font-semibold text-[#111827]">{TRUST_INQUIRY.title}</p>
              <ul className="mt-3 space-y-2.5">
                {TRUST_INQUIRY.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-xs leading-relaxed text-[#6B7280]">
                    <span className="mt-0.5 shrink-0 font-bold text-[#4F46E5]" aria-hidden>
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={CP_CARD + " p-5"}>
            <p className="text-sm font-semibold text-[#111827]">What happens next?</p>
            <ol className="mt-4 space-y-3">
              {timeline.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm text-[#6B7280]">
                  <span className="flex size-6 shrink-0 items-center justify-center bg-[#EEF2FF] text-xs font-bold text-[#4F46E5]">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {isFocused ? null : (
            <div className={`${CP_ACCENT} p-5`}>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#4F46E5]">{FREE_CONSULTATION.eyebrow}</p>
              <p className="mt-2 text-sm font-semibold leading-snug text-[#111827]">{FREE_CONSULTATION.headline}</p>
              <ul className="mt-3 space-y-1.5 text-xs text-[#6B7280]">
                {FREE_CONSULTATION.bullets.map((b) => (
                  <li key={b}>· {b}</li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] text-[#9CA3AF]">
                — {FOUNDER.name}, {FOUNDER.shortTitle}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
