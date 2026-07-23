import Link from "next/link";
import { Icon, type IconName } from "@/components/ui/icon";
import { IconBox } from "@/components/ui/icon-box";
import { cn } from "@/lib/cn";

export interface ServiceCardData {
  href: string;
  title: string;
  description: string;
  icon: IconName;
  ctaLabel: string;
  badge?: string;
  bestFor?: string;
  timeline?: string;
}

export type ServiceCardVariant = "homepage" | "page";

interface ServiceCardProps {
  service: ServiceCardData;
  /** `homepage` keeps Homepage Services section classes; `page` is marketing pages. */
  variant?: ServiceCardVariant;
  className?: string;
}

/**
 * Shared service/solution card — variants preserve existing CSS (zero visual change).
 */
export function ServiceCard({
  service,
  variant = "page",
  className,
}: ServiceCardProps) {
  if (variant === "homepage") {
    return (
      <Link
        href={service.href}
        className={cn(
          "services-card group flex h-full flex-col",
          "rounded-[16px] card-padding no-underline",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
      >
        <span className="services-card-header">
          <span className="services-card-icon inline-flex shrink-0">
            <IconBox
              icon={service.icon}
              variant="default"
              size="sm"
              className="services-icon-box"
            />
          </span>
          <h3 className="services-card-title">{service.title}</h3>
        </span>

        <p className="services-card-body m-0 mb-0 flex-1 font-sans text-[13px] font-normal leading-[1.55] text-muted-foreground line-clamp-3 sm:text-[14px]">
          {service.description}
        </p>

        <span
          className={cn(
            "services-card-cta inline-flex items-center gap-[5px]",
            "font-sans text-[13px] font-semibold text-primary",
            "sm:text-[14px]",
          )}
        >
          {service.ctaLabel}
          <Icon
            name="arrow-right"
            size="sm"
            aria-hidden
            className="services-card-cta-icon h-[13px] w-[13px]"
          />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={service.href}
      className={cn(
        "services-page-card group flex h-full flex-col",
        "rounded-[16px] card-padding no-underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span className="services-page-card-header">
        <span className="services-page-icon-box inline-flex shrink-0">
          <IconBox icon={service.icon} variant="default" size="sm" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-[8px]">
            <h3 className="services-page-card-title">{service.title}</h3>
            {service.badge ? (
              <span
                className={cn(
                  "services-page-badge",
                  `services-page-badge--${service.badge.toLowerCase()}`,
                )}
              >
                {service.badge}
              </span>
            ) : null}
          </span>
        </span>
      </span>

      <p className="services-card-body m-0 mb-0 flex-1 font-sans text-[13px] font-normal leading-[1.55] text-muted-foreground line-clamp-3 sm:text-[14px]">
        {service.description}
      </p>

      {(service.bestFor || service.timeline) && (
        <dl className="services-card-meta m-0 grid gap-[var(--space-xs)] border-t border-[color:var(--services-divider)] pt-[var(--space-md)]">
          {service.bestFor ? (
            <div className="min-w-0">
              <dt className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Best for
              </dt>
              <dd className="m-0 mt-[2px] font-sans text-[12px] font-medium leading-[1.45] text-foreground sm:text-[13px]">
                {service.bestFor}
              </dd>
            </div>
          ) : null}
          {service.timeline ? (
            <div className="min-w-0">
              <dt className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Typical timeline
              </dt>
              <dd className="m-0 mt-[2px] font-sans text-[12px] font-semibold text-primary sm:text-[13px]">
                {service.timeline}
              </dd>
            </div>
          ) : null}
        </dl>
      )}

      <span
        className={cn(
          "services-card-cta mt-auto inline-flex items-center gap-[5px]",
          "font-sans text-[13px] font-semibold text-primary",
          "sm:text-[14px]",
        )}
      >
        {service.ctaLabel}
        <Icon
          name="arrow-right"
          size="sm"
          aria-hidden
          className="services-page-card-cta-icon h-[13px] w-[13px]"
        />
      </span>
    </Link>
  );
}
