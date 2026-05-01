import type { ClientChatMessage } from "./types";

const STORAGE_KEY = "bitcraftly.supportChat.v1";
const MAX_STORED = 80;

export function loadChatMessages(): ClientChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const out = parsed.filter(
      (item): item is ClientChatMessage =>
        Boolean(item && typeof item === "object" && typeof (item as ClientChatMessage).id === "string"),
    );
    return out.slice(-MAX_STORED);
  } catch {
    return [];
  }
}

export function saveChatMessages(messages: ClientChatMessage[]) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED)));
  } catch {
    /* quota / privacy mode */
  }
}

export function clearChatMessages() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* noop */
  }
}
