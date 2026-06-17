"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { X, Send, ChevronDown } from "lucide-react";

/* ─── Male Robot Avatar SVG ─────────────────────────── */
function ManBotAvatar({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <circle cx="40" cy="40" r="38" fill="url(#bcBotGrad)" />
      {/* Head */}
      <rect x="19" y="16" width="42" height="36" rx="13" fill="#fff" />
      {/* Top antenna */}
      <rect x="37" y="6" width="6" height="12" rx="3" fill="#818cf8" />
      <circle cx="40" cy="5" r="4" fill="#6366f1" />
      <circle cx="40" cy="5" r="2" fill="#a5b4fc" />
      {/* Ear bolts */}
      <rect x="15" y="28" width="6" height="12" rx="3" fill="#c7d2fe" />
      <rect x="59" y="28" width="6" height="12" rx="3" fill="#c7d2fe" />
      <circle cx="18" cy="34" r="2.5" fill="#6366f1" />
      <circle cx="62" cy="34" r="2.5" fill="#6366f1" />
      {/* Eyes — rectangular visor style */}
      <rect x="25" y="28" width="12" height="9" rx="4" fill="#1e1b4b" />
      <rect x="43" y="28" width="12" height="9" rx="4" fill="#1e1b4b" />
      {/* Eye glow */}
      <rect x="27" y="30" width="8" height="5" rx="2.5" fill="#818cf8" opacity="0.9" />
      <rect x="45" y="30" width="8" height="5" rx="2.5" fill="#818cf8" opacity="0.9" />
      {/* Eye shine dots */}
      <circle cx="33" cy="31.5" r="1.5" fill="#fff" opacity="0.8" />
      <circle cx="51" cy="31.5" r="1.5" fill="#fff" opacity="0.8" />
      {/* Mouth — LED panel */}
      <rect x="28" y="42" width="24" height="6" rx="3" fill="#e0e7ff" />
      <rect x="30" y="43.5" width="4" height="3" rx="1.5" fill="#6366f1" />
      <rect x="36" y="43.5" width="4" height="3" rx="1.5" fill="#818cf8" />
      <rect x="42" y="43.5" width="4" height="3" rx="1.5" fill="#6366f1" />
      {/* Body */}
      <rect x="26" y="50" width="28" height="18" rx="9" fill="#e0e7ff" />
      {/* Chest panel */}
      <rect x="33" y="55" width="14" height="8" rx="3" fill="#c7d2fe" />
      <circle cx="37" cy="59" r="2" fill="#6366f1" />
      <circle cx="43" cy="59" r="2" fill="#818cf8" />
      <defs>
        <radialGradient id="bcBotGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ede9fe" />
          <stop offset="100%" stopColor="#c7d2fe" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ─── Knowledge base ─────────────────────────────────── */
type QuickReply = { label: string; value: string };
type BotReply   = { text: string; quick?: QuickReply[] };

const QUICK_DEFAULT: QuickReply[] = [
  { label: "💰 Pricing",      value: "pricing" },
  { label: "✨ Services",     value: "services" },
  { label: "🖼️ Portfolio",   value: "portfolio" },
  { label: "📞 Contact",      value: "contact" },
];

function getBotReply(input: string, history: string[]): BotReply {
  const q    = input.toLowerCase().trim();
  const prev = history.join(" ").toLowerCase();

  /* Greeting */
  if (/^(hi|hello|hey|namaste|helo|hii|hy|good morning|good evening)\b/.test(q)) {
    const greets = [
      "Hello! 👋 I'm Bit — Bitcraftly's AI assistant. Looking for a website or frontend solution? I can help with pricing, services, portfolio and more!",
      "Namaste! 🙏 Main Bitcraftly ka AI assistant hun. React/Next.js websites, pricing, ya kuch aur — poochho!",
      "Hey there! ✨ Welcome to Bitcraftly. I'm here to help you figure out your web project — services, cost, timeline. What's on your mind?",
    ];
    return { text: greets[Math.floor(Math.random() * greets.length)], quick: QUICK_DEFAULT };
  }

  /* Pricing */
  if (/price|pricing|cost|kitna|fee|budget|rupee|rs\.|₹|package|packages|rate/.test(q))
    return {
      text: "Bitcraftly packages start from ₹8,999! 🎯\n\nOur packages:\n💼 Starter — ₹8,999\n🚀 Growth — ₹18,999\n⚡ Pro — ₹34,999\n🏢 Enterprise — Custom\n\nAll packages include written scope before payment, mobile-first design, and SEO-ready structure.\n\nWant a detailed estimate for your specific project?",
      quick: [
        { label: "🧮 Cost calculator", value: "cost calculator" },
        { label: "✨ What's included",  value: "what is included" },
        { label: "📞 Talk to founder",  value: "contact" },
      ],
    };

  /* Cost calculator */
  if (/calculat|estimate|quote/.test(q))
    return {
      text: "Our 2-minute cost calculator gives you an instant estimate! 🧮\n\nJust visit bitcraftly.com and click 'Calculate cost' — you'll get a price range based on your project type, features, and hosting needs.\n\nNo obligation, no spam. Written quote only after you approve the scope. 😊",
      quick: [
        { label: "💰 Pricing",     value: "pricing" },
        { label: "📞 Contact",     value: "contact" },
      ],
    };

  /* Services */
  if (/service|services|kya karte|kya banate|build|develop|offer/.test(q))
    return {
      text: "Bitcraftly builds premium frontend solutions: 🛠️\n\n🌐 Business Websites (React/Next.js)\n📱 Mobile-first Web Apps\n🤖 AI-powered Features\n🛒 E-commerce Stores\n📊 Dashboards & SaaS UIs\n🚀 Fast-launch MVPs\n\nEvery project is founder-led by Sanjay — 18+ years of experience, SEO-ready, and mobile-first.",
      quick: [
        { label: "💰 Pricing",     value: "pricing" },
        { label: "🖼️ Portfolio",  value: "portfolio" },
        { label: "📞 Get quote",   value: "contact" },
      ],
    };

  /* Portfolio */
  if (/portfolio|work|project|example|demo|client|showcase|previous/.test(q))
    return {
      text: "Our portfolio has live client projects and interactive demos! 🖼️\n\n✅ Shrishti Cloud Kitchen — WhatsApp-ready menu\n✅ Swastik Makhana — D2C e-commerce brand\n✅ Gym Website demo\n✅ School Website demo\n✅ E-commerce Store demo\n\nAll with full case studies — challenge, solution, and tech stack. Visit bitcraftly.com/portfolio to explore!",
      quick: [
        { label: "💰 Pricing",    value: "pricing" },
        { label: "✨ Services",   value: "services" },
        { label: "📞 Contact",    value: "contact" },
      ],
    };

  /* What is included / features */
  if (/includ|feature|what do you|kya milega|kya milta|deliverable/.test(q))
    return {
      text: "Every Bitcraftly project includes: ✅\n\n📱 Mobile-first responsive design\n🔍 SEO-ready page structure\n⚡ Fast load times (Core Web Vitals)\n📝 Written scope before payment\n🤝 Founder-direct communication\n🔄 Revision rounds\n🚀 Deployment support\n\nNo lock-in templates — everything is custom-built.",
      quick: [
        { label: "💰 Pricing",   value: "pricing" },
        { label: "📞 Get quote", value: "contact" },
      ],
    };

  /* Timeline / duration */
  if (/timeline|time|kitne din|delivery|when|kab|days|weeks|duration/.test(q))
    return {
      text: "Project timelines at Bitcraftly: ⏱️\n\n🚀 Landing pages — 3–5 days\n🌐 Business websites — 1–2 weeks\n🛒 E-commerce stores — 2–3 weeks\n📊 Custom dashboards — 2–4 weeks\n\nWe start only after written scope approval — no surprises! Same-day reply on WhatsApp 10 AM–9 PM IST.",
      quick: [
        { label: "💰 Pricing",    value: "pricing" },
        { label: "📞 WhatsApp",   value: "whatsapp" },
      ],
    };

  /* Technology / stack */
  if (/tech|stack|react|next\.?js|nextjs|tailwind|typescript|framework|tool/.test(q))
    return {
      text: "Our core tech stack: ⚛️\n\n⚛️ React.js & Next.js\n🎨 Tailwind CSS\n📘 TypeScript\n🗄️ PostgreSQL + Prisma\n💳 Stripe / Razorpay\n🤖 OpenAI / Gemini AI\n☁️ Vercel deployment\n\nModern, scalable, and maintainable — no outdated page builders!",
      quick: [
        { label: "✨ Services",   value: "services" },
        { label: "💰 Pricing",   value: "pricing" },
      ],
    };

  /* Founder / About */
  if (/founder|sanjay|about|who|kaun|experience|team|background/.test(q))
    return {
      text: "Bitcraftly is led by Sanjay Kr. Singh 👨‍💻\n\n✅ 18+ years frontend experience\n✅ React & Next.js specialist\n✅ Built UI systems for startups, clinics, SaaS, and local brands\n✅ Ghaziabad, UP, India — available India & remote\n\nSeedha founder se baat — no middleman, no agency overhead. 🤝",
      quick: [
        { label: "📞 Talk to Sanjay", value: "contact" },
        { label: "🖼️ Portfolio",     value: "portfolio" },
      ],
    };

  /* WhatsApp */
  if (/whatsapp|whats app|wa\.me|message/.test(q))
    return {
      text: "WhatsApp pe Sanjay se directly baat karein! 📱\n\n📞 +91 96677 10954\n🕙 Available: 10:00 AM – 9:00 PM IST\n\nEnglish ya Hinglish — dono chalega! Same-day reply guaranteed. 😊",
      quick: [
        { label: "📧 Email instead",  value: "email" },
        { label: "💰 Pricing first",  value: "pricing" },
      ],
    };

  /* Email */
  if (/email|mail|hello@/.test(q))
    return {
      text: "Email karein Sanjay ko: ✉️\n\nhello@bitcraftly.com\n\nSame-day reply milega. Project brief, budget, aur timeline mention karein — detailed response milega! 📋",
      quick: [
        { label: "📱 WhatsApp",   value: "whatsapp" },
        { label: "💰 Pricing",    value: "pricing" },
      ],
    };

  /* Contact */
  if (/contact|reach|phone|call|number|location|address|ghaziabad/.test(q))
    return {
      text: "Bitcraftly se contact karein: 📬\n\n📱 WhatsApp: +91 96677 10954\n✉️ Email: hello@bitcraftly.com\n📍 Ghaziabad, UP, India\n🌐 bitcraftly.com\n\n⏰ Available: 10 AM – 9 PM IST, Mon–Sat\n\nFree 15-minute consultation available — no pressure! 🙌",
      quick: [
        { label: "💰 Pricing",    value: "pricing" },
        { label: "🧮 Get estimate", value: "estimate" },
      ],
    };

  /* AI features */
  if (/ai|artificial intelligence|chatbot|openai|gemini|automation/.test(q))
    return {
      text: "Haan, Bitcraftly AI integration bhi karta hai! 🤖\n\n✅ AI chatbots (like this one!)\n✅ Smart search features\n✅ Content generation tools\n✅ Lead qualification bots\n✅ OpenAI & Gemini integrations\n\nAI sirf wahan use hoti hai jahan actually value add ho — not just for show. 😊",
      quick: [
        { label: "💰 Pricing",   value: "pricing" },
        { label: "📞 Discuss",   value: "contact" },
      ],
    };

  /* Thank you */
  if (/thank|thanks|shukriya|ok|done|bye|goodbye|got it|perfect|great/.test(q))
    return {
      text: "You're welcome! 😊 All the best with your web project!\n\nIf you need anything — pricing, portfolio, or just want to chat about your idea — I'm always here. 🚀\n\nBitcraftly — Seedha founder se baat! 🤝",
      quick: [
        { label: "💰 Pricing",   value: "pricing" },
        { label: "📞 Contact",   value: "contact" },
      ],
    };

  /* Context follow-up */
  if ((prev.includes("pric") || prev.includes("cost")) && /aur|more|detail|batao|tell/.test(q))
    return {
      text: "Pricing ke baare me aur detail chahiye? 😊\n\nSabse best approach hai — apna project briefly describe karein (type, features, deadline) aur main ek rough estimate de sakta hun. Ya directly calculator use karein bitcraftly.com pe!",
      quick: [
        { label: "🧮 Calculator",  value: "cost calculator" },
        { label: "📞 WhatsApp",    value: "whatsapp" },
      ],
    };

  /* Default */
  return {
    text: "Thoda clearly poochhen — main samjhunga! 😊\n\nMain in topics pe help kar sakta hun:\n\n• Website pricing & packages\n• Services & tech stack\n• Portfolio & case studies\n• Timeline & process\n• Contact & consultation\n\nKya jaanna chahte hain?",
    quick: QUICK_DEFAULT,
  };
}

/* ─── Types ──────────────────────────────────────────── */
type Msg = {
  id: number;
  from: "bot" | "user";
  text: string;
  displayText: string;
  streaming: boolean;
  time: string;
  quick?: QuickReply[];
};

function nowTime() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

/* ─── Main component ─────────────────────────────────── */
export default function BitcraftlyChat() {
  const pathname = usePathname();

  /* Hide on interactive demo pages and portfolio showcase pages */
  const isExcluded =
    pathname?.startsWith("/interactive-demos") ||
    pathname?.startsWith("/portfolio");

  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState<Msg[]>([]);
  const [input, setInput]     = useState("");
  const [thinking, setThink]  = useState(false);
  const [unread, setUnread]   = useState(1);
  const [greeted, setGreeted] = useState(false);
  const [mounted, setMounted]   = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);
  const inputRef              = useRef<HTMLInputElement>(null);
  const msgId                 = useRef(0);
  const history               = useRef<string[]>([]);

  const scrollBottom = () => requestAnimationFrame(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }));

  const streamMsg = useCallback((id: number, fullText: string, quick?: QuickReply[]) => {
    let i = 0;
    const speed = Math.max(10, Math.min(25, 2800 / fullText.length));
    const tick = () => {
      i++;
      setMsgs(prev => prev.map(m => m.id === id ? { ...m, displayText: fullText.slice(0, i), streaming: i < fullText.length } : m));
      scrollBottom();
      if (i < fullText.length) setTimeout(tick, speed);
      else {
        if (quick) setMsgs(prev => prev.map(m => m.id === id ? { ...m, quick } : m));
        setTimeout(scrollBottom, 50);
      }
    };
    setTimeout(tick, speed);
  }, []);

  const addBotMsg = useCallback((reply: BotReply) => {
    const id = ++msgId.current;
    setMsgs(prev => [...prev, { id, from: "bot", text: reply.text, displayText: "", streaming: true, time: nowTime() }]);
    streamMsg(id, reply.text, reply.quick);
  }, [streamMsg]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      setUnread(0);
      setTimeout(() => {
        addBotMsg({
          text: "Hello! 👋 I'm Bit — your Bitcraftly AI assistant.\n\nWebsite banana hai? Main pricing, services, portfolio sab me help kar sakta hun. Poochho! 🚀",
          quick: QUICK_DEFAULT,
        });
      }, 450);
    }
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 300); }
  }, [open, greeted, addBotMsg]);

  useEffect(() => { scrollBottom(); }, [msgs, thinking]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || thinking) return;
    const userMsg: Msg = { id: ++msgId.current, from: "user", text: text.trim(), displayText: text.trim(), streaming: false, time: nowTime() };
    setMsgs(prev => [...prev, userMsg]);
    setInput("");
    history.current = [...history.current.slice(-6), text.trim()];
    setThink(true);
    setTimeout(() => {
      setThink(false);
      addBotMsg(getBotReply(text, history.current));
    }, 750 + Math.random() * 550);
  }, [thinking, addBotMsg]);

  if (isExcluded || !mounted) return null;

  return createPortal(
    <>
      {/* Bubble */}
      <button
        className={`bc-chat-bubble${open ? " bc-chat-bubble--open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close Bitcraftly chat" : "Chat with Bitcraftly AI"}
      >
        {open
          ? <ChevronDown size={22} color="#fff" />
          : <ManBotAvatar size={44} className="bc-chat-bubble-avatar" />
        }
        {!open && unread > 0 && <span className="bc-chat-badge">{unread}</span>}
      </button>

      {/* Panel */}
      <div className={`bc-chat-panel${open ? " bc-chat-panel--open" : ""}`} role="dialog" aria-label="Bitcraftly AI Chat">

        {/* Header */}
        <div className="bc-chat-header">
          <div className="bc-chat-header-avatar"><ManBotAvatar size={44} /></div>
          <div className="bc-chat-header-info">
            <p className="bc-chat-header-name">Bit — AI Assistant</p>
            <span className="bc-chat-header-status">
              <span className="bc-chat-online-dot" />
              Bitcraftly · Always online
            </span>
          </div>
          <button className="bc-chat-close" onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button>
        </div>

        {/* Messages */}
        <div className="bc-chat-body">
          {msgs.length === 0 && !thinking && (
            <div className="bc-chat-welcome">
              <div className="bc-chat-welcome-icon">🤖</div>
              <p>Ask me anything about Bitcraftly — pricing, services, portfolio, or just say hi!</p>
            </div>
          )}

          {msgs.map(msg => (
            <div key={msg.id} className={`bc-chat-msg bc-chat-msg--${msg.from}`}>
              {msg.from === "bot" && (
                <div className="bc-chat-msg-avatar"><ManBotAvatar size={28} /></div>
              )}
              <div className="bc-chat-msg-wrap">
                <div className="bc-chat-msg-bubble">
                  {msg.displayText.split("\n").map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                  {msg.streaming && <span className="bc-chat-cursor" aria-hidden>▋</span>}
                </div>
                {!msg.streaming && <span className="bc-chat-msg-time">{msg.time}</span>}
                {!msg.streaming && msg.quick && (
                  <div className="bc-chat-quick">
                    {msg.quick.map(q => (
                      <button key={q.value} className="bc-chat-quick-btn" onClick={() => sendMessage(q.value)}>
                        {q.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {thinking && (
            <div className="bc-chat-msg bc-chat-msg--bot">
              <div className="bc-chat-msg-avatar"><ManBotAvatar size={28} /></div>
              <div className="bc-chat-msg-wrap">
                <div className="bc-chat-thinking">
                  <span className="bc-chat-thinking-label">Bit is thinking</span>
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="bc-chat-footer">
          <input
            ref={inputRef}
            className="bc-chat-input"
            type="text"
            placeholder="Ask anything…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            maxLength={300}
            aria-label="Chat message"
          />
          <button className="bc-chat-send" onClick={() => sendMessage(input)} disabled={!input.trim() || thinking} aria-label="Send">
            <Send size={15} />
          </button>
        </div>

        <div className="bc-chat-powered">✨ AI Assistant · <strong>Bitcraftly</strong></div>
      </div>
    </>,
    document.body,
  );
}
