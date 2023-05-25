import { User } from "@prisma/client";
import { Role } from "../../core/enums/role";

export interface IUserRepository {
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User | null>;
    getUserByEmail(email: string): Promise<User | null>;
    createUser(user: User): Promise<User | null>;
    deleteUser(id: string): void;
    updateUser(id: string, user: User): Promise<User | null>;
    changeUserRole(id: string, role: Role): Promise<User | null>;
    confirmEmail(id: string): Promise<User | null>;
    exists(id: string): Promise<boolean>;
    resetPassword(id: string, newPassword: string): Promise<User | null>;
    updateEmail(id: string, newEmail: string): Promise<User | null>;
    addDevice(id: string, name: string): Promise<User | null>;
}