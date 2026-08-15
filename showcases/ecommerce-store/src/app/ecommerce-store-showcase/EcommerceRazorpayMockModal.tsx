'use client';

import { CreditCard, Smartphone, X } from 'lucide-react';

import { formatInr } from './ecommerce-demo-data';
import { useEcommerceDemo } from './EcommerceDemoContext';

export default function EcommerceRazorpayMockModal() {
  const {
    razorpayMockOpen,
    setRazorpayMockOpen,
    completeMockRazorpayPayment,
    checkoutPreviewSubtotal,
    checkoutPreviewCount,
    checkoutBusy,
  } = useEcommerceDemo();

  if (!razorpayMockOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={() => setRazorpayMockOpen(false)}
        aria-label="Close"
      />
      <div className="relative w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">Razorpay</p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Demo checkout</p>
          </div>
          <button
            type="button"
            onClick={() => setRazorpayMockOpen(false)}
            className="rounded p-1 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 py-5">
          <p className="text-center text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {formatInr(checkoutPreviewSubtotal)}
          </p>
          <p className="mt-1 text-center text-xs text-zinc-500">
            {checkoutPreviewCount} item{checkoutPreviewCount !== 1 ? 's' : ''} · Ecommerce Store
            showcase
          </p>
          <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-center text-[11px] text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
            Add RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET to .env.local for live test checkout
          </p>

          <div className="mt-5 space-y-2">
            <button
              type="button"
              disabled={checkoutBusy}
              onClick={() => completeMockRazorpayPayment('upi')}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-[#2563eb] py-3 text-sm font-semibold text-white transition hover:bg-[#1d4ed8] disabled:opacity-60"
            >
              <Smartphone className="h-4 w-4" />
              Pay with UPI (demo)
            </button>
            <button
              type="button"
              disabled={checkoutBusy}
              onClick={() => completeMockRazorpayPayment('card')}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-zinc-300 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 disabled:opacity-60 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              <CreditCard className="h-4 w-4" />
              Pay with Card (demo)
            </button>
          </div>
        </div>

        <p className="border-t border-zinc-200 px-4 py-2 text-center text-[10px] text-zinc-400 dark:border-zinc-700">
          No real money is charged in demo mode
        </p>
      </div>
    </div>
  );
}
