export { AiAssistantPage, AI_ASSISTANT_PAGE_META } from "./AiAssistantPage";
export { AssistantChat } from "./components/AssistantChat";
export type { AssistantChatProps } from "./components/AssistantChat";
export { useAssistantChat } from "./hooks/useAssistantChat";
export type {
  UseAssistantChatOptions,
  UseAssistantChatResult,
} from "./hooks/useAssistantChat";
export {
  getAiProvider,
  listAiProviders,
  openaiProvider,
  geminiProvider,
  claudeProvider,
  mockProvider,
  ProviderNotConfiguredError,
} from "./providers";
export type { AiProvider } from "./providers";
export {
  ASSISTANT_META,
  DEFAULT_AI_PROVIDER_ID,
  SUGGESTED_QUESTIONS,
} from "./assistant.config";
export type {
  AiProviderId,
  ChatMessage,
  ChatRole,
  StreamChunk,
  SuggestedQuestion,
  AiChatRequest,
} from "./types";
