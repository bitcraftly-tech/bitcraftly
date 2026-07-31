import { NextResponse } from 'next/server';

import { runDayalAssistant } from '@/lib/dayal/chatAssistant';
import type { ChatTurnDto } from '@/lib/supportChat/types';

const MAX_TURNS = 24;
const MAX_MESSAGE_LENGTH = 1_000;
const MAX_TOTAL_LENGTH = 12_000;

type ChatRequestBody = {
  messages?: unknown;
};

function parseMessages(value: unknown): ChatTurnDto[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_TURNS) return null;

  let totalLength = 0;
  const messages: ChatTurnDto[] = [];

  for (const item of value) {
    if (typeof item !== 'object' || item === null) return null;

    const { role, content } = item as Record<string, unknown>;
    if (role !== 'user' && role !== 'assistant') return null;
    if (typeof content !== 'string') return null;

    const trimmed = content.trim();
    if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH) return null;

    totalLength += trimmed.length;
    if (totalLength > MAX_TOTAL_LENGTH) return null;

    messages.push({ role, content: trimmed });
  }

  return messages.at(-1)?.role === 'user' ? messages : null;
}

export async function POST(request: Request) {
  let body: ChatRequestBody;

  try {
    body = (await request.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON request.' }, { status: 400 });
  }

  const messages = parseMessages(body.messages);
  if (!messages) {
    return NextResponse.json(
      { error: 'Send 1–24 valid user/assistant messages, ending with a user message.' },
      { status: 400 },
    );
  }

  const result = await runDayalAssistant(messages);

  return NextResponse.json(
    {
      message: { role: 'assistant', content: result.content },
      provider: result.provider,
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );
}
