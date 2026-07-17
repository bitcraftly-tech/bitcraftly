import type { AiProviderId, SuggestedQuestion } from "./types";

/** Active provider for the assistant UI until env-backed selection is added. */
export const DEFAULT_AI_PROVIDER_ID: AiProviderId = "mock";

export const ASSISTANT_META = {
  title: "Bitcraftly AI Assistant",
  description:
    "Ask Bitcraftly AI about services, pricing, AI solutions, and next steps — streaming chat UI with multi-provider architecture.",
  path: "/assistant",
  name: "Bitcraftly AI",
  version: "UI Preview",
} as const;

export const SUGGESTED_QUESTIONS: readonly SuggestedQuestion[] = [
  {
    id: "pricing",
    label: "What does a typical project cost?",
    prompt: "What does typical Bitcraftly pricing look like for a website or AI project?",
  },
  {
    id: "services",
    label: "Which services do you offer?",
    prompt: "What services does Bitcraftly offer for growing businesses?",
  },
  {
    id: "ai",
    label: "How do your AI assistants work?",
    prompt: "How do Bitcraftly AI assistants and chatbots work for support teams?",
  },
  {
    id: "start",
    label: "How do we get started?",
    prompt: "How do we get started with a Bitcraftly engagement?",
  },
] as const;

export const WELCOME_MESSAGE = [
  "Hi — I'm **Bitcraftly AI**.",
  "",
  "Ask about services, pricing, AI assistants, or how we deliver custom software.",
  "",
  "_Streaming UI is ready. OpenAI, Gemini, and Claude adapters are scaffolded — APIs not connected yet._",
].join("\n");
