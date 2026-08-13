'use client';

import { RotateCcw, Send, Sparkles, X } from 'lucide-react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { ecommerceWhatsAppUrl } from '@/components/portfolio/ecommerce/EcommerceWhatsAppFab';

import { formatInr, SHOP_PRODUCTS } from './ecommerce-demo-data';
import {
  answerEcommerceStoreQuery,
  chatHasVisitorMessages,
  CHAT_QUICK_PROMPTS,
  createUserMessage,
  createWelcomeMessage,
  formatChatTranscriptForWhatsApp,
  type ChatMessage,
} from './ecommerce-chat-engine';
import { useEcommerceDemo } from './EcommerceDemoContext';
import { EcommerceProductImage } from './EcommerceProductImage';

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
      <path
        d="M9 22H6.5a2 2 0 0 0 0 4H9"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M39 22h2.5a2 2 0 0 1 0 4H39"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M17 38.5v2.5M31 38.5v2.5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
export default function EcommerceAiChatbot() {
  const panelId = useId();
  const { cartCount, cartSubtotal, pincode, addToCart, setProductModal, setCartOpen } =
    useEcommerceDemo();

  const [open, setOpen] = useState(false);
  const [entered, setEntered] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createWelcomeMessage()]);
  const replyTimerRef = useRef<number | null>(null);
  const messagesRef = useRef(messages);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

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

      const message = formatChatTranscriptForWhatsApp(snapshot, reason, {
        pincode,
        cartCount,
      });
      window.open(ecommerceWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
    },
    [cartCount, pincode],
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
        const reply = answerEcommerceStoreQuery(text, { cartCount, cartSubtotal, pincode });
        setMessages((prev) => [...prev, reply]);
        setBusy(false);
        replyTimerRef.current = null;
      },
      420 + Math.min(480, text.length * 12),
    );
  };

  return (
    <>
      <button
        type="button"
        className="ec-chat-fab"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Close Ecommerce Store assistant' : 'Open Ecommerce Store assistant'}
        onClick={() => (open ? closeChat() : setOpen(true))}
      >
        {open ? (
          <X className="h-5 w-5" aria-hidden />
        ) : (
          <ChatRobotIcon className="ec-chat-fab__robot" />
        )}
      </button>

      {rendered ? (
        <div
          id={panelId}
          className={`ec-chat-panel${entered ? ' ec-chat-panel--open' : ''}`}
          role="dialog"
          aria-modal="false"
          aria-label="Ecommerce Store AI assistant"
        >
          <header className="ec-chat-panel__head">
            <span className="ec-chat-panel__avatar" aria-hidden>
              <ChatRobotIcon className="ec-chat-panel__robot" />
            </span>
            <div className="ec-chat-panel__meta min-w-0 flex-1">
              <p className="ec-chat-panel__title">Ecommerce Store Assistant</p>
              <p className="ec-chat-panel__status">
                <span className="ec-chat-panel__status-dot" aria-hidden />
                Online · {SHOP_PRODUCTS.length} catalog items
              </p>
            </div>
            <div className="ec-chat-panel__actions">
              <button
                type="button"
                className="ec-chat-panel__action"
                aria-label="Reset chat and send transcript to WhatsApp support"
                title="Reset · send chat to WhatsApp support"
                onClick={resetChat}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                <span className="ec-chat-panel__action-label">Reset</span>
              </button>
              <button
                type="button"
                className="ec-chat-panel__action ec-chat-panel__action--close"
                aria-label="Close chat and send transcript to WhatsApp support"
                title="Close · send chat to WhatsApp support"
                onClick={closeChat}
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </header>

          <div ref={listRef} className="ec-chat-panel__body">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={
                  msg.role === 'bot'
                    ? 'ec-chat-row ec-chat-row--bot'
                    : 'ec-chat-row ec-chat-row--user'
                }
              >
                {msg.role === 'bot' ? (
                  <span className="ec-chat-row__icon" aria-hidden>
                    <Sparkles className="h-3.5 w-3.5" />
                  </span>
                ) : null}
                <div className="ec-chat-bubble">
                  <p>{msg.text}</p>
                  {msg.products?.length ? (
                    <ul className="ec-chat-products">
                      {msg.products.map((product) => (
                        <li key={product.id} className="ec-chat-product">
                          <button
                            type="button"
                            className="ec-chat-product__main"
                            onClick={() => setProductModal(product)}
                          >
                            <EcommerceProductImage
                              product={product}
                              className="ec-chat-product__thumb"
                              eager
                            />
                            <span className="ec-chat-product__copy">
                              <span className="ec-chat-product__title">{product.title}</span>
                              <span className="ec-chat-product__price">
                                {formatInr(product.price)}
                              </span>
                            </span>
                          </button>
                          <button
                            type="button"
                            className="ec-chat-product__cart"
                            onClick={() => {
                              addToCart(product);
                              setCartOpen(true);
                            }}
                          >
                            Add
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <span className="ec-chat-bubble__time">{msg.time}</span>
                </div>
              </div>
            ))}
            {busy ? (
              <div className="ec-chat-row ec-chat-row--bot" aria-live="polite">
                <span className="ec-chat-row__icon" aria-hidden>
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <div className="ec-chat-bubble ec-chat-bubble--typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ) : null}
          </div>

          <div className="ec-chat-panel__foot">
            <div className="ec-chat-chips" aria-label="Suggested questions">
              {CHAT_QUICK_PROMPTS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="ec-chat-chip"
                  onClick={() => send(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
            <form
              className="ec-chat-compose"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <label className="sr-only" htmlFor={`${panelId}-input`}>
                Message Ecommerce Store assistant
              </label>
              <input
                ref={inputRef}
                id={`${panelId}-input`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask for Samsung, headphones, kitchen, or deals…"
                autoComplete="off"
                disabled={busy}
              />
              <button type="submit" aria-label="Send message" disabled={busy || !input.trim()}>
                <Send className="h-4 w-4" aria-hidden />
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
