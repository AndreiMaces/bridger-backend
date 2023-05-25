import { AuthLoginRequest } from "../DTOs/Login/AuthLoginRequest";
import { GenericRequest } from "../core/types/GenericRequestType";
import UserRepository from "../repository/UserRepository";
import { Error as ErrorString } from "../core/enums/error";
import { Response } from "express";
import { MobileAuthLoginRequest } from "../DTOs/MobileLogin/AuthLoginRequest";

const registerDevice = async (req: GenericRequest<typeof MobileAuthLoginRequest>, res: Response) => {
    AuthLoginRequest.parse(req.body);
    const user = await UserRepository.getUserByEmail(req.body.email);

    if (user === null || (req.body.password !== user.password)) 
      return res.status(400).json({
        error: ErrorString.INVALID_TOKEN,
      });
    
    if(!user.isEmailConfirmed)
      return res.status(400).json({
        error: ErrorString.EMAIL_NOT_CONFIRMED,
      });

    await UserRepository.addDevice(user.id, req.body.name);

    return res.json(user);
};

export default {registerDevice};