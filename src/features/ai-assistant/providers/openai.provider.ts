import type { AiChatRequest, StreamChunk } from '../types';
import type { AiProvider } from './types';

async function* readNdjsonStream(
  body: ReadableStream<Uint8Array>,
  signal?: AbortSignal,
): AsyncIterable<StreamChunk> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  const onAbort = () => {
    void reader.cancel();
  };
  signal?.addEventListener('abort', onAbort, { once: true });

  try {
    while (true) {
      if (signal?.aborted) {
        yield { type: 'error', message: 'Generation stopped.' };
        return;
      }

      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
          continue;
        }

        try {
          const event = JSON.parse(trimmed) as StreamChunk;
          if (event.type === 'token' || event.type === 'done' || event.type === 'error') {
            yield event;
            if (event.type === 'done' || event.type === 'error') {
              return;
            }
          }
        } catch {
          // ignore malformed lines
        }
      }
    }
  } finally {
    signal?.removeEventListener('abort', onAbort);
  }
}

/**
 * OpenAI-backed assistant provider.
 * Streams via `/api/assistant/chat` (server holds the API key).
 * When no key is configured, the API falls back to demo replies.
 */
export const openaiProvider: AiProvider = {
  id: 'openai',
  displayName: 'OpenAI',
  configured: true,
  async *streamChat(request: AiChatRequest): AsyncIterable<StreamChunk> {
    const payload = {
      messages: request.messages
        .filter((message) => message.role === 'user' || message.role === 'assistant')
        .filter((message) => message.content.trim().length > 0)
        .map((message) => ({
          role: message.role,
          content: message.content,
        })),
    };

    let response: Response;
    try {
      response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: request.signal,
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        yield { type: 'error', message: 'Generation stopped.' };
        return;
      }
      yield {
        type: 'error',
        message: error instanceof Error ? error.message : 'Could not reach the assistant API.',
      };
      return;
    }

    if (!response.ok) {
      let message = `Assistant request failed (${response.status}).`;
      try {
        const payloadJson = (await response.json()) as { error?: string };
        if (payloadJson.error) {
          message = payloadJson.error;
        }
      } catch {
        // keep status message
      }
      yield { type: 'error', message };
      return;
    }

    if (!response.body) {
      yield { type: 'error', message: 'Assistant stream was empty.' };
      return;
    }

    yield* readNdjsonStream(response.body, request.signal);
  },
};
