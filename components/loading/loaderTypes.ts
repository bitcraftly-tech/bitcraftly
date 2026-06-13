export type BitcraftlyLoaderVariant = "light" | "dark" | "compact" | "fullscreen";
export type LoaderDensity = "fullscreen" | "compact";
export type LoaderTheme = "light" | "dark";

export type BitcraftlyLoaderProps = {
  show: boolean;
  /** Initial page load — overlay appears instantly (no fade-in over content). */
  instantEnter?: boolean;
  variant?: BitcraftlyLoaderVariant;
  density?: LoaderDensity;
  theme?: LoaderTheme;
  onExitComplete?: () => void;
};
