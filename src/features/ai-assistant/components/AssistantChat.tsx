'use client';

import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { SUGGESTED_QUESTIONS } from '../assistant.config';
import { useAssistantChat } from '../hooks/useAssistantChat';
import type { AiProviderId } from '../types';
import { ChatComposer } from './ChatComposer';
import { ChatMessageList } from './ChatMessageList';
import { SuggestedQuestions } from './SuggestedQuestions';

export interface AssistantChatProps {
  providerId?: AiProviderId;
  className?: string;
}

export function AssistantChat({ providerId, className }: AssistantChatProps) {
  const { messages, isStreaming, error, sendMessage, stopStreaming, clearChat } = useAssistantChat({
    providerId,
  });

  const showSuggestions =
    !isStreaming && messages.filter((message) => message.role === 'user').length === 0;

  return (
    <div className={className ? `ai-assistant ${className}` : 'ai-assistant'}>
      <header className="ai-assistant__header">
        <div className="ai-assistant__identity">
          <span className="ai-assistant__avatar" aria-hidden="true">
            <Icon name="bot" size="md" />
            <span className="ai-assistant__status-dot" />
          </span>
          <div>
            <p className="ai-assistant__title">Bitcraftly AI</p>
            <p className="ai-assistant__subtitle">
              <span>Demo preview</span>
              <span aria-hidden="true">·</span>
              <span>Sample answers for common questions</span>
            </p>
          </div>
        </div>
        <div className="ai-assistant__header-actions">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearChat}
            aria-label="Clear conversation"
          >
            Clear
          </Button>
        </div>
      </header>

      <ChatMessageList messages={messages} isStreaming={isStreaming} />

      {showSuggestions ? (
        <SuggestedQuestions
          questions={SUGGESTED_QUESTIONS}
          disabled={isStreaming}
          onSelect={(question) => {
            void sendMessage(question.prompt);
          }}
        />
      ) : null}

      {error ? (
        <p className="ai-assistant__error" role="alert">
          {error}
        </p>
      ) : null}

      <ChatComposer
        isStreaming={isStreaming}
        onSubmit={(value) => {
          void sendMessage(value);
        }}
        onStop={stopStreaming}
      />
    </div>
  );
}
