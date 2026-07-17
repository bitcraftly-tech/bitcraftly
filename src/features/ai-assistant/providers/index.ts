import type { AiProviderId } from "../types";
import { claudeProvider } from "./claude.provider";
import { geminiProvider } from "./gemini.provider";
import { mockProvider } from "./mock.provider";
import { openaiProvider } from "./openai.provider";
import type { AiProvider } from "./types";

const PROVIDERS: Record<AiProviderId, AiProvider> = {
  openai: openaiProvider,
  gemini: geminiProvider,
  claude: claudeProvider,
  mock: mockProvider,
};

/** Resolve a registered provider by id. Defaults to mock until APIs are wired. */
export function getAiProvider(id: AiProviderId = "mock"): AiProvider {
  return PROVIDERS[id];
}

export function listAiProviders(): readonly AiProvider[] {
  return Object.values(PROVIDERS);
}

export {
  openaiProvider,
  geminiProvider,
  claudeProvider,
  mockProvider,
};
export type { AiProvider } from "./types";
export { ProviderNotConfiguredError } from "./types";
