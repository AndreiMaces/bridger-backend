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
const client_1 = require("@prisma/client");
const role_1 = require("../core/enums/role");
const bcrypt_1 = __importDefault(require("bcrypt"));
const TokenRepository_1 = __importDefault(require("./TokenRepository"));
const PasswordResetTokenRepository_1 = __importDefault(require("./PasswordResetTokenRepository"));
const prisma = new client_1.PrismaClient();
class UserRepository {
    updatePriority(id, priority) {
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                priority: priority,
            },
        });
    }
    updateEmail(id, newEmail) {
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                email: newEmail,
            },
        });
    }
    confirmEmail(id) {
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                isEmailConfirmed: true,
            },
        });
    }
    exists(id) {
        return new Promise((resolve, reject) => {
            prisma.user.findFirst({
                where: {
                    id: id,
                    deletedAt: null,
                },
            }).then((user) => {
                if (user)
                    resolve(true);
                else
                    resolve(false);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    getAllUsers() {
        return prisma.user.findMany({
            where: {
                deletedAt: null,
            },
        });
    }
    getUserById(id) {
        return prisma.user.findFirst({
            where: {
                id: id,
                deletedAt: null,
            },
        });
    }
    createUser(user) {
        return prisma.user.create({
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: bcrypt_1.default.hashSync(user.password, 10),
                role: role_1.Role.USER,
            },
        });
    }
    getUserByEmail(email) {
        return prisma.user.findFirst({
            where: {
                email: email,
                deletedAt: null,
            },
        });
    }
    deleteUser(id) {
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
    }
    updateUser(id, user) {
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                updatedAt: new Date(),
            },
        });
    }
    changeUserRole(id, role) {
        return __awaiter(this, void 0, void 0, function* () {
            yield TokenRepository_1.default.deleteTokenByUserId(id);
            return prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    role: role,
                },
            });
        });
    }
    resetPassword(id, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield PasswordResetTokenRepository_1.default.deletePasswordResetTokenByUserId(id);
            return prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    password: bcrypt_1.default.hashSync(newPassword, 10),
                },
            });
        });
    }
    addDevice(id, name) {
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                devices: {
                    create: {
                        name: name,
                    },
                },
            },
        });
    }
}
exports.default = new UserRepository();
