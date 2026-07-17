"use client";

import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { SUGGESTED_QUESTIONS } from "../assistant.config";
import { useAssistantChat } from "../hooks/useAssistantChat";
import type { AiProviderId } from "../types";
import { ChatComposer } from "./ChatComposer";
import { ChatMessageList } from "./ChatMessageList";
import { SuggestedQuestions } from "./SuggestedQuestions";

export interface AssistantChatProps {
  providerId?: AiProviderId;
  className?: string;
}

export function AssistantChat({
  providerId,
  className,
}: AssistantChatProps) {
  const {
    messages,
    isStreaming,
    providerLabel,
    providerConfigured,
    error,
    sendMessage,
    stopStreaming,
    clearChat,
  } = useAssistantChat({ providerId });

  const showSuggestions =
    !isStreaming &&
    messages.filter((message) => message.role === "user").length === 0;

  return (
    <div className={className ? `ai-assistant ${className}` : "ai-assistant"}>
      <header className="ai-assistant__header">
        <div className="ai-assistant__identity">
          <span className="ai-assistant__avatar" aria-hidden="true">
            <Icon name="bot" size="md" />
          </span>
          <div>
            <h1 id="ai-assistant-heading" className="ai-assistant__title">
              Bitcraftly AI Assistant
            </h1>
            <p className="ai-assistant__subtitle">
              Provider: {providerLabel}
              {providerConfigured ? " · Ready" : " · Adapter pending"}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearChat}
          aria-label="Clear conversation"
        >
          Clear
        </Button>
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
