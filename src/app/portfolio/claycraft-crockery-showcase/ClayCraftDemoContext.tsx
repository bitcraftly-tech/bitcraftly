'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { showFeedbackAlert, type FeedbackModalVariant } from '@/lib/sweetAlert';

import {
  calcDiscount,
  calcShipping,
  calcTax,
  findCoupon,
  type ClayCraftCoupon,
} from './claycraft-commerce';
import {
  cartLinesCount,
  cartLinesSubtotal,
  mergeCartLine,
  type ClayCraftCartLine,
} from './claycraft-cart-utils';
import { getProductById, type ClayCraftProduct } from './claycraft-products';

const STORAGE_CART = 'claycraft-demo-cart';
const STORAGE_WISHLIST = 'claycraft-demo-wishlist';

type ClayCraftDemoContextValue = {
  cart: ClayCraftCartLine[];
  cartCount: number;
  cartSubtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  grandTotal: number;
  coupon: ClayCraftCoupon | null;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
  addToCart: (
    product: ClayCraftProduct,
    qty?: number,
    opts?: { colorId?: string; size?: string; openDrawer?: boolean },
  ) => void;
  removeFromCart: (productId: string, colorId?: string, size?: string) => void;
  updateQty: (productId: string, qty: number, colorId?: string, size?: string) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;

  wishlist: string[];
  wishlistCount: number;
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (product: ClayCraftProduct) => void;

  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  quickViewProduct: ClayCraftProduct | null;
  openQuickView: (product: ClayCraftProduct) => void;
  closeQuickView: () => void;

  accountOpen: boolean;
  setAccountOpen: (open: boolean) => void;
  signedInAs: string | null;
  signIn: (name: string) => void;
  signOut: () => void;

  lightboxImage: { src: string; alt: string } | null;
  openLightbox: (src: string, alt: string) => void;
  closeLightbox: () => void;

  showToast: (message: string, variant?: FeedbackModalVariant) => void;
  mockDelay: (ms?: number) => Promise<void>;
};

const ClayCraftDemoContext = createContext<ClayCraftDemoContextValue | null>(null);

export function useClayCraftDemo() {
  const ctx = useContext(ClayCraftDemoContext);
  if (!ctx) throw new Error('useClayCraftDemo must be used within ClayCraftDemoProvider');
  return ctx;
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function ClayCraftDemoProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<ClayCraftCartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<ClayCraftProduct | null>(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [signedInAs, setSignedInAs] = useState<string | null>(null);
  const [coupon, setCoupon] = useState<ClayCraftCoupon | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    setCart(readJson<ClayCraftCartLine[]>(STORAGE_CART, []));
    setWishlist(readJson<string[]>(STORAGE_WISHLIST, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_WISHLIST, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const showToast = useCallback((message: string, variant: FeedbackModalVariant = 'success') => {
    showFeedbackAlert(variant, message);
  }, []);

  const mockDelay = useCallback((ms = 700) => new Promise<void>((r) => setTimeout(r, ms)), []);

  const addToCart = useCallback(
    (
      product: ClayCraftProduct,
      qty = 1,
      opts?: { colorId?: string; size?: string; openDrawer?: boolean },
    ) => {
      if (!product.inStock) {
        showToast('This item is currently out of stock.', 'warning');
        return;
      }
      setCart((prev) =>
        mergeCartLine(prev, product.id, qty, { colorId: opts?.colorId, size: opts?.size }),
      );
      showToast(`${product.title} added to cart`);
      if (opts?.openDrawer !== false) setCartOpen(true);
    },
    [showToast],
  );

  const removeFromCart = useCallback((productId: string, colorId?: string, size?: string) => {
    setCart((prev) =>
      prev.filter((l) => !(l.productId === productId && l.colorId === colorId && l.size === size)),
    );
  }, []);

  const updateQty = useCallback(
    (productId: string, qty: number, colorId?: string, size?: string) => {
      if (qty <= 0) {
        setCart((prev) =>
          prev.filter(
            (l) => !(l.productId === productId && l.colorId === colorId && l.size === size),
          ),
        );
        return;
      }
      setCart((prev) =>
        prev.map((l) =>
          l.productId === productId && l.colorId === colorId && l.size === size ? { ...l, qty } : l,
        ),
      );
    },
    [],
  );

  const clearCart = useCallback(() => {
    setCart([]);
    setCoupon(null);
  }, []);

  const isWishlisted = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  const toggleWishlist = useCallback(
    (product: ClayCraftProduct) => {
      setWishlist((prev) => {
        if (prev.includes(product.id)) {
          showToast(`${product.title} removed from wishlist`, 'info');
          return prev.filter((id) => id !== product.id);
        }
        showToast(`${product.title} saved to wishlist`);
        return [...prev, product.id];
      });
    },
    [showToast],
  );

  const applyCoupon = useCallback(
    (code: string) => {
      const found = findCoupon(code);
      if (!found) {
        showToast('Invalid coupon code. Try CLAY10, WELCOME50, or TABLE20.', 'error');
        return false;
      }
      setCoupon(found);
      showToast(`Coupon ${found.code} applied — ${found.label}`);
      return true;
    },
    [showToast],
  );

  const clearCoupon = useCallback(() => setCoupon(null), []);

  const cartSubtotal = useMemo(() => cartLinesSubtotal(cart, getProductById), [cart]);
  const discount = useMemo(() => calcDiscount(cartSubtotal, coupon), [cartSubtotal, coupon]);
  const shipping = useMemo(
    () => calcShipping(Math.max(0, cartSubtotal - discount)),
    [cartSubtotal, discount],
  );
  const taxable = Math.max(0, cartSubtotal - discount);
  const tax = useMemo(() => calcTax(taxable), [taxable]);
  const grandTotal = Math.max(0, taxable + shipping + tax);
  const cartCount = useMemo(() => cartLinesCount(cart), [cart]);

  const value = useMemo<ClayCraftDemoContextValue>(
    () => ({
      cart,
      cartCount,
      cartSubtotal,
      shipping,
      tax,
      discount,
      grandTotal,
      coupon,
      applyCoupon,
      clearCoupon,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartOpen,
      setCartOpen,
      wishlist,
      wishlistCount: wishlist.length,
      isWishlisted,
      toggleWishlist,
      searchOpen,
      setSearchOpen,
      searchQuery,
      setSearchQuery,
      quickViewProduct,
      openQuickView: setQuickViewProduct,
      closeQuickView: () => setQuickViewProduct(null),
      accountOpen,
      setAccountOpen,
      signedInAs,
      signIn: (name) => {
        setSignedInAs(name);
        setAccountOpen(false);
        showToast(`Welcome, ${name}`);
      },
      signOut: () => {
        setSignedInAs(null);
        showToast('Signed out of demo account', 'info');
      },
      lightboxImage,
      openLightbox: (src, alt) => setLightboxImage({ src, alt }),
      closeLightbox: () => setLightboxImage(null),
      showToast,
      mockDelay,
    }),
    [
      cart,
      cartCount,
      cartSubtotal,
      shipping,
      tax,
      discount,
      grandTotal,
      coupon,
      applyCoupon,
      clearCoupon,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      cartOpen,
      wishlist,
      isWishlisted,
      toggleWishlist,
      searchOpen,
      searchQuery,
      quickViewProduct,
      accountOpen,
      signedInAs,
      lightboxImage,
      showToast,
      mockDelay,
    ],
  );

  return <ClayCraftDemoContext.Provider value={value}>{children}</ClayCraftDemoContext.Provider>;
}
