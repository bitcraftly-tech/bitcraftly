'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import type { ToyProduct } from './toy-data';

export interface ToyCartLine {
  readonly product: ToyProduct;
  readonly qty: number;
}

interface ToyCartContextValue {
  readonly lines: readonly ToyCartLine[];
  readonly count: number;
  readonly subtotal: number;
  readonly isOpen: boolean;
  readonly toast: string | null;
  readonly openCart: () => void;
  readonly closeCart: () => void;
  readonly addItem: (product: ToyProduct) => void;
  readonly setQty: (productId: string, qty: number) => void;
  readonly removeItem: (productId: string) => void;
  readonly clearToast: () => void;
}

const ToyCartContext = createContext<ToyCartContextValue | null>(null);

export function useToyCart(): ToyCartContextValue {
  const ctx = useContext(ToyCartContext);
  if (!ctx) {
    throw new Error('useToyCart must be used within ToyCartProvider');
  }
  return ctx;
}

export function ToyCartProvider({ children }: { readonly children: ReactNode }) {
  const [lines, setLines] = useState<ToyCartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const clearToast = useCallback(() => setToast(null), []);

  const addItem = useCallback((product: ToyProduct) => {
    setLines((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (existing) {
        return current.map((line) =>
          line.product.id === product.id ? { ...line, qty: line.qty + 1 } : line,
        );
      }
      return [...current, { product, qty: 1 }];
    });
    setToast(`${product.name} added to cart`);
    window.setTimeout(() => setToast(null), 2200);
  }, []);

  const setQty = useCallback((productId: string, qty: number) => {
    setLines((current) => {
      if (qty <= 0) {
        return current.filter((line) => line.product.id !== productId);
      }
      return current.map((line) =>
        line.product.id === productId ? { ...line, qty } : line,
      );
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((current) => current.filter((line) => line.product.id !== productId));
  }, []);

  const count = useMemo(
    () => lines.reduce((sum, line) => sum + line.qty, 0),
    [lines],
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, line) => sum + line.product.price * line.qty, 0),
    [lines],
  );

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      isOpen,
      toast,
      openCart,
      closeCart,
      addItem,
      setQty,
      removeItem,
      clearToast,
    }),
    [
      lines,
      count,
      subtotal,
      isOpen,
      toast,
      openCart,
      closeCart,
      addItem,
      setQty,
      removeItem,
      clearToast,
    ],
  );

  return <ToyCartContext.Provider value={value}>{children}</ToyCartContext.Provider>;
}
