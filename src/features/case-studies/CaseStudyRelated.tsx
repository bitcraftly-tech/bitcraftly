import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import {
  getCaseStudyHref,
  type CaseStudy,
} from "@/content/case-studies";

interface CaseStudyRelatedProps {
  studies: readonly CaseStudy[];
}

export function CaseStudyRelated({ studies }: CaseStudyRelatedProps) {
  if (studies.length === 0) {
    return null;
  }

  return (
    <Section
      id="related"
      spacing="lg"
      background="surface"
      aria-labelledby="case-related-heading"
    >
      <h2
        id="case-related-heading"
        className="m-0 font-sans text-[28px] font-semibold tracking-[-0.02em] text-foreground"
      >
        Related projects
      </h2>
      <ul className="mt-[18px] m-0 grid list-none grid-cols-1 gap-[16px] p-0 md:grid-cols-3">
        {studies.map((study) => (
          <li key={study.slug}>
            <article className="flex h-full flex-col overflow-hidden rounded-[16px] border border-border bg-background">
              <Link
                href={getCaseStudyHref(study.slug)}
                className="relative block aspect-[16/10] no-underline"
                aria-label={`View case study: ${study.title}`}
              >
                <Image
                  src={study.coverImage}
                  alt={study.coverImageAlt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </Link>
              <div className="flex flex-1 flex-col gap-[8px] p-[14px]">
                <h3 className="m-0 font-sans text-[16px] font-semibold text-foreground">
                  <Link
                    href={getCaseStudyHref(study.slug)}
                    className="text-inherit no-underline hover:text-primary"
                  >
                    {study.title}
                  </Link>
                </h3>
                <p className="m-0 font-sans text-[13px] leading-[1.55] text-muted-foreground">
                  {study.excerpt}
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
