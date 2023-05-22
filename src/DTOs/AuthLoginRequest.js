"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginResponse = void 0;
const zod_1 = require("zod");
exports.AuthLoginResponse = zod_1.z.object({
    email: zod_1.z.string().email().max(100),
    password: zod_1.z.string().min(8).max(100),
});
