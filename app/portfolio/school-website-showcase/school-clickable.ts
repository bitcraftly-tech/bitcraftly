import type { KeyboardEvent } from "react";

/** Accessible card trigger without invalid `<button>` + block descendants. */
export function schoolCardClickProps(onClick: () => void) {
  return {
    role: "button" as const,
    tabIndex: 0,
    onClick,
    onKeyDown: (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
  };
}
