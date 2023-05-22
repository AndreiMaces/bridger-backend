"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class EmailConfirmationRepository {
    getEmailConfirmationById(id) {
        return prisma.emailConfirmation.findUnique({
            where: {
                id: id,
            },
        });
    }
    createEmailConfirmation(userId) {
        return prisma.emailConfirmation.create({
            data: {
                userId: userId,
            }
        });
    }
    deleteEmailConfirmationByUserId(userId) {
        return prisma.emailConfirmation.delete({
            where: {
                userId: userId,
            },
        });
    }
    getEmailConfirmationByUserId(userId) {
        return prisma.emailConfirmation.findUnique({
            where: {
                userId: userId,
            },
        });
    }
}
exports.default = new EmailConfirmationRepository();
