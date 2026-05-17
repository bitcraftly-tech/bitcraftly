"use client";

import { useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";

const INITIAL_MESSAGES = [
  {
    role: "bot" as const,
    text: "Namaste! I'm Zaika Kitchen's assistant — English ya Hinglish dono chalega. Aaj chef's special kya try karoge?",
    time: "10:02",
  },
  {
    role: "user" as const,
    text: "Weekend brunch timing aur veg thali price?",
    time: "10:03",
  },
  {
    role: "bot" as const,
    text: "Brunch Sat–Sun 11 AM–3 PM. Veg weekend thali ₹380 — dal makhani, seasonal sabzi, bread basket & dessert bite included.",
    time: "10:03",
  },
];

const DISH_SUGGESTIONS = [
  { name: "Chef's tandoor platter", tag: "High margin · pair wine list", price: "₹720" },
  { name: "Jackfruit galouti sliders", tag: "Vegan upsell · IG-ready", price: "₹340" },
  { name: "Burnt chilli garlic noodles", tag: "Late-night orders spike", price: "₹290" },
] as const;

export default function RestaurantChatDemoPanel() {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState(INITIAL_MESSAGES);

  function sendDemo() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
    setMsgs((m) => [...m, { role: "user", text: trimmed, time: now }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [
        ...m,
        {
          role: "bot",
          text: "Demo mode — on production we route this to your POS / WhatsApp handoff with guardrails. Try asking table booking!",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
        },
      ]);
    }, 650);
  }

  return (
    <div id="demo-chat" className="scroll-mt-28 lg:col-span-7">
      <div className="overflow-hidden rounded-2xl border border-violet-500/35 bg-[#070612] shadow-[0_0_60px_-15px_rgba(139,92,246,0.45)] ring-1 ring-violet-400/15">
        <div className="flex items-center justify-between border-b border-slate-200/80 bg-gradient-to-r from-violet-50/90 via-[#0c0818] to-slate-100 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/25 text-violet-800 ring-1 ring-violet-400/30">
              <Bot className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Zaika Kitchen · AI host</p>
              <p className="text-[11px] text-emerald-300/90">Online · avg reply &lt; 12s · fictional demo</p>
            </div>
          </div>
          <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-violet-100">
            Live preview
          </span>
        </div>

        <div className="grid gap-0 lg:grid-cols-[1fr_220px]">
          <div className="flex max-h-[min(520px,70vh)] flex-col border-b border-slate-200/80 lg:border-b-0 lg:border-r lg:border-slate-200/80">
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-4">
              {msgs.map((msg, i) =>
                msg.role === "bot" ? (
                  <div key={i} className="flex gap-3">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-600/30 text-violet-100">
                      <Sparkles className="h-4 w-4" aria-hidden />
                    </span>
                    <div className="max-w-[92%] rounded-2xl rounded-tl-md border border-violet-500/25 bg-violet-950/40 px-4 py-3 text-sm leading-relaxed text-white/90 shadow-inner shadow-violet-900/20">
                      {msg.text}
                      <p className="mt-2 text-[10px] font-medium text-white/35">{msg.time}</p>
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[88%] rounded-2xl rounded-tr-md border border-slate-200/80 bg-white/[0.07] px-4 py-3 text-sm leading-relaxed text-white">
                      {msg.text}
                      <p className="mt-2 text-right text-[10px] font-medium text-white/35">{msg.time}</p>
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className="border-t border-slate-200/80 bg-white/80 p-3">
              <div className="mb-2 flex flex-wrap gap-2">
                {["Book table · 4 guests", "Today's specials", "Delivery ETA"].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setInput(chip)}
                    className="rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-[11px] font-medium text-violet-100 transition hover:bg-violet-500/20"
                  >
                    {chip}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendDemo()}
                  placeholder="Ask menu, timings, booking…"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200/80 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none ring-violet-500/0 transition placeholder:text-white/35 focus:border-violet-500/45 focus:ring-2 focus:ring-violet-500/20"
                />
                <button
                  type="button"
                  onClick={sendDemo}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>

          <aside className="bg-[#05040d] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">Suggested upsells</p>
            <ul className="mt-4 space-y-3">
              {DISH_SUGGESTIONS.map((d) => (
                <li key={d.name} className="rounded-lg border border-slate-200/80 bg-white/[0.04] p-3">
                  <p className="text-xs font-semibold text-white">{d.name}</p>
                  <p className="mt-1 text-[10px] leading-snug text-white/50">{d.tag}</p>
                  <p className="mt-2 font-mono text-[11px] font-semibold text-emerald-300/90">{d.price}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[10px] leading-relaxed text-white/35">
              Sidebar mirrors POS-linked recommendation rails — hero SKUs rotate by inventory & margin rules.
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}
