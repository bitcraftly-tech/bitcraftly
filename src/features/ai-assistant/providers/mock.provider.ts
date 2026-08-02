import type { AiChatRequest, ChatMessage, StreamChunk } from '../types';
import type { AiProvider } from './types';

function lastUserPrompt(messages: readonly ChatMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    const message = messages[i];
    if (message?.role === 'user') {
      return message.content.trim();
    }
  }
  return '';
}

function buildDemoReply(prompt: string): string {
  const lower = prompt.toLowerCase();

  if (lower.includes('pricing') || lower.includes('cost') || lower.includes('quote')) {
    return [
      'Happy to help with **pricing**.',
      '',
      'Typical Bitcraftly engagements land in clear ranges based on scope:',
      '',
      '- **Marketing sites** — focused pages, SEO, performance',
      '- **Custom software / CRM** — workflows, roles, integrations',
      '- **AI assistants** — grounded answers, handoff, analytics',
      '',
      'For a written estimate, use the [pricing calculator](/pricing#pricing-calculator) or [book a consultation](/contact).',
      '',
      '_Demo stream — OpenAI / Gemini / Claude adapters are ready to wire._',
    ].join('\n');
  }

  if (lower.includes('service') || lower.includes('offer')) {
    return [
      'Bitcraftly builds **AI-powered digital products** for growth-focused teams.',
      '',
      '### Core offerings',
      '',
      '1. Website & web application development',
      '2. Custom software, CRM, and internal tools',
      '3. AI automation, chatbots, and assistants',
      '',
      'Explore [services](/services) or ask about a specific industry.',
      '',
      '_Demo stream — provider APIs not connected yet._',
    ].join('\n');
  }

  if (lower.includes('ai') || lower.includes('assistant') || lower.includes('chatbot')) {
    return [
      'Our **AI assistants** are designed for real operations — not demos that drift.',
      '',
      'You get:',
      '',
      '- Grounded answers from your content',
      '- Clear human handoff (chat / WhatsApp)',
      '- Measurable deflection and lead capture',
      '',
      'See [AI assistants](/solutions/ai-assistants) for the product shape.',
      '',
      '```ts',
      '// Architecture: swap mock → openai | gemini | claude',
      'const provider = getAiProvider(config.providerId);',
      '```',
      '',
      '_Streaming UI is live; API keys stay server-side when wired._',
    ].join('\n');
  }

  return [
    'Thanks for your question.',
    '',
    `You asked: *${prompt || '—'}*`,
    '',
    "I'm the **Bitcraftly AI Assistant** UI — streaming, markdown, and provider adapters are in place.",
    '',
    'Try asking about **pricing**, **services**, or **AI assistants**.',
    '',
    '- [Contact](/contact) for a scoped proposal',
    '- [Work](/work) for case studies',
    '',
    '_Mock provider response — no live model call._',
  ].join('\n');
}

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }
    const timer = setTimeout(() => resolve(), ms);
    const onAbort = () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    };
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

/**
 * Local demo provider — streams markdown tokens for UI development.
 * Replace via registry when OpenAI / Gemini / Claude are configured.
 */
export const mockProvider: AiProvider = {
  id: 'mock',
  displayName: 'Demo',
  configured: true,
  async *streamChat(request: AiChatRequest): AsyncIterable<StreamChunk> {
    const reply = buildDemoReply(lastUserPrompt(request.messages));
    const chunks = reply.match(/\S+\s*|\n+/g) ?? [reply];

    for (const chunk of chunks) {
      if (request.signal?.aborted) {
        yield { type: 'error', message: 'Generation stopped.' };
        return;
      }
      yield { type: 'token', content: chunk };
      await sleep(18 + Math.floor(Math.random() * 28), request.signal);
    }

    yield { type: 'done' };
  },
};
