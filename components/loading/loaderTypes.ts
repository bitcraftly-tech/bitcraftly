export type BitcraftlyLoaderVariant = "light" | "dark" | "compact" | "fullscreen";
export type LoaderDensity = "fullscreen" | "compact";
export type LoaderTheme = "light" | "dark";

export type BitcraftlyLoaderProps = {
  show: boolean;
  variant?: BitcraftlyLoaderVariant;
  density?: LoaderDensity;
  theme?: LoaderTheme;
  onExitComplete?: () => void;
};
