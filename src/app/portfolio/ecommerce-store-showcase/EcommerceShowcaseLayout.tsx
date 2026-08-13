'use client';

import type { ReactNode } from 'react';

import EcommerceFooter from '@/components/portfolio/ecommerce/EcommerceFooter';
import EcommerceNavbar from '@/components/portfolio/ecommerce/EcommerceNavbar';
import EcommerceWhatsAppFab from '@/components/portfolio/ecommerce/EcommerceWhatsAppFab';
import { ShowcaseScopedThemeProvider } from '@/components/providers/ShowcaseScopedThemeProvider';

import EcommerceAiChatbot from './EcommerceAiChatbot';
import EcommerceBackToTopThumbler from './EcommerceBackToTopThumbler';
import {
  AccountModal,
  CartDrawer,
  OrdersPanel,
  PincodeModal,
  ProductModal,
} from './EcommerceDemoOverlays';
import { EcommerceDemoProvider } from './EcommerceDemoContext';
import EcommerceRazorpayMockModal from './EcommerceRazorpayMockModal';

import './ecommerce-showcase.css';

export default function EcommerceShowcaseLayout({ children }: { children: ReactNode }) {
  return (
    <EcommerceDemoProvider>
      <ShowcaseScopedThemeProvider
        showcaseId="ecommerce"
        className="ecommerce-showcase flex min-h-screen flex-col ec-bg-page font-sans antialiased"
      >
        <div id="top" className="flex min-h-0 flex-1 flex-col">
          <EcommerceNavbar />
          <main className="flex-1 ec-bg-page">{children}</main>
          <EcommerceFooter />
          <EcommerceBackToTopThumbler />
          <EcommerceWhatsAppFab />
          <EcommerceAiChatbot />
          <CartDrawer />
          <AccountModal />
          <PincodeModal />
          <OrdersPanel />
          <ProductModal />
          <EcommerceRazorpayMockModal />
        </div>
      </ShowcaseScopedThemeProvider>
    </EcommerceDemoProvider>
  );
}
