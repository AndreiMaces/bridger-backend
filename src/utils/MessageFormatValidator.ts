import {z} from "zod";
import * as jwt from 'jsonwebtoken';

export const MessageFormat = z.object({
    from: z.string(),
    to: z.string(),
    jwt: z.string(),
    duration: z.number().min(0).max(1000),
    data: z.any()
});

export type MessageFormat = z.infer<typeof MessageFormat>;