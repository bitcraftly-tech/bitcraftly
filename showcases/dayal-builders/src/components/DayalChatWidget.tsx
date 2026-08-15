'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Bot, Send, Smile, Sparkles, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { showFeedbackAlert } from '@/lib/sweetAlert';

import DayalChatMessageBody, {
  dayalWhatsAppUrl,
} from '@bitcraftly/showcase-dayal-builders/components/DayalChatMessageBody';
import { DAYAL, DAYAL_LOGO_MARK } from '@bitcraftly/showcase-dayal-builders/lib/data';
import type { ChatTurnDto } from '@/lib/supportChat/types';

type ChatMsg = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const STORAGE_KEY = 'dayal.showcase.chat.v2';

const WELCOME: ChatMsg = {
  id: 'welcome',
  role: 'assistant',
  content: `Namaste! I'm Asha, the virtual property advisor for ${DAYAL.brand}.\nI can help with current and upcoming projects, amenities, locations, pricing enquiries, and site visits — English or Hinglish, both work.`,
};

function turnsForApi(list: ChatMsg[]): ChatTurnDto[] {
  return list
    .filter((m) => m.id !== 'welcome' && m.content.trim())
    .slice(-24)
    .map(({ role, content }) => ({ role, content: content.trimEnd() }));
}

const QUICK_CHIPS = [
  'Ongoing projects',
  'Char Sahebzade',
  'Book site visit',
  'Contact team',
] as const;

const EMOJIS = [
  { char: '🙂', label: 'Slight smile' },
  { char: '😀', label: 'Grinning face' },
  { char: '😊', label: 'Smiling face' },
  { char: '👍', label: 'Thumbs up' },
  { char: '🙏', label: 'Thank you' },
  { char: '🎉', label: 'Celebration' },
  { char: '❤️', label: 'Heart' },
  { char: '✨', label: 'Sparkles' },
  { char: '🏠', label: 'Home' },
  { char: '🏢', label: 'Building' },
  { char: '🔑', label: 'Key' },
  { char: '📍', label: 'Location' },
  { char: '📞', label: 'Phone' },
  { char: '💬', label: 'Chat' },
  { char: '💰', label: 'Price' },
  { char: '✅', label: 'Done' },
] as const;

function BotAvatar() {
  return (
    <span
      className="mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0b1633] text-[#d4b57d] shadow-sm"
      aria-hidden
    >
      <Bot className="h-4 w-4" />
    </span>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

const panelMotion = {
  hidden: { opacity: 0, y: 24, scale: 0.92, transformOrigin: 'bottom right' as const },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 380, damping: 28 },
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
  if (typeof window === 'undefined') return [WELCOME];
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

function subscribeToClientMount() {
  return () => undefined;
}

type Props = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function DayalChatWidget({ open: openProp, onOpenChange }: Props = {}) {
  const headingId = useId().replace(/:/g, '');
  const emojiPanelId = useId().replace(/:/g, '');
  const reduceMotion = useReducedMotion();
  const [openInternal, setOpenInternal] = useState(false);
  const open = openProp ?? openInternal;
  const setOpen = useCallback(
    (value: boolean) => {
      if (onOpenChange) onOpenChange(value);
      else setOpenInternal(value);
    },
    [onOpenChange],
  );
  const [messages, setMessages] = useState<ChatMsg[]>([WELCOME]);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const mounted = useSyncExternalStore(
    subscribeToClientMount,
    () => true,
    () => false,
  );
  const [lastProvider, setLastProvider] = useState<'ai' | 'proxy' | 'stub' | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const firstScrollRef = useRef(true);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const emojiPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => setMessages(loadMessages()), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveMessages(messages);
  }, [messages, mounted]);

  useEffect(() => {
    if (!open) {
      firstScrollRef.current = true;
      return;
    }
    const el = listRef.current;
    if (!el) return;
    // Jump straight to the latest turn when the panel opens, animate afterwards.
    const instant = firstScrollRef.current || reduceMotion;
    firstScrollRef.current = false;
    el.scrollTo({ top: el.scrollHeight, behavior: instant ? 'auto' : 'smooth' });
  }, [messages, typing, open, reduceMotion]);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => {
      window.clearTimeout(t);
      window.requestAnimationFrame(() => returnFocusRef.current?.focus());
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (emojiOpen) {
          setEmojiOpen(false);
          emojiButtonRef.current?.focus();
          return;
        }
        setOpen(false);
        return;
      }

      if (e.key !== 'Tab') return;
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen, emojiOpen]);

  useEffect(() => {
    if (!emojiOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (emojiPanelRef.current?.contains(target) || emojiButtonRef.current?.contains(target))
        return;
      setEmojiOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [emojiOpen]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const insertEmoji = useCallback((char: string) => {
    setDraft((current) => `${current}${char}`);
    inputRef.current?.focus();
  }, []);

  const pushAssistant = useCallback((content: string) => {
    setMessages((prev) => [...prev, { id: newId('assistant'), role: 'assistant', content }]);
  }, []);

  const sendMessage = useCallback(
    async (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed || typing) return;

      const userMsg: ChatMsg = { id: newId('user'), role: 'user', content: trimmed };
      const threadSnapshot = [...messages, userMsg];

      setMessages(threadSnapshot);
      setDraft('');
      setEmojiOpen(false);
      setTyping(true);

      const payload = turnsForApi(threadSnapshot);
      const last = payload[payload.length - 1];
      if (!last || last.role !== 'user') {
        setTyping(false);
        showFeedbackAlert('error', 'Could not send — please try again.');
        return;
      }

      try {
        const res = await fetch('/api/dayal/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: payload }),
        });

        const body = (await res.json().catch(() => ({}))) as {
          error?: string;
          message?: { content?: string };
          provider?: 'ai' | 'proxy' | 'stub';
        };

        if (!res.ok) {
          showFeedbackAlert(
            'error',
            typeof body.error === 'string' ? body.error : 'Something went wrong.',
          );
          setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
          return;
        }

        const answer = body.message?.content?.trim();
        if (!answer) {
          showFeedbackAlert('error', 'Empty reply from assistant.');
          return;
        }

        if (body.provider) setLastProvider(body.provider);
        pushAssistant(answer);
      } catch {
        showFeedbackAlert('error', 'Network error — please try again.');
        setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
      } finally {
        setTyping(false);
      }
    },
    [typing, messages, pushAssistant],
  );

  if (!mounted) return null;

  const waUrl = dayalWhatsAppUrl('Hi Dayal Builders, I have a question about your projects.');

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
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={headingId}
              initial={reduceMotion ? false : 'hidden'}
              animate={reduceMotion ? undefined : 'visible'}
              exit={reduceMotion ? undefined : 'exit'}
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
                    {lastProvider
                      ? 'Online property advisor · English / Hinglish'
                      : 'AI property advisor · ask about our projects'}
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
                    className={`flex items-end gap-2 ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'assistant' ? <BotAvatar /> : null}
                    <div
                      className={`min-w-0 max-w-[min(88%,calc(100%-2.75rem))] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                        msg.role === 'user'
                          ? 'rounded-br-md bg-[#0b1633] text-white'
                          : 'rounded-bl-md border border-[#0b1633]/6 bg-white text-[#0b1633]'
                      }`}
                    >
                      <DayalChatMessageBody content={msg.content} isUser={msg.role === 'user'} />
                    </div>
                  </div>
                ))}
                {typing ? (
                  <div className="flex items-end gap-2">
                    <BotAvatar />
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
              <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-[#0b1633]/6 bg-[#f8f6f2] px-3 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {QUICK_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => void sendMessage(chip)}
                    className="shrink-0 whitespace-nowrap rounded-full border border-[#c8a46b]/35 bg-white px-3 py-1.5 text-[11px] font-medium leading-4 text-[#0b1633] transition hover:border-[#c8a46b] hover:bg-[#c8a46b]/10"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input */}
              <form
                className="relative flex shrink-0 items-center gap-1.5 border-t border-[#0b1633]/8 bg-white px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:pb-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  void sendMessage(draft);
                }}
              >
                {emojiOpen ? (
                  <div
                    ref={emojiPanelRef}
                    id={emojiPanelId}
                    role="group"
                    aria-label="Emoji picker"
                    className="absolute bottom-full right-3 z-10 mb-2 grid grid-cols-8 gap-0.5 rounded-xl border border-[#0b1633]/10 bg-white p-2 shadow-[0_14px_36px_rgba(11,22,51,0.2)]"
                  >
                    {EMOJIS.map(({ char, label }) => (
                      <button
                        key={char}
                        type="button"
                        onClick={() => insertEmoji(char)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-lg leading-none transition hover:bg-[#f8f6f2]"
                        aria-label={label}
                      >
                        <span aria-hidden>{char}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
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
                  ref={emojiButtonRef}
                  type="button"
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition hover:bg-[#f8f6f2] hover:text-[#0b1633] ${
                    emojiOpen ? 'bg-[#f8f6f2] text-[#0b1633]' : 'text-[#9ca3af]'
                  }`}
                  aria-label="Insert emoji"
                  aria-haspopup="true"
                  aria-expanded={emojiOpen}
                  aria-controls={emojiOpen ? emojiPanelId : undefined}
                  onClick={() => setEmojiOpen((value) => !value)}
                >
                  <Smile className="h-5 w-5" />
                </button>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#25D366] transition hover:bg-[#25D366]/10"
                  aria-label="Continue on WhatsApp"
                  title="Continue on WhatsApp"
                >
                  <WhatsAppGlyph className="h-5 w-5" />
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
