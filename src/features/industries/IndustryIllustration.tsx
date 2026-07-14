import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/cn";
import type { IndustryModel } from "./industries.types";

const ILLUSTRATION_ICON: Record<IndustryModel["illustration"], IconName> = {
  care: "shield",
  learn: "message",
  shop: "sparkles",
  factory: "database",
  finance: "trending-up",
  property: "globe",
  ship: "workflow",
  stay: "star",
  travel: "rocket",
  civic: "shield",
  launch: "zap",
  saas: "cloud",
};

interface IndustryIllustrationProps {
  illustration: IndustryModel["illustration"];
  className?: string;
}

/**
 * Lightweight industry glyph illustration (no raster dependency).
 */
export function IndustryIllustration({
  illustration,
  className,
}: IndustryIllustrationProps) {
  return (
    <div className={cn("industries-card__illust", className)} aria-hidden>
      <Icon
        name={ILLUSTRATION_ICON[illustration]}
        size="md"
        className="h-[20px] w-[20px]"
      />
    </div>
  );
}
