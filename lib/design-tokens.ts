/**
 * Bitcraftly Design System — token names (values live in app/globals.css :root / @theme).
 * Light-mode typography & color tokens only; dark theme tokens are unchanged in CSS.
 */

export const DS_FONT_VARS = {
  sans: "--font-geist-sans",
  mono: "--font-geist-mono",
  /** Legacy aliases → Geist Sans */
  inter: "--font-inter",
  playfair: "--font-playfair",
} as const;

export const DS_COLOR_VARS = {
  background: {
    primary: "--background-primary",
    secondary: "--background-secondary",
    section: "--background-section",
    surface: "--background-surface",
    hover: "--background-hover",
  },
  text: {
    primary: "--text-primary",
    secondary: "--text-secondary",
    muted: "--text-muted",
    disabled: "--text-disabled",
  },
  brand: {
    primary: "--brand-primary",
    hover: "--brand-hover",
    soft: "--brand-soft",
  },
  border: {
    default: "--border-default",
    divider: "--border-divider",
    card: "--border-card",
  },
  status: {
    success: "--status-success",
    warning: "--status-warning",
    error: "--status-error",
    info: "--status-info",
  },
  button: {
    primaryBg: "--btn-primary-bg",
    primaryHover: "--btn-primary-hover",
    primaryText: "--btn-primary-text",
    secondaryBg: "--btn-secondary-bg",
    secondaryBorder: "--btn-secondary-border",
    secondaryText: "--btn-secondary-text",
    secondaryHover: "--btn-secondary-hover",
  },
} as const;

export const DS_RADIUS_VARS = {
  card: "--radius-card",
} as const;

export const DS_SHADOW_VARS = {
  card: "--shadow-card",
  cardHover: "--shadow-card-hover",
} as const;
