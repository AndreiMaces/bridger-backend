import {z} from "zod";

export const EditProfileRequest = z.object({
    firstName: z.string().min(2).max(100),
    lastName: z.string().min(2).max(100),
});