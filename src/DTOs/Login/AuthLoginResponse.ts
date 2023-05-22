import { z } from 'zod';

export const AuthLoginResponse = z.object({
    token: z.string(),
});
