"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PasswordResetTokenRepository {
    getPasswordResetTokenById(id) {
        return prisma.passwordResetToken.findUnique({
            where: {
                id: id,
            },
        });
    }
    createPasswordResetToken(userId) {
        return prisma.passwordResetToken.create({
            data: {
                userId: userId,
            },
        });
    }
    deletePasswordResetTokenByUserId(userId) {
        return prisma.passwordResetToken.deleteMany({
            where: {
                userId: userId,
            },
        });
    }
}
exports.default = new PasswordResetTokenRepository();
