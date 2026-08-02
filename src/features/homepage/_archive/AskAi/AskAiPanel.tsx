import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Icon } from '@/components/ui/icon';
import {
  HERO_ASSISTANT,
  HERO_ASSISTANT_SUGGESTIONS,
} from '@/features/homepage/Hero/hero.constants';

interface AskAiPanelProps {
  id: string;
  onClose: () => void;
}

const panelStyle: CSSProperties = {
  position: 'fixed',
  top: '50%',
  right: 16,
  bottom: 'auto',
  left: 'auto',
  zIndex: 1300,
  display: 'flex',
  width: 'min(340px, calc(100vw - 32px))',
  maxHeight: 'min(70vh, 480px)',
  flexDirection: 'column',
  gap: 12,
  padding: 14,
  overflow: 'auto',
  borderRadius: 16,
  background: 'var(--background)',
  translate: '0 -50%',
};

/**
 * Floating Bitcraftly AI assistant panel opened from the Ask AI launcher.
 */
export function AskAiPanel({ id, onClose }: AskAiPanelProps) {
  return (
    <aside
      id={id}
      className="ask-ai-panel"
      style={panelStyle}
      role="dialog"
      aria-modal="false"
      aria-label={HERO_ASSISTANT.name}
    >
      <div className="ask-ai-panel-header">
        <div className="ask-ai-panel-identity">
          <span className="ask-ai-panel-avatar" aria-hidden>
            <Icon name="sparkles" size="sm" className="h-[16px] w-[16px]" />
            <span className="ask-ai-panel-online" />
          </span>
          <div className="ask-ai-panel-meta">
            <p className="ask-ai-panel-name">{HERO_ASSISTANT.name}</p>
            <p className="ask-ai-panel-status">
              <span className="ask-ai-status-dot" aria-hidden />
              {HERO_ASSISTANT.status}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="ask-ai-panel-close"
          aria-label="Close Bitcraftly AI"
          onClick={onClose}
        >
          <Icon name="close" size="sm" aria-hidden />
        </button>
      </div>

      <div className="ask-ai-panel-message">
        <p>{HERO_ASSISTANT.message}</p>
      </div>

      <p className="ask-ai-panel-prompt">Quick starts</p>

      <div className="ask-ai-panel-suggestions">
        {HERO_ASSISTANT_SUGGESTIONS.map((suggestion) => (
          <Link
            key={suggestion.text}
            href={suggestion.href}
            className="ask-ai-panel-suggestion"
            onClick={onClose}
          >
            <span>{suggestion.text}</span>
            <Icon
              name="arrow-right"
              size="sm"
              aria-hidden
              className="ask-ai-panel-suggestion-icon h-[13px] w-[13px]"
            />
          </Link>
        ))}
      </div>
    </aside>
  );
}
