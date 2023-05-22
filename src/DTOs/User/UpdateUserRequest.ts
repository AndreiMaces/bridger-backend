import { z } from "zod";

export const UpdateUserRequest = z.object({
    firstName: z.string().min(3).max(100),
    lastName: z.string().min(3).max(100),
});