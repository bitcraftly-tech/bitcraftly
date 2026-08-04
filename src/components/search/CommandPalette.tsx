'use client';

import { useCallback, useEffect, useState } from 'react';
import { Icon } from '@/components/ui/icon';
import { SearchDialog } from './SearchDialog';
import './search-dialog.css';

export interface CommandPaletteProps {
  /** Show the visible search trigger button. Default true. */
  readonly showTrigger?: boolean;
  readonly triggerLabel?: string;
  readonly className?: string;
  /** Controlled open state. */
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
}

/**
 * Premium global command palette (Linear / Vercel / Raycast style).
 * Opens with Ctrl/Cmd + K. Frontend mock index only — no backend.
 */
export function CommandPalette({
  showTrigger = true,
  triggerLabel = 'Search',
  className,
  open: controlledOpen,
  onOpenChange,
}: CommandPaletteProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/i.test(window.navigator.platform));
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        (event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey);

      if (!isShortcut) {
        return;
      }

      event.preventDefault();
      setOpen(!open);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, setOpen]);

  return (
    <div className={['gs-root', className].filter(Boolean).join(' ')}>
      {showTrigger ? (
        <button
          type="button"
          className="gs-trigger"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label="Open command palette"
        >
          <Icon name="search" size="sm" aria-hidden className="h-[14px] w-[14px]" />
          <span>{triggerLabel}</span>
          <span className="gs-trigger__kbd" aria-hidden>
            {isMac ? '⌘' : 'Ctrl'}
            <span>K</span>
          </span>
        </button>
      ) : null}

      <SearchDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}
