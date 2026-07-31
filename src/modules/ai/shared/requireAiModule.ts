import type { FeatureKey } from '@/config/features';
import { isFeatureEnabled } from '@/config/features';
import type { AiModuleId } from '@/modules/ai/shared/data/catalog';
import { getAiModule } from '@/modules/ai/shared/data/catalog';

export function requireAiModule(id: AiModuleId): {
  enabled: boolean;
  featureKey: FeatureKey;
  title: string;
  description: string;
} {
  const module = getAiModule(id);
  if (!module) {
    return {
      enabled: false,
      featureKey: 'symptomChecker',
      title: 'AI Feature',
      description: 'This demo is unavailable.',
    };
  }

  return {
    enabled: isFeatureEnabled(module.featureKey),
    featureKey: module.featureKey,
    title: module.title,
    description: module.description,
  };
}
