"use client";

import { useEffect, useRef, useState } from "react";

/**
 * TEMPORARY iOS scroll diagnostic overlay.
 *
 * Renders NOTHING unless the URL contains `?debug-ios=1`, so it has zero effect
 * on production behavior. When enabled it shows live document/viewport/scroll
 * metrics, the footer bottom position, the element with the maximum bottom
 * coordinate (outlined red), and a red line drawn at the document's bottom edge
 * (documentElement.scrollHeight) in viewport space.
 *
 * Purpose: distinguish "an element extends the document" (red line sits below
 * the footer) from "the browser paints beyond the document" (white appears
 * below the red line — i.e. iOS overscroll / dynamic-toolbar / viewport gap).
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
  scrollY: number;
  scrollingScrollTop: number | null;
  scrollYPlusInner: number;
  overscroll: number; // (scrollY + innerHeight) - htmlScrollHeight
  vvOffsetTop: number | null;
  vvPageTop: number | null;
  vvOffsetLeft: number | null;
  vvScale: number | null;
  scrollingClientHeight: number | null;
  scrollingScrollHeight: number | null;
  htmlClientHeight: number;
  bodyClientHeight: number;
  safeAreaInsetBottom: number | null; // measured env(safe-area-inset-bottom)
  screenHeight: number | null;
  exposedBand: number | null; // screen.height - (vv.height + vv.offsetTop)
  lineTop: number; // viewport-space y of documentElement.scrollHeight
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

// Runtime build id so we can confirm exactly which deploy is serving the overlay.
// Vercel auto-exposes NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA for Next.js projects.
const BUILD_SHA = (process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || "local").slice(0, 7);

export default function IosScrollDebugOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const safeAreaProbeRef = useRef<HTMLDivElement>(null);
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
      const scrollingEl = document.scrollingElement as HTMLElement | null;
      const vv = window.visualViewport;
      const footer = document.querySelector("footer");
      const footerBottom = footer
        ? Math.round(footer.getBoundingClientRect().bottom + window.scrollY)
        : null;

      let maxEl: HTMLElement | null = null;
      let maxBottom = -Infinity;

      document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
        if (el.hasAttribute("data-ios-debug")) return;
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

      const htmlScrollHeight = de.scrollHeight;
      const scrollY = Math.round(window.scrollY);
      const innerHeight = window.innerHeight;

      let safeAreaInsetBottom: number | null = null;
      if (safeAreaProbeRef.current) {
        const probePad = getComputedStyle(safeAreaProbeRef.current).paddingBottom;
        const parsed = parseFloat(probePad);
        safeAreaInsetBottom = Number.isFinite(parsed) ? Math.round(parsed) : null;
      }
      const screenHeight =
        typeof window.screen?.height === "number" ? Math.round(window.screen.height) : null;
      const exposedBand =
        vv && screenHeight != null
          ? Math.round(screenHeight - (vv.height + vv.offsetTop))
          : null;

      setMetrics({
        htmlScrollHeight,
        bodyScrollHeight: document.body.scrollHeight,
        innerHeight,
        visualViewportHeight: vv ? Math.round(vv.height) : null,
        footerBottom,
        spaceBelowFooter: footerBottom != null ? htmlScrollHeight - footerBottom : null,
        scrollY,
        scrollingScrollTop: scrollingEl ? Math.round(scrollingEl.scrollTop) : null,
        scrollYPlusInner: scrollY + innerHeight,
        overscroll: scrollY + innerHeight - htmlScrollHeight,
        vvOffsetTop: vv ? Math.round(vv.offsetTop) : null,
        vvPageTop: vv && "pageTop" in vv ? Math.round((vv as VisualViewport & { pageTop: number }).pageTop) : null,
        vvOffsetLeft: vv ? Math.round(vv.offsetLeft) : null,
        vvScale: vv ? Number(vv.scale.toFixed(3)) : null,
        scrollingClientHeight: scrollingEl ? scrollingEl.clientHeight : null,
        scrollingScrollHeight: scrollingEl ? scrollingEl.scrollHeight : null,
        htmlClientHeight: de.clientHeight,
        bodyClientHeight: document.body.clientHeight,
        safeAreaInsetBottom,
        screenHeight,
        exposedBand,
        lineTop: htmlScrollHeight - scrollY,
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
    const interval = window.setInterval(measure, 250);

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

  const overscrollPositive = metrics.overscroll > 0;

  const band = metrics.exposedBand;
  const safe = metrics.safeAreaInsetBottom;
  let bandVerdict = "";
  let bandColor = "#8affc1";
  if (band != null && safe != null) {
    const diff = band - safe;
    if (band <= 1) {
      bandVerdict = "no exposed band";
    } else if (Math.abs(diff) <= 2) {
      bandVerdict = "== safe-area  → viewport-fit cover CONFIRMED";
    } else if (diff > 2) {
      bandVerdict = `> safe-area by ${diff}px  → NOT just safe-area, keep investigating`;
      bandColor = "#ff3b3b";
    } else {
      bandVerdict = `< safe-area by ${-diff}px`;
      bandColor = "#ffd166";
    }
  }

  const rows: Array<[string, string | number | null]> = [
    ["(scrollY+inner)-scrollH", metrics.overscroll],
    ["html.scrollHeight", metrics.htmlScrollHeight],
    ["body.scrollHeight", metrics.bodyScrollHeight],
    ["footer bottom", metrics.footerBottom],
    ["space BELOW footer", metrics.spaceBelowFooter],
    ["window.innerHeight", metrics.innerHeight],
    ["visualViewport.height", metrics.visualViewportHeight],
    ["window.scrollY", metrics.scrollY],
    ["scrollingEl.scrollTop", metrics.scrollingScrollTop],
    ["scrollY+innerHeight", metrics.scrollYPlusInner],
    ["vv.offsetTop", metrics.vvOffsetTop],
    ["vv.pageTop", metrics.vvPageTop],
    ["vv.offsetLeft", metrics.vvOffsetLeft],
    ["vv.scale", metrics.vvScale],
    ["scrollingEl.clientH", metrics.scrollingClientHeight],
    ["scrollingEl.scrollH", metrics.scrollingScrollHeight],
    ["html.clientHeight", metrics.htmlClientHeight],
    ["body.clientHeight", metrics.bodyClientHeight],
    ["── viewport canvas ──", ""],
    ["screen.height", metrics.screenHeight],
    ["visualViewport.height", metrics.visualViewportHeight],
    ["vv.offsetTop", metrics.vvOffsetTop],
    ["safe-area-inset-bottom", metrics.safeAreaInsetBottom],
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
    <>
      <div
        ref={overlayRef}
        data-ios-debug
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 2147483647,
          maxHeight: "50vh",
          maxWidth: "min(94vw, 360px)",
          overflow: "auto",
          padding: "8px 10px",
          background: "rgba(0,0,0,0.9)",
          color: "#00ff88",
          font: "10px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace",
          pointerEvents: "none",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          borderTopLeftRadius: 8,
        }}
      >
        <div style={{ color: "#ffd166", fontWeight: 700, marginBottom: 4 }}>
          iOS scroll debug (?debug-ios=1) · red line = document bottom
        </div>
        <div style={{ color: "#ffd166", fontWeight: 700, marginBottom: 4 }}>
          build {BUILD_SHA}
        </div>
        <div
          style={{
            color: overscrollPositive ? "#ff3b3b" : "#8affc1",
            fontWeight: 700,
            fontSize: 13,
            marginBottom: 4,
          }}
        >
          OVERSCROLL (scrollY+inner−scrollH): {metrics.overscroll}
          {overscrollPositive ? "  ← PAINTING BEYOND DOCUMENT" : ""}
        </div>
        <div
          style={{
            color: bandColor,
            fontWeight: 700,
            fontSize: 13,
            marginBottom: 4,
          }}
        >
          exposedBand = screen−(vv.h+vv.top): {band == null ? "n/a" : band}
          {bandVerdict ? `  ${bandVerdict}` : ""}
        </div>
        {rows.map(([label, value], i) => (
          <div key={`${i}-${label}`} style={{ display: "flex", gap: 8 }}>
            <span style={{ color: "#8ab4ff", minWidth: 148, flexShrink: 0 }}>{label}</span>
            <span
              style={{
                color:
                  label === "space BELOW footer" && Number(value) > 4 ? "#ff5c5c" : "#e6e6e6",
              }}
            >
              {value === null ? "n/a" : String(value)}
            </span>
          </div>
        ))}
      </div>

      {/* Red line drawn at documentElement.scrollHeight, in viewport space. */}
      <div
        ref={lineRef}
        data-ios-debug
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          top: metrics.lineTop,
          height: 0,
          borderTop: "2px solid red",
          zIndex: 2147483646,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            position: "absolute",
            right: 4,
            top: -14,
            font: "10px/1 ui-monospace, monospace",
            color: "red",
            background: "rgba(0,0,0,0.6)",
            padding: "1px 3px",
          }}
        >
          scrollHeight = {metrics.htmlScrollHeight}
        </span>
      </div>

      {/* Off-screen probe: paddingBottom resolves env(safe-area-inset-bottom) so
          we can read the raw inset value in JS. Invisible, no layout impact. */}
      <div
        ref={safeAreaProbeRef}
        data-ios-debug
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          visibility: "hidden",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
