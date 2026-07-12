import Link from "next/link";
import { cn } from "@/lib/cn";
import { TechnologyLogo } from "./tech-logos";
import type { HomepageTechnology } from "./technologies.types";

interface TechnologyCardProps {
  technology: HomepageTechnology;
  className?: string;
}

export function TechnologyCard({ technology, className }: TechnologyCardProps) {
  return (
    <Link
      href={technology.href}
      className={cn(
        "technologies-card group flex h-full flex-col items-center text-center",
        "rounded-[16px] p-[24px] no-underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span className="technologies-card-logo inline-flex items-center justify-center">
        <TechnologyLogo id={technology.id} />
      </span>

      <span
        className={cn(
          "mt-[var(--space-2)] font-sans text-[15px] font-bold",
          "leading-[1.3] tracking-[-0.01em] text-foreground",
        )}
      >
        {technology.name}
      </span>

      <span
        className={cn(
          "mt-[4px] font-sans text-[12px] font-medium",
          "leading-[1.4] text-muted-foreground",
        )}
      >
        {technology.category}
      </span>
    </Link>
  );
}
