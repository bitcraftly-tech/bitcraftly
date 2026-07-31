/**
 * Feature toggles for Clinic & Healthcare AI modules.
 * Flip any flag to hide a module from the showcase without deleting code.
 */
export const FEATURES = {
  symptomChecker: true,
  reportAnalyzer: true,
  doctorRecommendation: true,
  chatAssistant: true,
  healthDashboard: true,
  dietPlanner: true,
  telemedicine: true,
  emergencyAI: true,
} as const;

export type FeatureKey = keyof typeof FEATURES;

export function isFeatureEnabled(key: FeatureKey): boolean {
  return FEATURES[key];
}
