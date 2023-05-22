import { z } from "zod";
import { Role } from "../core/enums/role";
export const User = z.object({
  id: z.string(),
  email: z.string().email().max(100),
  firstName: z.string().min(3).max(100),
  lastName: z.string().min(3).max(100),
  password: z
    .string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .max(100),
  role: z.enum([Role.ADMIN, Role.USER]),
  isEmailConfirmed: z.boolean(),
  deletedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

/*

id        String      @id @default(uuid())
  email     String   @unique
  firstName String
  lastName  String
  password  String
  role      String? @default("user")
  isEmailConfirmed Boolean @default(false)
  deletedAt DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
*/ 