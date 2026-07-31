export type OpenAiChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type OpenAiChatConfig = {
  apiKey: string;
  baseUrl: string;
  model: string;
  referer?: string;
};

/** Resolve OpenAI-compatible credentials (OpenAI, OpenRouter, or Dayal-specific env). */
export function resolveOpenAiChatConfig(): OpenAiChatConfig | null {
  const apiKey =
    process.env.DAYAL_CHAT_API_KEY?.trim() ||
    process.env.OPENAI_API_KEY?.trim() ||
    process.env.OPENROUTER_API_KEY?.trim();

  if (!apiKey) return null;

  const baseUrl = (
    process.env.DAYAL_CHAT_BASE_URL?.trim() ||
    process.env.OPENAI_BASE_URL?.trim() ||
    (process.env.OPENROUTER_API_KEY?.trim()
      ? 'https://openrouter.ai/api/v1'
      : 'https://api.openai.com/v1')
  ).replace(/\/$/, '');

  const model =
    process.env.DAYAL_CHAT_MODEL?.trim() ||
    process.env.OPENAI_MODEL?.trim() ||
    (process.env.OPENROUTER_API_KEY?.trim() ? 'openai/gpt-4o-mini' : 'gpt-4o-mini');

  const referer =
    process.env.OPENROUTER_HTTP_REFERER?.trim() ||
    process.env.NEXT_PUBLIC_PUBLIC_BASE_URL?.trim() ||
    'https://bitcraftly.com';

  return { apiKey, baseUrl, model, referer };
}

export async function createChatCompletion(
  messages: OpenAiChatMessage[],
  options?: { temperature?: number; maxTokens?: number },
): Promise<string | null> {
  const config = resolveOpenAiChatConfig();
  if (!config) return null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.apiKey}`,
  };

  if (config.baseUrl.includes('openrouter.ai')) {
    headers['HTTP-Referer'] = config.referer ?? 'https://bitcraftly.com';
    headers['X-Title'] = 'Dayal Builders Showcase';
  }

  try {
    const res = await fetch(`${config.baseUrl}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: config.model,
        messages,
        temperature: options?.temperature ?? 0.55,
        max_tokens: options?.maxTokens ?? 650,
      }),
      signal: AbortSignal.timeout(28_000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.warn('[ai-chat] completion failed', res.status, errText.slice(0, 200));
      return null;
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = json.choices?.[0]?.message?.content;
    return typeof content === 'string' ? content.trim() : null;
  } catch (e) {
    console.warn('[ai-chat] completion error', e);
    return null;
  }
}
