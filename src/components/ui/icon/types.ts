export type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'sparkles'
  | 'check'
  | 'star'
  | 'menu'
  | 'close'
  | 'chevron-down'
  | 'chevron-right'
  | 'play'
  | 'quote'
  | 'globe'
  | 'shield'
  | 'rocket'
  | 'brain'
  | 'code'
  | 'database'
  | 'cloud'
  | 'trending-up'
  | 'bot'
  | 'workflow'
  | 'zap'
  | 'message'
  | 'calendar'
  | 'linkedin'
  | 'github'
  | 'x'
  | 'instagram'
  | 'youtube'
  | 'facebook'
  | 'mail'
  | 'phone'
  | 'map-pin'
  | 'layout-grid'
  | 'smartphone'
  | 'search'
  | 'headset';
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export interface IconDefinition {
  viewBox?: string;
  strokeWidth?: number;
  fill?: 'none' | 'currentColor';
  paths: readonly string[];
  circles?: readonly { cx: number; cy: number; r: number }[];
  rects?: readonly {
    x: number;
    y: number;
    width: number;
    height: number;
    rx?: number;
  }[];
  polylines?: readonly string[];
  polygons?: readonly string[];
}

export interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
  'aria-hidden'?: boolean;
  title?: string;
}

export const ICON_NAMES = [
  'arrow-right',
  'arrow-up-right',
  'sparkles',
  'check',
  'star',
  'menu',
  'close',
  'chevron-down',
  'chevron-right',
  'play',
  'quote',
  'globe',
  'shield',
  'rocket',
  'brain',
  'code',
  'database',
  'cloud',
  'trending-up',
  'bot',
  'workflow',
  'zap',
  'message',
  'calendar',
  'linkedin',
  'github',
  'x',
  'instagram',
  'youtube',
  'facebook',
  'mail',
  'phone',
  'map-pin',
  'layout-grid',
  'smartphone',
  'search',
  'headset',
] as const satisfies readonly IconName[];
