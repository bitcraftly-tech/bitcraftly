import {
  createDemoAssistantStream,
  createOpenAiAssistantStream,
  getOpenAiModel,
  isOpenAiConfigured,
  type AssistantApiMessage,
} from '@/features/ai-assistant/server/assistant-chat-stream';

export const runtime = 'nodejs';

const MAX_TURNS = 24;
const MAX_MESSAGE_LENGTH = 1_200;
const MAX_TOTAL_LENGTH = 14_000;

type ChatRequestBody = {
  messages?: unknown;
};

function parseMessages(value: unknown): AssistantApiMessage[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_TURNS) {
    return null;
  }

  let totalLength = 0;
  const messages: AssistantApiMessage[] = [];

  for (const item of value) {
    if (typeof item !== 'object' || item === null) {
      return null;
    }

    const { role, content } = item as Record<string, unknown>;
    if (role !== 'user' && role !== 'assistant') {
      return null;
    }
    if (typeof content !== 'string') {
      return null;
    }

    const trimmed = content.trim();
    if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH) {
      return null;
    }

    totalLength += trimmed.length;
    if (totalLength > MAX_TOTAL_LENGTH) {
      return null;
    }

    messages.push({ role, content: trimmed });
  }

  return messages.at(-1)?.role === 'user' ? messages : null;
}

export async function POST(request: Request) {
  let body: ChatRequestBody;

  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return Response.json({ error: 'Invalid JSON request.' }, { status: 400 });
  }

  const messages = parseMessages(body.messages);
  if (!messages) {
    return Response.json(
      { error: 'Send 1–24 valid user/assistant messages, ending with a user message.' },
      { status: 400 },
    );
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim() ?? '';
  const live = isOpenAiConfigured();

  const stream = live
    ? createOpenAiAssistantStream(messages, {
        apiKey,
        model: getOpenAiModel(),
        signal: request.signal,
      })
    : createDemoAssistantStream(messages);

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Assistant-Mode': live ? 'live' : 'demo',
    },
  });
}
