import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { IconBox } from "@/components/ui/icon-box";
import { Text } from "@/components/ui/typography";
import {
  HERO_ASSISTANT,
  HERO_ASSISTANT_SUGGESTIONS,
} from "@/features/homepage/Hero/hero.constants";

interface AskAiPanelProps {
  id: string;
  onClose: () => void;
}

/**
 * Floating Bitcraftly AI assistant panel opened from the Ask AI tab.
 */
export function AskAiPanel({ id, onClose }: AskAiPanelProps) {
  return (
    <aside
      id={id}
      className="ask-ai-panel"
      role="dialog"
      aria-modal="false"
      aria-label={HERO_ASSISTANT.name}
    >
      <div className="ask-ai-panel-header">
        <div className="ask-ai-panel-identity">
          <div className="relative">
            <IconBox icon="bot" variant="primary" size="sm" className="shadow-md" />
            <span className="ask-ai-panel-online" aria-hidden />
          </div>
          <div className="leading-tight">
            <Text as="span" size="sm" className="block font-bold">
              {HERO_ASSISTANT.name}
            </Text>
            <Text as="span" size="sm" muted className="text-[0.5625rem] font-medium">
              {HERO_ASSISTANT.version}
            </Text>
          </div>
        </div>

        <div className="ask-ai-panel-header-actions">
          <Badge
            variant="success"
            size="sm"
            className="gap-[var(--space-0-5)] border-0 bg-transparent px-0 text-[0.625rem] shadow-none"
          >
            <span className="ask-ai-status-dot size-[var(--space-1)] rounded-full bg-success" />
            {HERO_ASSISTANT.status}
          </Badge>
          <button
            type="button"
            className="ask-ai-panel-close"
            aria-label="Close Bitcraftly AI"
            onClick={onClose}
          >
            <Icon name="close" size="sm" aria-hidden />
          </button>
        </div>
      </div>

      <div className="ask-ai-panel-message">
        <Text as="span" size="sm" className="leading-relaxed">
          {HERO_ASSISTANT.message}
        </Text>
      </div>

      <div className="ask-ai-panel-typing" aria-hidden="true">
        <span />
        <span />
        <span />
        <Text as="span" size="sm" muted className="ml-[var(--space-0-5)] text-[0.5625rem]">
          typing…
        </Text>
      </div>

      <div className="ask-ai-panel-suggestions">
        {HERO_ASSISTANT_SUGGESTIONS.map((suggestion) => (
          <Link
            key={suggestion.text}
            href={suggestion.href}
            className="ask-ai-panel-suggestion no-underline"
            onClick={onClose}
          >
            <Text
              as="span"
              size="sm"
              className="inline-flex w-full items-center justify-between font-semibold"
            >
              {suggestion.text}
              <Icon name="arrow-right" size="sm" aria-hidden className="opacity-40" />
            </Text>
          </Link>
        ))}
      </div>
    </aside>
  );
}
