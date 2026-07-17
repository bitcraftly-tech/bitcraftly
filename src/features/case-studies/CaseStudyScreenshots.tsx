import Image from "next/image";
import { Section } from "@/components/ui/section";
import type { CaseStudy } from "@/content/case-studies";

interface CaseStudyScreenshotsProps {
  study: CaseStudy;
}

/**
 * Screenshot gallery — isolated module for route-level code splitting.
 */
export function CaseStudyScreenshots({ study }: CaseStudyScreenshotsProps) {
  return (
    <Section
      id="screenshots"
      spacing="lg"
      background="surface"
      aria-labelledby="case-screenshots-heading"
      className="border-b border-border/50"
    >
      <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
        Screenshots
      </p>
      <h2
        id="case-screenshots-heading"
        className="mt-[8px] m-0 font-sans text-[28px] font-semibold tracking-[-0.02em] text-foreground"
      >
        Product surfaces
      </h2>

      <ul className="mt-[20px] m-0 grid list-none grid-cols-1 gap-[18px] p-0 lg:grid-cols-2">
        {study.screenshots.map((shot) => (
          <li key={shot.id} className="min-w-0">
            <figure className="m-0 overflow-hidden rounded-[16px] border border-border bg-background">
              <div className="relative aspect-[16/10]">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {shot.caption ? (
                <figcaption className="border-t border-border px-[14px] py-[10px] font-sans text-[13px] text-muted-foreground">
                  {shot.caption}
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
