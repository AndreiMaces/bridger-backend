import * as z from 'zod';

export const AuthRegisterRequest = z.object({
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
    email: z.string().email().max(100),
    password: z.string().min(8).max(100),
});