import type { StreamChunk } from "../types";
import type { AiProvider } from "./types";
import { streamNotConfigured } from "./types";

/**
 * Google Gemini provider adapter (architecture only).
 * Future: Gemini streaming generateContent via server route.
 */
export const geminiProvider: AiProvider = {
  id: "gemini",
  displayName: "Gemini",
  configured: false,
  streamChat(): AsyncIterable<StreamChunk> {
    return streamNotConfigured(this);
  },
};
