import { IconBox } from "@/components/ui/icon-box";
import { cn } from "@/lib/cn";
import type { PerformanceFeatureCard } from "./performance.types";

interface PerformanceCardProps {
  card: PerformanceFeatureCard;
  className?: string;
}

export function PerformanceCard({ card, className }: PerformanceCardProps) {
  return (
    <article
      className={cn(
        "performance-card flex h-full flex-col rounded-[16px] p-[24px]",
        className,
      )}
    >
      <div className="performance-card-header">
        <span className="inline-flex shrink-0">
          <IconBox
            icon={card.icon}
            variant="default"
            size="sm"
            className="performance-icon-box"
          />
        </span>
        <h3 className="performance-card-title">{card.title}</h3>
      </div>
      <p
        className={cn(
          "mt-[10px] mb-0 flex-1 font-sans text-[13px]",
          "font-normal leading-[1.55] text-muted-foreground",
          "line-clamp-3 sm:text-[14px]",
        )}
      >
        {card.description}
      </p>
    </article>
  );
}
