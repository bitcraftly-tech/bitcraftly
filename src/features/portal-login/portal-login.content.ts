import { ROUTES } from '@/constants/navigation';
import type { IconName } from '@/components/ui/icon';

export const PORTAL_LOGIN_META = {
  title: 'Login | Bitcraftly Portal',
  description:
    'Sign in to manage projects, review analytics, and stay on top of every delivery — from one secure dashboard.',
  path: ROUTES.login,
} as const;

export const PORTAL_LOGIN_LANDING = {
  eyebrow: 'Bitcraftly Client Portal',
  title: 'Welcome back',
  description:
    'Sign in to manage projects, review analytics, and stay on top of every delivery — from one secure dashboard.',
  benefits: [
    {
      id: 'projects',
      title: 'Projects & delivery',
      description: 'Track builds, timelines, and handoffs in one place.',
      icon: 'layout-grid' as IconName,
    },
    {
      id: 'analytics',
      title: 'Analytics & leads',
      description: 'Monitor traffic, conversions, and inbound enquiries.',
      icon: 'trending-up' as IconName,
    },
    {
      id: 'secure',
      title: 'Secure access',
      description: 'Role-based login for your team and stakeholders.',
      icon: 'shield' as IconName,
    },
  ],
  googleNotice:
    'Google login is not configured. In Vercel → Environment Variables set `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `NEXTAUTH_URL` (https://bitcraftly.com), and either `AUTH_SECRET` or `NEXTAUTH_SECRET`, then redeploy.',
  discoveryCta: {
    prefix: 'New to Bitcraftly?',
    label: 'Book a discovery call',
    href: ROUTES.contact,
  },
  defaultCallbackUrl: '/dashboard/documents',
} as const;

export function resolvePortalCallbackUrl(value: string | string[] | undefined): string {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || typeof raw !== 'string') {
    return PORTAL_LOGIN_LANDING.defaultCallbackUrl;
  }
  if (!raw.startsWith('/') || raw.startsWith('//')) {
    return PORTAL_LOGIN_LANDING.defaultCallbackUrl;
  }
  return raw;
}
