import Image from "next/image";
import { cn } from "@/lib/cn";
import "@/features/homepage/Hero/hero.css";
import "./work.css";

/**
 * Work hero visual — full image visible + Solutions-style float animation.
 */
export function WorkHeroVisual() {
  return (
    <div
      className={cn(
        "work-hero__visual-stage relative mx-auto w-full min-w-0",
        "aspect-[1301/948]",
        "lg:mx-0 lg:max-w-none",
      )}
    >
      <Image
        src="/portfolio-hero.png"
        alt="Bitcraftly portfolio product showcase"
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 45vw"
        className="work-hero__image hero-illustration-image h-full w-full object-contain object-center"
      />
    </div>
  );
}
