"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TokenRepository {
    getByValue(value) {
        return prisma.token.findFirst({
            where: {
                value: value,
            },
        });
    }
    createToken(userId, value) {
        return prisma.token.create({
            data: {
                value: value,
                userId: userId,
            },
        });
    }
    deleteTokenByUserId(userId) {
        return prisma.token.deleteMany({
            where: {
                userId: userId,
            },
        });
    }
}
exports.default = new TokenRepository();
