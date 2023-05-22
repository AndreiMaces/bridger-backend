import { User } from "@prisma/client";
import { Role } from "../../core/enums/role";
import { AddCompanyRequest } from "../../DTOs/User/AddCompanyRequest";

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
    updateProfilePicture(id: string, profileImageUrl: string): Promise<User | null>;
    updateCoverPicture(id: string, profileImageUrl: string): Promise<User | null>;
    resetPassword(id: string, newPassword: string): Promise<User | null>;
    updateEmail(id: string, newEmail: string): Promise<User | null>;
    getCompanies(id: string): Promise<any>;
    addCompany(id: string, company: typeof AddCompanyRequest): Promise<any>;
}