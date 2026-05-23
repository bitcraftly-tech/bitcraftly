import { NextResponse, type NextRequest } from "next/server";

import { runDayalAssistant } from "@/lib/dayal/chatAssistant";
import type { ChatRole, ChatTurnDto } from "@/lib/supportChat/types";

const MAX_BODY_BYTES = 32_768;
const MAX_MESSAGES = 40;
const MAX_MSG_LEN = 4_000;

function isChatRole(role: unknown): role is ChatRole {
  return role === "user" || role === "assistant" || role === "system";
}

export async function POST(req: NextRequest) {
  try {
    const len = Number(req.headers.get("content-length") || 0);
    if (len > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
    }

    const body = (await req.json()) as unknown;
    const rawList =
      typeof body === "object" && body !== null ? (body as Record<string, unknown>).messages : null;
    if (!Array.isArray(rawList)) {
      return NextResponse.json({ error: "messages_required" }, { status: 400 });
    }

    const messages: ChatTurnDto[] = [];
    for (const raw of rawList.slice(-MAX_MESSAGES)) {
      if (typeof raw !== "object" || raw === null) continue;
      const r = raw as Record<string, unknown>;
      if (!isChatRole(r.role) || typeof r.content !== "string") continue;
      const trimmed = r.content.slice(0, MAX_MSG_LEN).trimEnd();
      if (!trimmed) continue;
      messages.push({ role: r.role, content: trimmed });
    }

    if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
      return NextResponse.json({ error: "last_message_must_be_user" }, { status: 400 });
    }

    const result = await runDayalAssistant(messages);
    return NextResponse.json({
      message: { role: "assistant" as const, content: result.content },
      provider: result.provider,
    });
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
}
