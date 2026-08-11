import type { AiChatRequest, ChatMessage, StreamChunk } from '../types';
import { buildDemoReply } from '../lib/demo-replies';
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
 * Prefer `openai` in production demos; this remains for offline / fallback use.
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
