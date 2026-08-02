import { z } from 'zod';
import { LEAD_INTENT_OPTIONS } from './lead-funnel.config';

const intentValues = LEAD_INTENT_OPTIONS.map((option) => option.value) as [
  (typeof LEAD_INTENT_OPTIONS)[number]['value'],
  ...(typeof LEAD_INTENT_OPTIONS)[number]['value'][],
];

export const contactLeadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Enter your name (at least 2 characters).')
    .max(80, 'Name is too long.'),
  email: z.string().trim().email('Enter a valid email address.').max(120, 'Email is too long.'),
  phone: z.string().trim().max(30, 'Phone number is too long.').optional().or(z.literal('')),
  company: z.string().trim().max(100, 'Company name is too long.').optional().or(z.literal('')),
  intent: z.enum(intentValues, {
    error: 'Select what you need help with.',
  }),
  message: z
    .string()
    .trim()
    .min(10, 'Share a short message (at least 10 characters).')
    .max(2000, 'Message is too long.'),
  website: z.string().trim().max(200, 'Website URL is too long.').optional().or(z.literal('')),
});

export type ContactLeadFormValues = z.infer<typeof contactLeadFormSchema>;
