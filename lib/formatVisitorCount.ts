/** Stable SSR/client formatting (Indian-style grouping, no locale hydration mismatches). */
export function formatVisitorCount(count: number): string {
  const str = String(Math.max(0, Math.floor(count)));
  if (str.length <= 3) return str;
  let result = str.slice(-3);
  let remaining = str.slice(0, -3);
  while (remaining.length > 0) {
    const chunk = remaining.length > 2 ? remaining.slice(-2) : remaining;
    result = `${chunk},${result}`;
    remaining = remaining.length > 2 ? remaining.slice(0, -2) : "";
  }
  return result;
}
