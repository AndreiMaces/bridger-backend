import { IJwtService } from "./IService/IJwtService";
import * as jwt from "jsonwebtoken";


class JwtService implements IJwtService
{
    generateToken(payload: any): string {
        return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '28d' });
    }
    verifyToken(token: string): boolean {
        try {
            jwt.verify(token, process.env.JWT_SECRET as string);
            return true;
        } catch (e: any) {
            return false;
        }
    }
}

export default new JwtService();