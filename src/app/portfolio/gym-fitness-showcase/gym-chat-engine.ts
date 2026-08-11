import {
  GYM_CENTERS,
  MEMBERSHIP_PASSES,
  TRAINERS,
  WORKOUT_FORMATS,
} from './gym-demo-data';

export type ChatRole = 'bot' | 'user';

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  time: string;
};

/** In-session memory for RallyAI (cleared on Reset / new browser tab). */
export type ChatMemory = {
  visitorName: string | null;
};

export const EMPTY_CHAT_MEMORY: ChatMemory = { visitorName: null };

export const CHAT_MEMORY_STORAGE_KEY = 'fitrally-rallyai-memory';

export const CHAT_QUICK_PROMPTS = [
  'Which rallypass is best?',
  'Show HRX classes',
  'Centers near me',
  'Gym tips',
] as const;

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}

function msgId() {
  return `m-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function createBotMessage(text: string): ChatMessage {
  return { id: msgId(), role: 'bot', text, time: nowTime() };
}

export function createUserMessage(text: string): ChatMessage {
  return { id: msgId(), role: 'user', text, time: nowTime() };
}

export function createWelcomeMessage(memory: ChatMemory = EMPTY_CHAT_MEMORY): ChatMessage {
  if (memory.visitorName) {
    return createBotMessage(`Welcome back, ${memory.visitorName}. How can I help?`);
  }
  return createBotMessage("Hey! I'm RallyAI. What's your name?");
}

const WHATSAPP_TRANSCRIPT_MAX = 1400;

export function formatChatTranscriptForWhatsApp(
  messages: readonly ChatMessage[],
  reason: 'close' | 'reset',
  city: string,
  memory: ChatMemory = EMPTY_CHAT_MEMORY,
): string {
  const visitor = memory.visitorName ?? 'Visitor';
  const lines = messages.map((m) => {
    const who = m.role === 'user' ? visitor : 'RallyAI';
    return `[${m.time}] ${who}: ${m.text}`;
  });

  let body = lines.join('\n');
  if (body.length > WHATSAPP_TRANSCRIPT_MAX) {
    body = `${body.slice(0, WHATSAPP_TRANSCRIPT_MAX)}\n…(truncated)`;
  }

  return [
    `FitRally AI chat (${reason})`,
    `City: ${city}${memory.visitorName ? ` · Name: ${memory.visitorName}` : ''}`,
    '---',
    body,
  ].join('\n');
}

export function chatHasVisitorMessages(messages: readonly ChatMessage[]): boolean {
  return messages.some((m) => m.role === 'user');
}

const BLOCKED_NAME_WORDS = new Set([
  'rallypass',
  'elite',
  'pro',
  'play',
  'hrx',
  'yoga',
  'boxing',
  'trial',
  'pass',
  'gym',
  'fitrally',
  'delhi',
  'mumbai',
  'help',
  'please',
  'thanks',
  'hello',
  'namaste',
]);

function titleCaseName(raw: string): string {
  return raw
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function isPlausibleName(candidate: string): boolean {
  const cleaned = candidate.trim().replace(/[^\p{L}\p{M}\s'.-]/gu, '');
  if (cleaned.length < 2 || cleaned.length > 40) return false;
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0 || parts.length > 3) return false;
  if (parts.some((p) => BLOCKED_NAME_WORDS.has(p.toLowerCase()))) return false;
  if (parts.some((p) => p.length < 2)) return false;
  return true;
}

/** Pull a visitor name from casual English / Hinglish introductions. */
export function extractVisitorName(raw: string): string | null {
  const text = raw.trim();
  if (!text) return null;

  const patterns: RegExp[] = [
    /(?:my\s+name\s+is|i\s*am|i'?m|this\s+is|call\s+me)\s+([a-zA-Z\u0900-\u097F][a-zA-Z\u0900-\u097F\s'.-]{1,36})/i,
    /(?:mera\s+naam\s+(?:hai\s+)?|main\s+|mein\s+)([a-zA-Z\u0900-\u097F][a-zA-Z\u0900-\u097F\s'.-]{1,36})(?:\s+hoon|\s+hun|\s+hai)?/i,
    /^([a-zA-Z\u0900-\u097F]{2,20})(?:\s+[a-zA-Z\u0900-\u097F]{2,20}){0,2}\s+here\.?$/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    const captured = match?.[1]?.trim();
    if (!captured) continue;
    const normalized = titleCaseName(captured.replace(/[.,!?]+$/g, '').trim());
    if (isPlausibleName(normalized)) return normalized;
  }

  return null;
}

/** Bare name only — used when we still need a name for the session. */
function extractBareName(raw: string): string | null {
  const text = raw.trim().replace(/[.,!?]+$/g, '');
  if (!/^[a-zA-Z\u0900-\u097F][a-zA-Z\u0900-\u097F\s'.-]{1,36}$/.test(text)) return null;
  const normalized = titleCaseName(text);
  return isPlausibleName(normalized) ? normalized : null;
}

function withName(text: string, name: string | null): string {
  if (!name) return text;
  // Avoid double-greeting if reply already leads with the name
  if (new RegExp(`\\b${name}\\b`, 'i').test(text.slice(0, 48))) return text;
  return `${name}, ${text.charAt(0).toLowerCase()}${text.slice(1)}`;
}

function listPasses() {
  return MEMBERSHIP_PASSES.map(
    (p) => `• ${p.name.replace('rallypass ', '')}: ${p.price}${p.period} — ${p.highlight}`,
  ).join('\n');
}

function listFormats(filter?: string) {
  const q = filter?.toLowerCase();
  const items = WORKOUT_FORMATS.filter((f) =>
    q ? f.name.toLowerCase().includes(q) || f.tagline.toLowerCase().includes(q) : true,
  );
  return items
    .map((f) => `• ${f.name} (${f.duration}) — ${f.tagline} · ${f.calories}`)
    .join('\n');
}

function listCenters(city?: string) {
  const items = city
    ? GYM_CENTERS.filter((c) => c.city.toLowerCase() === city.toLowerCase())
    : GYM_CENTERS;
  const rows = (items.length ? items : GYM_CENTERS).map(
    (c) => `• ${c.name} — ${c.area}, ${c.city} (${c.distance})`,
  );
  return rows.join('\n');
}

function listCoaches() {
  return TRAINERS.map((t) => `• ${t.name} — ${t.specialty} · ${t.experience}`).join('\n');
}

export type FitRallyAnswer = {
  reply: ChatMessage;
  memory: ChatMemory;
};

function hasFitnessIntent(lower: string): boolean {
  return /(pass|membership|price|pricing|elite|pro|play|rallypass|plan|cost|class|format|workout|hrx|yoga|boxing|burn|dance|s&c|strength|cardio|center|gym|location|near|branch|coach|trainer|bmi|trial|tip|faq|app|transform|whatsapp|help)/.test(
    lower,
  );
}

/**
 * Lightweight demo “AI” grounded in FitRally data + session name memory.
 */
export function answerFitRallyQuery(
  raw: string,
  city: string,
  memory: ChatMemory = EMPTY_CHAT_MEMORY,
): FitRallyAnswer {
  const query = raw.trim();
  const lower = query.toLowerCase();
  let nextMemory = memory;

  const captured =
    extractVisitorName(query) ?? (!memory.visitorName ? extractBareName(query) : null);

  if (captured) {
    nextMemory = { visitorName: captured };
    const introOnly =
      Boolean(extractBareName(query)) ||
      /^(my\s+name\s+is|i\s*am|i'?m|this\s+is|call\s+me|mera\s+naam|main\s+|mein\s+)/i.test(
        query,
      );

    // Name-only messages: short confirm, no topic menu
    if (introOnly && !hasFitnessIntent(lower)) {
      return {
        memory: nextMemory,
        reply: createBotMessage(`Got it, ${captured}.`),
      };
    }
  }

  const name = nextMemory.visitorName;
  const say = (text: string, personalize = true) =>
    createBotMessage(personalize ? withName(text, name) : text);

  if (!query) {
    return {
      memory: nextMemory,
      reply: name
        ? createBotMessage(`${name}, how can I help?`)
        : createBotMessage("What's your name?"),
    };
  }

  // No name yet — ask once, then answer after they share it
  if (!name && !captured) {
    return {
      memory: nextMemory,
      reply: createBotMessage("What's your name? Then I can help."),
    };
  }

  if (/^(hi|hello|hey|namaste|hola)\b/.test(lower)) {
    return {
      memory: nextMemory,
      reply: name
        ? createBotMessage(`Hey ${name}. How can I help?`)
        : createBotMessage("What's your name?"),
    };
  }

  if (/(tip|warm.?up|progressive|rest.?day|gym tip|fitness tip|health tip)/.test(lower)) {
    return {
      memory: nextMemory,
      reply: say(
        'Gym & fitness tips on this page: warm up before every lift or class, add load only when form is solid, rest 2–3 min between heavy sets, and use rest days for recovery. Scroll to Gym & fitness tips — training advice only, not medical advice.',
      ),
    };
  }

  if (/(faq|pause|guest pass|frequently|question)/.test(lower)) {
    return {
      memory: nextMemory,
      reply: say(
        'Open the FAQ section for pause rules, guest passes, trials, class booking, and BMI disclaimer. Or ask me about ELITE / PRO / PLAY pricing.',
      ),
    };
  }

  if (/(bmi|body mass|healthy weight)/.test(lower)) {
    return {
      memory: nextMemory,
      reply: say(
        'Use the BMI calculator on this page (Wellness tool). Enter weight (kg) + height (cm) for a demo estimate — not medical advice. For a training plan, ask about ELITE or a free trial.',
      ),
    };
  }

  if (/(trial|free trial|start|join|demo)/.test(lower)) {
    return {
      memory: nextMemory,
      reply: say(
        'You can start a 7-day free trial from the header “Get free trial” button. Prefer WhatsApp? Tap the green WhatsApp button and our desk will follow up. Want a plan tip first? Ask “Which rallypass is best?”',
      ),
    };
  }

  if (/(pass|membership|price|pricing|elite|pro|play|rallypass|plan|cost|₹|rs)/.test(lower)) {
    if (/elite|unlimited|all formats/.test(lower)) {
      const elite = MEMBERSHIP_PASSES.find((p) => p.id === 'elite');
      return {
        memory: nextMemory,
        reply: say(
          elite
            ? `ELITE is our most popular lane at ${elite.price}${elite.period}. ${elite.highlight}. Perks: ${elite.perks.join('; ')}. Tap Buy now on the rallypass section to continue.`
            : listPasses(),
        ),
      };
    }
    if (/pro\b/.test(lower)) {
      const pro = MEMBERSHIP_PASSES.find((p) => p.id === 'pro');
      return {
        memory: nextMemory,
        reply: say(
          pro
            ? `PRO is ${pro.price}${pro.period} — ${pro.highlight}. Good if you want partner gyms plus a few ELITE sessions.`
            : listPasses(),
        ),
      };
    }
    if (/play|sport|badminton|swim|pool/.test(lower)) {
      const play = MEMBERSHIP_PASSES.find((p) => p.id === 'play');
      return {
        memory: nextMemory,
        reply: say(
          play
            ? `PLAY is ${play.price}${play.period} — ${play.highlight}. Ideal for courts, pools, and weekend leagues.`
            : listPasses(),
        ),
      };
    }
    if (/best|recommend|which|suggest/.test(lower)) {
      return {
        memory: nextMemory,
        reply: say(
          `For most members I recommend ELITE if you want unlimited gyms + all formats. Training a few times a week? PRO is value. Sports-first? PLAY.\n\n${listPasses()}`,
        ),
      };
    }
    return {
      memory: nextMemory,
      reply: say(`Here are FitRally rallypass lanes:\n\n${listPasses()}`),
    };
  }

  if (/(class|format|workout|hrx|yoga|boxing|burn|dance|s&c|strength|cardio)/.test(lower)) {
    const hit = WORKOUT_FORMATS.find(
      (f) => lower.includes(f.name.toLowerCase()) || lower.includes(f.id),
    );
    if (hit) {
      return {
        memory: nextMemory,
        reply: say(
          `${hit.name}: ${hit.tagline}. Typical session ${hit.duration}, about ${hit.calories}. Open “Pick your workout” and tap Book class to reserve a demo slot.`,
        ),
      };
    }
    return {
      memory: nextMemory,
      reply: say(
        `Popular group formats right now:\n\n${listFormats()}\n\nSay a name like “HRX” or “Yoga” for details.`,
      ),
    };
  }

  if (/(center|gym|location|near|branch|saket|connaught|delhi|mumbai|bengaluru|hyderabad|kolkata)/.test(lower)) {
    const cityHit = ['Delhi', 'Bengaluru', 'Mumbai', 'Hyderabad', 'Kolkata'].find((c) =>
      lower.includes(c.toLowerCase()),
    );
    return {
      memory: nextMemory,
      reply: say(
        `Centers ${cityHit ? `in ${cityHit}` : `near you (header city: ${city})`}:\n\n${listCenters(cityHit ?? city)}\n\nTap Book tour on a center card, or change city in the header.`,
      ),
    };
  }

  if (/(coach|trainer|priya|arjun|sneha|pt|personal)/.test(lower)) {
    return {
      memory: nextMemory,
      reply: say(
        `Expert coaches on this demo:\n\n${listCoaches()}\n\nELITE members get priority access to coach-led formats.`,
      ),
    };
  }

  if (/(app|mobile|on.?demand|leaderboard)/.test(lower)) {
    return {
      memory: nextMemory,
      reply: say(
        'The FitRally app (demo) syncs workouts, live HRX classes, and energy leaderboards. Watch the demo video in the Mobile app card, or ask about a free trial to explore more.',
      ),
    };
  }

  if (/(transform|result|weight loss|fat|10k)/.test(lower)) {
    return {
      memory: nextMemory,
      reply: say(
        'Member stories on this page are illustrative demos (e.g. lost 8 kg in 12 weeks with ELITE + HRX). Results vary. I can help you pick a pass or format to start.',
      ),
    };
  }

  if (/(whatsapp|human|agent|call|support|help desk)/.test(lower)) {
    return {
      memory: nextMemory,
      reply: say(
        'Tap the green WhatsApp button for a live FitRally desk chat. Closing this AI chat also offers to send your transcript over WhatsApp.',
      ),
    };
  }

  if (!name && /^(who am i|what's my name|whats my name|mera naam)\b/.test(lower)) {
    return {
      memory: nextMemory,
      reply: createBotMessage("I don't have your name yet — tell me like “My name is Alex”."),
    };
  }

  if (name && /^(who am i|what's my name|whats my name|mera naam)\b/.test(lower)) {
    return {
      memory: nextMemory,
      reply: createBotMessage(`You're ${name} — I've got that saved for this session.`),
    };
  }

  return {
    memory: nextMemory,
    reply: say(
      `I didn't catch a catalog match for “${query}”. Try: rallypass prices, HRX/Yoga classes, centers in ${city}, coaches, BMI, or free trial.`,
    ),
  };
}
