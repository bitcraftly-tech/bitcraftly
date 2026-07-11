import { HeroAssistant } from "./HeroAssistant";
import { HeroDashboard } from "./HeroDashboard";

export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        className="pointer-events-none absolute -inset-[var(--space-6)] -z-10 rounded-[var(--space-8)] hero-brand-gradient opacity-30 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-[var(--space-3)] -top-[var(--space-5)] z-10 hidden size-[var(--space-8)] rounded-xl hero-brand-gradient shadow-lg sm:block lg:-left-[var(--space-4)] lg:-top-[var(--space-6)]"
        aria-hidden="true"
      />

      <HeroDashboard />
      <HeroAssistant />
    </div>
  );
}
