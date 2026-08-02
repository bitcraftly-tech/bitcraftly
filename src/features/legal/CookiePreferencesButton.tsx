'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';

const STORAGE_KEY = 'bitcraftly_cookie_preferences';

interface CookiePreferences {
  necessary: true;
  analytics: boolean;
}

const DEFAULT_PREFS: CookiePreferences = {
  necessary: true,
  analytics: false,
};

function readPreferences(): CookiePreferences {
  if (typeof window === 'undefined') return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

/**
 * Footer Cookies control — opens preferences dialog (bitcraftly.com parity).
 */
export function CookiePreferencesButton({
  className,
  children = 'Cookies',
}: {
  className?: string;
  children?: ReactNode;
}) {
  const dialogId = useId();
  const titleId = `${dialogId}-title`;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULT_PREFS);

  useEffect(() => {
    if (open) {
      setPrefs(readPreferences());
      /* Dialog skin — never render-blocking on first paint. */
      void import('./cookie-prefs.css');
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Restore focus after close only — skip initial mount (open starts false).
  const wasOpenRef = useRef(false);
  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      return;
    }
    if (wasOpenRef.current) {
      buttonRef.current?.focus();
      wasOpenRef.current = false;
    }
  }, [open]);

  function save() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setOpen(false);
  }

  return (
    <>
      <button ref={buttonRef} type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>

      {open ? (
        <div className="cookie-prefs" role="presentation">
          <button
            type="button"
            className="cookie-prefs__backdrop"
            aria-label="Close cookie preferences"
            onClick={() => setOpen(false)}
          />
          <div
            className="cookie-prefs__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="cookie-prefs__header">
              <h2 id={titleId}>Cookie preferences</h2>
              <button
                type="button"
                className="cookie-prefs__close"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                <Icon name="close" size="sm" aria-hidden />
              </button>
            </div>
            <p className="cookie-prefs__lede">
              We use necessary cookies to run the site. Optional analytics cookies help us improve
              Bitcraftly — only if you allow them.
            </p>

            <ul className="cookie-prefs__list">
              <li>
                <div>
                  <p className="cookie-prefs__label">Necessary</p>
                  <p className="cookie-prefs__desc">
                    Required for security, session, and basic site function.
                  </p>
                </div>
                <span className="cookie-prefs__locked">Always on</span>
              </li>
              <li>
                <div>
                  <p className="cookie-prefs__label">Analytics</p>
                  <p className="cookie-prefs__desc">
                    Helps us understand traffic and improve pages. Off by default.
                  </p>
                </div>
                <label className="cookie-prefs__switch">
                  <span className="sr-only">Allow analytics cookies</span>
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(event) =>
                      setPrefs({
                        necessary: true,
                        analytics: event.target.checked,
                      })
                    }
                  />
                </label>
              </li>
            </ul>

            <div className="cookie-prefs__actions">
              <button
                type="button"
                className={cn('cookie-prefs__btn cookie-prefs__btn--primary')}
                onClick={save}
              >
                Save preferences
              </button>
              <button
                type="button"
                className={cn('cookie-prefs__btn cookie-prefs__btn--ghost')}
                onClick={() => {
                  setPrefs({ necessary: true, analytics: false });
                  window.localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify({ necessary: true, analytics: false }),
                  );
                  setOpen(false);
                }}
              >
                Reject optional
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
