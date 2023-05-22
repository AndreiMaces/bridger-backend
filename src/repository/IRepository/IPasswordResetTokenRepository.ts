import { PasswordResetToken } from "@prisma/client";

export interface IPasswordResetTokenRepository {
    createPasswordResetToken(userId: string): Promise<PasswordResetToken | null>;
    deletePasswordResetTokenByUserId(userId: string): Promise<any>;
    getPasswordResetTokenById(id: string): Promise<PasswordResetToken | null>;
}