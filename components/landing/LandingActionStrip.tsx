import dynamic from "next/dynamic";

import PricingHomeTeaser from "@/components/landing/PricingHomeTeaser";
import { CONTAINER } from "@/lib/constants";

const FounderAudioMessage = dynamic(() => import("@/components/landing/FounderAudioMessage"), {
  loading: () => (
    <div className="min-h-[7.5rem] animate-pulse bg-white/5 lg:min-h-full" aria-hidden />
  ),
});

export default function LandingActionStrip() {
  return (
    <section className={`${CONTAINER} scroll-mt-24 -mt-1 pb-2 md:-mt-2 md:pb-3`}>
      <div className="relative overflow-hidden rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-[#14132b] via-[#1e1b4b] to-[#312e81] shadow-[0_16px_40px_-20px_rgba(79,70,229,0.55)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute -right-8 top-0 size-28 rounded-full bg-violet-400/12 blur-3xl" aria-hidden />

        <div className="relative grid lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
          <PricingHomeTeaser embedded />
          <FounderAudioMessage embedded />
        </div>
      </div>
    </section>
  );
}
