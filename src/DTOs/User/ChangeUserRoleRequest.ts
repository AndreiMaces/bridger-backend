import * as z from 'zod';
import { Role } from '../../core/enums/role';

export const ChangeUserRoleRequest = z.object({
    role: z.enum([Role.ADMIN, Role.USER])
});