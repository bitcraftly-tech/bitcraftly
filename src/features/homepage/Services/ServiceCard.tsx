import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { IconBox } from "@/components/ui/icon-box";
import { cn } from "@/lib/cn";
import type { HomepageService } from "./services.types";

interface ServiceCardProps {
  service: HomepageService;
  className?: string;
}

/**
 * Service card — icon + 16px title on top, no header background.
 */
export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <Link
      href={service.href}
      className={cn(
        "services-card group flex h-full flex-col",
        "rounded-[16px] p-[24px] no-underline",
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

      <p
        className={cn(
          "mt-[10px] mb-0 flex-1 font-sans text-[13px]",
          "font-normal leading-[1.55] text-muted-foreground",
          "line-clamp-3 sm:text-[14px]",
        )}
      >
        {service.description}
      </p>

      <span
        className={cn(
          "mt-[14px] inline-flex items-center gap-[5px]",
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
