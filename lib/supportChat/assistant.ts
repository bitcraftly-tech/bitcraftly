import type { ChatTurnDto } from "./types";
import { buildStubAssistantReply } from "./stubReply";

export type AssistantResult = {
  content: string;
  quick?: string[];
  /** `ai` reserved for OPENAI-compatible path */
  provider: "stub" | "proxy" | "ai";
};

/**
 * Single entry for server-side replies. Wire AI here later:
 * ```ts
 * if (process.env.OPENROUTER_API_KEY) { ... return { provider: 'ai', content }; }
 * if (process.env.SUPPORT_CHAT_WEBHOOK_URL) { ... }
 * ```
 */
export async function runSupportAssistant(history: ChatTurnDto[]): Promise<AssistantResult> {
  const webhook = process.env.SUPPORT_CHAT_WEBHOOK_URL;
  if (webhook?.trim()) {
    try {
      const res = await fetch(webhook.trim(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: AbortSignal.timeout(25_000),
      });
      if (!res.ok) {
        console.warn("[support-chat] webhook failed", res.status);
      } else {
        const json = (await res.json()) as unknown;
        if (typeof json === "object" && json !== null) {
          const obj = json as Record<string, unknown>;
          const c = typeof obj.content === "string" ? obj.content.trim() : "";
          const reply = typeof obj.reply === "string" ? obj.reply.trim() : "";
          const nested = typeof obj.message === "object" && obj.message !== null ? (obj.message as { content?: string }).content : undefined;
          const text = [c, reply, nested?.trim() ?? ""].find((x) => x?.length > 0) ?? "";
          if (text) {
            return { provider: "proxy", content: text };
          }
        }
      }
    } catch (e) {
      console.warn("[support-chat] webhook error", e);
    }
  }

  return stubFromHistory(history);
}

function stubFromHistory(history: ChatTurnDto[]): AssistantResult {
  const latestUser = [...history].reverse().find((t) => t.role === "user");
  const text = latestUser?.content ?? "";
  const result = buildStubAssistantReply(history, text);
  return {
    provider: "stub",
    content: result.text,
    quick: result.quick,
  };
}
