'use client';

import dynamic from 'next/dynamic';
import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/cn';
import './ask-ai.css';

/** Flip to `true` when the Ask AI launcher should show again. */
const ASK_AI_ENABLED = false;

const AskAiPanel = dynamic(
  () =>
    import('./AskAiPanel')
      .then((mod) => mod.AskAiPanel)
      .catch(() => {
        function AskAiPanelUnavailable() {
          return null;
        }
        return AskAiPanelUnavailable;
      }),
  { ssr: false },
);

/**
 * Ask AI launcher entry — currently hidden via ASK_AI_ENABLED.
 */
export function AskAiTab() {
  if (!ASK_AI_ENABLED) {
    return null;
  }

  return <AskAiTabActive />;
}

/**
 * Viewport-fixed Ask AI launcher (ported to document.body).
 * Inline position styles keep the FAB fixed even if CSS chunks load late.
 */
function AskAiTabActive() {
  const [open, setOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const panelId = useId();

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    function onPointerDown(event: MouseEvent | PointerEvent) {
      const root = rootRef.current;
      if (!root) return;
      if (event.target instanceof Node && !root.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      const frame = requestAnimationFrame(() => {
        rootRef.current?.querySelector<HTMLButtonElement>('.ask-ai-panel-close')?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      tabRef.current?.focus();
    }
  }, [open]);

  const fabStyle: CSSProperties = {
    position: 'fixed',
    top: '50%',
    right: 16,
    bottom: 'auto',
    left: 'auto',
    zIndex: 1300,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    minHeight: 48,
    padding: '0 16px 0 12px',
    border: 0,
    borderRadius: 9999,
    background: open ? 'var(--foreground)' : 'var(--primary)',
    color: '#ffffff',
    cursor: 'pointer',
    translate: '0 -50%',
  };

  const ui = (
    <div ref={rootRef} className="ask-ai-root">
      {open ? <AskAiPanel id={panelId} onClose={() => setOpen(false)} /> : null}

      <button
        ref={tabRef}
        type="button"
        className={cn('ask-ai-fab', open && 'ask-ai-fab--open')}
        style={fabStyle}
        aria-label={open ? 'Close Ask AI' : 'Ask AI'}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="ask-ai-fab-icon" aria-hidden>
          <Icon name={open ? 'close' : 'sparkles'} size="sm" />
        </span>
        <span className="ask-ai-fab-label">{open ? 'Close' : 'Ask AI'}</span>
      </button>
    </div>
  );

  if (!portalReady) {
    return null;
  }

  return createPortal(ui, document.body);
}
