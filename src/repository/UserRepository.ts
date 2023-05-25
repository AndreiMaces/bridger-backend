import { User, PrismaClient } from "@prisma/client";
import { Role } from "../core/enums/role";
import { IUserRepository } from "./IRepository/IUserRepository";
import bcrypt from "bcrypt";
import TokenRepository from "./TokenRepository";
import PasswordResetTokenRepository from "./PasswordResetTokenRepository";
const prisma = new PrismaClient();

class UserRepository implements IUserRepository
{
    updateEmail(id: string, newEmail: string): Promise<User> {
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                email: newEmail,
            },
        });
    }
    confirmEmail(id: string): Promise<User | null> {
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                isEmailConfirmed: true,
            },
        });
    }
    exists(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            prisma.user.findFirst({
                where: {
                    id: id,
                    deletedAt: null,
                },
            }).then((user) => {
                if(user)
                    resolve(true);
                else
                    resolve(false);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    getAllUsers(): Promise<User[]> {
        return prisma.user.findMany({
            where: {
                deletedAt: null,
            },
        });
    }
    getUserById(id: string): Promise<User | null> {
        return prisma.user.findFirst({
            where: {
                id: id,
                deletedAt: null,
            },
        });
    }
    createUser(user: any): Promise<User | null> {
        return prisma.user.create({
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: bcrypt.hashSync(user.password, 10),
                role: Role.USER,
            },
        });
    }
    getUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findFirst({
            where: {
                email: email,
                deletedAt: null,
            },
        });
    }
    deleteUser(id: string): Promise<User | null> {
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                deletedAt: new Date(),
            },
        });
        
    }
    updateUser(id: string, user: any): Promise<User | null> {
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                updatedAt: new Date(),
            },
        });
    }
    async changeUserRole(id: string, role: Role): Promise<User | null> {
        await TokenRepository.deleteTokenByUserId(id);
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                role: role,
            },
        });
    }
    async resetPassword(id: string, newPassword: string): Promise<User | null> {
        await PasswordResetTokenRepository.deletePasswordResetTokenByUserId(id);
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                password: bcrypt.hashSync(newPassword, 10),
            },
        });
    }

    addDevice(id: string, name: string): Promise<User | null> {
        return prisma.user.update({
            where: {
                id: id,
            },
            data: {
                devices: {
                    create: {
                        name: name,
                    },
                },
            },
        });
    }
}

export default new UserRepository();