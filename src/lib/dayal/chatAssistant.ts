import { createChatCompletion } from '@/lib/ai/openaiCompatible';
import type { ChatTurnDto } from '@/lib/supportChat/types';

import { buildDayalStubReply } from '@/lib/dayal/chatStubReply';
import {
  AMENITIES,
  DAYAL,
  FUTURE_PROJECTS,
  ONGOING_PROJECTS,
  PAST_PROJECTS,
  PROPRIETOR,
} from '@/lib/dayal/data';

export type DayalAssistantResult = {
  content: string;
  provider: 'ai' | 'proxy' | 'stub';
};

/** Avoid long URLs overflowing chat bubbles */
function sanitizeAssistantReply(content: string): string {
  return content
    .replace(/https?:\/\/wa\.me\/\S+/gi, `WhatsApp: ${DAYAL.phones[0].display}`)
    .replace(/https?:\/\/\S{50,}/g, (url) => {
      if (/dayalbuilder\.com/i.test(url)) return DAYAL.website;
      return 'link on request — please call or use #contact';
    });
}

function projectLines(
  list: readonly { name: string; status: string; location: string; tagline: string }[],
) {
  return list.map((p) => `- ${p.name} (${p.status}): ${p.location} — ${p.tagline}`).join('\n');
}

export function buildDayalSystemPrompt(): string {
  const amenities = AMENITIES.map((a) => a.name).join(', ');

  return `You are the official AI assistant for ${DAYAL.brand}, a trusted real-estate developer in Jamshedpur, Jharkhand, India.

PERSONALITY: Warm, professional, helpful. Reply in English or Hinglish — match the user's language. Keep answers concise (under ~120 words unless listing projects).

RULES:
- Only answer about ${DAYAL.brand}, their projects, amenities, site visits, and contact options.
- Never invent exact prices, possession dates, flat sizes, or legal guarantees. For pricing/booking say our team will share details on call, WhatsApp, or the contact form.
- Do not claim to book appointments yourself — direct users to #contact on this page or WhatsApp/phone.
- If asked about unrelated topics, politely redirect to real-estate enquiries.
- Never paste long wa.me or https URLs. Share phone numbers and say "contact form" (#contact) instead.

CONTACT:
- Phone: ${DAYAL.phones[0].display}, ${DAYAL.phones[1].display}
- Email: ${DAYAL.email}
- WhatsApp: ${DAYAL.phones[0].display} (do not output raw links)
- Website: ${DAYAL.website}
- Head office: ${DAYAL.officeAddress}
- Site address: ${DAYAL.siteAddress}

LEADERSHIP: ${PROPRIETOR.name}, ${PROPRIETOR.role}, ${PROPRIETOR.company}.

FLAGSHIP: ${DAYAL.heroHighlight} — ${DAYAL.tagline}

FUTURE PROJECTS:
${projectLines(FUTURE_PROJECTS)}

ONGOING PROJECTS:
${projectLines(ONGOING_PROJECTS)}

COMPLETED / PAST:
${projectLines(PAST_PROJECTS)}

TYPICAL AMENITIES: ${amenities}.`;
}

async function tryWebhook(history: ChatTurnDto[]): Promise<string | null> {
  const webhook = process.env.DAYAL_CHAT_WEBHOOK_URL?.trim();
  if (!webhook) return null;

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history, system: buildDayalSystemPrompt() }),
      signal: AbortSignal.timeout(25_000),
    });
    if (!res.ok) return null;

    const json = (await res.json()) as unknown;
    if (typeof json !== 'object' || json === null) return null;
    const obj = json as Record<string, unknown>;
    const c = typeof obj.content === 'string' ? obj.content.trim() : '';
    const reply = typeof obj.reply === 'string' ? obj.reply.trim() : '';
    const nested =
      typeof obj.message === 'object' && obj.message !== null
        ? (obj.message as { content?: string }).content?.trim()
        : '';
    return [c, reply, nested ?? ''].find((x) => x.length > 0) ?? null;
  } catch {
    return null;
  }
}

export async function runDayalAssistant(history: ChatTurnDto[]): Promise<DayalAssistantResult> {
  const webhookText = await tryWebhook(history);
  if (webhookText) {
    return { provider: 'proxy', content: sanitizeAssistantReply(webhookText) };
  }

  const turns = history.filter((t) => t.role === 'user' || t.role === 'assistant').slice(-24);

  const aiContent = await createChatCompletion([
    { role: 'system', content: buildDayalSystemPrompt() },
    ...turns.map((t) => ({
      role: t.role as 'user' | 'assistant',
      content: t.content,
    })),
  ]);

  if (aiContent) {
    return { provider: 'ai', content: sanitizeAssistantReply(aiContent) };
  }

  const latestUser = [...history].reverse().find((t) => t.role === 'user');
  return {
    provider: 'stub',
    content: buildDayalStubReply(latestUser?.content ?? ''),
  };
}

export function isDayalAiConfigured(): boolean {
  return Boolean(
    process.env.DAYAL_CHAT_API_KEY?.trim() ||
    process.env.OPENAI_API_KEY?.trim() ||
    process.env.OPENROUTER_API_KEY?.trim() ||
    process.env.DAYAL_CHAT_WEBHOOK_URL?.trim(),
  );
}
