"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFormat = void 0;
const zod_1 = require("zod");
exports.MessageFormat = zod_1.z.object({
    from: zod_1.z.string(),
    to: zod_1.z.string(),
    jwt: zod_1.z.string(),
    duration: zod_1.z.number().min(0).max(1000),
    data: zod_1.z.any()
});
