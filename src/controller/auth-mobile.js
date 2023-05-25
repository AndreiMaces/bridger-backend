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
const AuthLoginRequest_1 = require("../DTOs/Login/AuthLoginRequest");
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const error_1 = require("../core/enums/error");
const registerDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    AuthLoginRequest_1.AuthLoginRequest.parse(req.body);
    const user = yield UserRepository_1.default.getUserByEmail(req.body.email);
    if (user === null || (req.body.password !== user.password))
        return res.status(400).json({
            error: error_1.Error.INVALID_TOKEN,
        });
    if (!user.isEmailConfirmed)
        return res.status(400).json({
            error: error_1.Error.EMAIL_NOT_CONFIRMED,
        });
    yield UserRepository_1.default.addDevice(user.id, req.body.name);
    return res.json(user);
});
exports.default = { registerDevice };
