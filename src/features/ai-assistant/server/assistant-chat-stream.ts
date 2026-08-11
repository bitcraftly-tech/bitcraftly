import { buildDemoReply } from '../lib/demo-replies';

export type AssistantApiMessage = {
  readonly role: 'user' | 'assistant';
  readonly content: string;
};

export type AssistantStreamEvent =
  | { readonly type: 'token'; readonly content: string }
  | { readonly type: 'done' }
  | { readonly type: 'error'; readonly message: string };

const ASSISTANT_SYSTEM_PROMPT = [
  'You are Bitcraftly AI, the marketing assistant for Bitcraftly — an AI-powered digital engineering partner.',
  'Help visitors with pricing ranges, services, Industry Systems, AI assistants, and how to get started.',
  'Be concise, clear, and professional. Use short paragraphs and bullet lists when helpful.',
  'Do not invent exact contract prices. Prefer ranges and point people to /pricing or /contact for a scoped quote.',
  'When useful, mention book a strategy call or the pricing calculator.',
  'If asked about unrelated topics, politely steer back to Bitcraftly offerings.',
  'Reply in the same language the user writes in when practical (English or Hindi).',
].join(' ');

function encodeEvent(event: AssistantStreamEvent): Uint8Array {
  return new TextEncoder().encode(`${JSON.stringify(event)}\n`);
}

function lastUserPrompt(messages: readonly AssistantApiMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message?.role === 'user') {
      return message.content.trim();
    }
  }
  return '';
}

function isBillingOrQuotaError(status: number, detail: string): boolean {
  if (status === 402 || status === 429) {
    return true;
  }
  const lower = detail.toLowerCase();
  return (
    lower.includes('credit') ||
    lower.includes('quota') ||
    lower.includes('billing') ||
    lower.includes('insufficient') ||
    lower.includes('payment')
  );
}

/** Streams a scripted demo reply as NDJSON token events. */
export function createDemoAssistantStream(
  messages: readonly AssistantApiMessage[],
): ReadableStream<Uint8Array> {
  const reply = buildDemoReply(lastUserPrompt(messages));
  const chunks = reply.match(/\S+\s*|\n+/g) ?? [reply];

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for (const chunk of chunks) {
          controller.enqueue(encodeEvent({ type: 'token', content: chunk }));
          await new Promise((resolve) => setTimeout(resolve, 12));
        }
        controller.enqueue(encodeEvent({ type: 'done' }));
        controller.close();
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Demo stream failed.';
        controller.enqueue(encodeEvent({ type: 'error', message }));
        controller.close();
      }
    },
  });
}

async function pipeDemoToController(
  controller: ReadableStreamDefaultController<Uint8Array>,
  messages: readonly AssistantApiMessage[],
): Promise<void> {
  const reply = buildDemoReply(lastUserPrompt(messages));
  const chunks = reply.match(/\S+\s*|\n+/g) ?? [reply];
  for (const chunk of chunks) {
    controller.enqueue(encodeEvent({ type: 'token', content: chunk }));
    await new Promise((resolve) => setTimeout(resolve, 12));
  }
  controller.enqueue(encodeEvent({ type: 'done' }));
}

/**
 * Streams OpenAI chat completions as NDJSON token events.
 * On billing/quota failures, falls back to scripted demo replies.
 */
export function createOpenAiAssistantStream(
  messages: readonly AssistantApiMessage[],
  options: {
    readonly apiKey: string;
    readonly model: string;
    readonly signal?: AbortSignal;
  },
): ReadableStream<Uint8Array> {
  const { apiKey, model, signal } = options;

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model,
            stream: true,
            temperature: 0.5,
            messages: [
              { role: 'system', content: ASSISTANT_SYSTEM_PROMPT },
              ...messages.map((message) => ({
                role: message.role,
                content: message.content,
              })),
            ],
          }),
          signal,
        });

        if (!response.ok || !response.body) {
          let detail = `OpenAI request failed (${response.status}).`;
          try {
            const payload = (await response.json()) as { error?: { message?: string } };
            if (payload.error?.message) {
              detail = payload.error.message;
            }
          } catch {
            // keep status detail
          }

          if (isBillingOrQuotaError(response.status, detail)) {
            await pipeDemoToController(controller, messages);
            controller.close();
            return;
          }

          controller.enqueue(encodeEvent({ type: 'error', message: detail }));
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let emittedToken = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line.startsWith('data:')) {
              continue;
            }

            const data = line.slice(5).trim();
            if (!data || data === '[DONE]') {
              continue;
            }

            try {
              const parsed = JSON.parse(data) as {
                error?: { message?: string };
                choices?: Array<{ delta?: { content?: string } }>;
              };

              if (parsed.error?.message) {
                if (!emittedToken && isBillingOrQuotaError(response.status, parsed.error.message)) {
                  await pipeDemoToController(controller, messages);
                  controller.close();
                  return;
                }
                controller.enqueue(
                  encodeEvent({ type: 'error', message: parsed.error.message }),
                );
                controller.close();
                return;
              }

              const token = parsed.choices?.[0]?.delta?.content;
              if (token) {
                emittedToken = true;
                controller.enqueue(encodeEvent({ type: 'token', content: token }));
              }
            } catch {
              // ignore malformed SSE chunks
            }
          }
        }

        controller.enqueue(encodeEvent({ type: 'done' }));
        controller.close();
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          controller.enqueue(encodeEvent({ type: 'error', message: 'Generation stopped.' }));
          controller.close();
          return;
        }
        const message = error instanceof Error ? error.message : 'OpenAI stream failed.';
        controller.enqueue(encodeEvent({ type: 'error', message }));
        controller.close();
      }
    },
  });
}

export function isOpenAiConfigured(): boolean {
  const key = process.env.OPENAI_API_KEY?.trim() ?? '';
  if (!key || key.startsWith('#')) {
    return false;
  }
  // Ignore placeholders
  if (key.includes('your-') || key.includes('xxxx') || key.length < 20) {
    return false;
  }
  return true;
}

export function getOpenAiModel(): string {
  return process.env.OPENAI_MODEL?.trim() || 'gpt-4o-mini';
}
