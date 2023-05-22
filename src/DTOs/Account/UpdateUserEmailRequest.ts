import * as z from 'zod';

export const UpdateUserEmailRequest = z.object({
    password: z.string().min(8).max(100),
    email: z.string().email().max(100),
});