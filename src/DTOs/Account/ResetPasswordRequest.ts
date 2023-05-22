import * as z from 'zod';

export const ResetPasswordRequest = z.object({
    password: z.string().min(8).max(100)
});