"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { X, Send, ChevronDown, RotateCcw } from "lucide-react";
import { BitBotAvatar, BitBotChatTrigger } from "@/components/chat/BitBotMascot";
import { lockBodyScrollForChat, unlockBodyScrollForChat } from "@/lib/scrollLock";
import {
  type ChatMemory,
  type StoredMsg,
  type QuickReply,
  loadChatMemory,
  saveChatMemory,
  clearChatMemory,
  extractFromUserMessage,
  recordVisit,
  hasCompleteLead,
  hasCompletedOnboarding,
  isGreetingMessage,
  parseOnboardingName,
  wantsToSkipOnboarding,
  EMPTY_MEMORY,
} from "@/lib/bitcraftlyChatMemory";

const NAME_PROMPTS = [
  "Please apna *name* batayein — bas first name kaafi hai (e.g. Rahul).",
  "Apna naam share kijiye taaki main aapko personally help kar sakun. Example: *Priya*",
  "Quick help ke liye apna name bhej dijiye (e.g. *Amit*). Ya *skip* likh kar baad mein bhi de sakte hain.",
];
type BotReply = { text: string; quick?: QuickReply[] };

const QUICK_DEFAULT: QuickReply[] = [
  { label: "💰 Pricing",      value: "pricing" },
  { label: "✨ Services",     value: "services" },
  { label: "🖼️ Portfolio",   value: "portfolio" },
  { label: "📞 Contact",      value: "contact" },
];

function getBotReply(input: string, history: string[], memory: ChatMemory): BotReply {
  const q    = input.toLowerCase().trim();
  const prev = history.join(" ").toLowerCase();
  const name = memory.userName;
  const hi   = name ? `${name}, ` : "";

  /* Greeting — memory-aware */
  if (/^(hi|hello|hey|namaste|helo|hii|hy|good morning|good evening)\b/.test(q)) {
    if (name && memory.visitCount > 1) {
      const interestHint = memory.interests.length
        ? `\n\nPichli baar aapne ${memory.interests.slice(-2).join(" aur ")} ke baare me poocha tha — wahi continue karein ya kuch naya?`
        : "";
      const projectHint = memory.projectType
        ? `\n\nMujhe yaad hai aap ${memory.projectType} ke baare me interested the. 🙂`
        : "";
      return {
        text: `Welcome back, ${name}! 👋 Main Bit hun — aapka Bitcraftly assistant.${projectHint}${interestHint}`,
        quick: QUICK_DEFAULT,
      };
    }
    if (name) {
      return {
        text: `Hello ${name}! 👋 Great to chat again. Website, pricing, services — kya help chahiye aaj?`,
        quick: QUICK_DEFAULT,
      };
    }
    const greets = [
      "Hello! 👋 I'm Bit — Bitcraftly's AI assistant. Looking for a website or frontend solution? I can help with pricing, services, portfolio and more!",
      "Namaste! 🙏 Main Bitcraftly ka AI assistant hun. React/Next.js websites, pricing, ya kuch aur — poochho!",
      "Hey there! ✨ Welcome to Bitcraftly. I'm here to help you figure out your web project — services, cost, timeline. What's on your mind?",
    ];
    return { text: greets[Math.floor(Math.random() * greets.length)], quick: QUICK_DEFAULT };
  }

  /* Name introduction */
  if (/my name is|i am|i'm|mera naam|naam hai|call me/.test(q) && name) {
    return {
      text: `Nice to meet you, ${name}! 😊 Main yaad rakhunga.\n\nAb bataiye — aap kis type ki website ya project ke baare me soch rahe hain? Gym, school, e-commerce, ya kuch aur?`,
      quick: QUICK_DEFAULT,
    };
  }

  /* Pricing — project-aware */
  if (/price|pricing|cost|kitna|fee|budget|rupee|rs\.|₹|package|packages|rate/.test(q)) {
    const projectNote = memory.projectType
      ? `\n\nAapke ${memory.projectType} ke liye Growth ya Pro package usually best fit hota hai.`
      : "";
    return {
      text: `${hi}Bitcraftly packages start from ₹8,999! 🎯\n\nOur packages:\n💼 Starter — ₹8,999\n🚀 Growth — ₹18,999\n⚡ Pro — ₹34,999\n🏢 Enterprise — Custom\n\nAll packages include written scope before payment, mobile-first design, and SEO-ready structure.${projectNote}\n\nWant a detailed estimate for your specific project?`,
      quick: [
        { label: "🧮 Cost calculator", value: "cost calculator" },
        { label: "✨ What's included",  value: "what is included" },
        { label: "📞 Talk to founder",  value: "contact" },
      ],
    };
  }

  /* Cost calculator */
  if (/calculat|estimate|quote/.test(q))
    return {
      text: "Our 2-minute cost calculator gives you an instant estimate! 🧮\n\nJust visit bitcraftly.com and click 'Calculate cost' — you'll get a price range based on your project type, features, and hosting needs.\n\nNo obligation, no spam. Written quote only after you approve the scope. 😊",
      quick: [
        { label: "💰 Pricing",     value: "pricing" },
        { label: "📞 Contact",     value: "contact" },
      ],
    };

  /* Services — project-aware */
  if (/service|services|kya karte|kya banate|build|develop|offer/.test(q)) {
    const projectNote = memory.projectType
      ? `\n\n${memory.projectType} ke liye humne similar projects portfolio me bhi kiye hain — demo dekh sakte hain!`
      : "";
    return {
      text: `${hi}Bitcraftly builds premium frontend solutions: 🛠️\n\n🌐 Business Websites (React/Next.js)\n📱 Mobile-first Web Apps\n🤖 AI-powered Features\n🛒 E-commerce Stores\n📊 Dashboards & SaaS UIs\n🚀 Fast-launch MVPs\n\nEvery project is founder-led by Sanjay — 20+ years of experience, SEO-ready, and mobile-first.${projectNote}`,
      quick: [
        { label: "💰 Pricing",     value: "pricing" },
        { label: "🖼️ Portfolio",  value: "portfolio" },
        { label: "📞 Get quote",   value: "contact" },
      ],
    };
  }

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

  /* Founder / About — not bare first names like "sanjay" */
  if (
    /\b(founder|about|who|kaun|experience|team|background)\b/.test(q) ||
    /who is sanjay|about sanjay|sanjay singh/i.test(q)
  )
    return {
      text: "Bitcraftly is led by Sanjay Kr. Singh 👨‍💻\n\n✅ 20+ years frontend experience\n✅ React & Next.js specialist\n✅ Built UI systems for startups, clinics, SaaS, and local brands\n✅ Ghaziabad, UP, India — available India & remote\n\nSeedha founder se baat — no middleman, no agency overhead. 🤝",
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

  /* Thank you — memory-aware */
  if (/thank|thanks|shukriya|ok|done|bye|goodbye|got it|perfect|great/.test(q))
    return {
      text: name
        ? `You're welcome, ${name}! 😊 All the best with your web project!\n\nMain yaad rakhunga — jab bhi wapas aao, hum yahi se continue kar sakte hain. 🚀\n\nBitcraftly — Seedha founder se baat! 🤝`
        : "You're welcome! 😊 All the best with your web project!\n\nIf you need anything — pricing, portfolio, or just want to chat about your idea — I'm always here. 🚀\n\nBitcraftly — Seedha founder se baat! 🤝",
      quick: [
        { label: "💰 Pricing",   value: "pricing" },
        { label: "📞 Contact",   value: "contact" },
      ],
    };

  /* Context follow-up — uses memory interests */
  if (/aur|more|detail|batao|tell|continue|wapas|phir se/.test(q)) {
    const lastInterest = memory.interests[memory.interests.length - 1];
    if (lastInterest === "pricing" || prev.includes("pric") || prev.includes("cost"))
      return {
        text: `${hi}Pricing ke baare me aur detail chahiye? 😊\n\nSabse best approach hai — apna project briefly describe karein (type, features, deadline) aur main ek rough estimate de sakta hun. Ya directly calculator use karein bitcraftly.com pe!`,
        quick: [
          { label: "🧮 Calculator",  value: "cost calculator" },
          { label: "📞 WhatsApp",    value: "whatsapp" },
        ],
      };
    if (lastInterest === "portfolio")
      return {
        text: `${hi}Portfolio me gym, school, e-commerce, cloud kitchen — sab demos hain. Kisi specific industry ka demo chahiye?`,
        quick: [
          { label: "🖼️ Portfolio", value: "portfolio" },
          { label: "💰 Pricing",   value: "pricing" },
        ],
      };
  }

  /* Old context follow-up fallback */
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

function isDefaultBotReply(reply: BotReply): boolean {
  return reply.text.startsWith("Thoda clearly poochhen");
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

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function normalizePhone(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (/^[6-9]\d{9}$/.test(digits)) return digits;
  if (/^91[6-9]\d{9}$/.test(digits)) return digits.slice(2);
  return null;
}

function storedToMsg(s: StoredMsg): Msg {
  return { ...s, displayText: s.text, streaming: false };
}

function msgToStored(m: Msg): StoredMsg {
  return { id: m.id, from: m.from, text: m.text, time: m.time, quick: m.quick };
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
  const [greeted, setGreeted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [memory, setMemory]   = useState<ChatMemory>(EMPTY_MEMORY);
  const bottomRef             = useRef<HTMLDivElement>(null);
  const inputRef              = useRef<HTMLInputElement>(null);
  const msgId                 = useRef(0);
  const history               = useRef<string[]>([]);
  const memoryRef             = useRef<ChatMemory>(EMPTY_MEMORY);
  const visitRecorded         = useRef(false);

  const syncMemory = useCallback((next: ChatMemory) => {
    memoryRef.current = next;
    setMemory(next);
    saveChatMemory(next);
  }, []);

  const persistMessages = useCallback((nextMsgs: Msg[]) => {
    const stored = nextMsgs
      .filter(m => !m.streaming)
      .map(msgToStored);
    syncMemory({ ...memoryRef.current, messages: stored });
  }, [syncMemory]);

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
        setMsgs(prev => {
          const done = prev.map(m => m.id === id ? { ...m, quick, streaming: false, displayText: fullText } : m);
          persistMessages(done);
          return done;
        });
        setTimeout(scrollBottom, 50);
      }
    };
    setTimeout(tick, speed);
  }, [persistMessages]);

  const addBotMsg = useCallback((reply: BotReply) => {
    const id = ++msgId.current;
    setMsgs(prev => [...prev, { id, from: "bot", text: reply.text, displayText: "", streaming: true, time: nowTime() }]);
    streamMsg(id, reply.text, reply.quick);
  }, [streamMsg]);

  /* Load memory + restore conversation on mount */
  useEffect(() => {
    setMounted(true);
    const saved = loadChatMemory();
    const withVisit = visitRecorded.current ? saved : recordVisit(saved);
    visitRecorded.current = true;
    memoryRef.current = withVisit;
    syncMemory(withVisit);

    if (saved.messages.length > 0) {
      const restored = saved.messages.map(storedToMsg);
      msgId.current = Math.max(...restored.map(m => m.id), 0);
      history.current = restored.filter(m => m.from === "user").map(m => m.text).slice(-8);
      setMsgs(restored);
      setGreeted(saved.greeted || restored.length > 0);
    }

    setMemory(withVisit);
  }, [syncMemory]);

  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      const mem = memoryRef.current;
      setTimeout(() => {
        if (hasCompleteLead(mem) && mem.visitCount > 1) {
          addBotMsg({
            text: `Welcome back, ${mem.userName}! 👋 Main Bit hun — aapki pichli chat aur details yaad hain.\n\nKya continue karein ya naya project discuss karein?`,
            quick: QUICK_DEFAULT,
          });
        } else if (!mem.userName) {
          addBotMsg({
            text: "Hi! 👋 Start karne se pehle quick details de dijiye.\n\nPlease apna *name* batayein.",
          });
        } else if (!mem.userEmail) {
          addBotMsg({
            text: `Great ${mem.userName}! Ab apna *email* share kijiye taaki quote bhej sakein.`,
          });
        } else if (!mem.userPhone) {
          addBotMsg({
            text: "Perfect! Ab apna *phone number* bhejiye (10-digit) — founder callback ke liye.",
          });
        } else {
          addBotMsg({
            text: "Hello! 👋 I'm Bit — your Bitcraftly AI assistant.\n\nWebsite banana hai? Main pricing, services, portfolio sab me help kar sakta hun. Poochho! 🚀",
            quick: QUICK_DEFAULT,
          });
        }
        syncMemory({ ...memoryRef.current, greeted: true });
      }, 450);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, greeted, addBotMsg, syncMemory]);

  useEffect(() => { scrollBottom(); }, [msgs, thinking]);

  /* Mobile: sync panel to visual viewport when keyboard opens */
  useEffect(() => {
    const root = document.documentElement;
    root.toggleAttribute("data-bc-chat-open", open);

    if (!open || typeof window === "undefined") {
      root.style.removeProperty("--bc-chat-vvh");
      return;
    }

    const mobileMq = window.matchMedia("(max-width: 767px)");
    const vv = window.visualViewport;

    const syncViewport = () => {
      if (!mobileMq.matches || !vv) {
        root.style.removeProperty("--bc-chat-vvh");
        return;
      }
      root.style.setProperty("--bc-chat-vvh", `${vv.height}px`);
    };

    syncViewport();
    vv?.addEventListener("resize", syncViewport);
    vv?.addEventListener("scroll", syncViewport);
    mobileMq.addEventListener("change", syncViewport);

    return () => {
      root.removeAttribute("data-bc-chat-open");
      root.style.removeProperty("--bc-chat-vvh");
      vv?.removeEventListener("resize", syncViewport);
      vv?.removeEventListener("scroll", syncViewport);
      mobileMq.removeEventListener("change", syncViewport);
    };
  }, [open]);

  useEffect(() => {
    if (!open || typeof window === "undefined") return;

    const mobileMq = window.matchMedia("(max-width: 767px)");
    const syncLock = () => {
      if (mobileMq.matches) lockBodyScrollForChat();
      else unlockBodyScrollForChat();
    };

    syncLock();
    mobileMq.addEventListener("change", syncLock);

    return () => {
      mobileMq.removeEventListener("change", syncLock);
      unlockBodyScrollForChat();
    };
  }, [open]);

  const handleInputFocus = useCallback(() => {
    requestAnimationFrame(() => {
      inputRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      bottomRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
    });
  }, []);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || thinking) return;
    const trimmed = text.trim();
    const userMsg: Msg = { id: ++msgId.current, from: "user", text: trimmed, displayText: trimmed, streaming: false, time: nowTime() };
    setMsgs(prev => {
      const next = [...prev, userMsg];
      persistMessages(next);
      return next;
    });
    setInput("");
    history.current = [...history.current.slice(-8), trimmed];

    const memBefore = memoryRef.current;

    setThink(true);
    setTimeout(() => {
      setThink(false);
      let mem = memoryRef.current;

      if (!hasCompletedOnboarding(mem) && !mem.userName) {
        if (wantsToSkipOnboarding(trimmed)) {
          syncMemory({ ...mem, onboardingSkipped: true });
          addBotMsg({
            text: "Koi baat nahi! 🙂 Ab aap freely poochh sakte hain — pricing, services, portfolio, timeline...\n\nJab convenient ho, name/email/phone share kar dena.",
            quick: QUICK_DEFAULT,
          });
          return;
        }

        if (isGreetingMessage(trimmed)) {
          addBotMsg({
            text: "Hello! 👋 Main Bit hun — Bitcraftly ka AI assistant.\n\nShuru karne ke liye apna *name* bhej dijiye (e.g. Rahul). Ya pehle *pricing* / *services* poochh sakte hain — *skip* likh kar details baad mein bhi de sakte hain.",
            quick: [
              { label: "💰 Pricing", value: "pricing" },
              { label: "✨ Services", value: "services" },
              { label: "⏭️ Skip for now", value: "skip" },
            ],
          });
          return;
        }

        const topicReply = getBotReply(trimmed, history.current, mem);
        if (!isDefaultBotReply(topicReply)) {
          addBotMsg({
            text: `${topicReply.text}\n\n—\n\nJab ready hon, apna *name* share kar dena (e.g. Rahul) — ya *skip* likh dein.`,
            quick: topicReply.quick,
          });
          return;
        }

        const possibleName = parseOnboardingName(trimmed);
        if (possibleName) {
          mem = { ...mem, userName: possibleName, onboardingNameAttempts: 0 };
          syncMemory(mem);
          addBotMsg({
            text: `Nice to meet you, ${possibleName}! 😊 Ab apna *email* share kijiye.`,
          });
          return;
        }

        const attempts = mem.onboardingNameAttempts ?? 0;
        syncMemory({ ...mem, onboardingNameAttempts: attempts + 1 });
        addBotMsg({
          text: NAME_PROMPTS[attempts % NAME_PROMPTS.length],
          quick: [
            { label: "⏭️ Skip for now", value: "skip" },
            ...QUICK_DEFAULT.slice(0, 2),
          ],
        });
        return;
      }

      const extracted = extractFromUserMessage(trimmed, memBefore);
      if (Object.keys(extracted).length > 0) {
        mem = { ...memBefore, ...extracted };
        syncMemory(mem);
      } else {
        mem = memoryRef.current;
      }

      if (!hasCompletedOnboarding(mem)) {
        if (wantsToSkipOnboarding(trimmed)) {
          syncMemory({ ...mem, onboardingSkipped: true });
          addBotMsg({
            text: "Koi baat nahi! 🙂 Ab aap freely poochh sakte hain — pricing, services, portfolio, timeline...\n\nJab convenient ho, name/email/phone share kar dena.",
            quick: QUICK_DEFAULT,
          });
          return;
        }

        if (!mem.userEmail) {
          if (isGreetingMessage(trimmed)) {
            addBotMsg({
              text: `Hello ${mem.userName}! 👋 Jab ready hon, apna *email* bhej dijiye — ya *skip* likh kar aage badh sakte hain.`,
              quick: [{ label: "⏭️ Skip for now", value: "skip" }],
            });
            return;
          }

          const extractedEmail = extractFromUserMessage(trimmed, mem).userEmail;
          const email = isValidEmail(trimmed) ? trimmed.toLowerCase() : extractedEmail;
          if (email && isValidEmail(email)) {
            syncMemory({ ...mem, userEmail: email });
            addBotMsg({
              text: "Thanks! ✅ Ab apna *phone number* share kijiye (10-digit).",
            });
            return;
          }

          const topicReply = getBotReply(trimmed, history.current, mem);
          addBotMsg({
            text: `${topicReply.text}\n\n—\n\nQuote ke liye valid *email* bhejiye (e.g. name@gmail.com) — ya *skip* likh dein.`,
            quick: topicReply.quick,
          });
          return;
        }

        if (!mem.userPhone) {
          if (isGreetingMessage(trimmed)) {
            addBotMsg({
              text: `Hi ${mem.userName}! 👋 Callback ke liye 10-digit *phone number* bhejiye — ya *skip* likh kar chat continue karein.`,
              quick: [{ label: "⏭️ Skip for now", value: "skip" }],
            });
            return;
          }

          const phone = normalizePhone(trimmed);
          if (phone) {
            syncMemory({ ...mem, userPhone: phone });
            addBotMsg({
              text: `Done ${mem.userName}! 🎉 Your details saved:\n\n• Name: ${mem.userName}\n• Email: ${mem.userEmail}\n• Phone: ${phone}\n\nAb aap kuch bhi poochh sakte hain — pricing, services, portfolio, timeline...`,
              quick: QUICK_DEFAULT,
            });
            return;
          }

          const topicReply = getBotReply(trimmed, history.current, mem);
          addBotMsg({
            text: `${topicReply.text}\n\n—\n\nFounder callback ke liye valid *phone* bhejiye (10-digit) — ya *skip* likh dein.`,
            quick: topicReply.quick,
          });
          return;
        }
      }

      addBotMsg(getBotReply(trimmed, history.current, mem));
    }, 750 + Math.random() * 550);
  }, [thinking, addBotMsg, persistMessages, syncMemory]);

  const handleClearChat = useCallback(() => {
    const cleared = clearChatMemory();
    const withVisit = recordVisit(cleared);
    memoryRef.current = withVisit;
    setMemory(withVisit);
    setMsgs([]);
    setGreeted(false);
    history.current = [];
    msgId.current = 0;
  }, []);

  if (isExcluded || !mounted) return null;

  return createPortal(
    <>
      {/* Bubble */}
      <button
        className={`bc-chat-bubble${open ? " bc-chat-bubble--open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close Bitcraftly chat" : "Ask BitBot"}
      >
        {open ? <ChevronDown size={22} color="#fff" /> : <BitBotChatTrigger />}
      </button>

      {/* Panel */}
      <div className={`bc-chat-panel${open ? " bc-chat-panel--open" : ""}`} role="dialog" aria-label="Bitcraftly AI Chat">

        {/* Header */}
        <div className="bc-chat-header">
          <div className="bc-chat-header-avatar"><BitBotAvatar size={44} /></div>
          <div className="bc-chat-header-info">
            <p className="bc-chat-header-name">
              Bit — AI Assistant
              {memory.userName && <span className="bc-chat-header-you"> · Hi, {memory.userName}</span>}
            </p>
            <span className="bc-chat-header-status">
              <span className="bc-chat-online-dot" />
              {hasCompletedOnboarding(memory)
                ? hasCompleteLead(memory)
                  ? "Remembers your details + chat"
                  : "Ready to help"
                : "Quick onboarding in progress"}
            </span>
          </div>
          <div className="bc-chat-header-actions">
            {msgs.length > 0 && (
              <button className="bc-chat-clear" onClick={handleClearChat} aria-label="Clear chat history" title="Clear chat">
                <RotateCcw size={15} />
              </button>
            )}
            <button className="bc-chat-close" onClick={() => setOpen(false)} aria-label="Close chat"><X size={18} /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="bc-chat-body">
          {msgs.length === 0 && !thinking && (
            <div className="bc-chat-welcome">
              <div className="bc-chat-welcome-icon"><BitBotAvatar size={48} /></div>
              <p>Ask me anything about Bitcraftly — pricing, services, portfolio, or just say hi!</p>
            </div>
          )}

          {msgs.map(msg => (
            <div key={msg.id} className={`bc-chat-msg bc-chat-msg--${msg.from}`}>
              {msg.from === "bot" && (
                <div className="bc-chat-msg-avatar"><BitBotAvatar size={28} /></div>
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
              <div className="bc-chat-msg-avatar"><BitBotAvatar size={28} /></div>
              <div className="bc-chat-msg-wrap">
                <div className="bc-chat-thinking">
                  <span className="bc-chat-thinking-label">Bit is thinking</span>
                  <span className="bc-chat-thinking-dot" aria-hidden />
                  <span className="bc-chat-thinking-dot" aria-hidden />
                  <span className="bc-chat-thinking-dot" aria-hidden />
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
            onFocus={handleInputFocus}
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
