import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { IconBox } from "@/components/ui/icon-box";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/cn";
import {
  HERO_ASSISTANT,
  HERO_ASSISTANT_SUGGESTIONS,
} from "./hero.constants";

export function HeroAssistant() {
  return (
    <div
      className={cn(
        "absolute -right-[var(--space-1)] -top-[var(--space-5)] z-20",
        "hidden w-64 rounded-xl border border-border-strong bg-background/95",
        "p-[var(--space-3)] shadow-lg backdrop-blur-md",
        "sm:block lg:-right-[var(--space-4)] lg:top-[var(--space-2)]",
      )}
      aria-hidden="true"
    >
      <div className="flex items-center gap-[var(--space-2)]">
        <div className="relative">
          <IconBox icon="bot" variant="primary" size="sm" className="shadow-md" />
          <span className="absolute -bottom-0.5 -right-0.5 size-[var(--space-1)] rounded-full border-2 border-background bg-success" />
        </div>
        <div className="leading-tight">
          <Text as="span" size="sm" className="block font-bold">
            {HERO_ASSISTANT.name}
          </Text>
          <Text as="span" size="sm" muted className="text-[0.5625rem] font-medium">
            {HERO_ASSISTANT.version}
          </Text>
        </div>
        <Badge
          variant="success"
          size="sm"
          className="ml-auto gap-[var(--space-0-5)] border-0 bg-transparent px-0 text-[0.625rem] shadow-none"
        >
          <span className="size-[var(--space-1)] animate-pulse rounded-full bg-success" />
          {HERO_ASSISTANT.status}
        </Badge>
      </div>

      <div className="mt-[var(--space-2)] rounded-xl rounded-tl-sm bg-surface px-[var(--space-2)] py-[var(--space-2)] shadow-sm">
        <Text as="span" size="sm" className="leading-relaxed">
          {HERO_ASSISTANT.message}
        </Text>
      </div>

      <div
        className="mt-[var(--space-1)] flex items-center gap-[var(--space-0-5)] pl-[var(--space-1)]"
        aria-hidden="true"
      >
        <span className="size-[var(--space-0-5)] rounded-full bg-muted-foreground" />
        <span className="size-[var(--space-0-5)] rounded-full bg-muted-foreground" />
        <span className="size-[var(--space-0-5)] rounded-full bg-muted-foreground" />
        <Text as="span" size="sm" muted className="ml-[var(--space-0-5)] text-[0.5625rem]">
          typing…
        </Text>
      </div>

      <div className="mt-[var(--space-2)] space-y-[var(--space-1)]">
        {HERO_ASSISTANT_SUGGESTIONS.map((suggestion) => (
          <div
            key={suggestion.text}
            className="rounded-lg border border-border bg-background px-[var(--space-2)] py-[var(--space-1)]"
          >
            <Text as="span" size="sm" className="inline-flex w-full items-center justify-between font-semibold">
              {suggestion.text}
              <Icon name="arrow-right" size="sm" aria-hidden className="opacity-40" />
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}
