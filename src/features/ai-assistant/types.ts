/** Supported model providers — adapters live under `./providers`. */
export type AiProviderId = "openai" | "gemini" | "claude" | "mock";

export type ChatRole = "user" | "assistant" | "system";

export type ChatMessageStatus = "complete" | "streaming" | "error";

export interface ChatMessage {
  readonly id: string;
  readonly role: ChatRole;
  readonly content: string;
  readonly createdAt: string;
  readonly status: ChatMessageStatus;
  readonly providerId?: AiProviderId;
}

export type StreamChunk =
  | { readonly type: "token"; readonly content: string }
  | { readonly type: "done" }
  | { readonly type: "error"; readonly message: string };

export interface AiChatRequest {
  readonly messages: readonly ChatMessage[];
  readonly signal?: AbortSignal;
}

export interface SuggestedQuestion {
  readonly id: string;
  readonly label: string;
  readonly prompt: string;
}
