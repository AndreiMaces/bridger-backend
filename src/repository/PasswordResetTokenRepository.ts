import { PasswordResetToken, PrismaClient } from "@prisma/client";
import { IPasswordResetTokenRepository } from "./IRepository/IPasswordResetTokenRepository";
const prisma = new PrismaClient();

class PasswordResetTokenRepository implements IPasswordResetTokenRepository {
    getPasswordResetTokenById(id: string): Promise<PasswordResetToken> {
        return prisma.passwordResetToken.findUnique({
            where: {
                id: id,
            },
        });
    }
    createPasswordResetToken(userId: string): Promise<PasswordResetToken> {
        return prisma.passwordResetToken.create({
            data: {
                userId: userId,
            },
        });
    }
    deletePasswordResetTokenByUserId(userId: string): Promise<any> {
        return prisma.passwordResetToken.deleteMany({
            where: {
                userId: userId,
            },
        });
    }

}

export default new PasswordResetTokenRepository();