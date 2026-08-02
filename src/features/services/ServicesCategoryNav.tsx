import { StickyCategoryNav } from '@/components/patterns/sticky-category-nav';
import { SERVICE_GROUPS } from '@/constants/services';

export function ServicesCategoryNav() {
  return <StickyCategoryNav groups={SERVICE_GROUPS} ariaLabel="Service categories" />;
}
