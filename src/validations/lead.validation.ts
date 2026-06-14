import { z } from 'zod';

export const createLeadSchema = z.object({
  type: z.string().min(1),
  name: z.string().min(2),
  email: z.email(),
  message: z.string().min(5),

  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  source: z.string().optional(),
});
