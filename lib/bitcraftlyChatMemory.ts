/* Bitcraftly chat — client-side conversation memory (localStorage) */

import { isPreferencesConsented, readCookieConsent } from "@/lib/cookieConsent";

export type QuickReply = { label: string; value: string };

export type StoredMsg = {
  id: number;
  from: "bot" | "user";
  text: string;
  time: string;
  quick?: QuickReply[];
};

export type ChatMemory = {
  messages: StoredMsg[];
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  interests: string[];
  projectType?: string;
  visitCount: number;
  lastVisit: string;
  greeted: boolean;
  onboardingSkipped?: boolean;
  onboardingNameAttempts?: number;
};

const STORAGE_KEY = "bitcraftly-chat-memory-v1";
const MAX_MESSAGES = 40;

function canStoreChatPreferences(): boolean {
  if (typeof window === "undefined") return false;
  return isPreferencesConsented(readCookieConsent());
}

export const EMPTY_MEMORY: ChatMemory = {
  messages: [],
  interests: [],
  visitCount: 0,
  lastVisit: "",
  greeted: false,
};

export function loadChatMemory(): ChatMemory {
  if (typeof window === "undefined" || !canStoreChatPreferences()) return { ...EMPTY_MEMORY };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...EMPTY_MEMORY };
    const parsed = JSON.parse(raw) as Partial<ChatMemory>;
    return {
      messages: Array.isArray(parsed.messages) ? parsed.messages.slice(-MAX_MESSAGES) : [],
      userName: typeof parsed.userName === "string" ? parsed.userName : undefined,
      userEmail: typeof parsed.userEmail === "string" ? parsed.userEmail : undefined,
      userPhone: typeof parsed.userPhone === "string" ? parsed.userPhone : undefined,
      interests: Array.isArray(parsed.interests) ? parsed.interests : [],
      projectType: typeof parsed.projectType === "string" ? parsed.projectType : undefined,
      visitCount: typeof parsed.visitCount === "number" ? parsed.visitCount : 0,
      lastVisit: typeof parsed.lastVisit === "string" ? parsed.lastVisit : "",
      greeted: Boolean(parsed.greeted),
      onboardingSkipped: Boolean(parsed.onboardingSkipped),
      onboardingNameAttempts:
        typeof parsed.onboardingNameAttempts === "number" ? parsed.onboardingNameAttempts : 0,
    };
  } catch {
    return { ...EMPTY_MEMORY };
  }
}

export function saveChatMemory(memory: ChatMemory): void {
  if (typeof window === "undefined" || !canStoreChatPreferences()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...memory,
      messages: memory.messages.slice(-MAX_MESSAGES),
    }));
  } catch {
    /* quota exceeded — trim and retry once */
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...memory,
        messages: memory.messages.slice(-20),
      }));
    } catch { /* ignore */ }
  }
}

export function clearChatMemory(): ChatMemory {
  if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
  return { ...EMPTY_MEMORY, visitCount: 1, lastVisit: new Date().toISOString() };
}

/* ── Extract facts from user messages ── */
const NAME_PATTERNS = [
  /(?:my name is|i am|i'm|call me|this is|mera naam|naam hai|naam)\s+([A-Za-z][A-Za-z\s]{1,20})/i,
  /^(?:i am|i'm|main)\s+([A-Za-z]{2,15})$/i,
];
const EMAIL_PATTERN = /\b([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,})\b/;
const PHONE_PATTERN = /(?:\+91[\s-]?)?([6-9]\d{9})\b/;

const GREETING_WORDS = new Set([
  "hi", "hii", "hiii", "hey", "helo", "hello", "hy", "namaste", "namaskar", "yo", "sup",
  "ok", "okay", "yes", "no", "thanks", "thank", "bye", "goodbye", "help", "start",
]);

/** Quick-reply / topic tokens — never treat as a person's name during onboarding */
const NON_NAME_WORDS = new Set([
  ...GREETING_WORDS,
  "pricing", "price", "services", "service", "portfolio", "contact", "timeline", "technology",
  "tech", "whatsapp", "email", "estimate", "calculator", "skip", "included", "about", "founder",
  "demo", "quote", "packages", "package", "website", "build", "react", "nextjs", "next",
  "ai", "chatbot", "bitcraftly", "bitbot", "bit",
]);

const SKIP_ONBOARDING_PATTERN = /^(skip|later|not now|baad me|baad mein|abhi nahi|skip karo|baad)/i;

function capitalizeName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

/** Name during onboarding — patterns plus plain first name (e.g. "Rahul"). */
export function parseOnboardingName(text: string): string | null {
  const fromPatterns = extractFromUserMessage(text, EMPTY_MEMORY).userName;
  if (fromPatterns) return fromPatterns;

  const q = text.trim();
  if (!q || q.length > 40) return null;

  const single = q.match(/^([A-Za-z][A-Za-z'-]{1,19})$/);
  if (single && !NON_NAME_WORDS.has(single[1].toLowerCase())) {
    return capitalizeName(single[1]);
  }

  const firstLast = q.match(/^([A-Za-z][A-Za-z'-]{1,19})\s+([A-Za-z][A-Za-z'-]{1,19})$/);
  if (firstLast && !NON_NAME_WORDS.has(firstLast[1].toLowerCase())) {
    return capitalizeName(firstLast[1]);
  }

  return null;
}

export function isGreetingMessage(text: string): boolean {
  return /^(hi|hello|hey|namaste|helo|hii|hy|good morning|good evening|good afternoon)\b/i.test(
    text.trim(),
  );
}

export function wantsToSkipOnboarding(text: string): boolean {
  return SKIP_ONBOARDING_PATTERN.test(text.trim());
}

export function hasCompletedOnboarding(memory: ChatMemory): boolean {
  return hasCompleteLead(memory) || Boolean(memory.onboardingSkipped);
}

const INTEREST_MAP: [RegExp, string][] = [
  [/price|pricing|cost|kitna|budget|package|₹|rupee/i, "pricing"],
  [/service|build|develop|website|banana|banwani/i, "services"],
  [/portfolio|demo|example|work|project/i, "portfolio"],
  [/contact|whatsapp|call|phone|email/i, "contact"],
  [/timeline|delivery|kitne din|when|kab/i, "timeline"],
  [/tech|react|next|stack/i, "technology"],
  [/ai|chatbot|automation/i, "ai"],
  [/founder|who is sanjay|about sanjay|sanjay singh/i, "about"],
];

const PROJECT_MAP: [RegExp, string][] = [
  [/gym|fitness/i, "gym website"],
  [/school|education|college/i, "school website"],
  [/ecommerce|e-commerce|shop|store|d2c/i, "e-commerce store"],
  [/restaurant|cloud kitchen|food/i, "restaurant website"],
  [/clinic|hospital|doctor|dental/i, "clinic website"],
  [/saas|startup|dashboard/i, "SaaS / startup"],
];

export function extractFromUserMessage(text: string, memory: ChatMemory): Partial<ChatMemory> {
  const updates: Partial<ChatMemory> = {};
  const q = text.trim();

  for (const pat of NAME_PATTERNS) {
    const m = q.match(pat);
    if (m?.[1]) {
      const name = m[1].trim().split(/\s+/)[0];
      if (name.length >= 2 && name.length <= 20) {
        updates.userName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        break;
      }
    }
  }

  const emailMatch = q.match(EMAIL_PATTERN);
  if (emailMatch?.[1]) updates.userEmail = emailMatch[1].toLowerCase();

  const phoneMatch = q.replace(/\s+/g, "").match(PHONE_PATTERN);
  if (phoneMatch?.[1]) updates.userPhone = phoneMatch[1];

  const newInterests = [...memory.interests];
  for (const [pat, tag] of INTEREST_MAP) {
    if (pat.test(q) && !newInterests.includes(tag)) newInterests.push(tag);
  }
  if (newInterests.length !== memory.interests.length) updates.interests = newInterests;

  for (const [pat, type] of PROJECT_MAP) {
    if (pat.test(q)) { updates.projectType = type; break; }
  }

  return updates;
}

export function recordVisit(memory: ChatMemory): ChatMemory {
  return {
    ...memory,
    visitCount: memory.visitCount + 1,
    lastVisit: new Date().toISOString(),
  };
}

export function hasCompleteLead(memory: ChatMemory): boolean {
  return Boolean(memory.userName && memory.userEmail && memory.userPhone);
}
