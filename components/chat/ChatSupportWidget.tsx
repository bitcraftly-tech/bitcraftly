"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useId, useRef, useState, useCallback } from "react";
import { toast } from "sonner";
import { X, Send, ChevronDown, RotateCcw } from "lucide-react";

import { clearChatMessages, loadChatMessages, saveChatMessages } from "@/lib/supportChat/persist";
import type { ClientChatMessage, ChatTurnDto } from "@/lib/supportChat/types";

/* ─── Bot avatar ─────────────────────────────────────── */
function BotAvatar({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx="40" cy="40" r="38" fill="url(#bcBotGrad)" />
      <rect x="20" y="18" width="40" height="34" rx="14" fill="#fff" />
      <path d="M20 26 Q20 14 40 14 Q60 14 60 26 L60 22 Q60 10 40 10 Q20 10 20 22 Z" fill="#1e3a8a" />
      <path d="M20 24 Q25 20 30 24" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M50 24 Q55 20 60 24" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <rect x="17" y="28" width="5" height="10" rx="2.5" fill="#e2e8f0" />
      <rect x="58" y="28" width="5" height="10" rx="2.5" fill="#e2e8f0" />
      <circle cx="19.5" cy="27" r="3" fill="#2B5CE6" />
      <circle cx="60.5" cy="27" r="3" fill="#2B5CE6" />
      <ellipse cx="32" cy="34" rx="5" ry="5.5" fill="#1e293b" />
      <ellipse cx="48" cy="34" rx="5" ry="5.5" fill="#1e293b" />
      <circle cx="34" cy="32" r="1.5" fill="#fff" />
      <circle cx="50" cy="32" r="1.5" fill="#fff" />
      <path d="M27 30 Q28 28 29 29" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M43 30 Q44 28 45 29" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cx="27" cy="39" rx="4" ry="2.5" fill="#bfdbfe" opacity="0.6" />
      <ellipse cx="53" cy="39" rx="4" ry="2.5" fill="#bfdbfe" opacity="0.6" />
      <path d="M33 43 Q40 48 47 43" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
      <rect x="28" y="50" width="24" height="16" rx="8" fill="#dbeafe" />
      <path d="M38 50 L40 58 L42 50 Z" fill="#2B5CE6" />
      <circle cx="40" cy="60" r="3" fill="#2B5CE6" opacity="0.6" />
      <defs>
        <radialGradient id="bcBotGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ─── Helpers ────────────────────────────────────────── */
function newMsgId(prefix: string) {
  try { return `${prefix}_${crypto.randomUUID()}`; }
  catch { return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`; }
}

function nowTime() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

function tidyHref(raw: string) {
  return raw.replace(/^`+|`+$/g, "").replace(/[),.;\]\}]+$/, "").trimEnd();
}

function formatLineTokens(line: string, lineIx: number): ReactNode {
  const re = /\b(https?:\/\/[^\s]+)\b|(\/[a-zA-Z0-9][^\s]*)/gu;
  const nodes: ReactNode[] = [];
  let lastIdx = 0; let partIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line)) !== null) {
    const start = m.index; const full = m[0];
    const urlHit = m[1]; const pathHit = m[2];
    if (start > lastIdx) nodes.push(line.slice(lastIdx, start));
    partIndex += 1;
    const key = `${lineIx}-${full.length}-${partIndex}-${start}`;
    if (urlHit) {
      const href = tidyHref(urlHit);
      nodes.push(<a key={key} href={href} target="_blank" rel="noopener noreferrer" className="break-all font-medium underline underline-offset-2">{href}</a>);
    } else if (pathHit) {
      const href = tidyHref(pathHit);
      if (href.startsWith("/")) nodes.push(<Link key={key} href={href} className="font-medium underline underline-offset-2">{href}</Link>);
      else nodes.push(full);
    } else nodes.push(full);
    lastIdx = start + full.length;
  }
  if (lastIdx < line.length) nodes.push(line.slice(lastIdx));
  return nodes.length > 1 || (nodes.length === 1 && typeof nodes[0] !== "string") ? <>{nodes}</> : nodes[0] ?? line;
}

function MessageBody({ content }: { content: string }) {
  return (
    <>
      {content.split("\n").map((line, ix) => (
        <p key={`${content.length}_${ix}_${line.slice(0, 8)}`} className="whitespace-pre-wrap leading-relaxed last:mb-0">
          {formatLineTokens(line, ix)}
        </p>
      ))}
    </>
  );
}

function turnsForApi(list: ClientChatMessage[]): ChatTurnDto[] {
  return list
    .filter((m) => (m.role === "user" || m.role === "assistant") && m.content.trim() && m.status !== "sending" && m.status !== "error")
    .slice(-40)
    .map(({ role, content }) => ({ role, content: content.trimEnd() }));
}

const WELCOME: ClientChatMessage = {
  id: "welcome_0",
  role: "assistant",
  content: "Namaste! 🙏 Main Bitcraftly ka AI Assistant hun.\n\nWebsite, app, pricing, portfolio — kuch bhi poochh sakte hain. Hinglish bhi chalega! 😊",
  createdAt: Date.now(),
  status: "sent",
  quick: ["💰 Pricing", "🌐 Services", "🖼️ Portfolio", "📞 Contact"],
};

/* ─── Component ─────────────────────────────────────── */
export default function ChatSupportWidget() {
  const headingId     = useId().replace(/:/g, "");
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<ClientChatMessage[]>([]);
  const [draft, setDraft]     = useState("");
  const [busy, setBusy]       = useState(false);
  const [unread, setUnread]   = useState(1);

  const listRef  = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Load persisted messages on mount */
  useEffect(() => {
    setMounted(true);
    let initial = loadChatMessages();
    if (initial.length === 0) {
      initial = [WELCOME];
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
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
    });
  }, [messages, busy, open]);

  useEffect(() => {
    if (!open) return;
    setUnread(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 48);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  /* Streaming text effect */
  const streamMessage = useCallback((id: string, fullContent: string, quick?: string[]) => {
    const speed = Math.max(10, Math.min(25, 2800 / fullContent.length));
    let i = 0;
    const tick = () => {
      i++;
      setMessages(prev => prev.map(m =>
        m.id === id ? { ...m, displayContent: fullContent.slice(0, i), streaming: i < fullContent.length } : m
      ));
      if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
      if (i < fullContent.length) {
        setTimeout(tick, speed);
      } else {
        setMessages(prev => prev.map(m =>
          m.id === id ? { ...m, streaming: false, quick } : m
        ));
      }
    };
    setTimeout(tick, speed);
  }, []);

  const clearThread = () => {
    clearChatMessages();
    const fresh = { ...WELCOME, id: newMsgId("welcome"), createdAt: Date.now() };
    setMessages([fresh]);
    saveChatMessages([fresh]);
    toast.success("Chat cleared");
  };

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const uid = newMsgId("user");
    const userMsg: ClientChatMessage = { id: uid, role: "user", content: trimmed, displayContent: trimmed, createdAt: Date.now(), status: "sent" };

    const snapshot = [...messages, userMsg];
    setDraft("");
    setBusy(true);
    setMessages(snapshot);

    const payload = turnsForApi(snapshot);
    if (!payload.length || payload[payload.length - 1].role !== "user") {
      setBusy(false);
      toast.error("Sync issue — refresh and try again.");
      return;
    }

    try {
      const res = await fetch("/api/support/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });
      const body = await res.json().catch(() => ({})) as Record<string, unknown>;

      if (!res.ok) {
        toast.error(typeof body.error === "string" ? body.error : "Server error — try again.");
        setMessages(prev => prev.map(x => x.id === uid ? { ...x, status: "error" as const } : x));
        return;
      }

      const answerRaw = typeof body.message === "object" && body.message !== null
        ? ((body.message as Record<string, unknown>).content as string ?? "").trim()
        : "";
      const quickReplies = Array.isArray(body.quick) ? body.quick as string[] : undefined;

      if (!answerRaw) {
        toast.error("Empty reply.");
        setMessages(prev => prev.map(x => x.id === uid ? { ...x, status: "error" as const } : x));
        return;
      }

      const botId = newMsgId("assistant");
      const botMsg: ClientChatMessage = {
        id: botId, role: "assistant", content: answerRaw,
        displayContent: "", streaming: true,
        createdAt: Date.now(), status: "sent",
      };
      setMessages(prev => [...prev, botMsg]);
      streamMessage(botId, answerRaw, quickReplies);
    } catch {
      toast.error("Network error — please send again.");
      setMessages(prev => prev.map(x => x.id === uid ? { ...x, status: "error" as const } : x));
    } finally {
      setBusy(false);
    }
  }, [busy, messages, streamMessage]);

  if (!mounted) return null;

  return (
    <>
      {/* Floating bubble */}
      <span className="fixed left-5 z-[45] inline-block [bottom:calc(1.5rem+env(safe-area-inset-bottom,0px))]">
        {/* Ping rings */}
        {!open && (
          <>
            <span className="support-chat-fab-ring" aria-hidden />
            <span className="support-chat-fab-ring support-chat-fab-ring--delayed" aria-hidden />
          </>
        )}
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={headingId}
          onClick={() => setOpen(o => !o)}
          className="relative inline-flex h-14 w-14 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-[#2B5CE6] bg-white shadow-lg shadow-[#2B5CE6]/25 transition hover:scale-[1.05] hover:shadow-[#2B5CE6]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B5CE6]"
        >
          <span className="sr-only">Open or close AI support chat</span>
          {open
            ? <ChevronDown className="h-6 w-6 text-[#2B5CE6]" />
            : <BotAvatar size={52} />
          }
          {!open && unread > 0 && (
            <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-red-500 text-[10px] font-bold text-white">
              {unread}
            </span>
          )}
        </button>
      </span>

      {/* Chat panel */}
      {open && (
        <div className="fixed inset-0 z-[48]" role="presentation">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close chat overlay"
            className="absolute inset-0 bg-black/25 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            className="absolute left-4 right-4 mx-auto flex w-[min(420px,calc(100vw-2rem))] max-h-[min(580px,calc(100dvh-10rem-env(safe-area-inset-top,0px)))] min-h-0 flex-col overflow-hidden rounded-2xl border border-border-primary bg-bg-card shadow-2xl dark:border-dark-border-primary dark:bg-dark-bg-card md:left-5 md:right-auto md:mx-0 [bottom:calc(1.5rem+3.5rem+1.5rem+env(safe-area-inset-bottom,0px))]"
            onMouseDown={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border-primary bg-gradient-to-r from-[#2B5CE6] to-[#1e47c4] px-4 py-3 dark:border-dark-border-primary">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white/40 bg-white">
                <BotAvatar size={44} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 id={headingId} className="text-sm font-bold text-white">
                  Bitcraftly AI Assistant
                </h2>
                <p className="flex items-center gap-1.5 text-[11px] text-blue-100">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  Online · Instant replies
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={clearThread}
                  title="Clear chat"
                  className="rounded-lg p-1.5 text-blue-100 transition hover:bg-white/15"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  aria-label="Close chat"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-blue-100 transition hover:bg-white/15"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-3 scroll-smooth">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  {msg.role === "assistant" && (
                    <div className="mt-auto flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-blue-100 bg-blue-50">
                      <BotAvatar size={28} />
                    </div>
                  )}
                  <div className="flex max-w-[85%] flex-col gap-1">
                    <div className={`rounded-2xl px-3 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "rounded-br-sm bg-[#2B5CE6] text-white dark:bg-[#4068ff]"
                        : "rounded-bl-sm border border-border-primary bg-bg-secondary text-text-secondary dark:border-dark-border-primary dark:bg-dark-bg-secondary dark:text-dark-text-secondary"
                    }`}>
                      <MessageBody content={msg.displayContent ?? msg.content} />
                      {msg.streaming && (
                        <span className="ml-0.5 inline-block animate-[support-chat-cursor_0.7s_ease-in-out_infinite] text-[#2B5CE6]">▋</span>
                      )}
                      {msg.role === "user" && msg.status === "error" && (
                        <p className="mt-1 border-t border-white/25 pt-1 text-[10px] uppercase tracking-wide text-white/90">Not delivered · send again</p>
                      )}
                    </div>
                    {/* Quick replies */}
                    {!msg.streaming && msg.quick && msg.role === "assistant" && (
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {msg.quick.map(q => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => void sendMessage(q)}
                            className="rounded-full border border-[#2B5CE6]/40 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#2B5CE6] transition hover:border-[#2B5CE6] hover:bg-[#2B5CE6] hover:text-white dark:border-[#4068ff]/40 dark:bg-dark-bg-primary dark:text-[#7ea0ff] dark:hover:bg-[#4068ff] dark:hover:text-white"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Thinking indicator */}
              {busy && (
                <div className="flex items-end gap-2">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-blue-100 bg-blue-50">
                    <BotAvatar size={28} />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-border-primary bg-bg-secondary px-3 py-2.5 dark:border-dark-border-primary dark:bg-dark-bg-secondary">
                    <span className="text-[11px] italic text-text-tertiary dark:text-dark-text-tertiary">AI is thinking</span>
                    <span className="h-1.5 w-1.5 animate-[support-chat-dot_1.1s_ease-in-out_infinite] rounded-full bg-[#2B5CE6]" />
                    <span className="h-1.5 w-1.5 animate-[support-chat-dot_1.1s_0.15s_ease-in-out_infinite] rounded-full bg-[#2B5CE6]" />
                    <span className="h-1.5 w-1.5 animate-[support-chat-dot_1.1s_0.3s_ease-in-out_infinite] rounded-full bg-[#2B5CE6]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border-primary p-3 dark:border-dark-border-primary">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  disabled={busy}
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void sendMessage(draft); } }}
                  placeholder="Kuch bhi poochhen…"
                  className="h-10 w-0 flex-1 rounded-xl border border-border-primary bg-bg-primary px-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B5CE6]/30 dark:border-dark-border-primary dark:bg-dark-bg-primary dark:text-dark-text-primary"
                />
                <button
                  type="button"
                  disabled={busy || !draft.trim()}
                  onClick={() => void sendMessage(draft)}
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#2B5CE6] text-white shadow-sm transition hover:bg-[#1e47c4] disabled:pointer-events-none disabled:opacity-40 dark:bg-[#4068ff] dark:hover:bg-[#2f57e6]"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-[10px] leading-snug text-text-tertiary dark:text-dark-text-tertiary">
                Powered by Bitcraftly AI · Browser session only
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
