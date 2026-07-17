"use client";

import dynamic from "next/dynamic";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
/* ask-ai.css loaded post-paint via MarketingDeferredCss */

const AskAiPanel = dynamic(
  () =>
    import("./AskAiPanel")
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
 * Fixed right-edge Ask AI launcher that toggles the Bitcraftly AI panel.
 * Panel code loads only when opened to keep first-load JS smaller.
 */
export function AskAiTab() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
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

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      const frame = requestAnimationFrame(() => {
        rootRef.current
          ?.querySelector<HTMLButtonElement>(".ask-ai-panel-close")
          ?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }

    if (wasOpenRef.current) {
      wasOpenRef.current = false;
      tabRef.current?.focus();
    }
  }, [open]);

  return (
    <div ref={rootRef} className="ask-ai-root">
      {open ? (
        <AskAiPanel id={panelId} onClose={() => setOpen(false)} />
      ) : null}

      <button
        ref={tabRef}
        type="button"
        className="ask-ai-tab"
        aria-label={open ? "Close Ask AI" : "Ask AI"}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
      >
        <Icon
          name={open ? "close" : "sparkles"}
          size="sm"
          className="ask-ai-tab-icon"
          aria-hidden
        />
        <span className="ask-ai-tab-label">{open ? "Close" : "Ask AI"}</span>
      </button>
    </div>
  );
}
