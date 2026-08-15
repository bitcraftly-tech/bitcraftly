'use client';

import { RotateCcw, Send, Sparkles, X } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { useGymDemo } from '@bitcraftly/showcase-gym-fitness/app/gym-fitness-showcase/GymDemoContext';
import {
  answerFitRallyQuery,
  CHAT_MEMORY_STORAGE_KEY,
  chatHasVisitorMessages,
  CHAT_QUICK_PROMPTS,
  createUserMessage,
  createWelcomeMessage,
  EMPTY_CHAT_MEMORY,
  formatChatTranscriptForWhatsApp,
  type ChatMemory,
  type ChatMessage,
} from '@bitcraftly/showcase-gym-fitness/app/gym-fitness-showcase/gym-chat-engine';

import { gymWhatsAppUrl } from './GymWhatsAppFab';

function ChatRobotIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M24 6v5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24" cy="4.5" r="2.4" fill="currentColor" />
      <rect
        x="9"
        y="12"
        width="30"
        height="24"
        rx="9"
        fill="currentColor"
        fillOpacity="0.18"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <rect x="14" y="18" width="20" height="11" rx="5.5" fill="currentColor" fillOpacity="0.22" />
      <circle cx="19.5" cy="23.5" r="2.4" fill="currentColor" />
      <circle cx="28.5" cy="23.5" r="2.4" fill="currentColor" />
      <path
        d="M20.5 30.5c1.1 1.1 2.3 1.6 3.5 1.6s2.4-.5 3.5-1.6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function readStoredMemory(): ChatMemory {
  try {
    const raw = window.sessionStorage.getItem(CHAT_MEMORY_STORAGE_KEY);
    if (!raw) return EMPTY_CHAT_MEMORY;
    const parsed = JSON.parse(raw) as Partial<ChatMemory>;
    const name = typeof parsed.visitorName === 'string' ? parsed.visitorName.trim() : '';
    return name ? { visitorName: name } : EMPTY_CHAT_MEMORY;
  } catch {
    return EMPTY_CHAT_MEMORY;
  }
}

function writeStoredMemory(memory: ChatMemory) {
  try {
    if (memory.visitorName) {
      window.sessionStorage.setItem(CHAT_MEMORY_STORAGE_KEY, JSON.stringify(memory));
    } else {
      window.sessionStorage.removeItem(CHAT_MEMORY_STORAGE_KEY);
    }
  } catch {
    /* ignore quota / private mode */
  }
}

export default function GymAiChatbot() {
  const panelId = useId();
  const { city } = useGymDemo();

  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [memory, setMemory] = useState<ChatMemory>(EMPTY_CHAT_MEMORY);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createWelcomeMessage()]);
  const replyTimerRef = useRef<number | null>(null);
  const messagesRef = useRef(messages);
  const memoryRef = useRef(memory);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = readStoredMemory();
    setMemory(stored);
    memoryRef.current = stored;
    setMessages([createWelcomeMessage(stored)]);
  }, []);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    memoryRef.current = memory;
    writeStoredMemory(memory);
  }, [memory]);

  useEffect(() => {
    if (open) {
      setRendered(true);
      const frame = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setEntered(true));
      });
      return () => window.cancelAnimationFrame(frame);
    }
    setEntered(false);
    const timer = window.setTimeout(() => setRendered(false), 280);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => inputRef.current?.focus(), 120);
    return () => window.clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!rendered) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, rendered, busy]);

  const sendChatRecordToWhatsApp = useCallback(
    (reason: 'close' | 'reset') => {
      const snapshot = messagesRef.current;
      if (!chatHasVisitorMessages(snapshot)) return;
      const message = formatChatTranscriptForWhatsApp(snapshot, reason, city, memoryRef.current);
      window.open(gymWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
    },
    [city],
  );

  const closeChat = useCallback(() => {
    sendChatRecordToWhatsApp('close');
    setOpen(false);
  }, [sendChatRecordToWhatsApp]);

  const resetChat = useCallback(() => {
    sendChatRecordToWhatsApp('reset');
    if (replyTimerRef.current != null) {
      window.clearTimeout(replyTimerRef.current);
      replyTimerRef.current = null;
    }
    setBusy(false);
    setInput('');
    setMemory(EMPTY_CHAT_MEMORY);
    memoryRef.current = EMPTY_CHAT_MEMORY;
    writeStoredMemory(EMPTY_CHAT_MEMORY);
    setMessages([createWelcomeMessage()]);
    window.setTimeout(() => inputRef.current?.focus(), 50);
  }, [sendChatRecordToWhatsApp]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeChat();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, closeChat]);

  useEffect(() => {
    return () => {
      if (replyTimerRef.current != null) window.clearTimeout(replyTimerRef.current);
    };
  }, []);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;

    setMessages((prev) => [...prev, createUserMessage(text)]);
    setInput('');
    setBusy(true);

    replyTimerRef.current = window.setTimeout(
      () => {
        const { reply, memory: nextMemory } = answerFitRallyQuery(text, city, memoryRef.current);
        memoryRef.current = nextMemory;
        setMemory(nextMemory);
        setMessages((prev) => [...prev, reply]);
        setBusy(false);
        replyTimerRef.current = null;
      },
      380 + Math.min(520, text.length * 14),
    );
  };

  return (
    <>
      <button
        type="button"
        className="gym-chat-fab"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close RallyAI assistant' : 'Open RallyAI fitness assistant'}
        onClick={() => (open ? closeChat() : setOpen(true))}
      >
        {open ? (
          <X className="gym-chat-fab__icon" aria-hidden />
        ) : (
          <ChatRobotIcon className="gym-chat-fab__robot" />
        )}
      </button>

      {rendered ? (
        <div
          id={panelId}
          className={`gym-chat-panel${entered ? ' gym-chat-panel--open' : ''}`}
          role="dialog"
          aria-modal="false"
          aria-label="RallyAI FitRally assistant"
        >
          <header className="gym-chat-panel__head">
            <span className="gym-chat-panel__avatar" aria-hidden>
              <ChatRobotIcon className="gym-chat-panel__robot" />
            </span>
            <div className="gym-chat-panel__meta">
              <p className="gym-chat-panel__title">RallyAI</p>
              <p className="gym-chat-panel__status">
                <span className="gym-chat-panel__status-dot" aria-hidden />
                Online · {city}
                {memory.visitorName ? ` · ${memory.visitorName}` : ''}
              </p>
            </div>
            <div className="gym-chat-panel__actions">
              <button
                type="button"
                className="gym-chat-panel__action"
                aria-label="Reset chat memory and send transcript to WhatsApp"
                title="Reset · clear name memory · WhatsApp"
                onClick={resetChat}
              >
                <RotateCcw className="gym-chat-panel__action-icon" aria-hidden />
                <span className="gym-chat-panel__action-label">Reset</span>
              </button>
              <button
                type="button"
                className="gym-chat-panel__action gym-chat-panel__action--close"
                aria-label="Close chat and send transcript to WhatsApp"
                title="Close · send chat to WhatsApp"
                onClick={closeChat}
              >
                <X className="gym-chat-panel__action-icon" aria-hidden />
              </button>
            </div>
          </header>

          <div ref={listRef} className="gym-chat-panel__body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.role === 'bot'
                    ? 'gym-chat-row gym-chat-row--bot'
                    : 'gym-chat-row gym-chat-row--user'
                }
              >
                {msg.role === 'bot' ? (
                  <span className="gym-chat-row__icon" aria-hidden>
                    <Sparkles className="gym-chat-row__spark" />
                  </span>
                ) : null}
                <div className="gym-chat-bubble">
                  <p className="gym-chat-bubble__text">{msg.text}</p>
                  <span className="gym-chat-bubble__time">{msg.time}</span>
                </div>
              </div>
            ))}
            {busy ? (
              <div className="gym-chat-row gym-chat-row--bot" aria-live="polite">
                <span className="gym-chat-row__icon" aria-hidden>
                  <Sparkles className="gym-chat-row__spark" />
                </span>
                <div className="gym-chat-bubble gym-chat-bubble--typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ) : null}
          </div>

          <div className="gym-chat-panel__foot">
            {memory.visitorName ? (
              <div className="gym-chat-chips" aria-label="Suggested questions">
                {CHAT_QUICK_PROMPTS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    className="gym-chat-chip"
                    disabled={busy}
                    onClick={() => send(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            ) : null}
            <form
              className="gym-chat-compose"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <label className="sr-only" htmlFor={`${panelId}-input`}>
                {memory.visitorName ? 'Message RallyAI' : 'Enter your name'}
              </label>
              <input
                id={`${panelId}-input`}
                ref={inputRef}
                className="gym-chat-compose__input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  memory.visitorName ? `Ask anything, ${memory.visitorName}…` : 'Enter your name…'
                }
                autoComplete="off"
                disabled={busy}
              />
              <button
                type="submit"
                className="gym-chat-compose__send"
                disabled={busy || !input.trim()}
                aria-label={memory.visitorName ? 'Send message' : 'Save name'}
              >
                <Send className="gym-chat-compose__send-icon" aria-hidden />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
