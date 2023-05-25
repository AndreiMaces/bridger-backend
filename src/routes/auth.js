"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HandledRouter_1 = __importDefault(require("../utils/HandledRouter"));
const auth_1 = require("../controller/auth");
HandledRouter_1.default.post("/register", auth_1.signup);
HandledRouter_1.default.post("/login", auth_1.signin);
HandledRouter_1.default.post("/email-reset-password", auth_1.sendEmailForgotPassword);
HandledRouter_1.default.post("/resend-email-confirmation", auth_1.resendEmailConfirmation);
HandledRouter_1.default.get("/confirm-email/:id", auth_1.confirmEmail);
HandledRouter_1.default.post("/reset-password/:id", auth_1.resetPassword);
exports.default = HandledRouter_1.default.getRouter();
