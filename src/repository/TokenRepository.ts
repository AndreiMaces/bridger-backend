import { PrismaClient, Token } from "@prisma/client";
import { ITokenRepository } from "./IRepository/ITokenRepository";
const prisma = new PrismaClient();

class TokenRepository implements ITokenRepository
{
    getByValue(value: string): Promise<Token | null> {
        return prisma.token.findFirst({
            where: {
                value: value,
            },
        });
    }
    createToken(userId: string , value: string): Promise<Token | null> {
        return prisma.token.create({
            data: {
                value: value,
                userId: userId,
            },
        });
    }
    deleteTokenByUserId(userId: string): Promise<any> {
        return prisma.token.deleteMany({
            where: {
                userId: userId,
            },
        });
    }
}

export default new TokenRepository();