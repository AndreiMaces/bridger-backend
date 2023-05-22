import { Request, Response } from 'express';
import UserRepository from '../repository/UserRepository';
import { Success } from '../core/enums/success';

const getProfile = async (req: Request, res: Response) => {
    const profile = await UserRepository.getUserById(req.body.user.id);
    res.json(profile);
}

const deleteAccount = async (req: Request, res: Response) => {
    await UserRepository.deleteUser(req.body.user.id);
    return res.json({ message: Success.ACCOUNT_DELETED});
}

export {
    getProfile,
    deleteAccount
};
