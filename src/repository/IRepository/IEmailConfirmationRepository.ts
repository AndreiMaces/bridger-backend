import { EmailConfirmation } from "@prisma/client";

export interface IEmailConfirmationRepository {
    createEmailConfirmation(userId: string): Promise<EmailConfirmation | null>;
    deleteEmailConfirmationByUserId(userId: string): Promise<any>;
    getEmailConfirmationById(id: string): Promise<EmailConfirmation | null>;
    getEmailConfirmationByUserId(userId: string): Promise<any>
}