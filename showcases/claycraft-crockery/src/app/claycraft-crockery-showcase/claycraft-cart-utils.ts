import type { ClayCraftProduct } from './claycraft-products';

export type ClayCraftCartLine = {
  productId: string;
  qty: number;
  colorId?: string;
  size?: string;
};

export function mergeCartLine(
  cart: ClayCraftCartLine[],
  productId: string,
  qty = 1,
  opts?: { colorId?: string; size?: string },
): ClayCraftCartLine[] {
  const colorId = opts?.colorId;
  const size = opts?.size;
  const existing = cart.find(
    (l) => l.productId === productId && l.colorId === colorId && l.size === size,
  );
  if (existing) {
    return cart.map((l) =>
      l.productId === productId && l.colorId === colorId && l.size === size
        ? { ...l, qty: l.qty + qty }
        : l,
    );
  }
  return [...cart, { productId, qty, colorId, size }];
}

export function cartLinesCount(lines: ClayCraftCartLine[]): number {
  return lines.reduce((n, l) => n + l.qty, 0);
}

export function cartLinesSubtotal(
  lines: ClayCraftCartLine[],
  getProduct: (id: string) => ClayCraftProduct | undefined,
): number {
  return lines.reduce((n, l) => {
    const p = getProduct(l.productId);
    return p ? n + p.price * l.qty : n;
  }, 0);
}
