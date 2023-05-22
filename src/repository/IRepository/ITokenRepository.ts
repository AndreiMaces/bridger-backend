import { Token } from "@prisma/client";

export interface ITokenRepository {
    createToken(userId: string, value: string): Promise<Token | null>;
    deleteTokenByUserId(userId: string): Promise<any>;
    getByValue(value: string): Promise<Token | null>;
}