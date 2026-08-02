export type AiUrgency = 'normal' | 'urgent' | 'emergency';

export type AiCondition = {
  readonly name: string;
  readonly likelihood: 'Low' | 'Moderate' | 'High';
  readonly note: string;
};

export type AiSymptomResult = {
  readonly summary: string;
  readonly conditions: readonly AiCondition[];
  readonly department: string;
  readonly urgency: AiUrgency;
  readonly nextSteps: readonly string[];
};

export type AiReportFinding = {
  readonly label: string;
  readonly value: string;
  readonly status: 'Normal' | 'Borderline' | 'Attention';
};

export type AiChatRole = 'user' | 'assistant';

export type AiChatMessage = {
  readonly id: string;
  readonly role: AiChatRole;
  readonly text: string;
};

export type AiDoctorMatch = {
  readonly id: string;
  readonly name: string;
  readonly speciality: string;
  readonly experience: string;
  readonly rating: number;
  readonly reason: string;
  readonly image: string;
};

export type AiMeal = {
  readonly title: string;
  readonly time: string;
  readonly calories: number;
  readonly items: readonly string[];
};

export type AiVital = {
  readonly label: string;
  readonly value: string;
  readonly unit: string;
  readonly trend: 'up' | 'down' | 'steady';
  readonly status: 'Good' | 'Watch' | 'Alert';
};
