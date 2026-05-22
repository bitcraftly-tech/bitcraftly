import type { BitcraftlyLoaderVariant, LoaderDensity, LoaderTheme } from "@/components/loading/loaderTypes";
import { LOADER_CONTENT_WIDTH, LOADER_CONTENT_WIDTH_AURA } from "@/lib/loader/config";

export function resolveLayout(
  variant?: BitcraftlyLoaderVariant,
  density?: LoaderDensity,
  theme?: LoaderTheme,
): { density: LoaderDensity; theme: LoaderTheme } {
  if (density && theme) return { density, theme };
  switch (variant) {
    case "compact":
      return { density: "compact", theme: "light" };
    case "dark":
      return { density: "fullscreen", theme: "dark" };
    default:
      return { density: "fullscreen", theme: "light" };
  }
}

export const GLOW: Record<LoaderTheme, string> = {
  light:
    "radial-gradient(ellipse 80% 55% at 50% 38%, rgba(124, 58, 237, 0.14), rgba(237, 233, 254, 0.35) 45%, transparent 72%)",
  dark: "radial-gradient(ellipse 80% 55% at 50% 38%, rgba(124, 58, 237, 0.22), rgba(28, 28, 39, 0.5) 50%, transparent 72%)",
};

export function loaderShell(
  theme: LoaderTheme,
  density: LoaderDensity,
  contentWidth: string,
): { overlay: string; card: string; title: string; tagline: string; label: string; isCompact: boolean } {
  const isCompact = density === "compact";
  const overlay =
    theme === "dark"
      ? isCompact
        ? "bg-[#0a0a0f]/82 backdrop-blur-md"
        : "bg-[#0a0a0f]/96"
      : isCompact
        ? "bg-white/78 backdrop-blur-md"
        : "bg-white";

  const card =
    theme === "dark"
      ? `rounded-xl border border-[#2a2a3d] bg-[#13131a]/92 px-5 py-5 shadow-[0_6px_28px_rgba(0,0,0,0.35)] ${contentWidth}`
      : isCompact
        ? `rounded-xl border border-[#e8ecef]/90 bg-white/95 px-5 py-5 shadow-[0_6px_28px_rgba(17,24,39,0.08)] ${contentWidth}`
        : contentWidth;

  const title = theme === "dark" ? "text-[#f0eff8]" : "text-[#111827]";
  const tagline = theme === "dark" ? "text-[#b8b7c8]" : "text-[#111827]/85";
  const label = theme === "dark" ? "text-[#8888aa]" : "text-[#9ca3af]";

  return { overlay, card, title, tagline, label, isCompact };
}

export const CONTENT_WIDTH_CLASSIC = LOADER_CONTENT_WIDTH;
export const CONTENT_WIDTH_AURA = LOADER_CONTENT_WIDTH_AURA;
