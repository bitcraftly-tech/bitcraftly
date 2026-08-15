import type { CartLine } from './EcommerceDemoContext';
import type { ShopProduct } from './ecommerce-demo-data';

export function mergeCartLine(cart: CartLine[], product: ShopProduct, qty = 1): CartLine[] {
  const existing = cart.find((l) => l.product.id === product.id);
  if (existing) {
    return cart.map((l) => (l.product.id === product.id ? { ...l, qty: l.qty + qty } : l));
  }
  return [...cart, { product, qty }];
}

export function cartLinesSubtotal(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.product.price * l.qty, 0);
}

export function cartLinesCount(lines: CartLine[]) {
  return lines.reduce((n, l) => n + l.qty, 0);
}
