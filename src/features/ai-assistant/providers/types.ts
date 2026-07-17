import type { AiChatRequest, AiProviderId, StreamChunk } from "../types";

/**
 * Provider contract for Bitcraftly AI Assistant.
 * Implementations must stream tokens via AsyncIterable — no buffering required by the UI.
 * API credentials and HTTP calls are intentionally deferred.
 */
export interface AiProvider {
  readonly id: AiProviderId;
  readonly displayName: string;
  /** False until live API wiring is added for this provider. */
  readonly configured: boolean;
  streamChat(request: AiChatRequest): AsyncIterable<StreamChunk>;
}

export class ProviderNotConfiguredError extends Error {
  readonly providerId: AiProviderId;

  constructor(providerId: AiProviderId, displayName: string) {
    super(
      `${displayName} adapter is registered but not configured. Wire the API client before enabling this provider.`,
    );
    this.name = "ProviderNotConfiguredError";
    this.providerId = providerId;
  }
}

/** Yields a structured error stream when a provider is not yet wired. */
export async function* streamNotConfigured(
  provider: Pick<AiProvider, "id" | "displayName">,
): AsyncIterable<StreamChunk> {
  const message = new ProviderNotConfiguredError(
    provider.id,
    provider.displayName,
  ).message;
  yield { type: "error", message };
}
