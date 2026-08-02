'use client';

import { useId, useState, type FormEvent, type KeyboardEvent } from 'react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

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
      <textarea
        id={inputId}
        name="message"
        rows={2}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-describedby={helpId}
        placeholder="Ask about pricing, services, or AI assistants…"
        className="ai-assistant__input"
      />
      <p id={helpId} className="ai-assistant__composer-help">
        Enter to send · Shift+Enter for a new line
      </p>
      <div className="ai-assistant__composer-actions">
        {isStreaming ? (
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onStop}
            aria-label="Stop generating reply"
          >
            Stop
          </Button>
        ) : (
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={disabled || value.trim().length === 0}
            aria-label="Send message"
            iconRight={<Icon name="arrow-right" size="sm" aria-hidden />}
          >
            Send
          </Button>
        )}
      </div>
    </form>
  );
}
