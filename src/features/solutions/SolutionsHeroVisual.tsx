import Image from "next/image";
import { cn } from "@/lib/cn";
import "@/features/homepage/Hero/hero.css";

/** Cache-bust so public asset swaps show up immediately in dev. */
const SOLUTIONS_HERO_IMAGE_SRC = "/solutions-hero.png?v=20260714-2";

/**
 * Solutions-only hero visual — full column height, top-aligned, float animation.
 */
export function SolutionsHeroVisual() {
  return (
    <div
      className={cn(
        "relative mx-auto w-full min-w-0 max-w-xl",
        "min-h-[400px] h-[400px]",
        "md:mx-0 md:max-w-none md:min-h-[480px] md:h-[480px]",
        "lg:mx-0 lg:h-full lg:min-h-full lg:max-w-none",
      )}
      aria-hidden="true"
    >
      <Image
        src={SOLUTIONS_HERO_IMAGE_SRC}
        alt=""
        fill
        priority
        unoptimized
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="hero-illustration-image h-full w-full object-contain object-top"
      />
    </div>
  );
}
