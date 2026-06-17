"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, MessageCircle, ChevronDown } from "lucide-react";

/* ─── Bot knowledge base ─────────────────────────────── */
const BOT_NAME  = "RPY Support";
const BOT_AVATAR = "R";

type QuickReply = { label: string; value: string };
type BotReply   = { text: string; quick?: QuickReply[] };

function getBotReply(input: string): BotReply {
  const q = input.toLowerCase().trim();

  // Greeting
  if (/^(hi|hello|hey|namaste|helo|hii|namaskar|hy)\b/.test(q))
    return {
      text: "Namaste! 🙏 Welcome to RPY Technical & Training Services. I'm here to help you with courses, certifications, admissions, and more. What would you like to know?",
      quick: [
        { label: "📚 Courses", value: "courses" },
        { label: "🎓 Certification", value: "certification" },
        { label: "📝 Admission", value: "admission" },
        { label: "📞 Contact", value: "contact" },
      ],
    };

  // Courses
  if (/course|courses|training|kya karta|subject|programme|program/.test(q))
    return {
      text: "We offer a wide range of industry-certified vocational courses:\n\n🦺 Industrial Safety\n🔥 Fire & Safety\n🔬 QA / QC\n🔧 Piping\n⚙️ Welding\n📡 NDT Level II\n❄️ HVAC\n🔩 Fitter\n\nAll courses are ISO certified and industry-recognized. Duration: 3–6 months.",
      quick: [
        { label: "💰 Fees", value: "fees" },
        { label: "📝 How to apply", value: "admission" },
        { label: "🎓 Certification", value: "certification" },
      ],
    };

  // Fees
  if (/fee|fees|cost|price|kitna|charge|paisa|rupee|amount/.test(q))
    return {
      text: "Course fees vary by programme. For exact fee structure, please:\n\n📞 Call us: 7061005611 / 8235436410\n✉️ Email: rtitechnicalinstitute@gmail.com\n\nWe also offer installment options for eligible students. 😊",
      quick: [
        { label: "📝 Apply Now", value: "admission" },
        { label: "📞 Call Us", value: "contact" },
      ],
    };

  // Duration
  if (/duration|kitne din|kitne mahine|month|months|time|period/.test(q))
    return {
      text: "Course durations are:\n\n⏱️ Short-term: 3 months\n⏱️ Standard: 6 months\n\nFull-time and part-time batches are available. New batches start every month!",
      quick: [
        { label: "📝 Admission", value: "admission" },
        { label: "📚 Courses", value: "courses" },
      ],
    };

  // Admission / Apply
  if (/admission|apply|enroll|enroll|register|join|kaise karen|start|begin/.test(q))
    return {
      text: "Applying to RPY Tech is simple:\n\n1️⃣ Visit our website: rpytech.in\n2️⃣ Click 'Apply Now'\n3️⃣ Fill the online form\n4️⃣ Submit documents\n5️⃣ Confirm your seat\n\nOr call us directly: 📞 7061005611",
      quick: [
        { label: "🌐 Open Website", value: "website" },
        { label: "📞 Call Now", value: "contact" },
        { label: "💰 Fees", value: "fees" },
      ],
    };

  // Certification / Certificate
  if (/certif|certificate|verify|verif|valid|recognised|recognized/.test(q))
    return {
      text: "RPY Tech certificates are:\n\n✅ ISO 9001:2015 Certified\n✅ ISO 45001:2018 Certified\n✅ MCA Approved (Govt. of India)\n✅ MSME Registered\n✅ NABL Accredited\n\nYou can verify any certificate at rpytech.in → Student Zone → Certificate Verification.",
      quick: [
        { label: "🔍 Verify Certificate", value: "verify" },
        { label: "📚 Courses", value: "courses" },
      ],
    };

  // Verify
  if (/verif|check certificate|marksheet/.test(q))
    return {
      text: "To verify your certificate or marksheet:\n\n🔗 Visit: rpytech.in\n📂 Go to: Student Zone → Certificate Verification\n\nEnter your roll number or certificate ID to instantly verify. 🎓",
      quick: [
        { label: "📞 Need Help?", value: "contact" },
      ],
    };

  // Placement
  if (/placement|job|career|salary|employ|work|naukri/.test(q))
    return {
      text: "We provide 100% placement assistance! 🚀\n\n✅ Dedicated Placement Cell\n✅ Industry tie-ups\n✅ Resume & interview preparation\n✅ Job fair participation\n\nOur graduates work with leading companies in safety, oil & gas, and industrial sectors.",
      quick: [
        { label: "📚 View Courses", value: "courses" },
        { label: "📝 Apply Now", value: "admission" },
      ],
    };

  // Franchise
  if (/franchise|partner|center|centre|open/.test(q))
    return {
      text: "Interested in opening an RPY Tech franchise? 🏢\n\n✅ Low investment model\n✅ Full training & support\n✅ Brand recognition across India\n✅ Marketing assistance\n\nFill the Franchise Enquiry form at rpytech.in or call 📞 7061005611.",
      quick: [
        { label: "📞 Contact Us", value: "contact" },
        { label: "🌐 Open Website", value: "website" },
      ],
    };

  // Contact / Location
  if (/contact|address|location|where|kahan|phone|number|call|email/.test(q))
    return {
      text: "📍 Head Office:\nShyama Market, 1st Floor,\nNear Ghosh & Sinha Petrol Pump,\nMirganj, Gopalganj, Bihar — 841438\n\n📞 7061005611 / 8235436410\n✉️ rtitechnicalinstitute@gmail.com\n🌐 www.rpytech.in",
      quick: [
        { label: "🗺️ View Map", value: "map" },
        { label: "📝 Apply Now", value: "admission" },
      ],
    };

  // Website
  if (/website|site|online|rpytech/.test(q))
    return {
      text: "Visit our official website for all details:\n\n🌐 www.rpytech.in\n\nYou'll find courses, student login, certificate verification, franchise info, and more!",
    };

  // Map
  if (/map|direction|navigate|get there/.test(q))
    return {
      text: "📍 Find us on Google Maps:\n\nShyama Market, 1st Floor, Mirganj, Gopalganj, Bihar 841438\n\nSearch 'RPY Technical Training Institute' on Google Maps for turn-by-turn directions.",
      quick: [
        { label: "📞 Call Us", value: "contact" },
      ],
    };

  // Thanks / Bye
  if (/thank|thanks|bye|goodbye|ok|okay|done|got it|shukriya/.test(q))
    return {
      text: "You're welcome! 😊 It was a pleasure helping you. Wishing you a bright career ahead! 🌟\n\nIf you need anything else, feel free to ask. All the best! 🎓",
      quick: [
        { label: "📚 Explore Courses", value: "courses" },
        { label: "📞 Contact Us", value: "contact" },
      ],
    };

  // Default
  return {
    text: "I'm sorry, I didn't quite catch that. 😊 You can ask me about our courses, fees, certifications, admissions, placement, or contact details!",
    quick: [
      { label: "📚 Courses", value: "courses" },
      { label: "💰 Fees", value: "fees" },
      { label: "📝 Admission", value: "admission" },
      { label: "📞 Contact", value: "contact" },
    ],
  };
}

/* ─── Types ─────────────────────────────────────────── */
type Msg = {
  id: number;
  from: "bot" | "user";
  text: string;
  time: string;
  quick?: QuickReply[];
};

function now() {
  return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}

/* ─── Component ─────────────────────────────────────── */
export default function Rpy2ChatBot() {
  const [open, setOpen]         = useState(false);
  const [msgs, setMsgs]         = useState<Msg[]>([]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const [unread, setUnread]     = useState(1);
  const [greeted, setGreeted]   = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);
  const inputRef                = useRef<HTMLInputElement>(null);
  let   msgId                   = useRef(0);

  const addMsg = useCallback((msg: Omit<Msg, "id">) => {
    setMsgs(prev => [...prev, { ...msg, id: ++msgId.current }]);
  }, []);

  /* Initial greeting when opened first time */
  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true);
      setUnread(0);
      setTimeout(() => {
        addMsg({
          from: "bot",
          text: "Namaste! 🙏 I'm your RPY Tech Assistant. How can I help you today?",
          time: now(),
          quick: [
            { label: "📚 Courses", value: "courses" },
            { label: "🎓 Certification", value: "certification" },
            { label: "📝 Admission", value: "admission" },
            { label: "📞 Contact", value: "contact" },
          ],
        });
      }, 600);
    }
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, greeted, addMsg]);

  /* Auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim()) return;
    addMsg({ from: "user", text: text.trim(), time: now() });
    setInput("");
    setTyping(true);

    const delay = 900 + Math.random() * 700;
    setTimeout(() => {
      setTyping(false);
      const reply = getBotReply(text);
      addMsg({ from: "bot", text: reply.text, time: now(), quick: reply.quick });
    }, delay);
  }, [addMsg]);

  const handleQuick = (value: string) => sendMessage(value);

  return (
    <>
      {/* Floating bubble */}
      <button
        className={`rpyv2-chat-bubble${open ? " rpyv2-chat-bubble--open" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open
          ? <ChevronDown size={22} />
          : <MessageCircle size={22} />
        }
        {!open && unread > 0 && (
          <span className="rpyv2-chat-badge">{unread}</span>
        )}
      </button>

      {/* Chat panel */}
      <div className={`rpyv2-chat-panel${open ? " rpyv2-chat-panel--open" : ""}`} role="dialog" aria-label="RPY Tech Support Chat">

        {/* Header */}
        <div className="rpyv2-chat-header">
          <div className="rpyv2-chat-header-avatar" aria-hidden>{BOT_AVATAR}</div>
          <div className="rpyv2-chat-header-info">
            <p className="rpyv2-chat-header-name">{BOT_NAME}</p>
            <span className="rpyv2-chat-header-status">
              <span className="rpyv2-chat-online-dot" />
              Online · Replies instantly
            </span>
          </div>
          <button className="rpyv2-chat-close" onClick={() => setOpen(false)} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Messages */}
        <div className="rpyv2-chat-body">

          {/* Welcome banner */}
          {msgs.length === 0 && !typing && (
            <div className="rpyv2-chat-welcome">
              <div className="rpyv2-chat-welcome-icon">💬</div>
              <p>Ask anything about our courses, certifications, fees, and more!</p>
            </div>
          )}

          {msgs.map(msg => (
            <div key={msg.id} className={`rpyv2-chat-msg rpyv2-chat-msg--${msg.from}`}>
              {msg.from === "bot" && (
                <div className="rpyv2-chat-msg-avatar" aria-hidden>{BOT_AVATAR}</div>
              )}
              <div className="rpyv2-chat-msg-wrap">
                <div className="rpyv2-chat-msg-bubble">
                  {msg.text.split("\n").map((line, i) => (
                    <span key={i}>{line}{i < msg.text.split("\n").length - 1 && <br />}</span>
                  ))}
                </div>
                <span className="rpyv2-chat-msg-time">{msg.time}</span>
                {/* Quick replies */}
                {msg.quick && msg.from === "bot" && (
                  <div className="rpyv2-chat-quick">
                    {msg.quick.map(q => (
                      <button key={q.value} className="rpyv2-chat-quick-btn" onClick={() => handleQuick(q.value)}>
                        {q.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="rpyv2-chat-msg rpyv2-chat-msg--bot">
              <div className="rpyv2-chat-msg-avatar" aria-hidden>{BOT_AVATAR}</div>
              <div className="rpyv2-chat-msg-wrap">
                <div className="rpyv2-chat-typing">
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
            placeholder="Type your message…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage(input)}
            aria-label="Chat message input"
            maxLength={300}
          />
          <button
            className="rpyv2-chat-send"
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </div>

        {/* Powered by */}
        <div className="rpyv2-chat-powered">
          Powered by <strong>RPY Tech</strong> · Instant Support
        </div>
      </div>
    </>
  );
}
