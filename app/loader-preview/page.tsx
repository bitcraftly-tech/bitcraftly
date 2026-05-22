"use client";

import { useState } from "react";

import BitcraftlyLoader from "@/components/loading/BitcraftlyLoader";
import type { LoaderDensity, LoaderTheme } from "@/components/loading/BitcraftlyLoader";
import { LOADER_DESIGN, LOADER_ENABLED, type LoaderDesign } from "@/lib/loader/config";

export default function LoaderPreviewPage() {
  const [show, setShow] = useState(true);
  const [density, setDensity] = useState<LoaderDensity>("fullscreen");
  const [theme, setTheme] = useState<LoaderTheme>("light");
  const activeDesign: LoaderDesign = LOADER_DESIGN;

  const replay = () => {
    setShow(false);
    window.setTimeout(() => setShow(true), 80);
  };

  return (
    <>
      <div className="relative z-[1] mx-auto max-w-lg space-y-4 p-6">
        <h1 className="text-lg font-bold text-[#111827]">Bitcraftly loader preview</h1>
        <p className="text-sm text-[#6B7280]">
          Live preview — same component used site-wide. Toggle options below, then Replay animation.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={replay}
            className="rounded-lg bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white"
          >
            Replay loader
          </button>
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-semibold text-[#111827]"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
        <div className="flex flex-wrap gap-3 text-sm">
          <label className="flex items-center gap-2">
            <span className="text-[#6B7280]">Density</span>
            <select
              value={density}
              onChange={(e) => setDensity(e.target.value as LoaderDensity)}
              className="rounded border border-[#E5E7EB] px-2 py-1"
            >
              <option value="fullscreen">Fullscreen (first visit)</option>
              <option value="compact">Compact (route change)</option>
            </select>
          </label>
          <label className="flex items-center gap-2">
            <span className="text-[#6B7280]">Theme</span>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as LoaderTheme)}
              className="rounded border border-[#E5E7EB] px-2 py-1"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>
        <p className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 text-xs text-[#6B7280]">
          Site loader: <strong className="text-[#111827]">{LOADER_ENABLED ? "ON" : "OFF"}</strong> — set{" "}
          <code className="text-[#4F46E5]">LOADER_ENABLED</code> in config.
        </p>
        <p className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2 text-xs text-[#6B7280]">
          Active design: <strong className="text-[#111827]">{activeDesign}</strong>
          {activeDesign === "aura"
            ? " — orbit ring, pulse waves, gradient sweep bar."
            : " — centered logo, dot wave, glow pulse."}{" "}
          Change <code className="text-[#4F46E5]">LOADER_DESIGN</code> in{" "}
          <code className="text-[#4F46E5]">lib/loader/config.ts</code>.
        </p>
        <p className="text-xs text-[#9CA3AF]">
          Production: fullscreen loader on every page load; route changes show compact ~420ms.
        </p>
      </div>

      <BitcraftlyLoader show={show} density={density} theme={theme} />
    </>
  );
}
