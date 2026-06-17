"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, ChevronDown, MessageCircle } from "lucide-react";

/* ─── Girl robot avatar SVG ─────────────────────────── */
function GirlBotAvatar({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      {/* Outer glow ring */}
      <circle cx="40" cy="40" r="38" fill="url(#botGrad)" />
      {/* Head */}
      <rect x="20" y="18" width="40" height="34" rx="14" fill="#fff" />
      {/* Hair */}
      <path d="M20 26 Q20 14 40 14 Q60 14 60 26 L60 22 Q60 10 40 10 Q20 10 20 22 Z" fill="#2d3a4a" />
      {/* Hair bangs */}
      <path d="M20 24 Q25 20 30 24" stroke="#2d3a4a" strokeWidth="3" strokeLinecap="round" fill="none"/>
      <path d="M50 24 Q55 20 60 24" stroke="#2d3a4a" strokeWidth="3" strokeLinecap="round" fill="none"/>
      {/* Ear antennas */}
      <rect x="17" y="28" width="5" height="10" rx="2.5" fill="#e2e8f0" />
      <rect x="58" y="28" width="5" height="10" rx="2.5" fill="#e2e8f0" />
      <circle cx="19.5" cy="27" r="3" fill="#22c55e" />
      <circle cx="60.5" cy="27" r="3" fill="#22c55e" />
      {/* Eyes */}
      <ellipse cx="32" cy="34" rx="5" ry="5.5" fill="#1e293b" />
      <ellipse cx="48" cy="34" rx="5" ry="5.5" fill="#1e293b" />
      {/* Eye shine */}
      <circle cx="34" cy="32" r="1.5" fill="#fff" />
      <circle cx="50" cy="32" r="1.5" fill="#fff" />
      {/* Eyelashes */}
      <path d="M27 30 Q28 28 29 29" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M43 30 Q44 28 45 29" stroke="#1e293b" strokeWidth="1.2" strokeLinecap="round"/>
      {/* Blush */}
      <ellipse cx="27" cy="39" rx="4" ry="2.5" fill="#fca5a5" opacity="0.5" />
      <ellipse cx="53" cy="39" rx="4" ry="2.5" fill="#fca5a5" opacity="0.5" />
      {/* Smile */}
      <path d="M33 43 Q40 48 47 43" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Body */}
      <rect x="28" y="50" width="24" height="16" rx="8" fill="#e0f2fe" />
      {/* Tie / Badge */}
      <path d="M38 50 L40 58 L42 50 Z" fill="#22c55e" />
      {/* Body glow dot */}
      <circle cx="40" cy="60" r="3" fill="#22c55e" opacity="0.6" />
      <defs>
        <radialGradient id="botGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dcfce7" />
          <stop offset="100%" stopColor="#bbf7d0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ─── Knowledge base ────────────────────────────────── */
type QuickReply = { label: string; value: string };
type BotReply   = { text: string; quick?: QuickReply[] };

const QUICK_DEFAULT: QuickReply[] = [
  { label: "📚 Courses",      value: "courses list" },
  { label: "💰 Fees",         value: "fees" },
  { label: "📝 Admission",    value: "how to apply" },
  { label: "📞 Contact",      value: "contact details" },
];

function getBotReply(input: string, history: string[]): BotReply {
  const q = input.toLowerCase().trim();
  const prevTopics = history.join(" ").toLowerCase();

  // Greeting
  if (/^(hi|hello|hey|namaste|helo|hii|namaskar|hy|good morning|good evening|good afternoon)\b/.test(q)) {
    const greets = [
      "Namaste! 🙏 Main RPY Tech ka AI Assistant hun. Courses, fees, admission ya kuch aur — poochho, main yahaan hun!",
      "Hello! 👋 RPY Technical & Training Services me aapka swagat hai. Main aapki kaise help kar sakta hun?",
      "Namaste! 😊 Main aapka RPY Support Assistant hun. Kya aap courses ke baare me jaanna chahte hain, ya kuch aur?",
    ];
    return {
      text: greets[Math.floor(Math.random() * greets.length)],
      quick: QUICK_DEFAULT,
    };
  }

  // Courses list
  if (/course|courses|training|programme|program|kya padhate|kya sikhate|subject/.test(q))
    return {
      text: "RPY Tech me ye industry-certified courses available hain:\n\n🦺 Industrial Safety\n🔥 Fire & Safety\n🔬 QA / QC\n🔧 Piping Engineering\n⚙️ Welding Technology\n📡 NDT Level II\n❄️ HVAC\n🔩 Fitter\n\nSabhi courses ISO certified hain aur duration 3–6 mahine hai. Kisi specific course ke baare me detail chahiye?",
      quick: [
        { label: "💰 Fees kitni hai?",   value: "fees" },
        { label: "⏱️ Duration",          value: "duration" },
        { label: "🎓 Certificate valid?", value: "certification" },
        { label: "📝 Apply karna hai",    value: "how to apply" },
      ],
    };

  // Fees
  if (/fee|fees|cost|price|kitna|charge|paisa|rupee|amount|kitne mein|lagta/.test(q))
    return {
      text: "Course fees programme ke hisaab se alag hoti hai. Exact fee structure ke liye:\n\n📞 Call karein: 7061005611 / 8235436410\n✉️ Email: rtitechnicalinstitute@gmail.com\n\nHum installment facility bhi dete hain eligible students ke liye! 😊\n\nKya aap kisi specific course ki fee jaanna chahte hain?",
      quick: [
        { label: "📞 Abhi call karein", value: "contact details" },
        { label: "📝 Apply karna hai",  value: "how to apply" },
        { label: "📚 Courses dekhein",  value: "courses list" },
      ],
    };

  // Duration
  if (/duration|kitne din|kitne mahine|month|time|period|kitna samay|kab tak/.test(q))
    return {
      text: "Hamare courses ki duration:\n\n⏱️ Short-term: 3 mahine\n⏱️ Standard: 6 mahine\n\nFull-time aur part-time dono options available hain. Naye batch har mahine shuru hote hain! 🗓️\n\nAur kuch poochna chahte hain?",
      quick: [
        { label: "📝 Apply karein",   value: "how to apply" },
        { label: "💰 Fees",           value: "fees" },
        { label: "🎓 Certification",  value: "certification" },
      ],
    };

  // Apply / Admission
  if (/apply|admission|enroll|register|join|kaise karen|start|shuru|lete hain|le lo/.test(q))
    return {
      text: "RPY Tech me admission lena bahut aasaan hai! 🚀\n\nStep-by-step process:\n1️⃣ rpytech.in pe jaayein\n2️⃣ 'Apply Now' click karein\n3️⃣ Online form fill karein\n4️⃣ Documents submit karein\n5️⃣ Seat confirm ho jaayegi\n\nYa directly call karein: 📞 7061005611\n\nKya aap abhi apply karna chahte hain?",
      quick: [
        { label: "🌐 Website kholein", value: "website" },
        { label: "📞 Call karein",     value: "contact details" },
        { label: "💰 Fees",            value: "fees" },
      ],
    };

  // Certification / Certificate validity
  if (/certif|certificate|valid|recognised|recognized|government|sarkari|approved|kaun sa/.test(q))
    return {
      text: "RPY Tech ke certificates poori tarah valid aur recognized hain! ✅\n\n🏛️ ISO 9001:2015 Certified\n🏛️ ISO 45001:2018 Certified\n🇮🇳 MCA Approved (Govt. of India)\n🏢 MSME Registered\n🔬 NABL Accredited\n\nHamare 1,22,000+ certified students across India hain jo top companies me kaam kar rahe hain. 💼",
      quick: [
        { label: "🔍 Verify certificate", value: "verify certificate" },
        { label: "📚 Courses dekhein",    value: "courses list" },
        { label: "📝 Apply karein",       value: "how to apply" },
      ],
    };

  // Verify
  if (/verif|check certificate|marksheet|roll number/.test(q))
    return {
      text: "Certificate ya marksheet verify karna bahut easy hai:\n\n🔗 rpytech.in pe jaayein\n📂 Student Zone → Certificate Verification\n🔢 Apna Roll Number ya Certificate ID enter karein\n\nInstant verification milegi! 🎓\n\nKoi problem aa rahi hai verification me?",
      quick: [
        { label: "📞 Help chahiye", value: "contact details" },
        { label: "🌐 Website",      value: "website" },
      ],
    };

  // Placement / Job
  if (/placement|job|career|salary|employ|work|naukri|company|hiring|kitni salary/.test(q))
    return {
      text: "RPY Tech ka placement record bahut strong hai! 💪\n\n✅ 100% Placement Assistance\n✅ Industry tie-ups with top companies\n✅ Resume & interview preparation\n✅ Regular job fairs\n✅ Oil & Gas, Safety, Industrial sectors\n\nHamare graduates India ke top companies me kaam kar rahe hain. Aapka dream job bhi possible hai! 🌟",
      quick: [
        { label: "📚 Courses dekhein", value: "courses list" },
        { label: "📝 Apply karein",    value: "how to apply" },
      ],
    };

  // Franchise
  if (/franchise|partner|center|centre|open|business|khud ka/.test(q))
    return {
      text: "RPY Tech Franchise — ek behtareen business opportunity! 🏢\n\n✅ Low investment model\n✅ Complete training & support\n✅ Established brand name\n✅ Marketing assistance\n✅ Continuous revenue stream\n\nFranchise enquiry ke liye:\n📞 7061005611 pe call karein\n🌐 rpytech.in → Franchise Enquiry form fill karein",
      quick: [
        { label: "📞 Contact karein", value: "contact details" },
        { label: "🌐 Website",        value: "website" },
      ],
    };

  // Contact / Location
  if (/contact|address|location|where|kahan|phone|number|call|email|office|head office/.test(q))
    return {
      text: "RPY Tech se contact karein:\n\n📍 Head Office:\nShyama Market, 1st Floor,\nNear Ghosh & Sinha Petrol Pump,\nMirganj, Gopalganj, Bihar — 841438\n\n📞 7061005611 / 8235436410\n✉️ rtitechnicalinstitute@gmail.com\n🌐 www.rpytech.in\n\nHum 10 AM – 6 PM ke beech available hain. 🕙",
      quick: [
        { label: "🗺️ Map dekhein", value: "map location" },
        { label: "📝 Apply karein", value: "how to apply" },
      ],
    };

  // Map
  if (/map|direction|navigate|rasta|kaise pahunche/.test(q))
    return {
      text: "📍 Google Maps pe dhundhein:\n\n'RPY Technical Training Institute, Gopalganj'\n\nAddress: Shyama Market, 1st Floor, Mirganj, Gopalganj, Bihar 841438\n\nYa GPS use karein — bilkul asaan location hai! 🗺️",
      quick: [
        { label: "📞 Call karein", value: "contact details" },
      ],
    };

  // Website
  if (/website|site|online|link|url|rpytech/.test(q))
    return {
      text: "Official website:\n\n🌐 www.rpytech.in\n\nYahan aapko milega:\n• Courses & fees\n• Student login\n• Certificate verification\n• Franchise info\n• Apply online\n\nSabse up-to-date information website pe hi hoti hai! 😊",
    };

  // Thank you / Bye
  if (/thank|thanks|bye|goodbye|ok done|shukriya|dhanyavad|shukriya|acha|theek|got it/.test(q))
    return {
      text: "Bahut bahut shukriya! 😊 Aapka swagat karte hain RPY Tech me.\n\nAgar aage koi sawaal ho — course selection, fees, admission — toh main hamesha available hun. Aapke career ke liye shubhkamnaayen! 🌟🎓",
      quick: [
        { label: "📚 Courses dekhein", value: "courses list" },
        { label: "📞 Contact",         value: "contact details" },
      ],
    };

  // Context-aware follow-up
  if (prevTopics.includes("course") && /aur|more|detail|batao|explain/.test(q))
    return {
      text: "Bilkul! Kaunsa course aapko interest kar raha hai? Har course ke baare me main detail de sakta hun — syllabus, duration, career scope, aur fees. Batayein! 😊",
      quick: [
        { label: "🦺 Industrial Safety", value: "industrial safety course" },
        { label: "🔥 Fire & Safety",     value: "fire safety course" },
        { label: "🔬 QA/QC",             value: "qa qc course" },
        { label: "📡 NDT",               value: "ndt course" },
      ],
    };

  // Specific courses
  if (/industrial safety|fire safety|fire and safety|qa.?qc|quality|ndt|welding|piping|hvac|fitter/.test(q)) {
    const courseMap: Record<string, string> = {
      "industrial safety": "🦺 Industrial Safety\n\nYeh course workplace hazard identification, risk assessment, aur safety protocols cover karta hai.\n\n⏱️ Duration: 3–6 months\n🏛️ ISO Certified\n💼 Oil & gas, construction, manufacturing me high demand",
      "fire safety": "🔥 Fire & Safety\n\nFire prevention, emergency response, aur firefighting techniques sikhenge.\n\n⏱️ Duration: 3–6 months\n🏛️ ISO Certified\n💼 Industrial plants, buildings, factories me scope",
      "qa": "🔬 QA/QC\n\nQuality assurance aur control — inspection, testing, documentation sab cover hota hai.\n\n⏱️ Duration: 3–6 months\n🏛️ ISO Certified\n💼 Manufacturing, engineering sectors me high demand",
      "ndt": "📡 NDT Level II\n\nNon-destructive testing — ultrasonic, radiographic, magnetic particle inspection.\n\n⏱️ Duration: 3–6 months\n🏛️ ISO Certified\n💼 Petrochemical, power plants me excellent scope",
      "welding": "⚙️ Welding Technology\n\nMIG, TIG, arc welding with full safety certification.\n\n⏱️ Duration: 3–6 months\n🏛️ ISO Certified\n💼 Construction, fabrication me bahut demand",
    };
    const key = Object.keys(courseMap).find(k => q.includes(k));
    const detail = key ? courseMap[key] : "Yeh ek bahut popular course hai! Fees aur admission ke liye 📞 7061005611 pe call karein.";
    return {
      text: detail,
      quick: [
        { label: "💰 Fees kitni?",  value: "fees" },
        { label: "📝 Apply karein", value: "how to apply" },
        { label: "🎓 Certificate",  value: "certification" },
      ],
    };
  }

  // Default
  return {
    text: "Samajh nahi aaya, sorry! 😅 Main inn topics pe help kar sakta hun:\n\n• Course information\n• Fees & duration\n• Admission process\n• Certificate validity\n• Placement support\n• Franchise enquiry\n• Contact & location\n\nKya poochna chahte hain?",
    quick: QUICK_DEFAULT,
  };
}

/* ─── Types ──────────────────────────────────────────── */
type Msg = {
  id: number;
  from: "bot" | "user";
  text: string;
  displayText: string;   // streamed so far
  streaming: boolean;
  time: string;
  quick?: QuickReply[];
};

function nowTime() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

/* ─── Component ─────────────────────────────────────── */
export default function Rpy2ChatBot() {
  const [open, setOpen]       = useState(false);
  const [msgs, setMsgs]       = useState<Msg[]>([]);
  const [input, setInput]     = useState("");
  const [thinking, setThink]  = useState(false);
  const [unread, setUnread]   = useState(1);
  const [greeted, setGreeted] = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);
  const inputRef              = useRef<HTMLInputElement>(null);
  const msgId                 = useRef(0);
  const history               = useRef<string[]>([]);

  const scrollBottom = () => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  /* Streaming effect — types text char by char */
  const streamMsg = useCallback((id: number, fullText: string, quick?: QuickReply[]) => {
    let i = 0;
    const speed = Math.max(12, Math.min(28, 3000 / fullText.length)); // adaptive speed

    const tick = () => {
      i++;
      setMsgs(prev =>
        prev.map(m =>
          m.id === id
            ? { ...m, displayText: fullText.slice(0, i), streaming: i < fullText.length }
            : m
        )
      );
      scrollBottom();
      if (i < fullText.length) setTimeout(tick, speed);
      else {
        // attach quick replies only after streaming done
        if (quick) {
          setMsgs(prev =>
            prev.map(m => m.id === id ? { ...m, quick } : m)
          );
        }
        setTimeout(scrollBottom, 50);
      }
    };
    setTimeout(tick, speed);
  }, []);

  const addBotMsg = useCallback((reply: BotReply) => {
    const id = ++msgId.current;
    const msg: Msg = {
      id,
      from: "bot",
      text: reply.text,
      displayText: "",
      streaming: true,
      time: nowTime(),
    };
    setMsgs(prev => [...prev, msg]);
    streamMsg(id, reply.text, reply.quick);
  }, [streamMsg]);

  /* Initial greeting */
  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      setUnread(0);
      setTimeout(() => {
        addBotMsg({
          text: "Namaste! 🙏 Main RPY Tech ka AI Assistant hun.\n\nCourses, fees, admission, certification — kuch bhi poochh sakte hain! Main real-time me jawab dunga. 😊",
          quick: QUICK_DEFAULT,
        });
      }, 500);
    }
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [open, greeted, addBotMsg]);

  useEffect(() => { scrollBottom(); }, [msgs, thinking]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || thinking) return;

    const userMsg: Msg = {
      id: ++msgId.current,
      from: "user",
      text: text.trim(),
      displayText: text.trim(),
      streaming: false,
      time: nowTime(),
    };
    setMsgs(prev => [...prev, userMsg]);
    setInput("");
    history.current = [...history.current.slice(-6), text.trim()];

    // Thinking delay (simulates real processing)
    setThink(true);
    const delay = 800 + Math.random() * 600;
    setTimeout(() => {
      setThink(false);
      const reply = getBotReply(text, history.current);
      addBotMsg(reply);
    }, delay);
  }, [thinking, addBotMsg]);

  return (
    <>
      {/* Floating bubble */}
      <button
        className={`rpyv2-chat-bubble${open ? " rpyv2-chat-bubble--open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Open RPY Support chat"}
      >
        {open ? <ChevronDown size={22} /> : <GirlBotAvatar size={40} className="rpyv2-chat-bubble-avatar" />}
        {!open && unread > 0 && <span className="rpyv2-chat-badge">{unread}</span>}
      </button>

      {/* Panel */}
      <div className={`rpyv2-chat-panel${open ? " rpyv2-chat-panel--open" : ""}`} role="dialog" aria-label="RPY Tech AI Support">

        {/* Header */}
        <div className="rpyv2-chat-header">
          <div className="rpyv2-chat-header-avatar" aria-hidden>
            <GirlBotAvatar size={42} />
          </div>
          <div className="rpyv2-chat-header-info">
            <p className="rpyv2-chat-header-name">RPY AI Assistant</p>
            <span className="rpyv2-chat-header-status">
              <span className="rpyv2-chat-online-dot" />
              AI Powered · Instant Replies
            </span>
          </div>
          <button className="rpyv2-chat-close" onClick={() => setOpen(false)} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="rpyv2-chat-body">
          {msgs.length === 0 && !thinking && (
            <div className="rpyv2-chat-welcome">
              <div className="rpyv2-chat-welcome-icon">✨</div>
              <p>RPY Tech ke baare me kuch bhi poochhen — courses, fees, admission, placement!</p>
            </div>
          )}

          {msgs.map(msg => (
            <div key={msg.id} className={`rpyv2-chat-msg rpyv2-chat-msg--${msg.from}`}>
              {msg.from === "bot" && (
                <div className="rpyv2-chat-msg-avatar" aria-hidden>
                  <GirlBotAvatar size={28} />
                </div>
              )}
              <div className="rpyv2-chat-msg-wrap">
                <div className="rpyv2-chat-msg-bubble">
                  {msg.displayText.split("\n").map((line, i, arr) => (
                    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                  ))}
                  {msg.streaming && <span className="rpyv2-chat-cursor" aria-hidden>▋</span>}
                </div>
                {!msg.streaming && <span className="rpyv2-chat-msg-time">{msg.time}</span>}
                {!msg.streaming && msg.quick && (
                  <div className="rpyv2-chat-quick">
                    {msg.quick.map(q => (
                      <button key={q.value} className="rpyv2-chat-quick-btn"
                        onClick={() => sendMessage(q.value)}>
                        {q.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Thinking dots */}
          {thinking && (
            <div className="rpyv2-chat-msg rpyv2-chat-msg--bot">
              <div className="rpyv2-chat-msg-avatar" aria-hidden><GirlBotAvatar size={28} /></div>
              <div className="rpyv2-chat-msg-wrap">
                <div className="rpyv2-chat-thinking">
                  <span className="rpyv2-chat-thinking-label">RPY AI is thinking</span>
                  <span /><span /><span />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="rpyv2-chat-footer">
          <input
            ref={inputRef}
            className="rpyv2-chat-input"
            type="text"
            placeholder="Kuch bhi poochhen…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
            maxLength={300}
            aria-label="Chat message"
          />
          <button
            className="rpyv2-chat-send"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || thinking}
            aria-label="Send"
          >
            <Send size={15} />
          </button>
        </div>

        <div className="rpyv2-chat-powered">
          ✨ AI Assistant by <strong>RPY Tech</strong>
        </div>
      </div>
    </>
  );
}
