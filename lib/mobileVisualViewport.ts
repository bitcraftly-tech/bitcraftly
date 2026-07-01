/** Sync CSS vars + pin fixed bottom chrome to iOS visual viewport (Chrome/Safari). */

const MOBILE_MQ = "(max-width: 767px)";

export function isMobileViewport(): boolean {
  return typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches;
}

function pinFixedBottomElement(el: HTMLElement, vv: VisualViewport): void {
  const height = el.offsetHeight;
  el.style.position = "fixed";
  el.style.left = "0";
  el.style.right = "0";
  el.style.bottom = "auto";
  el.style.top = `${Math.round(vv.offsetTop + vv.height - height)}px`;
}

export function syncMobileVisualViewport(): void {
  if (typeof window === "undefined" || !isMobileViewport()) return;

  const root = document.documentElement;
  const vv = window.visualViewport;

  if (!vv) {
    root.style.removeProperty("--bc-vv-top");
    root.style.removeProperty("--bc-vv-height");
    return;
  }

  const top = Math.round(vv.offsetTop);
  const height = Math.round(vv.height);

  root.style.setProperty("--bc-vv-top", `${top}px`);
  root.style.setProperty("--bc-vv-height", `${height}px`);

  document.querySelectorAll<HTMLElement>(".bc-mobile-sticky-cta").forEach((el) => {
    pinFixedBottomElement(el, vv);
  });
}

export function clampMobileOverscroll(): void {
  if (typeof window === "undefined" || !isMobileViewport()) return;

  const root = document.documentElement;
  const maxScroll = Math.max(0, root.scrollHeight - window.innerHeight);

  if (window.scrollY > maxScroll + 2) {
    window.scrollTo(0, maxScroll);
  }
}

let listenersBound = false;

/** One listener for all mobile fixed-bottom UI — call once from layout chrome. */
export function bindMobileVisualViewportSync(): () => void {
  if (typeof window === "undefined" || listenersBound) {
    return () => {};
  }

  listenersBound = true;
  const mobileMq = window.matchMedia(MOBILE_MQ);

  const sync = () => {
    if (!mobileMq.matches) {
      document.documentElement.style.removeProperty("--bc-vv-top");
      document.documentElement.style.removeProperty("--bc-vv-height");
      document.querySelectorAll<HTMLElement>(".bc-mobile-sticky-cta").forEach((el) => {
        el.style.top = "";
        el.style.bottom = "";
      });
      return;
    }

    syncMobileVisualViewport();
    clampMobileOverscroll();
  };

  sync();

  window.visualViewport?.addEventListener("resize", sync);
  window.visualViewport?.addEventListener("scroll", sync);
  window.addEventListener("resize", sync);
  window.addEventListener("orientationchange", sync);
  window.addEventListener("scroll", sync, { passive: true });
  mobileMq.addEventListener("change", sync);

  return () => {
    listenersBound = false;
    window.visualViewport?.removeEventListener("resize", sync);
    window.visualViewport?.removeEventListener("scroll", sync);
    window.removeEventListener("resize", sync);
    window.removeEventListener("orientationchange", sync);
    window.removeEventListener("scroll", sync);
    mobileMq.removeEventListener("change", sync);
  };
}
