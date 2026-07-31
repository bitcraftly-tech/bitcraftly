import type { StreamChunk } from '../types';
import type { AiProvider } from './types';
import { streamNotConfigured } from './types';

/**
 * OpenAI provider adapter (architecture only).
 * Future: Responses / Chat Completions streaming via server route.
 */
export const openaiProvider: AiProvider = {
  id: 'openai',
  displayName: 'OpenAI',
  configured: false,
  streamChat(): AsyncIterable<StreamChunk> {
    return streamNotConfigured(this);
  },
};
