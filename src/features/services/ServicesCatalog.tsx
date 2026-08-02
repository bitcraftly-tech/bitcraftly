import { ServicesCatalogContent } from './ServicesCatalogContent';
import { ServicesCatalogSearchLoader } from './ServicesCatalogSearchLoader';
import type {
  FeaturedServiceBlock,
  ServiceCardModel,
  ServiceGroupIntro,
  ServiceGroupRelatedLinks,
} from './services.types';

interface CatalogGroup {
  id: string;
  title: string;
  items: readonly ServiceCardModel[];
}

interface ServicesCatalogProps {
  groups: readonly CatalogGroup[];
  intros: readonly ServiceGroupIntro[];
  relatedByGroup: Record<string, ServiceGroupRelatedLinks>;
  featuredByGroup: readonly FeaturedServiceBlock[];
}

/**
 * Services catalog — SSR HTML for all cards; client filter island handles search.
 */
export function ServicesCatalog({
  groups,
  intros,
  relatedByGroup,
  featuredByGroup,
}: ServicesCatalogProps) {
  return (
    <div id="services-catalog">
      <ServicesCatalogSearchLoader groups={groups} />
      <ServicesCatalogContent
        groups={groups}
        intros={intros}
        relatedByGroup={relatedByGroup}
        featuredByGroup={featuredByGroup}
      />
    </div>
  );
}
