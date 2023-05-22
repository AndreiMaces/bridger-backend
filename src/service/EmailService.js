"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
class EmailSerivce {
    sendEmail(email, subject, message) {
        mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email,
            from: process.env.SENDGRID_SENDER_EMAIL,
            subject,
            html: message,
        };
        return mail_1.default.send(msg);
    }
}
exports.default = new EmailSerivce();
