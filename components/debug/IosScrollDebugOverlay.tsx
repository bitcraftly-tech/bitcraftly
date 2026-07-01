"use client";

import { useEffect, useRef, useState } from "react";

/**
 * TEMPORARY iOS scroll diagnostic overlay.
 *
 * Renders NOTHING unless the URL contains `?debug-ios=1`, so it has zero effect
 * on production behavior. When enabled it shows live document/viewport heights,
 * the footer bottom position, and the element with the maximum bottom coordinate
 * (the node that determines document height) — and outlines that element in red.
 *
 * Not for production use; safe to leave dormant because it is fully gated.
 */

type Metrics = {
  htmlScrollHeight: number;
  bodyScrollHeight: number;
  innerHeight: number;
  visualViewportHeight: number | null;
  footerBottom: number | null;
  spaceBelowFooter: number | null;
  maxTag: string;
  maxId: string;
  maxClass: string;
  maxBottom: number;
  maxPosition: string;
  maxTransform: string;
  maxHeight: string;
  maxOverflow: string;
};

const RED_OUTLINE = "3px solid red";

export default function IosScrollDebugOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const outlinedRef = useRef<HTMLElement | null>(null);
  const prevOutlineRef = useRef<string>("");

  useEffect(() => {
    try {
      setEnabled(new URLSearchParams(window.location.search).get("debug-ios") === "1");
    } catch {
      setEnabled(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;

    const measure = () => {
      const de = document.documentElement;
      const footer = document.querySelector("footer");
      const footerBottom = footer
        ? Math.round(footer.getBoundingClientRect().bottom + window.scrollY)
        : null;

      let maxEl: HTMLElement | null = null;
      let maxBottom = -Infinity;

      document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
        if (overlayRef.current && overlayRef.current.contains(el)) return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 && r.height === 0) return;
        const bottomDoc = r.bottom + window.scrollY;
        if (bottomDoc > maxBottom) {
          maxBottom = bottomDoc;
          maxEl = el;
        }
      });

      const nextEl: HTMLElement | null = maxEl;
      if (outlinedRef.current && outlinedRef.current !== nextEl) {
        outlinedRef.current.style.outline = prevOutlineRef.current;
        outlinedRef.current = null;
      }
      if (nextEl && outlinedRef.current !== nextEl) {
        prevOutlineRef.current = nextEl.style.outline;
        nextEl.style.outline = RED_OUTLINE;
        outlinedRef.current = nextEl;
      }

      const cs = nextEl ? getComputedStyle(nextEl) : null;
      const className = nextEl && typeof nextEl.className === "string" ? nextEl.className : "";

      setMetrics({
        htmlScrollHeight: de.scrollHeight,
        bodyScrollHeight: document.body.scrollHeight,
        innerHeight: window.innerHeight,
        visualViewportHeight: window.visualViewport ? Math.round(window.visualViewport.height) : null,
        footerBottom,
        spaceBelowFooter: footerBottom != null ? de.scrollHeight - footerBottom : null,
        maxTag: nextEl ? nextEl.tagName : "-",
        maxId: nextEl && nextEl.id ? nextEl.id : "-",
        maxClass: className || "-",
        maxBottom: Number.isFinite(maxBottom) ? Math.round(maxBottom) : 0,
        maxPosition: cs ? cs.position : "-",
        maxTransform: cs ? cs.transform : "-",
        maxHeight: cs ? cs.height : "-",
        maxOverflow: cs ? cs.overflow : "-",
      });
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("scroll", schedule);
    const interval = window.setInterval(measure, 1000);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("scroll", schedule);
      window.clearInterval(interval);
      if (outlinedRef.current) {
        outlinedRef.current.style.outline = prevOutlineRef.current;
        outlinedRef.current = null;
      }
    };
  }, [enabled]);

  if (!enabled || !metrics) return null;

  const rows: Array<[string, string | number | null]> = [
    ["html.scrollHeight", metrics.htmlScrollHeight],
    ["body.scrollHeight", metrics.bodyScrollHeight],
    ["window.innerHeight", metrics.innerHeight],
    ["visualViewport.height", metrics.visualViewportHeight],
    ["footer bottom", metrics.footerBottom],
    ["space BELOW footer", metrics.spaceBelowFooter],
    ["── max-bottom element ──", ""],
    ["tag", metrics.maxTag],
    ["id", metrics.maxId],
    ["class", metrics.maxClass],
    ["bottom coord", metrics.maxBottom],
    ["position", metrics.maxPosition],
    ["transform", metrics.maxTransform],
    ["height", metrics.maxHeight],
    ["overflow", metrics.maxOverflow],
  ];

  return (
    <div
      ref={overlayRef}
      data-ios-debug
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2147483647,
        maxHeight: "45vh",
        overflow: "auto",
        padding: "8px 10px",
        background: "rgba(0,0,0,0.85)",
        color: "#00ff88",
        font: "11px/1.45 ui-monospace, SFMono-Regular, Menlo, monospace",
        pointerEvents: "none",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      <div style={{ color: "#ffd166", fontWeight: 700, marginBottom: 4 }}>iOS scroll debug (?debug-ios=1)</div>
      {rows.map(([label, value]) => (
        <div key={label} style={{ display: "flex", gap: 8 }}>
          <span style={{ color: "#8ab4ff", minWidth: 148, flexShrink: 0 }}>{label}</span>
          <span style={{ color: label === "space BELOW footer" && Number(value) > 4 ? "#ff5c5c" : "#e6e6e6" }}>
            {value === null ? "n/a" : String(value)}
          </span>
        </div>
      ))}
    </div>
  );
}
