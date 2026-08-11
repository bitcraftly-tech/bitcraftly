'use client';

import { useId, useState, type FormEvent, type KeyboardEvent } from 'react';
import { Icon } from '@/components/ui/icon';

interface ChatComposerProps {
  onSubmit: (value: string) => void;
  onStop?: () => void;
  isStreaming: boolean;
  disabled?: boolean;
}

export function ChatComposer({
  onSubmit,
  onStop,
  isStreaming,
  disabled = false,
}: ChatComposerProps) {
  const inputId = useId();
  const helpId = useId();
  const [value, setValue] = useState('');
  const canSend = value.trim().length > 0 && !isStreaming && !disabled;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = value.trim();
    if (!next || isStreaming || disabled) {
      return;
    }
    onSubmit(next);
    setValue('');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const next = value.trim();
      if (!next || isStreaming || disabled) {
        return;
      }
      onSubmit(next);
      setValue('');
    }
  }

  return (
    <form className="ai-assistant__composer" onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="sr-only">
        Message Bitcraftly AI
      </label>
      <div className="ai-assistant__composer-shell">
        <textarea
          id={inputId}
          name="message"
          rows={1}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-describedby={helpId}
          placeholder="Ask about pricing, services, or AI assistants…"
          className="ai-assistant__input"
        />
        {isStreaming ? (
          <button type="button" className="ai-assistant__stop" onClick={onStop}>
            Stop
          </button>
        ) : (
          <button
            type="submit"
            className="ai-assistant__send"
            disabled={!canSend}
            aria-label="Send message"
          >
            <Icon name="arrow-up-right" size="sm" aria-hidden />
          </button>
        )}
      </div>
      <p id={helpId} className="ai-assistant__composer-help">
        <span>Enter to send · Shift+Enter for a new line</span>
        <span className="ai-assistant__powered">Powered by Bitcraftly AI</span>
      </p>
    </form>
  );
}
