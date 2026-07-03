type SavedBodyStyles = {
  bodyOverflow: string;
  bodyPosition: string;
  bodyTop: string;
  bodyWidth: string;
  bodyPaddingRight: string;
  htmlOverflow: string;
};

type NavScrollLockState = {
  scrollY: number;
  htmlOverflow: string;
  bodyOverflow: string;
  bodyPaddingRight: string;
  onTouchMove: (event: TouchEvent) => void;
};

let lockCount = 0;
let savedScrollY = 0;
let savedStyles: SavedBodyStyles | null = null;

let navLockCount = 0;
let navLockState: NavScrollLockState | null = null;

function scrollbarWidth(): number {
  return window.innerWidth - document.documentElement.clientWidth;
}

function isInsideMobileNavPanel(target: EventTarget | null): boolean {
  if (!(target instanceof Node)) return false;
  const panel = document.getElementById("mobile-nav-panel");
  return Boolean(panel?.contains(target));
}

/** Modal scroll lock — body position fixed. Not for mobile nav (iOS fixed-descendant bug). */
export function lockBodyScroll(): void {
  if (typeof document === "undefined") return;

  if (lockCount === 0) {
    savedScrollY = window.scrollY;
    const body = document.body;
    const html = document.documentElement;

    savedStyles = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
      htmlOverflow: html.style.overflow,
    };

    const gutter = scrollbarWidth();
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.width = "100%";
    if (gutter > 0) {
      body.style.paddingRight = `${gutter}px`;
    }
    html.style.overflow = "hidden";
  }

  lockCount += 1;
}

export function unlockBodyScroll(): void {
  if (typeof document === "undefined") return;
  if (lockCount === 0) return;

  lockCount -= 1;
  if (lockCount > 0 || !savedStyles) return;

  const body = document.body;
  const html = document.documentElement;
  const restoreY = savedScrollY;

  body.style.overflow = savedStyles.bodyOverflow;
  body.style.position = savedStyles.bodyPosition;
  body.style.top = savedStyles.bodyTop;
  body.style.width = savedStyles.bodyWidth;
  body.style.paddingRight = savedStyles.bodyPaddingRight;
  html.style.overflow = savedStyles.htmlOverflow;

  savedStyles = null;
  window.scrollTo(0, restoreY);
}

/** Mobile nav scroll lock — no body top offset so viewport-fixed header/overlay stay visible on iOS. */
export function lockBodyScrollForNav(): void {
  if (typeof document === "undefined") return;

  if (navLockCount === 0) {
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;

    const onTouchMove = (event: TouchEvent) => {
      if (isInsideMobileNavPanel(event.target)) return;
      event.preventDefault();
    };

    navLockState = {
      scrollY,
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
      onTouchMove,
    };

    const gutter = scrollbarWidth();
    html.setAttribute("data-bc-nav-scroll-lock", "");
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (gutter > 0) {
      body.style.paddingRight = `${gutter}px`;
    }

    document.addEventListener("touchmove", onTouchMove, { passive: false });
  }

  navLockCount += 1;
}

export function unlockBodyScrollForNav(): void {
  if (typeof document === "undefined") return;
  if (navLockCount === 0) return;

  navLockCount -= 1;
  if (navLockCount > 0 || !navLockState) return;

  const html = document.documentElement;
  const body = document.body;
  const { scrollY, htmlOverflow, bodyOverflow, bodyPaddingRight, onTouchMove } = navLockState;

  document.removeEventListener("touchmove", onTouchMove);
  html.removeAttribute("data-bc-nav-scroll-lock");
  html.style.overflow = htmlOverflow;
  body.style.overflow = bodyOverflow;
  body.style.paddingRight = bodyPaddingRight;

  navLockState = null;
  window.scrollTo(0, scrollY);
}
