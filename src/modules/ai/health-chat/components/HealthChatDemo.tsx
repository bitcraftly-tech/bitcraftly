'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Bot, SendHorizontal } from 'lucide-react';

import { useFakeAiDelay } from '@/modules/ai/shared/hooks/useFakeAiDelay';
import type { AiChatMessage } from '@/modules/ai/shared/types';
import { CHAT_SUGGESTIONS, CHAT_WELCOME, replyToChat } from '@/modules/ai/health-chat/data/replies';

function newId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `msg_${Date.now()}`;
  }
}

export default function HealthChatDemo() {
  const uid = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const { busy, run } = useFakeAiDelay(900);
  const [messages, setMessages] = useState<readonly AiChatMessage[]>([CHAT_WELCOME]);
  const [draft, setDraft] = useState('');

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;

    const userMsg: AiChatMessage = { id: newId(), role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setDraft('');

    const reply = await run(() => replyToChat(trimmed));
    setMessages((prev) => [...prev, { id: newId(), role: 'assistant', text: reply }]);
  }

  return (
    <div
      className="cl-card flex h-[min(34rem,75vh)] flex-col overflow-hidden"
      aria-labelledby={`${uid}-chat`}
    >
      <div
        className="flex items-center gap-3 border-b px-4 py-3"
        style={{ borderColor: 'var(--cl-border)' }}
      >
        <span
          className="inline-flex h-10 w-10 items-center justify-center rounded-full"
          style={{
            background: 'linear-gradient(135deg, var(--cl-primary), var(--cl-accent))',
            color: 'var(--cl-on-primary)',
          }}
          aria-hidden
        >
          <Bot className="h-5 w-5" />
        </span>
        <div>
          <h2 id={`${uid}-chat`} className="text-sm font-bold">
            Clinic AI Assistant
          </h2>
          <p className="text-xs" style={{ color: 'var(--cl-faint)' }}>
            Online · educational replies
          </p>
        </div>
      </div>

      <div
        ref={listRef}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
        role="log"
        aria-live="polite"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
              style={
                message.role === 'user'
                  ? {
                      background: 'linear-gradient(135deg, var(--cl-primary), var(--cl-accent))',
                      color: 'var(--cl-on-primary)',
                    }
                  : {
                      background: 'var(--cl-surface-soft)',
                      color: 'var(--cl-text)',
                    }
              }
            >
              {message.text}
            </div>
          </div>
        ))}
        {busy ? (
          <div className="flex justify-start">
            <div
              className="rounded-2xl px-3.5 py-2.5 text-sm"
              style={{ background: 'var(--cl-surface-soft)', color: 'var(--cl-faint)' }}
              aria-label="Assistant is typing"
            >
              Typing…
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t px-4 py-3" style={{ borderColor: 'var(--cl-border)' }}>
        <div className="mb-3 flex flex-wrap gap-2" aria-label="Suggested questions">
          {CHAT_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              className="rounded-full border px-3 py-1 text-xs font-medium transition hover:border-[var(--cl-primary)] hover:text-[var(--cl-primary)]"
              style={{ borderColor: 'var(--cl-border)', color: 'var(--cl-muted)' }}
              onClick={() => void send(suggestion)}
              disabled={busy}
            >
              {suggestion}
            </button>
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            void send(draft);
          }}
        >
          <label className="sr-only" htmlFor={`${uid}-input`}>
            Message
          </label>
          <input
            id={`${uid}-input`}
            className="cl-field flex-1"
            placeholder="Ask about appointments, departments, reports…"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            disabled={busy}
            autoComplete="off"
          />
          <button
            type="submit"
            className="cl-btn cl-btn--primary shrink-0 px-3"
            disabled={busy || !draft.trim()}
            aria-label="Send message"
          >
            <SendHorizontal className="h-4 w-4" aria-hidden />
          </button>
        </form>
      </div>
    </div>
  );
}
