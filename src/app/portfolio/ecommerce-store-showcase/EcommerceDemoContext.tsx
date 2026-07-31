'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

import {
  loadRazorpayCheckoutScript,
  type RazorpayCheckoutSuccess,
  type ShowcaseRazorpayOrder,
} from '@/lib/razorpay-showcase';
import { showFeedbackAlert, type FeedbackModalVariant } from '@/lib/sweetAlert';

import { cartLinesCount, cartLinesSubtotal, mergeCartLine } from './ecommerce-cart-utils';
import {
  PINCODES,
  SHOP_PRODUCTS,
  hasFreeDelivery,
  isDealProduct,
  productMatchesSearch,
  type ShopDepartment,
  type ShopProduct,
  type SortOption,
  type PriceBand,
  type MinRating,
} from './ecommerce-demo-data';

export type CartLine = { product: ShopProduct; qty: number };

export type DemoOrder = {
  id: string;
  orderId: string;
  paymentId: string;
  total: number;
  items: CartLine[];
  mode: 'razorpay' | 'mock-upi' | 'mock-card';
  placedAt: number;
};

type EcommerceDemoContextValue = {
  products: ShopProduct[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeSearch: string;
  runSearch: () => void;
  department: ShopDepartment;
  setDepartment: (d: ShopDepartment) => void;
  sort: SortOption;
  setSort: (s: SortOption) => void;
  freeDeliveryOnly: boolean;
  setFreeDeliveryOnly: (v: boolean) => void;
  minRating: MinRating;
  setMinRating: (v: MinRating) => void;
  priceBand: PriceBand;
  setPriceBand: (v: PriceBand) => void;
  clearFilters: () => void;
  filteredProducts: ShopProduct[];
  cart: CartLine[];
  cartCount: number;
  cartSubtotal: number;
  addToCart: (product: ShopProduct, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  accountOpen: boolean;
  setAccountOpen: (open: boolean) => void;
  productModal: ShopProduct | null;
  setProductModal: (p: ShopProduct | null) => void;
  signedInAs: string | null;
  signIn: (name: string) => void;
  signOut: () => void;
  pincode: string;
  setPincode: (p: string) => void;
  pincodeOpen: boolean;
  setPincodeOpen: (open: boolean) => void;
  ordersOpen: boolean;
  setOrdersOpen: (open: boolean) => void;
  demoOrders: DemoOrder[];
  completeCheckout: (payload: {
    orderId: string;
    paymentId: string;
    mode: DemoOrder['mode'];
    lines?: CartLine[];
  }) => void;
  checkoutBusy: boolean;
  razorpayMockOpen: boolean;
  setRazorpayMockOpen: (open: boolean) => void;
  checkoutPreviewSubtotal: number;
  checkoutPreviewCount: number;
  startRazorpayCheckout: (opts?: { addProduct?: ShopProduct }) => Promise<void>;
  completeMockRazorpayPayment: (method: 'upi' | 'card') => void;
  showToast: (message: string, variant?: FeedbackModalVariant) => void;
  scrollToSection: (id: string) => void;
};

const EcommerceDemoContext = createContext<EcommerceDemoContextValue | null>(null);

export function useEcommerceDemo() {
  const ctx = useContext(EcommerceDemoContext);
  if (!ctx) throw new Error('useEcommerceDemo must be used within EcommerceDemoProvider');
  return ctx;
}

export function EcommerceDemoProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [department, setDepartment] = useState<ShopDepartment>('All');
  const [sort, setSort] = useState<SortOption>('recommended');
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);
  const [minRating, setMinRating] = useState<MinRating>(0);
  const [priceBand, setPriceBand] = useState<PriceBand>('all');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [productModal, setProductModal] = useState<ShopProduct | null>(null);
  const [signedInAs, setSignedInAs] = useState<string | null>(null);
  const [pincode, setPincode] = useState<string>(PINCODES[0]);
  const [pincodeOpen, setPincodeOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [demoOrders, setDemoOrders] = useState<DemoOrder[]>([]);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [razorpayMockOpen, setRazorpayMockOpen] = useState(false);
  const [pendingCheckoutLines, setPendingCheckoutLines] = useState<CartLine[] | null>(null);

  const checkoutPreviewLines = pendingCheckoutLines ?? cart;
  const checkoutPreviewSubtotal = useMemo(
    () => cartLinesSubtotal(checkoutPreviewLines),
    [checkoutPreviewLines],
  );
  const checkoutPreviewCount = useMemo(
    () => cartLinesCount(checkoutPreviewLines),
    [checkoutPreviewLines],
  );

  const showToast = useCallback((message: string, variant: FeedbackModalVariant = 'info') => {
    showFeedbackAlert(variant, message);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const runSearch = useCallback(() => {
    setActiveSearch(searchQuery.trim());
    scrollToSection('search-results');
  }, [searchQuery, scrollToSection]);

  const clearFilters = useCallback(() => {
    setDepartment('All');
    setFreeDeliveryOnly(false);
    setMinRating(0);
    setPriceBand('all');
    setSort('recommended');
  }, []);

  const filteredProducts = useMemo(() => {
    let list = [...SHOP_PRODUCTS];
    const q = activeSearch.trim();
    if (q) {
      list = list.filter((p) => productMatchesSearch(p, q));
    }
    if (department !== 'All' && department !== 'Deals') {
      list = list.filter((p) => p.department === department);
    }
    if (department === 'Deals') {
      list = list.filter(isDealProduct);
    }
    if (freeDeliveryOnly) list = list.filter(hasFreeDelivery);
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);
    if (priceBand === 'under-1000') list = list.filter((p) => p.price < 1000);
    if (priceBand === '1000-5000') list = list.filter((p) => p.price >= 1000 && p.price <= 5000);
    if (priceBand === '5000-plus') list = list.filter((p) => p.price > 5000);

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.count - a.count);
    }
    return list;
  }, [activeSearch, department, freeDeliveryOnly, minRating, priceBand, sort]);

  const cartCount = useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart]);
  const cartSubtotal = useMemo(() => cart.reduce((n, l) => n + l.product.price * l.qty, 0), [cart]);

  const addToCart = useCallback(
    (product: ShopProduct, qty = 1) => {
      setCart((prev) => {
        const existing = prev.find((l) => l.product.id === product.id);
        if (existing) {
          return prev.map((l) => (l.product.id === product.id ? { ...l, qty: l.qty + qty } : l));
        }
        return [...prev, { product, qty }];
      });
      showToast(`Added to cart · ${product.title.slice(0, 42)}…`, 'success');
    },
    [showToast],
  );

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.product.id !== id));
  }, []);

  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) {
      setCart((prev) => prev.filter((l) => l.product.id !== id));
      return;
    }
    setCart((prev) => prev.map((l) => (l.product.id === id ? { ...l, qty } : l)));
  }, []);

  const signIn = useCallback(
    (name: string) => {
      setSignedInAs(name.trim() || 'Shopper');
      setAccountOpen(false);
      showToast(`Welcome, ${name.trim() || 'Shopper'}!`, 'success');
    },
    [showToast],
  );

  const signOut = useCallback(() => {
    setSignedInAs(null);
    setAccountOpen(false);
    showToast('Signed out', 'info');
  }, [showToast]);

  const completeCheckout = useCallback(
    (payload: {
      orderId: string;
      paymentId: string;
      mode: DemoOrder['mode'];
      lines?: CartLine[];
    }) => {
      setCart((current) => {
        const lines = payload.lines ?? current;
        if (lines.length === 0) return current;
        const total = cartLinesSubtotal(lines);
        const order: DemoOrder = {
          id: payload.paymentId,
          orderId: payload.orderId,
          paymentId: payload.paymentId,
          total,
          items: lines.map((l) => ({ ...l })),
          mode: payload.mode,
          placedAt: Date.now(),
        };
        setDemoOrders((prev) => [order, ...prev]);
        return [];
      });
    },
    [],
  );

  const runRazorpayCheckout = useCallback(
    async (lines: CartLine[]) => {
      if (lines.length === 0) {
        showToast('Your cart is empty', 'warning');
        return;
      }

      const amountPaise = Math.max(100, Math.round(cartLinesSubtotal(lines) * 100));
      const count = cartLinesCount(lines);
      setCheckoutBusy(true);

      try {
        const res = await fetch('/api/showcase/ecommerce/razorpay/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount_paise: amountPaise }),
        });

        if (res.status === 503) {
          setPendingCheckoutLines(lines);
          setRazorpayMockOpen(true);
          setCheckoutBusy(false);
          return;
        }

        const data = await res.json();
        if (!res.ok) {
          throw new Error(
            typeof data.detail === 'string' ? data.detail : 'Could not start checkout',
          );
        }

        const order = data as ShowcaseRazorpayOrder;
        await loadRazorpayCheckoutScript();

        const RazorpayCtor = (
          window as Window & {
            Razorpay?: new (options: Record<string, unknown>) => {
              open: () => void;
              on: (event: string, handler: (err: unknown) => void) => void;
            };
          }
        ).Razorpay;

        if (!RazorpayCtor) {
          throw new Error('Razorpay checkout failed to load');
        }

        await new Promise<void>((resolve) => {
          const options: Record<string, unknown> = {
            key: order.key_id,
            amount: order.amount,
            currency: order.currency,
            order_id: order.order_id,
            name: 'Ecommerce Store',
            description: `Demo order · ${count} item${count > 1 ? 's' : ''}`,
            theme: { color: '#f97316' },
            handler: async (response: RazorpayCheckoutSuccess) => {
              try {
                const verifyRes = await fetch('/api/showcase/ecommerce/razorpay/verify', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                });
                const verifyData = await verifyRes.json();
                if (!verifyRes.ok || !verifyData.ok) {
                  throw new Error(verifyData.message ?? 'Verification failed');
                }
                completeCheckout({
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  mode: 'razorpay',
                  lines,
                });
                setCartOpen(false);
                showToast('Payment successful · order placed', 'success');
              } catch (err) {
                showToast(err instanceof Error ? err.message : 'Verification failed', 'error');
              } finally {
                setCheckoutBusy(false);
                setPendingCheckoutLines(null);
                resolve();
              }
            },
            modal: {
              ondismiss: () => {
                setCheckoutBusy(false);
                setPendingCheckoutLines(null);
                resolve();
              },
            },
          };

          const rzp = new RazorpayCtor(options);
          rzp.on('payment.failed', () => {
            showToast('Payment failed or cancelled', 'error');
            setCheckoutBusy(false);
            setPendingCheckoutLines(null);
            resolve();
          });
          rzp.open();
        });
      } catch (e) {
        showToast(e instanceof Error ? e.message : 'Checkout unavailable', 'error');
        setCheckoutBusy(false);
        setPendingCheckoutLines(null);
      }
    },
    [completeCheckout, setCartOpen, showToast],
  );

  const startRazorpayCheckout = useCallback(
    async (opts?: { addProduct?: ShopProduct }) => {
      const lines = opts?.addProduct ? mergeCartLine(cart, opts.addProduct) : cart;
      await runRazorpayCheckout(lines);
    },
    [cart, runRazorpayCheckout],
  );

  const completeMockRazorpayPayment = useCallback(
    (method: 'upi' | 'card') => {
      const lines = pendingCheckoutLines ?? cart;
      if (lines.length === 0) return;
      completeCheckout({
        orderId: `order_demo_${Date.now()}`,
        paymentId: `pay_demo_${Date.now()}`,
        mode: method === 'upi' ? 'mock-upi' : 'mock-card',
        lines,
      });
      setPendingCheckoutLines(null);
      setRazorpayMockOpen(false);
      setCartOpen(false);
      showToast(`Payment successful · ${method.toUpperCase()} demo`, 'success');
      setCheckoutBusy(false);
    },
    [cart, completeCheckout, pendingCheckoutLines, setCartOpen, showToast],
  );

  const value = useMemo<EcommerceDemoContextValue>(
    () => ({
      products: SHOP_PRODUCTS,
      searchQuery,
      setSearchQuery,
      activeSearch,
      runSearch,
      department,
      setDepartment,
      sort,
      setSort,
      freeDeliveryOnly,
      setFreeDeliveryOnly,
      minRating,
      setMinRating,
      priceBand,
      setPriceBand,
      clearFilters,
      filteredProducts,
      cart,
      cartCount,
      cartSubtotal,
      addToCart,
      removeFromCart,
      updateQty,
      cartOpen,
      setCartOpen,
      accountOpen,
      setAccountOpen,
      productModal,
      setProductModal,
      signedInAs,
      signIn,
      signOut,
      pincode,
      setPincode,
      pincodeOpen,
      setPincodeOpen,
      ordersOpen,
      setOrdersOpen,
      demoOrders,
      completeCheckout,
      checkoutBusy,
      razorpayMockOpen,
      setRazorpayMockOpen,
      checkoutPreviewSubtotal,
      checkoutPreviewCount,
      startRazorpayCheckout,
      completeMockRazorpayPayment,
      showToast,
      scrollToSection,
    }),
    [
      searchQuery,
      activeSearch,
      runSearch,
      department,
      sort,
      freeDeliveryOnly,
      minRating,
      priceBand,
      clearFilters,
      filteredProducts,
      cart,
      cartCount,
      cartSubtotal,
      addToCart,
      removeFromCart,
      updateQty,
      cartOpen,
      accountOpen,
      productModal,
      signedInAs,
      signIn,
      signOut,
      pincode,
      pincodeOpen,
      ordersOpen,
      demoOrders,
      completeCheckout,
      checkoutBusy,
      razorpayMockOpen,
      checkoutPreviewSubtotal,
      checkoutPreviewCount,
      startRazorpayCheckout,
      completeMockRazorpayPayment,
      showToast,
      scrollToSection,
    ],
  );

  return <EcommerceDemoContext.Provider value={value}>{children}</EcommerceDemoContext.Provider>;
}
