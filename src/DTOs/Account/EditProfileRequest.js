"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProfileRequest = void 0;
const zod_1 = require("zod");
exports.EditProfileRequest = zod_1.z.object({
    firstName: zod_1.z.string().min(2).max(100),
    lastName: zod_1.z.string().min(2).max(100),
});
