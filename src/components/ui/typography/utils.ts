import { cn } from "@/lib/cn";
import type { Breakpoint, Responsive } from "./types";

function isResponsiveObject<T>(
  value: Responsive<T>,
): value is Partial<Record<Breakpoint, T>> {
  return typeof value === "object" && value !== null;
}

export function buildResponsiveClasses<T extends string | number>(
  value: Responsive<T> | undefined,
  classMap: Record<T, string>,
  defaultValue: T,
): string {
  if (value === undefined) {
    return classMap[defaultValue];
  }

  if (!isResponsiveObject(value)) {
    return classMap[value];
  }

  const baseToken = value.base ?? defaultValue;
  const baseClasses = classMap[baseToken];

  const breakpointClasses = (
    Object.entries(value) as [Breakpoint, T][]
  )
    .filter(([breakpoint]) => breakpoint !== "base")
    .map(([breakpoint, token]) =>
      classMap[token]
        .split(" ")
        .filter(Boolean)
        .map((cls) => `${breakpoint}:${cls}`)
        .join(" "),
    )
    .join(" ");

  return cn(baseClasses, breakpointClasses);
}

export function resolveHeadingLevel(
  as?: `h${1 | 2 | 3 | 4 | 5 | 6}`,
  level?: Responsive<1 | 2 | 3 | 4 | 5 | 6>,
): 1 | 2 | 3 | 4 | 5 | 6 {
  if (typeof level === "number") {
    return level;
  }

  if (as !== undefined) {
    return Number(as.charAt(1)) as 1 | 2 | 3 | 4 | 5 | 6;
  }

  if (level !== undefined && isResponsiveObject(level)) {
    return level.base ?? level.sm ?? level.md ?? level.lg ?? level.xl ?? 2;
  }

  return 2;
}
