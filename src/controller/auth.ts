import bcrypt from "bcrypt";
import { Response, Request } from "express";
import UserRepository from "../repository/UserRepository";
import TokenRepository from "../repository/TokenRepository";
import EmailService from "../service/EmailService";
import {AuthLoginRequest} from "../DTOs/Login/AuthLoginRequest";
import { AuthRegisterRequest } from "../DTOs/Register/AuthRegisterRequest";
import { GenericRequest } from "../core/types/GenericRequestType";
import JwtService from "../service/JwtService";
import { Error as ErrorString } from "../core/enums/error";
import EmailConfirmationRepository from "../repository/EmailConfirmationRepository";
import PasswordResetTokenRepository from "../repository/PasswordResetTokenRepository";
import { ResetPasswordRequest } from "../DTOs/Account/ResetPasswordRequest";

const signup = async (req: GenericRequest<typeof AuthRegisterRequest>, res: Response) => {
    AuthRegisterRequest.parse(req.body);
    if (await UserRepository.getUserByEmail(req.body.email) !== null)
      return res.status(400).json({
        error: ErrorString.USER_ALREADY_EXISTS,
      });

    const user = await UserRepository.createUser(req.body);
    const emailConfirmation = await EmailConfirmationRepository.createEmailConfirmation(user.id);
    EmailService.sendEmail(user.email, "Email confirmation", `To confirm email open following link: http://localhost:3000/auth/confirm-email/${emailConfirmation.id}`);
    return res.json(user);
};

const resendEmailConfirmation = async (req: Request, res: Response) => {

  const user = await UserRepository.getUserByEmail(req.body.email);

    if(user.isEmailConfirmed)
    return res.status(400).json({
      error: ErrorString.EMAIL_ALREADY_CONFIRMED,
    });
    
    const emailConfirmation = await EmailConfirmationRepository.getEmailConfirmationByUserId(user.id);
    EmailService.sendEmail(user.email, "Email confirmation", `To confirm email open following link: https://www.bridger.com/auth/confirm-email/${emailConfirmation.id}`);
    return res.json(user);
}


const signin = async (req: GenericRequest<typeof AuthLoginRequest>, res: Response) => {
    AuthLoginRequest.parse(req.body);
    const user = await UserRepository.getUserByEmail(req.body.email);

    if (user === null || !bcrypt.compareSync(req.body.password, user.password)) 
      return res.status(400).json({
        error: ErrorString.INVALID_CREDENTIALS,
      });
    
    if(!user.isEmailConfirmed)
      return res.status(400).json({
        error: ErrorString.EMAIL_NOT_CONFIRMED,
      });

    const value = JwtService.generateToken({ data: user });
    await TokenRepository.createToken(user.id, value);

    return res.json({
      token: value,
      user,
    });
};

const confirmEmail = async (req: Request, res: Response) => {
    const id = req.params.id;
    const emailConfirmation = await EmailConfirmationRepository.getEmailConfirmationById(id);
    if(emailConfirmation === null)
      return res.status(400).json({
        error: ErrorString.INVALID_TOKEN,
      });
    const user = await UserRepository.confirmEmail(emailConfirmation.userId);
    return res.json(user);
}

const sendEmailForgotPassword = async (req: Request, res: Response) => {
  const email = req.body.email;
  const user = await UserRepository.getUserByEmail(email);
  if(user === null)
    return res.status(400).json({
      error: ErrorString.USER_NOT_FOUND,
    });
  const passwordResetToken = await PasswordResetTokenRepository.createPasswordResetToken(user.id);
  EmailService.sendEmail(user.email, "Reset password", `To reset password open following link: https://www.theentrepreneurialdashboard.com/auth/reset-password/${passwordResetToken.id}`);
  return res.json(user);
}

const resetPassword = async (req: GenericRequest<typeof ResetPasswordRequest>, res: Response) => {
  const id = req.params.id;
  const passwordResetToken = await PasswordResetTokenRepository.getPasswordResetTokenById(id);
  if(passwordResetToken === null)
    return res.status(400).json({
      error: ErrorString.INVALID_TOKEN,
    });
  ResetPasswordRequest.parse(req.body);
  const user = await UserRepository.resetPassword(passwordResetToken.userId, req.body.password);
  return res.json(user);
}

export { signup, signin, confirmEmail, resendEmailConfirmation, sendEmailForgotPassword, resetPassword };