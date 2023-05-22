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
exports.addCompany = exports.getCompanies = exports.updateUserEmail = exports.updateCoverPicture = exports.updateProfilePicture = exports.changeUserRole = exports.updateUser = exports.deleteUser = exports.getUserById = exports.getAllUsers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const ChangeUserRoleRequest_1 = require("../DTOs/User/ChangeUserRoleRequest");
const UpdateUserRequest_1 = require("../DTOs/User/UpdateUserRequest");
const error_1 = require("../core/enums/error");
const success_1 = require("../core/enums/success");
const ImageService_1 = __importDefault(require("../service/ImageService"));
const UpdateUserEmailRequest_1 = require("../DTOs/Account/UpdateUserEmailRequest");
const bcrypt_1 = __importDefault(require("bcrypt"));
const CompanyRepository_1 = __importDefault(require("../repository/CompanyRepository"));
const AddCompanyRequest_1 = require("../DTOs/User/AddCompanyRequest");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(yield UserRepository_1.default.getAllUsers());
});
exports.getAllUsers = getAllUsers;
const changeUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    ChangeUserRoleRequest_1.ChangeUserRoleRequest.parse(req.body);
    if (!(yield UserRepository_1.default.exists(req.params.id)))
        return res.status(404).json({
            error: error_1.Error.USER_NOT_FOUND,
        });
    return res.json(yield UserRepository_1.default.changeUserRole(req.params.id, req.body.role));
});
exports.changeUserRole = changeUserRole;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield UserRepository_1.default.getUserById(id);
    if (!user)
        return res.status(404).json({
            error: error_1.Error.USER_NOT_FOUND,
        });
    return res.json(user);
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    UpdateUserRequest_1.UpdateUserRequest.parse(req.body);
    req.body;
    if (!(yield UserRepository_1.default.exists(req.params.id)))
        return res.status(404).json({
            error: error_1.Error.USER_NOT_FOUND,
        });
    const updatedUser = yield UserRepository_1.default.updateUser(req.params.id, req.body);
    return res.json(updatedUser);
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield UserRepository_1.default.exists(req.params.id))
        yield UserRepository_1.default.deleteUser(req.params.id);
    return res.json({
        message: success_1.Success.ACCOUNT_DELETED,
    });
});
exports.deleteUser = deleteUser;
const updateProfilePicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = ImageService_1.default.validateImage(req.file);
    if (error)
        return res.status(400).json({ error });
    const image = yield ImageService_1.default.uploadImage(req.file);
    const user = yield UserRepository_1.default.updateProfilePicture(req.params.id, image.url);
    res.json(user);
});
exports.updateProfilePicture = updateProfilePicture;
const updateCoverPicture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const error = ImageService_1.default.validateImage(req.file);
    if (error)
        return res.status(400).json({ error });
    const image = yield ImageService_1.default.uploadImage(req.file);
    const user = yield UserRepository_1.default.updateCoverPicture(req.params.id, image.url);
    res.json(user);
});
exports.updateCoverPicture = updateCoverPicture;
const updateUserEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    UpdateUserEmailRequest_1.UpdateUserEmailRequest.parse(req.body);
    const user = yield UserRepository_1.default.getUserById(req.params.id);
    if (user === null)
        return res.status(404).json({
            error: error_1.Error.USER_NOT_FOUND,
        });
    if (!bcrypt_1.default.compareSync(req.body.password, user.password))
        return res.status(400).json({ error: error_1.Error.INVALID_CREDENTIALS });
    const updatedUser = yield UserRepository_1.default.updateEmail(req.params.id, req.body.email);
    res.json(updatedUser);
});
exports.updateUserEmail = updateUserEmail;
const getCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const companies = yield CompanyRepository_1.default.getCompaniesByUser(req.params.id);
    return res.json(companies);
});
exports.getCompanies = getCompanies;
const addCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    AddCompanyRequest_1.AddCompanyRequest.parse(req.body);
    const company = yield UserRepository_1.default.addCompany(req.params.id, req.body);
    return res.json(company);
});
exports.addCompany = addCompany;
