"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HandledRouter_1 = __importDefault(require("../utils/HandledRouter"));
const auth_mobile_1 = __importDefault(require("../controller/auth-mobile"));
HandledRouter_1.default.post("/registerDevice", auth_mobile_1.default);
exports.default = HandledRouter_1.default.getRouter();
