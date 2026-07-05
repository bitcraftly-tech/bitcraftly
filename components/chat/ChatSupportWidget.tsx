"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { showFeedbackAlert, showSuccessAlert } from "@/lib/sweetAlert";

import { clearChatMessages, loadChatMessages, saveChatMessages } from "@/lib/supportChat/persist";
import type { ClientChatMessage, ChatTurnDto } from "@/lib/supportChat/types";

const WELCOME_TEXT =
  "Hi 👋 Namaste — Bitcraftly support assistant here.\nEnglish ya Hinglish, short messages welcome — pricing, demos, Smart Parking.\nWiring: /api/support/chat (+ optional SUPPORT_CHAT_WEBHOOK_URL).\nRight now you'll get smart stub replies until the LLM is connected.";

function newMsgId(prefix: string) {
  try {
    return `${prefix}_${crypto.randomUUID()}`;
  } catch {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  }
}

function welcomeMessage(): ClientChatMessage {
  return {
    id: newMsgId("welcome"),
    role: "assistant",
    content: WELCOME_TEXT,
    createdAt: Date.now(),
    status: "sent",
  };
}

function tidyHref(raw: string) {
  return raw.replace(/^`+|`+$/g, "").replace(/[),.;\]\}]+$/, "").trimEnd();
}

function formatLineTokens(line: string, lineIx: number): ReactNode {
  const re = /\b(https?:\/\/[^\s]+)\b|(\/[a-zA-Z0-9][^\s]*)/gu;
  const nodes: ReactNode[] = [];
  let lastIdx = 0;
  let partIndex = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(line)) !== null) {
    const start = m.index;
    const full = m[0];
    const urlHit = m[1];
    const pathHit = m[2];

    if (start > lastIdx) {
      nodes.push(line.slice(lastIdx, start));
    }
    partIndex += 1;

    const key = `${lineIx}-${full.length}-${partIndex}-${start}`;

    if (urlHit) {
      const href = tidyHref(urlHit);
      nodes.push(
        <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="break-all font-medium underline underline-offset-2">
          {href}
        </a>,
      );
    } else if (pathHit) {
      const href = tidyHref(pathHit);
      if (href.startsWith("/")) {
        nodes.push(
          <Link key={key} href={href} className="font-medium underline underline-offset-2">
            {href}
          </Link>,
        );
      } else {
        nodes.push(full);
      }
    } else {
      nodes.push(full);
    }

    lastIdx = start + full.length;
  }

  if (lastIdx < line.length) nodes.push(line.slice(lastIdx));

  return nodes.length > 1 || (nodes.length === 1 && typeof nodes[0] !== "string") ? <>{nodes}</> : nodes[0] ?? line;
}

function MessageBody({ content }: { content: string }) {
  const lines = content.split("\n");
  return (
    <>
      {lines.map((line, ix) => (
        <p key={`${content.length}_${ix}_${line.slice(0, 8)}`} className="whitespace-pre-wrap leading-relaxed last:mb-0">
          {formatLineTokens(line, ix)}
        </p>
      ))}
    </>
  );
}

function turnsForApi(list: ClientChatMessage[]): ChatTurnDto[] {
  const core = list.filter((m) => {
    if (m.role !== "user" && m.role !== "assistant") return false;
    if (!String(m.content).trim()) return false;
    if (m.status === "sending") return false;
    if (m.status === "error") return false;
    return true;
  });
  return core.slice(-40).map(({ role, content }) => ({ role, content: content.trimEnd() }));
}

export default function ChatSupportWidget() {
  const headingId = useId().replace(/:/g, "");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ClientChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
    let initial = loadChatMessages();
    if (initial.length === 0) {
      const w = welcomeMessage();
      initial = [w];
      saveChatMessages(initial);
    }
    setMessages(initial);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveChatMessages(messages);
  }, [messages, mounted]);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      const el = listRef.current;
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, [messages, busy, open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 48);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const clearThread = () => {
    clearChatMessages();
    const fresh = welcomeMessage();
    const next = [fresh];
    setMessages(next);
    saveChatMessages(next);
    showFeedbackAlert("success", "Chat cleared");
  };

  async function handleSend() {
    const trimmed = draft.trim();
    if (!trimmed.length || busy) return;

    const uid = newMsgId("user");
    const optimisticUser: ClientChatMessage = {
      id: uid,
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
      status: "sent",
    };

    const threadSnapshot = [...messages, optimisticUser];
    setDraft("");
    setBusy(true);

    /** Optimistic bubble */
    setMessages(threadSnapshot);

    const payload = turnsForApi(threadSnapshot);
    const lastTurn = payload[payload.length - 1];
    if (!lastTurn || lastTurn.role !== "user") {
      setBusy(false);
      showFeedbackAlert("error", "Sync issue — refresh the page and try again.");
      return;
    }

    try {
      const res = await fetch("/api/support/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        showFeedbackAlert("error", typeof body?.error === "string" ? body.error : "Server error — please try again.");
        setMessages((prev) => prev.map((x) => (x.id === optimisticUser.id ? { ...x, status: "error" as const } : x)));
        return;
      }

      const answerRaw = typeof body?.message?.content === "string" ? body.message.content.trim() : "";
      if (!answerRaw) {
        showFeedbackAlert("error", "Empty reply.");
        setMessages((prev) => prev.map((x) => (x.id === optimisticUser.id ? { ...x, status: "error" as const } : x)));
        return;
      }

      const assistantBubble: ClientChatMessage = {
        id: newMsgId("assistant"),
        role: "assistant",
        content: answerRaw,
        createdAt: Date.now(),
        status: "sent",
      };

      setMessages((prev) => [...prev, assistantBubble]);
    } catch {
      showFeedbackAlert("error", "Network error — please send again.");
      setMessages((prev) => prev.map((x) => (x.id === optimisticUser.id ? { ...x, status: "error" as const } : x)));
    } finally {
      setBusy(false);
    }
  }

  if (!mounted) return null;

  return (
    <>
      <span className="fixed left-5 z-[45] inline-block h-14 w-14 [transform:translateZ(0)] [bottom:calc(1.5rem+env(safe-area-inset-bottom,0px))]">
        <span className="support-chat-fab-ring" aria-hidden />
        <span className="support-chat-fab-ring support-chat-fab-ring--delayed" aria-hidden />
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={headingId}
          onClick={() => setOpen((o) => !o)}
          className="support-chat-fab-btn inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#2B5CE6] text-white shadow-lg shadow-[#2B5CE6]/35 transition hover:scale-[1.03] hover:bg-[#1e47c4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B5CE6] dark:bg-[#4068ff] dark:hover:bg-[#2f57e6]"
        >
          <span className="sr-only">Open or close AI support chat</span>
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 shrink-0 motion-safe:animate-[support-chat-fab-icon_2.4s_ease-in-out_infinite]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            shapeRendering="geometricPrecision"
            aria-hidden
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>
      </span>

      {open ? (
        <div className="fixed inset-0 z-[48]" role="presentation">
          <button
            type="button"
            aria-label="Close chat overlay"
            className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            className="absolute left-4 right-4 mx-auto flex w-[min(420px,calc(100vw-2rem))] max-h-[min(560px,calc(100dvh-11rem-env(safe-area-inset-top,0px)))] min-h-0 flex-col overflow-hidden rounded-2xl border border-border-primary bg-bg-card shadow-2xl dark:border-dark-border-primary dark:bg-dark-bg-card md:left-5 md:right-auto md:mx-0 [bottom:calc(1.5rem+3.5rem+1.5rem+env(safe-area-inset-bottom,0px))]"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-border-primary px-4 py-3 dark:border-dark-border-primary">
              <div className="flex min-w-0 flex-1 gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/28 to-[#2B5CE6]/35 text-[#3730a3] shadow-inner dark:from-violet-400/20 dark:to-blue-600/35 dark:text-violet-200">
                  <svg
                    className="h-5 w-5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    shapeRendering="geometricPrecision"
                    aria-hidden
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <h2 id={headingId} className="text-sm font-semibold text-text-primary dark:text-dark-text-primary">
                    AI support chat
                  </h2>
                  <p className="mt-0.5 text-xs text-text-tertiary dark:text-dark-text-tertiary">Stub replies for now · webhook / LLM-ready</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={clearThread}
                  className="rounded-lg px-2 py-1 text-xs font-medium text-text-secondary transition hover:bg-bg-secondary hover:text-text-primary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary dark:hover:text-dark-text-primary"
                >
                  Clear
                </button>
                <button
                  type="button"
                  aria-label="Close chat"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-text-secondary transition hover:bg-bg-secondary dark:text-dark-text-secondary dark:hover:bg-dark-bg-secondary"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[90%] rounded-2xl px-3 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "bg-[#2B5CE6] text-white dark:bg-[#4068ff]"
                        : "border border-border-primary bg-bg-secondary text-text-secondary dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-secondary"
                    }`}
                  >
                    <MessageBody content={msg.content} />
                    {msg.role === "user" && msg.status === "error" ? (
                      <p className="mt-1 border-t border-white/25 pt-1 text-[10px] uppercase tracking-wide text-white/95">Not delivered · send again</p>
                    ) : null}
                  </div>
                </div>
              ))}
              {busy ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl border border-border-primary bg-bg-secondary px-3 py-2 text-[11px] text-text-tertiary opacity-95 dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-tertiary">
                    Typing<span className="inline-block animate-pulse">…</span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="border-t border-border-primary p-3 dark:border-dark-border-primary">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  rows={2}
                  disabled={busy}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void handleSend();
                    }
                  }}
                  placeholder="Type a message… (Shift+Enter for new line)"
                  className="max-h-28 min-h-[44px] w-0 flex-1 resize-none rounded-xl border border-border-primary bg-bg-primary px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B5CE6]/35 dark:border-dark-border-primary dark:bg-dark-bg-primary dark:text-dark-text-primary dark:focus-visible:ring-[#7ea0ff]/35"
                />
                <button
                  type="button"
                  disabled={busy || !draft.trim().length}
                  onClick={() => void handleSend()}
                  className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#2B5CE6] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1e47c4] disabled:pointer-events-none disabled:opacity-40 dark:bg-[#4068ff] dark:hover:bg-[#2f57e6]"
                >
                  Send
                </button>
              </div>
              <p className="mt-2 text-[10px] leading-snug text-text-tertiary dark:text-dark-text-tertiary">
                This chat stays in your browser session only. Do not send passwords or OTPs.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
