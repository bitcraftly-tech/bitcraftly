'use client';

import { CommandPalette, type CommandPaletteProps } from './CommandPalette';

/** @deprecated Prefer `CommandPalette`. Alias kept for compatibility. */
export type GlobalSearchProps = CommandPaletteProps;

/** @deprecated Prefer `CommandPalette`. */
export function GlobalSearch(props: GlobalSearchProps) {
  return <CommandPalette {...props} />;
}
