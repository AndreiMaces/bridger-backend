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
exports.deleteProfile = exports.editProfile = exports.getProfile = void 0;
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const EditProfileRequest_1 = require("../DTOs/Profile/EditProfileRequest");
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const profile = yield UserRepository_1.default.getUserById(req.body.user.id);
        res.json(profile);
    }
    catch (e) {
        res.status(400).json({
            error: e,
        });
        return;
    }
});
exports.getProfile = getProfile;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        EditProfileRequest_1.EditProfileRequest.parse(req.body);
    }
    catch (e) {
        return res.status(400).json({
            error: e,
        });
    }
    yield UserRepository_1.default.updateUser(req.body.user.id, req.body);
});
exports.editProfile = editProfile;
const deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('Delete Profile');
});
exports.deleteProfile = deleteProfile;
