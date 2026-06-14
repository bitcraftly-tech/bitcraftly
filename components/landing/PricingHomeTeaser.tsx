import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";

import { CONTAINER } from "@/lib/constants";

const HIGHLIGHTS = ["2-min estimate", "From ₹8,999", "Written quote first"] as const;

type PricingHomeTeaserProps = {
  embedded?: boolean;
};

function TeaserContent({ embedded }: { embedded: boolean }) {
  return (
    <div className={embedded ? "flex h-full flex-col justify-center p-3.5 sm:p-4 lg:p-4 xl:p-5" : "relative p-4 sm:p-5 md:p-6"}>
      <span className="inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white sm:text-xs">
        Most asked question
      </span>
      <h2
        className={`mt-2.5 font-sans font-bold leading-snug tracking-tight text-white ${
          embedded ? "text-xl sm:text-[1.35rem]" : "text-xl sm:text-2xl md:text-[1.65rem]"
        }`}
      >
        Website kitne mein banegi?
      </h2>
      <p className={`mt-2 font-normal leading-relaxed text-white/85 ${embedded ? "text-sm" : "text-sm sm:text-base"}`}>
        Calculator se estimate — project, features, hosting. Payment sirf written quote approve ke baad.
      </p>

      <ul className={`flex flex-wrap gap-1.5 ${embedded ? "mt-2.5" : "mt-3"}`}>
        {HIGHLIGHTS.map((item) => (
          <li
            key={item}
            className="rounded-full border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white sm:text-xs"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className={`flex flex-wrap gap-2 ${embedded ? "mt-3.5" : "mt-4 w-full flex-col sm:w-auto sm:min-w-[12.5rem]"}`}>
        <Link
          href="/pricing#project-cost-calculator"
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-indigo-900 transition hover:bg-indigo-50 sm:px-5"
        >
          <Calculator className="size-4 shrink-0" aria-hidden />
          Calculate cost
          <ArrowRight className="size-4 shrink-0" aria-hidden />
        </Link>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-white/50 hover:bg-white/15 sm:px-5"
        >
          View packages
        </Link>
      </div>
    </div>
  );
}

export default function PricingHomeTeaser({ embedded = false }: PricingHomeTeaserProps) {
  if (embedded) {
    return (
      <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
        <TeaserContent embedded />
      </div>
    );
  }

  return (
    <section className={`${CONTAINER} scroll-mt-24 -mt-1 pb-2 md:-mt-2 md:pb-3`}>
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-[#14132b] via-[#1e1b4b] to-[#312e81] shadow-[0_20px_50px_-24px_rgba(79,70,229,0.65)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute -right-6 top-0 size-32 rounded-full bg-violet-400/15 blur-3xl" aria-hidden />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <TeaserContent embedded={false} />
        </div>
      </div>
    </section>
  );
}
