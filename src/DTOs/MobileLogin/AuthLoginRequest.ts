import {z} from "zod";

export const MobileAuthLoginRequest = z.object({
    email: z.string().email().max(100),
    password: z.string().min(8).max(100),
    name: z.string()
});