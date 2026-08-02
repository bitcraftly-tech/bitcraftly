import type { StreamChunk } from '../types';
import type { AiProvider } from './types';
import { streamNotConfigured } from './types';

/**
 * Anthropic Claude provider adapter (architecture only).
 * Future: Messages API streaming via server route.
 */
export const claudeProvider: AiProvider = {
  id: 'claude',
  displayName: 'Claude',
  configured: false,
  streamChat(): AsyncIterable<StreamChunk> {
    return streamNotConfigured(this);
  },
};
