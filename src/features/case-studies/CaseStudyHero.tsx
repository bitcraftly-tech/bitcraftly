import Image from "next/image";
import Link from "next/link";
import { MarketingBreadcrumbs } from "@/components/patterns/marketing-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import type { CaseStudy } from "@/content/case-studies";
import { NAV_ACTIONS } from "@/constants/navigation";
import type { BreadcrumbItem } from "@/lib/seo/breadcrumbs";
import { cn } from "@/lib/cn";

interface CaseStudyHeroProps {
  study: CaseStudy;
  breadcrumbs: readonly BreadcrumbItem[];
}

export function CaseStudyHero({ study, breadcrumbs }: CaseStudyHeroProps) {
  return (
    <Section
      spacing="lg"
      background="default"
      className="border-b border-border/70"
      aria-labelledby="case-study-heading"
    >
      <MarketingBreadcrumbs items={breadcrumbs} />

      <div className="mt-[18px] grid grid-cols-1 items-center gap-[28px] lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="flex flex-col gap-[14px]">
          <p className="m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-primary">
            Case Study
          </p>
          <h1
            id="case-study-heading"
            className="m-0 font-sans text-[34px] font-semibold leading-[1.12] tracking-[-0.03em] text-foreground sm:text-[44px]"
          >
            {study.title}
          </h1>
          <p className="m-0 max-w-xl font-sans text-[17px] leading-[1.65] text-muted-foreground">
            {study.subtitle}
          </p>
          <p className="m-0 max-w-xl font-sans text-[15px] leading-[1.7] text-muted-foreground">
            {study.excerpt}
          </p>

          <div className="flex flex-wrap gap-[8px]">
            {study.tags.map((tag) => (
              <Badge key={tag} variant="outline" size="sm">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-[6px] flex flex-wrap gap-[10px]">
            <Link
              href={NAV_ACTIONS.freeConsultation.href}
              className={cn(
                "inline-flex h-[44px] items-center gap-[8px] rounded-[12px] px-[18px]",
                "bg-primary font-sans text-[14px] font-semibold text-primary-foreground no-underline",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              )}
            >
              {NAV_ACTIONS.freeConsultation.label}
              <Icon name="arrow-right" size="sm" aria-hidden />
            </Link>
            <Link
              href="#results"
              className={cn(
                "inline-flex h-[44px] items-center rounded-[12px] border border-border px-[18px]",
                "font-sans text-[14px] font-semibold text-foreground no-underline",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              )}
            >
              View results
            </Link>
          </div>
        </div>

        <div className="relative aspect-[16/11] overflow-hidden rounded-[18px] border border-border bg-surface">
          <Image
            src={study.coverImage}
            alt={study.coverImageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
