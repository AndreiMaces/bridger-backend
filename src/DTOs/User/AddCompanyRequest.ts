import * as z from 'zod';

export const AddCompanyRequest = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(1000)
});