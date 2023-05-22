import { Request, Response, NextFunction } from 'express';
import { Role } from '../core/enums/role';
import { Error } from '../core/enums/error';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user.role === Role.ADMIN) {
        next();
    } else {
    res.status(401).json({
        error: Error.UNAUTHORIZED,
        });
    }
};

export default isAdmin;
    