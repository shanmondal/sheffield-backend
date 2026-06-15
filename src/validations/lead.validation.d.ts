import { z } from 'zod';
export declare const createLeadSchema: z.ZodObject<{
    type: z.ZodString;
    name: z.ZodString;
    email: z.ZodEmail;
    message: z.ZodString;
    company: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    subject: z.ZodOptional<z.ZodString>;
    source: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=lead.validation.d.ts.map