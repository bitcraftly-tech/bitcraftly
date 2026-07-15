import Image from "next/image";
import { cn } from "@/lib/cn";

/** Cache-bust so public asset swaps show up immediately in dev. */
const HERO_IMAGE_SRC = "/hero-new.png?v=20260713-3";

/**
 * Keeps its own aspect box so the graphic stays large and fully visible.
 * Matches `feature/homepage` — cube only (Ask AI lives in AskAiTab).
 */
export function HeroIllustration() {
  return (
    <div
      className={cn(
        "relative mx-auto h-full w-full min-h-[360px] min-w-0 max-w-xl aspect-[5/4]",
        "lg:mx-0 lg:h-full lg:min-h-full lg:max-w-none lg:aspect-auto",
      )}
    >
      <div
        className="pointer-events-none absolute inset-[8%] -z-10 rounded-[32px] hero-brand-gradient opacity-40 blur-3xl"
        aria-hidden
      />
      <Image
        src={HERO_IMAGE_SRC}
        alt="Bitcraftly product dashboard — AI, revenue, projects and analytics overview"
        fill
        priority
        unoptimized
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="hero-illustration-image h-full w-full object-contain object-center"
      />
    </div>
  );
}
