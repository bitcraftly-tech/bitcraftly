import { IconBox } from "@/components/ui/icon-box";
import { cn } from "@/lib/cn";
import type { WhyBitcraftlyCard } from "./why-bitcraftly.types";

interface WhyBitcraftlyCardViewProps {
  card: WhyBitcraftlyCard;
  className?: string;
}

export function WhyBitcraftlyCardView({
  card,
  className,
}: WhyBitcraftlyCardViewProps) {
  return (
    <article
      className={cn(
        "why-card flex h-full flex-col rounded-[16px] card-padding",
        className,
      )}
    >
      <div className="why-card-header flex flex-row items-center gap-[12px]">
        <span className="why-card-icon inline-flex shrink-0">
          <IconBox
            icon={card.icon}
            variant="default"
            size="sm"
            className="why-icon-box"
          />
        </span>
        <h3 className="why-card-title min-w-0 flex-1">{card.title}</h3>
      </div>

      <p className="why-card-body m-0 mb-0 flex-1 font-sans text-[13px] font-normal leading-[1.55] text-muted-foreground line-clamp-3 sm:text-[14px]">
        {card.description}
      </p>
    </article>
  );
}
