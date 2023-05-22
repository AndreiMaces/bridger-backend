import { EmailConfirmation } from "@prisma/client";
import { IEmailConfirmationRepository } from "./IRepository/IEmailConfirmationRepository";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class EmailConfirmationRepository implements IEmailConfirmationRepository
{
    getEmailConfirmationById(id: string): Promise<EmailConfirmation> {
        return prisma.emailConfirmation.findUnique({
            where: {
                id: id,
            },
        });
    }
    createEmailConfirmation(userId: string): Promise<EmailConfirmation | null> {
        return prisma.emailConfirmation.create({
            data: {
                userId: userId,
            }
        });
    }
    deleteEmailConfirmationByUserId(userId: string): Promise<any> {
        return prisma.emailConfirmation.delete({
            where: {
                userId: userId,
            },
        });
    }
    getEmailConfirmationByUserId(userId: string): Promise<any> {
        return prisma.emailConfirmation.findUnique({
            where: {
                userId: userId,
            },
        });
    }
}

export default new EmailConfirmationRepository();