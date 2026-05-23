"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Paperclip, Send, Smile, Sparkles, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { toast } from "sonner";

import DayalChatMessageBody, { dayalWhatsAppUrl } from "@/components/dayal/DayalChatMessageBody";
import { DAYAL, DAYAL_LOGO_MARK } from "@/lib/dayal/data";
import type { ChatTurnDto } from "@/lib/supportChat/types";

type ChatMsg = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const STORAGE_KEY = "dayal.showcase.chat.v2";

const WELCOME: ChatMsg = {
  id: "welcome",
  role: "assistant",
  content:
    `Hi! I'm the AI assistant for ${DAYAL.brand}.\nAsk about Char Sahebzade, ongoing projects, site visits, or pricing — English or Hinglish, both work.`,
};

function turnsForApi(list: ChatMsg[]): ChatTurnDto[] {
  return list
    .filter((m) => m.id !== "welcome" && m.content.trim())
    .slice(-24)
    .map(({ role, content }) => ({ role, content: content.trimEnd() }));
}

const QUICK_CHIPS = [
  "Ongoing projects",
  "Char Sahebzade",
  "Book site visit",
  "Contact team",
] as const;

const panelMotion = {
  hidden: { opacity: 0, y: 24, scale: 0.92, transformOrigin: "bottom right" as const },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 380, damping: 28 },
  },
  exit: { opacity: 0, y: 16, scale: 0.95, transition: { duration: 0.2 } },
};

function newId(prefix: string) {
  try {
    return `${prefix}_${crypto.randomUUID()}`;
  } catch {
    return `${prefix}_${Date.now()}`;
  }
}

function loadMessages(): ChatMsg[] {
  if (typeof window === "undefined") return [WELCOME];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [WELCOME];
    const parsed = JSON.parse(raw) as ChatMsg[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [WELCOME];
  } catch {
    return [WELCOME];
  }
}

function saveMessages(msgs: ChatMsg[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-50)));
  } catch {
    // ignore
  }
}

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function DayalChatWidget({ open: openProp, onOpenChange }: Props = {}) {
  const headingId = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();
  const [openInternal, setOpenInternal] = useState(false);
  const open = openProp ?? openInternal;
  const setOpen = useCallback(
    (value: boolean) => {
      if (onOpenChange) onOpenChange(value);
      else setOpenInternal(value);
    },
    [onOpenChange]
  );
  const [messages, setMessages] = useState<ChatMsg[]>([WELCOME]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lastProvider, setLastProvider] = useState<"ai" | "proxy" | "stub" | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    setMessages(loadMessages());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveMessages(messages);
  }, [messages, mounted]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const pushAssistant = useCallback((content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: newId("assistant"), role: "assistant", content },
    ]);
  }, []);

  const sendMessage = useCallback(
    async (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed || typing) return;

      const userMsg: ChatMsg = { id: newId("user"), role: "user", content: trimmed };
      const threadSnapshot = [...messages, userMsg];

      setMessages(threadSnapshot);
      setDraft("");
      setTyping(true);

      const payload = turnsForApi(threadSnapshot);
      const last = payload[payload.length - 1];
      if (!last || last.role !== "user") {
        setTyping(false);
        toast.error("Could not send — please try again.");
        return;
      }

      try {
        const res = await fetch("/api/dayal/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: payload }),
        });

        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
          message?: { content?: string };
          provider?: "ai" | "proxy" | "stub";
        };

        if (!res.ok) {
          toast.error(typeof body.error === "string" ? body.error : "Something went wrong.");
          setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
          return;
        }

        const answer = body.message?.content?.trim();
        if (!answer) {
          toast.error("Empty reply from assistant.");
          return;
        }

        if (body.provider) setLastProvider(body.provider);
        pushAssistant(answer);
      } catch {
        toast.error("Network error — please try again.");
        setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
      } finally {
        setTyping(false);
      }
    },
    [typing, messages, pushAssistant]
  );

  if (!mounted) return null;

  const waUrl = dayalWhatsAppUrl("Hi Dayal Builders, I have a question about your projects.");

  return (
    <>
      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close chat overlay"
              className="fixed inset-0 z-[45] bg-[#0b1633]/25 backdrop-blur-[1px] lg:bg-transparent lg:backdrop-blur-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={headingId}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
              exit={reduceMotion ? undefined : "exit"}
              variants={reduceMotion ? undefined : panelMotion}
              className="dayal-chat-panel fixed z-50 flex flex-col overflow-hidden border border-[#0b1633]/10 bg-white shadow-[0_20px_60px_rgba(11,22,51,0.28)]"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-[#0b1633]/8 bg-white px-4 py-3">
                <div className="relative shrink-0">
                  <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#f8f6f2] ring-1 ring-[#0b1633]/8">
                    <Image
                      src={DAYAL_LOGO_MARK}
                      alt=""
                      width={40}
                      height={26}
                      className="h-auto w-9 object-contain"
                    />
                  </span>
                  <span
                    className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#22c55e]"
                    aria-hidden
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h2 id={headingId} className="truncate text-base font-bold text-[#0b1633]">
                      {DAYAL.brand}
                    </h2>
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-[#c8a46b]/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#8a6d3b]">
                      <Sparkles className="h-2.5 w-2.5" aria-hidden />
                      AI
                    </span>
                  </div>
                  <p className="text-xs text-[#5c6478]">
                    {lastProvider === "ai" || lastProvider === "proxy"
                      ? "AI assistant · English / Hinglish"
                      : lastProvider === "stub"
                        ? "Smart replies · add API key for full AI"
                        : "AI assistant · ask anything about our projects"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#0b1633] transition hover:bg-[#f8f6f2]"
                  aria-label="Close chat"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={listRef}
                className="dayal-chat-panel__messages min-h-[200px] flex-1 space-y-3 overflow-y-auto overscroll-contain bg-[#ececec] px-3 py-4 touch-pan-y"
              >
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`min-w-0 max-w-[min(88%,calc(100%-0.5rem))] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "rounded-br-md bg-[#0b1633] text-white"
                          : "rounded-bl-md border border-[#0b1633]/6 bg-white text-[#0b1633]"
                      }`}
                    >
                      <DayalChatMessageBody
                        content={msg.content}
                        isUser={msg.role === "user"}
                      />
                    </div>
                  </div>
                ))}
                {typing ? (
                  <div className="flex justify-start">
                    <div className="rounded-2xl rounded-bl-md border border-[#0b1633]/6 bg-white px-4 py-2.5 text-sm text-[#5c6478]">
                      <span className="inline-flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c8a46b] [animation-delay:0ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c8a46b] [animation-delay:120ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c8a46b] [animation-delay:240ms]" />
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Quick chips */}
              <div className="flex gap-2 overflow-x-auto border-t border-[#0b1633]/6 bg-[#f8f6f2] px-3 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => void sendMessage(chip)}
                    className="shrink-0 rounded-full border border-[#c8a46b]/35 bg-white px-3 py-1 text-[11px] font-medium text-[#0b1633] transition hover:border-[#c8a46b] hover:bg-[#c8a46b]/10"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input */}
              <form
                className="flex shrink-0 items-center gap-1.5 border-t border-[#0b1633]/8 bg-white px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:pb-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  void sendMessage(draft);
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  enterKeyHint="send"
                  value={draft}
                  disabled={typing}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type your message..."
                  className="dayal-chat-input dayal-serif min-h-[44px] min-w-0 flex-1 rounded-lg bg-[#f8f6f2] px-3 py-2.5 text-sm text-[#0b1633] outline-none placeholder:text-[#0b1633]/45 focus:ring-2 focus:ring-[#c8a46b]/35 lg:bg-transparent lg:px-0 lg:py-0 lg:focus:ring-0"
                />
                <button
                  type="button"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#9ca3af] transition hover:bg-[#f8f6f2] hover:text-[#0b1633]"
                  aria-label="Insert emoji"
                  onClick={() => setDraft((d) => `${d}🙂`)}
                >
                  <Smile className="h-5 w-5" />
                </button>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#9ca3af] transition hover:bg-[#f8f6f2] hover:text-[#0b1633]"
                  aria-label="Continue on WhatsApp"
                  title="Share on WhatsApp"
                >
                  <Paperclip className="h-5 w-5" />
                </a>
                <button
                  type="submit"
                  disabled={typing || !draft.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0b1633] text-white transition hover:bg-[#152a52] disabled:opacity-40 lg:hidden"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
