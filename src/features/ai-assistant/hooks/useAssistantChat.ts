"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import {
  DEFAULT_AI_PROVIDER_ID,
  WELCOME_MESSAGE,
} from "../assistant.config";
import { getAiProvider } from "../providers";
import type { AiProviderId, ChatMessage, ChatMessageStatus } from "../types";

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function createMessage(
  role: ChatMessage["role"],
  content: string,
  status: ChatMessageStatus = "complete",
  providerId?: AiProviderId,
): ChatMessage {
  return {
    id: createId(),
    role,
    content,
    createdAt: new Date().toISOString(),
    status,
    providerId,
  };
}

function createWelcome(providerId: AiProviderId): ChatMessage {
  return createMessage("assistant", WELCOME_MESSAGE, "complete", providerId);
}

function patchMessage(
  messages: ChatMessage[],
  id: string,
  patch: Partial<ChatMessage>,
): ChatMessage[] {
  return messages.map((message) =>
    message.id === id ? { ...message, ...patch } : message,
  );
}

export interface UseAssistantChatOptions {
  providerId?: AiProviderId;
}

export interface UseAssistantChatResult {
  messages: readonly ChatMessage[];
  isStreaming: boolean;
  providerId: AiProviderId;
  providerLabel: string;
  providerConfigured: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  stopStreaming: () => void;
  clearChat: () => void;
}

export function useAssistantChat(
  options: UseAssistantChatOptions = {},
): UseAssistantChatResult {
  const providerId = options.providerId ?? DEFAULT_AI_PROVIDER_ID;
  const provider = getAiProvider(providerId);
  const abortRef = useRef<AbortController | null>(null);
  const [, startTransition] = useTransition();

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    createWelcome(providerId),
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }, []);

  const clearChat = useCallback(() => {
    stopStreaming();
    setError(null);
    setMessages([createWelcome(providerId)]);
  }, [providerId, stopStreaming]);

  const sendMessage = useCallback(
    async (raw: string) => {
      const content = raw.trim();
      if (!content || isStreaming) {
        return;
      }

      setError(null);

      const userMessage = createMessage("user", content);
      const assistantId = createId();
      const assistantMessage: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        createdAt: new Date().toISOString(),
        status: "streaming",
        providerId,
      };

      let historyForProvider: ChatMessage[] = [];
      setMessages((prev) => {
        historyForProvider = [...prev, userMessage];
        return [...historyForProvider, assistantMessage];
      });

      setIsStreaming(true);
      const controller = new AbortController();
      abortRef.current = controller;

      let assembled = "";

      try {
        for await (const chunk of provider.streamChat({
          messages: historyForProvider,
          signal: controller.signal,
        })) {
          if (chunk.type === "token") {
            assembled += chunk.content;
            const snapshot = assembled;
            startTransition(() => {
              setMessages((prev) =>
                patchMessage(prev, assistantId, {
                  content: snapshot,
                  status: "streaming",
                }),
              );
            });
          } else if (chunk.type === "error") {
            setError(chunk.message);
            setMessages((prev) =>
              patchMessage(prev, assistantId, {
                content: chunk.message,
                status: "error",
              }),
            );
            break;
          } else if (chunk.type === "done") {
            setMessages((prev) =>
              patchMessage(prev, assistantId, {
                content: assembled,
                status: "complete",
              }),
            );
          }
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          setMessages((prev) =>
            prev.map((message) => {
              if (message.id !== assistantId) {
                return message;
              }
              const status: ChatMessageStatus = message.content
                ? "complete"
                : "error";
              return {
                ...message,
                status,
                content:
                  message.content ||
                  "Generation stopped before a reply was ready.",
              };
            }),
          );
        } else {
          const messageText =
            err instanceof Error ? err.message : "Something went wrong.";
          setError(messageText);
          setMessages((prev) =>
            patchMessage(prev, assistantId, {
              content: messageText,
              status: "error",
            }),
          );
        }
      } finally {
        abortRef.current = null;
        setIsStreaming(false);
      }
    },
    [isStreaming, provider, providerId],
  );

  return {
    messages,
    isStreaming,
    providerId,
    providerLabel: provider.displayName,
    providerConfigured: provider.configured,
    error,
    sendMessage,
    stopStreaming,
    clearChat,
  };
}
