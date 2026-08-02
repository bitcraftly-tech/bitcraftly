export function formatClayCraftPrice(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export const CLAYCRAFT_FREE_SHIPPING_THRESHOLD = 999;
export const CLAYCRAFT_FLAT_SHIPPING = 99;
export const CLAYCRAFT_TAX_RATE = 0.05;

export type ClayCraftCoupon = {
  code: string;
  label: string;
  type: 'percent' | 'fixed';
  value: number;
};

export const CLAYCRAFT_COUPONS: readonly ClayCraftCoupon[] = [
  { code: 'CLAY10', label: '10% off', type: 'percent', value: 10 },
  { code: 'WELCOME50', label: '₹50 off', type: 'fixed', value: 50 },
  { code: 'TABLE20', label: '20% off', type: 'percent', value: 20 },
] as const;

export function findCoupon(code: string): ClayCraftCoupon | undefined {
  const normalized = code.trim().toUpperCase();
  return CLAYCRAFT_COUPONS.find((c) => c.code === normalized);
}

export function calcDiscount(subtotal: number, coupon: ClayCraftCoupon | null): number {
  if (!coupon || subtotal <= 0) return 0;
  if (coupon.type === 'percent') return Math.round((subtotal * coupon.value) / 100);
  return Math.min(coupon.value, subtotal);
}

export function calcShipping(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= CLAYCRAFT_FREE_SHIPPING_THRESHOLD ? 0 : CLAYCRAFT_FLAT_SHIPPING;
}

export function calcTax(taxable: number): number {
  return Math.round(taxable * CLAYCRAFT_TAX_RATE);
}
