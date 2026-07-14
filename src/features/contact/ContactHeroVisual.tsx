import {
  FloatMetricCard,
  HeroStage,
} from "@/components/patterns/hero-compositions";
import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/cn";

const CONTACT_CARDS: readonly {
  title: string;
  value: string;
  icon: IconName;
}[] = [
  { title: "Consultation", value: "Book a call", icon: "calendar" },
  { title: "WhatsApp", value: "Chat now", icon: "message" },
  { title: "Email", value: "hello@bitcraftly", icon: "mail" },
];

/**
 * Contact-only: founder/team, office, location, and contact cards.
 */
export function ContactHeroVisual() {
  return (
    <HeroStage>
      <div
        className={cn(
          "mh-panel absolute left-[4%] top-[6%] z-[1] w-[52%] p-[14px]",
          "mh-bob",
        )}
      >
        <div className="flex items-center gap-[10px]">
          <span className="grid size-[44px] place-items-center rounded-[14px] bg-gradient-to-br from-primary to-accent font-sans text-[16px] font-extrabold text-primary-foreground">
            B
          </span>
          <div>
            <p className="m-0 font-sans text-[14px] font-bold tracking-[-0.015em] text-foreground">
              Founder-led team
            </p>
            <p className="m-0 mt-[2px] font-sans text-[11px] text-muted-foreground">
              Direct access · India + remote
            </p>
          </div>
        </div>
        <div className="mt-[12px] flex -space-x-[8px]">
          {["BC", "AI", "UX", "BE"].map((initials) => (
            <span
              key={initials}
              className="grid size-[32px] place-items-center rounded-full border-2 border-background bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] font-sans text-[10px] font-bold text-primary"
            >
              {initials}
            </span>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "mh-panel absolute right-[4%] top-[8%] z-[2] w-[40%] p-[12px] mh-hide-sm",
          "mh-bob mh-bob-delay-1",
        )}
        aria-hidden
      >
        <p className="m-0 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Office
        </p>
        <div className="mt-[8px] aspect-[4/3] overflow-hidden rounded-[10px] border border-[color:var(--hp-card-border,var(--border))] bg-gradient-to-br from-[color-mix(in_srgb,var(--primary)_10%,var(--background))] via-[color-mix(in_srgb,var(--primary)_8%,var(--border))] to-[var(--surface)]">
          <div className="flex h-full flex-col items-center justify-center gap-[6px] p-[10px]">
            <Icon name="globe" size="sm" className="h-[18px] w-[18px] text-primary" />
            <p className="m-0 text-center font-sans text-[11px] font-semibold text-foreground">
              Location map
            </p>
            <p className="m-0 text-center font-sans text-[10px] text-muted-foreground">
              Serving clients worldwide
            </p>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "absolute inset-x-[4%] bottom-[8%] z-[3] grid grid-cols-3 gap-[8px]",
          "mh-bob mh-bob-delay-2",
        )}
      >
        {CONTACT_CARDS.map((card) => (
          <div key={card.title} className="mh-panel p-[10px]">
            <span className="grid size-[28px] place-items-center rounded-[8px] bg-[color-mix(in_srgb,var(--primary)_10%,var(--background))] text-primary">
              <Icon name={card.icon} size="sm" className="h-[14px] w-[14px]" />
            </span>
            <p className="m-0 mt-[8px] font-sans text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {card.title}
            </p>
            <p className="m-0 mt-[2px] truncate font-sans text-[12px] font-bold text-foreground">
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <FloatMetricCard
        title="Response"
        value="<24h"
        hint="business days"
        icon="zap"
        className="right-[28%] top-[42%] mh-hide-sm mh-bob-delay-3"
      />
    </HeroStage>
  );
}
