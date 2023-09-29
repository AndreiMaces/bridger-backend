"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.sendEmailForgotPassword = exports.resendEmailConfirmation = exports.confirmEmail = exports.signin = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const TokenRepository_1 = __importDefault(require("../repository/TokenRepository"));
const EmailService_1 = __importDefault(require("../service/EmailService"));
const AuthLoginRequest_1 = require("../DTOs/Login/AuthLoginRequest");
const AuthRegisterRequest_1 = require("../DTOs/Register/AuthRegisterRequest");
const JwtService_1 = __importDefault(require("../service/JwtService"));
const error_1 = require("../core/enums/error");
const EmailConfirmationRepository_1 = __importDefault(require("../repository/EmailConfirmationRepository"));
const PasswordResetTokenRepository_1 = __importDefault(require("../repository/PasswordResetTokenRepository"));
const ResetPasswordRequest_1 = require("../DTOs/Account/ResetPasswordRequest");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    AuthRegisterRequest_1.AuthRegisterRequest.parse(req.body);
    if ((yield UserRepository_1.default.getUserByEmail(req.body.email)) !== null)
        return res.status(400).json({
            error: error_1.Error.USER_ALREADY_EXISTS,
        });
    const user = yield UserRepository_1.default.createUser(req.body);
    const emailConfirmation = yield EmailConfirmationRepository_1.default.createEmailConfirmation(user.id);
    EmailService_1.default.sendEmail(user.email, "Email confirmation", `To confirm email open following link: http://localhost:3000/auth/confirm-email/${emailConfirmation.id}`);
    return res.json(user);
});
exports.signup = signup;
const resendEmailConfirmation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserRepository_1.default.getUserByEmail(req.body.email);
    if (user.isEmailConfirmed)
        return res.status(400).json({
            error: error_1.Error.EMAIL_ALREADY_CONFIRMED,
        });
    const emailConfirmation = yield EmailConfirmationRepository_1.default.getEmailConfirmationByUserId(user.id);
    EmailService_1.default.sendEmail(user.email, "Email confirmation", `To confirm email open following link: https://www.bridger.com/auth/confirm-email/${emailConfirmation.id}`);
    return res.json(user);
});
exports.resendEmailConfirmation = resendEmailConfirmation;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    AuthLoginRequest_1.AuthLoginRequest.parse(req.body);
    const user = yield UserRepository_1.default.getUserByEmail(req.body.email);
    if (user === null || !bcrypt_1.default.compareSync(req.body.password, user.password))
        return res.status(400).json({
            error: error_1.Error.INVALID_CREDENTIALS,
        });
    if (!user.isEmailConfirmed)
        return res.status(400).json({
            error: error_1.Error.EMAIL_NOT_CONFIRMED,
        });
    const value = JwtService_1.default.generateToken({ data: user });
    yield TokenRepository_1.default.createToken(user.id, value);
    return res.json({
        token: value,
        user,
    });
});
exports.signin = signin;
const confirmEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const emailConfirmation = yield EmailConfirmationRepository_1.default.getEmailConfirmationById(id);
    if (emailConfirmation === null)
        return res.status(400).json({
            error: error_1.Error.INVALID_TOKEN,
        });
    const user = yield UserRepository_1.default.confirmEmail(emailConfirmation.userId);
    return res.json(user);
});
exports.confirmEmail = confirmEmail;
const sendEmailForgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield UserRepository_1.default.getUserByEmail(email);
    if (user === null)
        return res.status(400).json({
            error: error_1.Error.USER_NOT_FOUND,
        });
    const passwordResetToken = yield PasswordResetTokenRepository_1.default.createPasswordResetToken(user.id);
    EmailService_1.default.sendEmail(user.email, "Reset password", `To reset password open following link: https://www.theentrepreneurialdashboard.com/auth/reset-password/${passwordResetToken.id}`);
    return res.json(user);
});
exports.sendEmailForgotPassword = sendEmailForgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const passwordResetToken = yield PasswordResetTokenRepository_1.default.getPasswordResetTokenById(id);
    if (passwordResetToken === null)
        return res.status(400).json({
            error: error_1.Error.INVALID_TOKEN,
        });
    ResetPasswordRequest_1.ResetPasswordRequest.parse(req.body);
    const user = yield UserRepository_1.default.resetPassword(passwordResetToken.userId, req.body.password);
    return res.json(user);
});
exports.resetPassword = resetPassword;
