"use client";

import { renderAssistantMarkdown } from "../lib/render-markdown";
import type { ChatMessage } from "../types";
import { cn } from "@/lib/cn";

interface ChatMessageBubbleProps {
  message: ChatMessage;
}

export function ChatMessageBubble({ message }: ChatMessageBubbleProps) {
  const isUser = message.role === "user";
  const isStreaming = message.status === "streaming";

  return (
    <article
      className={cn(
        "ai-assistant__message",
        isUser && "ai-assistant__message--user",
        !isUser && "ai-assistant__message--assistant",
        message.status === "error" && "ai-assistant__message--error",
      )}
      aria-busy={isStreaming || undefined}
    >
      <header className="ai-assistant__message-meta">
        <span className="ai-assistant__message-role">
          {isUser ? "You" : "Bitcraftly AI"}
        </span>
        {isStreaming ? (
          <span className="ai-assistant__message-streaming">Streaming</span>
        ) : null}
      </header>
      <div className="ai-assistant__message-body ai-md">
        {isUser ? (
          <p className="ai-md__p">{message.content}</p>
        ) : message.content ? (
          renderAssistantMarkdown(message.content)
        ) : (
          <span className="ai-assistant__message-empty" aria-hidden="true">
            …
          </span>
        )}
        {isStreaming ? (
          <span className="ai-assistant__caret" aria-hidden="true" />
        ) : null}
      </div>
    </article>
  );
}
