"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { AskAiPanel } from "./AskAiPanel";
import "./ask-ai.css";

/**
 * Fixed right-edge Ask AI launcher that toggles the Bitcraftly AI panel.
 */
export function AskAiTab() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
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

  return (
    <div ref={rootRef} className="ask-ai-root">
      {open ? (
        <AskAiPanel id={panelId} onClose={() => setOpen(false)} />
      ) : null}

      <button
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
