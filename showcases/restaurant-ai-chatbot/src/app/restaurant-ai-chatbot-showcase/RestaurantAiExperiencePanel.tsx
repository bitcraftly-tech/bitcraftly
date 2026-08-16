'use client';

import { useMemo, useRef, useState } from 'react';
import {
  Bot,
  CalendarDays,
  Check,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Minus,
  Plus,
  RotateCcw,
  Send,
  ShoppingBag,
  Sparkles,
  Users,
} from 'lucide-react';

type DemoMode = 'chat' | 'order' | 'reserve';
type ChatRole = 'assistant' | 'guest';

interface ChatMessage {
  readonly id: number;
  readonly role: ChatRole;
  readonly text: string;
}

interface MenuItem {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly badge: string;
}

const INITIAL_MESSAGES: readonly ChatMessage[] = [
  {
    id: 1,
    role: 'assistant',
    text: 'Namaste! I am Aira, your AI host. I can recommend dishes, build an order, or reserve a table.',
  },
];

const QUICK_PROMPTS = [
  'Recommend a vegetarian dinner',
  'What is mildly spicy?',
  'Book a table for four',
] as const;

const MENU: readonly MenuItem[] = [
  {
    id: 'galouti',
    name: 'Jackfruit Galouti',
    description: 'Smoked jackfruit, mint chutney, mini kulcha',
    price: 340,
    badge: 'Guest favourite',
  },
  {
    id: 'tandoor',
    name: 'Royal Tandoor Platter',
    description: 'Paneer tikka, mushrooms, broccoli, saffron dip',
    price: 720,
    badge: 'Best for sharing',
  },
  {
    id: 'thali',
    name: 'Weekend Tasting Thali',
    description: 'Dal makhani, seasonal curry, breads, dessert',
    price: 480,
    badge: 'Chef curated',
  },
] as const;

const TIME_SLOTS = ['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'] as const;

function answerFor(message: string): string {
  const normalized = message.toLowerCase();

  if (normalized.includes('book') || normalized.includes('table')) {
    return 'Absolutely. Open the Reserve tab and I will hold a table in under 30 seconds—no phone call needed.';
  }

  if (normalized.includes('vegetarian') || normalized.includes('veg')) {
    return 'Try the Jackfruit Galouti followed by our Weekend Tasting Thali. Both are vegetarian; I can also make the thali Jain-friendly.';
  }

  if (normalized.includes('spicy') || normalized.includes('mild')) {
    return 'The Royal Tandoor Platter is naturally mild. I can keep every marinade at level 1 and serve chilli oil separately.';
  }

  if (normalized.includes('allergy') || normalized.includes('gluten')) {
    return 'I can filter the menu by allergens. Please share the allergy and I will only suggest kitchen-verified options.';
  }

  return 'I can help with menu recommendations, dietary filters, ordering, reservations, and a seamless WhatsApp handoff. What would you like to do?';
}

export function RestaurantAiExperiencePanel() {
  const [mode, setMode] = useState<DemoMode>('chat');
  const [messages, setMessages] = useState<readonly ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [cart, setCart] = useState<Readonly<Record<string, number>>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState<(typeof TIME_SLOTS)[number]>('7:30 PM');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const nextMessageId = useRef(2);

  const cartCount = useMemo(
    () => Object.values(cart).reduce((total, quantity) => total + quantity, 0),
    [cart],
  );

  const cartTotal = useMemo(
    () => MENU.reduce((total, item) => total + item.price * (cart[item.id] ?? 0), 0),
    [cart],
  );

  function submitMessage(message = input) {
    const value = message.trim();
    if (!value || isReplying) return;

    const guestId = nextMessageId.current;
    nextMessageId.current += 1;
    setMessages((current) => [...current, { id: guestId, role: 'guest', text: value }]);
    setInput('');
    setIsReplying(true);

    window.setTimeout(() => {
      const assistantId = nextMessageId.current;
      nextMessageId.current += 1;
      setMessages((current) => [
        ...current,
        { id: assistantId, role: 'assistant', text: answerFor(value) },
      ]);
      setIsReplying(false);
    }, 550);
  }

  function updateQuantity(itemId: string, delta: number) {
    setOrderPlaced(false);
    setCart((current) => {
      const nextQuantity = Math.max(0, (current[itemId] ?? 0) + delta);
      const next = { ...current };
      if (nextQuantity === 0) {
        delete next[itemId];
      } else {
        next[itemId] = nextQuantity;
      }
      return next;
    });
  }

  function resetDemo() {
    setMessages(INITIAL_MESSAGES);
    setInput('');
    setIsReplying(false);
    setCart({});
    setOrderPlaced(false);
    setGuests(2);
    setDate('');
    setTime('7:30 PM');
    setBookingConfirmed(false);
    nextMessageId.current = 2;
  }

  return (
    <div className="ra-demo">
      <div className="ra-demo__topbar">
        <div className="ra-demo__brand">
          <span className="ra-demo__avatar" aria-hidden>
            <Bot size={20} />
          </span>
          <span>
            <strong>Aira · AI host</strong>
            <small>
              <span aria-hidden />
              Online now
            </small>
          </span>
        </div>
        <button type="button" className="ra-demo__reset" onClick={resetDemo}>
          <RotateCcw size={14} aria-hidden />
          Reset demo
        </button>
      </div>

      <div className="ra-demo__modes" aria-label="Choose demo experience">
        <button
          type="button"
          className={mode === 'chat' ? 'is-active' : undefined}
          aria-pressed={mode === 'chat'}
          onClick={() => setMode('chat')}
        >
          <MessageCircle size={16} aria-hidden />
          Chat
        </button>
        <button
          type="button"
          className={mode === 'order' ? 'is-active' : undefined}
          aria-pressed={mode === 'order'}
          onClick={() => setMode('order')}
        >
          <ShoppingBag size={16} aria-hidden />
          Order
          {cartCount > 0 ? <span className="ra-demo__count">{cartCount}</span> : null}
        </button>
        <button
          type="button"
          className={mode === 'reserve' ? 'is-active' : undefined}
          aria-pressed={mode === 'reserve'}
          onClick={() => setMode('reserve')}
        >
          <CalendarDays size={16} aria-hidden />
          Reserve
        </button>
      </div>

      {mode === 'chat' ? (
        <div className="ra-chat">
          <div className="ra-chat__messages" aria-live="polite" aria-busy={isReplying}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`ra-chat__message ra-chat__message--${message.role}`}
              >
                {message.role === 'assistant' ? (
                  <span className="ra-chat__bot-icon" aria-hidden>
                    <Sparkles size={14} />
                  </span>
                ) : null}
                <p>{message.text}</p>
              </div>
            ))}
            {isReplying ? (
              <div className="ra-chat__message ra-chat__message--assistant">
                <span className="ra-chat__bot-icon" aria-hidden>
                  <Sparkles size={14} />
                </span>
                <span className="ra-chat__typing" aria-label="Aira is typing">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            ) : null}
          </div>

          <div className="ra-chat__quick" aria-label="Suggested questions">
            {QUICK_PROMPTS.map((prompt) => (
              <button key={prompt} type="button" onClick={() => submitMessage(prompt)}>
                {prompt}
              </button>
            ))}
          </div>

          <form
            className="ra-chat__composer"
            onSubmit={(event) => {
              event.preventDefault();
              submitMessage();
            }}
          >
            <label className="sr-only" htmlFor="restaurant-ai-message">
              Ask Aira about the restaurant
            </label>
            <input
              id="restaurant-ai-message"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about menu, allergies, or bookings…"
              autoComplete="off"
            />
            <button type="submit" aria-label="Send message" disabled={!input.trim() || isReplying}>
              <Send size={17} aria-hidden />
            </button>
          </form>
        </div>
      ) : null}

      {mode === 'order' ? (
        <div className="ra-order">
          <div className="ra-order__intro">
            <span>
              <ChefHat size={17} aria-hidden />
            </span>
            <div>
              <strong>AI-curated dinner picks</strong>
              <p>Vegetarian · balanced spice · ready in 25–30 min</p>
            </div>
          </div>

          <ul className="ra-order__menu">
            {MENU.map((item) => {
              const quantity = cart[item.id] ?? 0;
              return (
                <li key={item.id}>
                  <div>
                    <span className="ra-order__badge">{item.badge}</span>
                    <strong>{item.name}</strong>
                    <p>{item.description}</p>
                    <b>₹{item.price}</b>
                  </div>
                  <div className="ra-order__stepper" aria-label={`${item.name} quantity`}>
                    <button
                      type="button"
                      aria-label={`Remove one ${item.name}`}
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={quantity === 0}
                    >
                      <Minus size={14} aria-hidden />
                    </button>
                    <output aria-live="polite">{quantity}</output>
                    <button
                      type="button"
                      aria-label={`Add one ${item.name}`}
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus size={14} aria-hidden />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="ra-order__summary">
            <span>
              <small>{cartCount} items</small>
              <strong>₹{cartTotal}</strong>
            </span>
            <button type="button" disabled={cartCount === 0} onClick={() => setOrderPlaced(true)}>
              {orderPlaced ? (
                <Check size={16} aria-hidden />
              ) : (
                <ShoppingBag size={16} aria-hidden />
              )}
              {orderPlaced ? 'Demo order placed' : 'Place demo order'}
            </button>
          </div>
        </div>
      ) : null}

      {mode === 'reserve' ? (
        <form
          className="ra-reserve"
          onSubmit={(event) => {
            event.preventDefault();
            if (date) setBookingConfirmed(true);
          }}
        >
          <div className="ra-reserve__header">
            <span aria-hidden>
              <CalendarDays size={20} />
            </span>
            <div>
              <strong>Reserve your table</strong>
              <p>Instant confirmation · free cancellation</p>
            </div>
          </div>

          <div className="ra-reserve__field">
            <span className="ra-reserve__label">
              <Users size={15} aria-hidden />
              Guests
            </span>
            <div className="ra-reserve__guest-stepper">
              <button
                type="button"
                aria-label="Decrease guest count"
                onClick={() => setGuests((current) => Math.max(1, current - 1))}
                disabled={guests === 1}
              >
                <ChevronLeft size={17} aria-hidden />
              </button>
              <output aria-live="polite">
                {guests} {guests === 1 ? 'guest' : 'guests'}
              </output>
              <button
                type="button"
                aria-label="Increase guest count"
                onClick={() => setGuests((current) => Math.min(12, current + 1))}
                disabled={guests === 12}
              >
                <ChevronRight size={17} aria-hidden />
              </button>
            </div>
          </div>

          <div className="ra-reserve__grid">
            <label>
              <span>Date</span>
              <input
                type="date"
                required
                value={date}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(event) => {
                  setDate(event.target.value);
                  setBookingConfirmed(false);
                }}
              />
            </label>
            <fieldset>
              <legend>Available times</legend>
              <div className="ra-reserve__times">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={time === slot ? 'is-selected' : undefined}
                    aria-pressed={time === slot}
                    onClick={() => {
                      setTime(slot);
                      setBookingConfirmed(false);
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <button type="submit" className="ra-reserve__submit">
            {bookingConfirmed ? (
              <Check size={17} aria-hidden />
            ) : (
              <CalendarDays size={17} aria-hidden />
            )}
            {bookingConfirmed ? `Table held for ${time}` : 'Confirm demo reservation'}
          </button>
        </form>
      ) : null}
    </div>
  );
}
