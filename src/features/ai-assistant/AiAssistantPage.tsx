import { PageShell } from "@/components/patterns/marketing-layout";
import { Section } from "@/components/ui/section";
import { ROUTES } from "@/constants/navigation";
import { AssistantChat } from "./components/AssistantChat";
import { ASSISTANT_META } from "./assistant.config";
import "./ai-assistant.css";

export function AiAssistantPage() {
  return (
    <PageShell className="ai-assistant-page">
      <Section
        spacing="lg"
        background="default"
        aria-labelledby="ai-assistant-heading"
        className="pt-[var(--space-6)] md:pt-[var(--space-8)]"
      >
        <div className="mx-auto w-full max-w-[52rem]">
          <p className="mb-[var(--space-3)] text-sm text-muted-foreground">
            Architecture ready for OpenAI, Gemini, and Claude — demo stream active.
          </p>
          <AssistantChat />
        </div>
      </Section>
    </PageShell>
  );
}

export const AI_ASSISTANT_PAGE_META = {
  title: ASSISTANT_META.title,
  description: ASSISTANT_META.description,
  path: ROUTES.assistant,
} as const;
