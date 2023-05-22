import { Request, Response, NextFunction } from 'express';
import { Role } from '../core/enums/role';

const hasPermissionToUpdateUser = (req: Request, res: Response, next: NextFunction) => {
    if (req.body?.user.role === Role.ADMIN || req.body?.user.id === req.params.id) {
        next();
    } else {
        return res.status(401).json({
        error: 'Unauthorized',
    });
    }
};

export default hasPermissionToUpdateUser;
    