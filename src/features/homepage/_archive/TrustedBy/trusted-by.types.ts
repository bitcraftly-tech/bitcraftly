export type TrustedByIconId =
  'sparkles' | 'layers' | 'gauge' | 'shield-check' | 'trend-up' | 'handshake';

export interface TrustedByValue {
  id: string;
  icon: TrustedByIconId;
  /** First line of the compact two-line label */
  line1: string;
  /** Second line of the compact two-line label */
  line2: string;
  /** Full accessible label */
  label: string;
}

export interface TrustedByStat {
  value: string;
  label: string;
}
