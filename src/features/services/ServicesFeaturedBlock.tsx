import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { IconBox } from "@/components/ui/icon-box";
import { getServiceHref } from "@/constants/services";
import { cn } from "@/lib/cn";
import type { FeaturedServiceBlock } from "./services.types";
import "./services.css";

interface ServicesFeaturedBlockProps {
  featured: FeaturedServiceBlock;
}

export function ServicesFeaturedBlock({ featured }: ServicesFeaturedBlockProps) {
  return (
    <article
      className={cn(
        "services-featured-block services-page-card group relative overflow-hidden",
        "mb-[24px] rounded-[16px] border border-[color:var(--hp-card-border)] card-padding",
      )}
    >
      <div
        className="pointer-events-none absolute -right-[10%] -top-[30%] size-[280px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 35%, transparent), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative grid gap-[24px] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-[10px]">
            <span className="services-page-icon-box inline-flex">
              <IconBox icon={featured.icon} variant="default" size="sm" />
            </span>
            <p className="services-page-label m-0 font-sans text-[12px] font-semibold uppercase tracking-[0.16em]">
              Featured service
            </p>
            {featured.badge ? (
              <span
                className={cn(
                  "services-page-badge",
                  `services-page-badge--${featured.badge.toLowerCase()}`,
                )}
              >
                {featured.badge}
              </span>
            ) : null}
          </div>

          <h3 className="m-0 font-sans text-[22px] font-bold tracking-[-0.02em] text-foreground sm:text-[24px]">
            {featured.title}
          </h3>
          <p className="m-0 max-w-xl font-sans text-[14px] leading-[1.65] text-muted-foreground sm:text-[15px]">
            {featured.description}
          </p>

          <Link
            href={getServiceHref(featured.slug)}
            className={cn(
              "services-featured-cta",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            )}
          >
            {featured.ctaLabel}
            <Icon
              name="arrow-right"
              size="sm"
              aria-hidden
              className="services-page-card-cta-icon h-[14px] w-[14px]"
            />
          </Link>
        </div>

        <div className="grid gap-[14px] lg:grid-cols-1">
          <div>
            <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Use cases
            </p>
            <ul className="m-0 mt-[8px] flex list-none flex-col gap-[6px] p-0">
              {featured.useCases.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-[8px] font-sans text-[13px] text-foreground"
                >
                  <span className="services-page-check !h-[20px] !w-[20px] !rounded-[6px]">
                    <Icon
                      name="check"
                      size="sm"
                      aria-hidden
                      className="h-[11px] w-[11px]"
                    />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Technology stack
            </p>
            <ul className="m-0 mt-[8px] flex list-none flex-wrap gap-[6px] p-0">
              {featured.techStack.map((tech) => (
                <li key={tech}>
                  <span className="services-page-chip !min-h-[28px] !px-[10px] !text-[11px]">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="m-0 font-sans text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Typical timeline
            </p>
            <p className="m-0 mt-[8px] font-sans text-[18px] font-bold tracking-[-0.02em] text-primary">
              {featured.timeline}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
