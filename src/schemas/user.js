"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const zod_1 = require("zod");
const role_1 = require("../core/enums/role");
exports.User = zod_1.z.object({
    id: zod_1.z.string(),
    email: zod_1.z.string().email().max(100),
    firstName: zod_1.z.string().min(3).max(100),
    lastName: zod_1.z.string().min(3).max(100),
    password: zod_1.z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .max(100),
    role: zod_1.z.enum([role_1.Role.ADMIN, role_1.Role.USER]),
    isEmailConfirmed: zod_1.z.boolean(),
    deletedAt: zod_1.z.date().optional(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
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
