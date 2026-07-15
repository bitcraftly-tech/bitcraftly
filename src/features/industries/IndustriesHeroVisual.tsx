import Image from "next/image";
import { cn } from "@/lib/cn";
import "@/features/homepage/Hero/hero.css";
import "./industries.css";

/** Cache-bust so public asset swaps show up immediately in dev. */
const INDUSTRIES_HERO_IMAGE_SRC = "/industries-hero.png?v=20260714-1";

/**
 * Industries-only hero visual — illustration only (no orbital background rings).
 */
export function IndustriesHeroVisual() {
  return (
    <div
      className={cn(
        "industries-hero__visual relative mx-auto h-full w-full min-h-[420px] min-w-0 max-w-xl",
        "md:mx-0 md:max-w-none md:min-h-[560px]",
        "lg:mx-0 lg:h-full lg:min-h-full lg:max-w-none lg:self-stretch",
      )}
      aria-hidden="true"
    >
      <Image
        src={INDUSTRIES_HERO_IMAGE_SRC}
        alt=""
        fill
        priority
        unoptimized
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="industries-hero-visual__image hero-illustration-image h-full w-full object-contain object-center"
      />
    </div>
  );
}
