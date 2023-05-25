"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserRequest = void 0;
const zod_1 = require("zod");
exports.UpdateUserRequest = zod_1.z.object({
    firstName: zod_1.z.string().min(3).max(100),
    lastName: zod_1.z.string().min(3).max(100),
});
