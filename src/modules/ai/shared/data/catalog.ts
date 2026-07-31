import type { FeatureKey } from '@/config/features';
import { isFeatureEnabled } from '@/config/features';

export type AiModuleId =
  | 'symptom-checker'
  | 'report-analyzer'
  | 'doctor-recommendation'
  | 'health-chat'
  | 'dashboard'
  | 'diet-planner'
  | 'telemedicine'
  | 'emergency-triage';

export type AiModuleMeta = {
  readonly id: AiModuleId;
  readonly featureKey: FeatureKey;
  readonly title: string;
  readonly shortTitle: string;
  readonly description: string;
  readonly href: string;
  readonly cta: string;
  readonly accent: string;
};

const AI_BASE = '/portfolio/clinic-healthcare-showcase/ai';

export const AI_MODULES: readonly AiModuleMeta[] = [
  {
    id: 'symptom-checker',
    featureKey: 'symptomChecker',
    title: 'AI Symptom Checker',
    shortTitle: 'Symptom Checker',
    description: 'Describe your symptoms and receive AI-powered guidance.',
    href: `${AI_BASE}/symptom-checker`,
    cta: 'Try Demo',
    accent: 'Guidance',
  },
  {
    id: 'report-analyzer',
    featureKey: 'reportAnalyzer',
    title: 'AI Report Analyzer',
    shortTitle: 'Report Analyzer',
    description: 'Upload blood reports, CBC, MRI or X-Ray — AI explains in simple language.',
    href: `${AI_BASE}/report-analyzer`,
    cta: 'Upload Report',
    accent: 'Diagnostics',
  },
  {
    id: 'doctor-recommendation',
    featureKey: 'doctorRecommendation',
    title: 'AI Doctor Recommendation',
    shortTitle: 'Find Doctor',
    description: 'Find the right specialist instantly based on your concerns.',
    href: `${AI_BASE}/doctor-recommendation`,
    cta: 'Find Doctor',
    accent: 'Matching',
  },
  {
    id: 'health-chat',
    featureKey: 'chatAssistant',
    title: 'AI Health Assistant',
    shortTitle: 'Ask AI',
    description: '24×7 AI chat for appointments, departments and care guidance.',
    href: `${AI_BASE}/health-chat`,
    cta: 'Open Chat',
    accent: 'Assistant',
  },
  {
    id: 'dashboard',
    featureKey: 'healthDashboard',
    title: 'AI Health Dashboard',
    shortTitle: 'Dashboard',
    description: 'Health score, vitals, reports and appointments in one view.',
    href: `${AI_BASE}/dashboard`,
    cta: 'View Dashboard',
    accent: 'Insights',
  },
  {
    id: 'diet-planner',
    featureKey: 'dietPlanner',
    title: 'AI Diet Planner',
    shortTitle: 'Diet Planner',
    description: 'Generate meal plans with calories and nutrition targets.',
    href: `${AI_BASE}/diet-planner`,
    cta: 'Generate Plan',
    accent: 'Nutrition',
  },
  {
    id: 'telemedicine',
    featureKey: 'telemedicine',
    title: 'Telemedicine AI',
    shortTitle: 'Video Consult',
    description: 'Match to available consultants and book a secure video call.',
    href: `${AI_BASE}/telemedicine`,
    cta: 'Book Video Call',
    accent: 'Telehealth',
  },
  {
    id: 'emergency-triage',
    featureKey: 'emergencyAI',
    title: 'Emergency AI Triage',
    shortTitle: 'Emergency AI',
    description: 'Urgency detection for emergency, urgent or normal pathways.',
    href: `${AI_BASE}/emergency-triage`,
    cta: 'Assess Now',
    accent: 'Triage',
  },
] as const;

export function getAiModule(id: AiModuleId): AiModuleMeta | undefined {
  return AI_MODULES.find((module) => module.id === id);
}

export function getEnabledAiModules(): readonly AiModuleMeta[] {
  return AI_MODULES.filter((module) => isFeatureEnabled(module.featureKey));
}

/** Six homepage “AI Healthcare Solutions” cards (hub still lists all enabled modules). */
export const AI_HOME_MODULE_IDS: readonly AiModuleId[] = [
  'symptom-checker',
  'report-analyzer',
  'doctor-recommendation',
  'health-chat',
  'dashboard',
  'diet-planner',
] as const;

export function getHomeAiModules(): readonly AiModuleMeta[] {
  return AI_HOME_MODULE_IDS.map((id) => getAiModule(id)).filter(
    (module): module is AiModuleMeta => module !== undefined && isFeatureEnabled(module.featureKey),
  );
}
