import Image from "next/image";
import { cn } from "@/lib/cn";
import "./services.css";

/** Cache-bust so public asset swaps show up immediately in dev. */
const SERVICES_HERO_IMAGE_SRC = "/services-hero.png?v=20260714-5";

/**
 * Services-only hero visual — single premium illustration with Homepage-style float.
 * Does not reuse Homepage cube or shared hero compositions.
 */
export function ServicesHeroVisual() {
  return (
    <div
      className={cn(
        "services-hero-visual relative mx-auto w-full min-w-0 max-w-xl aspect-[1/1] min-h-[400px]",
        "md:mx-0 md:max-w-none md:aspect-auto md:min-h-[580px] md:h-[620px]",
        "lg:min-h-[640px] lg:h-[680px]",
      )}
      aria-hidden="true"
    >
      <Image
        src={SERVICES_HERO_IMAGE_SRC}
        alt=""
        fill
        priority
        unoptimized
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="services-hero-visual__image object-contain object-top"
      />
    </div>
  );
}
