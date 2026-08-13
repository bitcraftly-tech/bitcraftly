'use client';

import { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    role: 'bot' as const,
    text: "Namaste! I'm Tasting Desk AI for Zaika Kitchen — English ya Hinglish dono chalega. Aaj chef's special kya try karoge?",
    time: '10:02',
  },
  {
    role: 'user' as const,
    text: 'Weekend brunch timing aur veg thali price?',
    time: '10:03',
  },
  {
    role: 'bot' as const,
    text: 'Brunch Sat–Sun 11 AM–3 PM. Veg weekend thali ₹380 — dal makhani, seasonal sabzi, bread basket & dessert bite included.',
    time: '10:03',
  },
] as const;

const DISH_SUGGESTIONS = [
  { name: "Chef's tandoor platter", tag: 'High margin · pair wine list', price: '₹720' },
  { name: 'Jackfruit galouti sliders', tag: 'Vegan upsell · IG-ready', price: '₹340' },
  { name: 'Burnt chilli garlic noodles', tag: 'Late-night orders spike', price: '₹290' },
] as const;

const QUICK_CHIPS = ['Book table · 4 guests', "Today's specials", 'Delivery ETA', 'Veg thali'] as const;

/**
 * Interactive chat specimen for the restaurant AI showcase.
 */
export default function RestaurantChatDemoPanel() {
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<
    readonly { role: 'bot' | 'user'; text: string; time: string }[]
  >(INITIAL_MESSAGES);

  function sendDemo() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const now = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    setMsgs((current) => [...current, { role: 'user', text: trimmed, time: now }]);
    setInput('');
    window.setTimeout(() => {
      setMsgs((current) => [
        ...current,
        {
          role: 'bot',
          text: 'Demo mode — on production we route this to your POS / WhatsApp handoff with guardrails. Try asking about table booking!',
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }),
        },
      ]);
    }, 650);
  }

  return (
    <div id="demo-chat" className="td-ai-chat scroll-mt-28">
      <div className="td-ai-chat__bar">
        <div className="td-ai-chat__brand">
          <span className="td-ai-chat__avatar" aria-hidden>
            <Bot className="h-5 w-5" />
          </span>
          <div>
            <p className="td-ai-chat__name">Zaika Kitchen · AI host</p>
            <p className="td-ai-chat__status">Online · avg reply &lt; 12s · fictional demo</p>
          </div>
        </div>
        <span className="td-ai-chat__live">Live preview</span>
      </div>

      <div className="td-ai-chat__body">
        <div className="td-ai-chat__thread">
          <div className="td-ai-chat__messages" aria-live="polite">
            {msgs.map((msg, index) =>
              msg.role === 'bot' ? (
                <div key={`${msg.time}-${index}`} className="flex gap-3">
                  <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-200">
                    <Sparkles className="h-4 w-4" aria-hidden />
                  </span>
                  <div className="td-ai-chat__bubble td-ai-chat__bubble--bot">
                    {msg.text}
                    <p className="td-ai-chat__time">{msg.time}</p>
                  </div>
                </div>
              ) : (
                <div key={`${msg.time}-${index}`} className="td-ai-chat__bubble td-ai-chat__bubble--user">
                  {msg.text}
                  <p className="td-ai-chat__time" style={{ textAlign: 'right' }}>
                    {msg.time}
                  </p>
                </div>
              ),
            )}
          </div>

          <div className="td-ai-chat__composer">
            <div className="td-ai-chat__chips" aria-label="Quick prompts">
              {QUICK_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="td-ai-chat__chip"
                  onClick={() => setInput(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>
            <div className="td-ai-chat__row">
              <label className="sr-only" htmlFor="td-ai-chat-input">
                Ask the restaurant assistant
              </label>
              <input
                id="td-ai-chat-input"
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') sendDemo();
                }}
                placeholder="Ask menu, timings, booking…"
                className="td-ai-chat__input"
              />
              <button
                type="button"
                onClick={sendDemo}
                className="td-ai-chat__send"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        <aside className="td-ai-chat__upsells">
          <p className="td-ai-chat__upsells-label">Suggested upsells</p>
          <ul className="td-ai-chat__upsell-list">
            {DISH_SUGGESTIONS.map((dish) => (
              <li key={dish.name} className="td-ai-chat__upsell">
                <strong>{dish.name}</strong>
                <span>{dish.tag}</span>
                <em>{dish.price}</em>
              </li>
            ))}
          </ul>
          <p className="td-ai-chat__note">
            Sidebar mirrors POS-linked recommendation rails — hero SKUs rotate by inventory and
            margin rules.
          </p>
        </aside>
      </div>
    </div>
  );
}
