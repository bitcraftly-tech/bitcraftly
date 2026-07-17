"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage } from "../types";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { TypingIndicator } from "./TypingIndicator";

interface ChatMessageListProps {
  messages: readonly ChatMessage[];
  isStreaming: boolean;
}

export function ChatMessageList({
  messages,
  isStreaming,
}: ChatMessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    endRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, isStreaming]);

  const showTyping =
    isStreaming &&
    messages.some(
      (message) =>
        message.role === "assistant" &&
        message.status === "streaming" &&
        message.content.length === 0,
    );

  return (
    <div
      ref={regionRef}
      className="ai-assistant__messages"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-label="Conversation"
      tabIndex={0}
    >
      {messages.map((message) => (
        <ChatMessageBubble key={message.id} message={message} />
      ))}
      {showTyping ? <TypingIndicator /> : null}
      <div ref={endRef} />
    </div>
  );
}
