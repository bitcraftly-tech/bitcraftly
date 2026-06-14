/** Scroll to marketing page sections without hash URLs */

export const SCROLL_TARGET_STORAGE_KEY = "landingTargetSection";
export const SCROLL_PATH_STORAGE_KEY = "landingTargetPath";

type ScrollOptions = {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
};

export function scrollToElementById(sectionId: string, options?: ScrollOptions): boolean {
  if (typeof document === "undefined") return false;

  const element = document.getElementById(sectionId);
  if (!element) return false;

  element.scrollIntoView({
    behavior: options?.behavior ?? "smooth",
    block: options?.block ?? "start",
  });
  return true;
}

type RetryOptions = ScrollOptions & {
  maxWaitMs?: number;
  intervalMs?: number;
  startDelayMs?: number;
  onSuccess?: () => void;
};

/** Retries until the section mounts (dynamic imports). Clears pending target only on success. */
export function scrollToElementWithRetry(sectionId: string, options?: RetryOptions): () => void {
  if (typeof window === "undefined") return () => undefined;

  const maxWaitMs = options?.maxWaitMs ?? 15_000;
  const intervalMs = options?.intervalMs ?? 100;
  const startDelayMs = options?.startDelayMs ?? 80;
  const startedAt = Date.now();
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const finish = () => {
    options?.onSuccess?.();
  };

  const attempt = () => {
    if (cancelled) return;

    if (scrollToElementById(sectionId, options)) {
      finish();
      return;
    }

    if (Date.now() - startedAt >= maxWaitMs) return;

    timer = window.setTimeout(attempt, intervalMs);
  };

  timer = window.setTimeout(attempt, startDelayMs);

  return () => {
    cancelled = true;
    if (timer) window.clearTimeout(timer);
  };
}

export type FooterSectionLink = {
  label: string;
  path: string;
  sectionId: string;
};

type NavigateToSectionArgs = {
  path: string;
  sectionId: string;
  pathname?: string | null;
  push?: (url: string, options?: { scroll?: boolean }) => void;
};

export function setPendingScrollTarget(path: string, sectionId: string): void {
  if (typeof window === "undefined") return;

  const basePath = path.split("?")[0] || "/";
  window.sessionStorage.setItem(SCROLL_PATH_STORAGE_KEY, basePath);
  window.sessionStorage.setItem(SCROLL_TARGET_STORAGE_KEY, sectionId);
}

export function getPendingScrollTarget(pathname: string): string | undefined {
  if (typeof window === "undefined") return undefined;

  const targetPath = window.sessionStorage.getItem(SCROLL_PATH_STORAGE_KEY);
  const sectionId = window.sessionStorage.getItem(SCROLL_TARGET_STORAGE_KEY);

  if (!targetPath || !sectionId || targetPath !== pathname) return undefined;
  return sectionId;
}

export function clearPendingScrollTarget(): void {
  if (typeof window === "undefined") return;

  window.sessionStorage.removeItem(SCROLL_PATH_STORAGE_KEY);
  window.sessionStorage.removeItem(SCROLL_TARGET_STORAGE_KEY);
}

export function hasPendingScrollTarget(pathname?: string): boolean {
  if (typeof window === "undefined") return false;
  if (!pathname) {
    return Boolean(window.sessionStorage.getItem(SCROLL_TARGET_STORAGE_KEY));
  }
  return Boolean(getPendingScrollTarget(pathname));
}

export function navigateToMarketingSection({ path, sectionId, pathname, push }: NavigateToSectionArgs): void {
  const basePath = path.split("?")[0] || "/";
  const onSamePage = pathname === basePath;

  if (onSamePage && typeof window !== "undefined") {
    clearPendingScrollTarget();
    scrollToElementWithRetry(sectionId, {
      onSuccess: clearPendingScrollTarget,
    });
    return;
  }

  setPendingScrollTarget(basePath, sectionId);
  push?.(basePath, { scroll: false });
}

/** @deprecated Use getPendingScrollTarget + clearPendingScrollTarget */
export function consumePendingScrollTarget(): string | undefined {
  if (typeof window === "undefined") return undefined;

  const sectionId = window.sessionStorage.getItem(SCROLL_TARGET_STORAGE_KEY) ?? undefined;
  if (sectionId) {
    clearPendingScrollTarget();
  }
  return sectionId;
}
