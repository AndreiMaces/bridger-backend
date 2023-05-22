import { Request, Response } from "express";
import UserRepository from "../repository/UserRepository";
import { ChangeUserRoleRequest } from "../DTOs/User/ChangeUserRoleRequest";
import { GenericRequest } from "../core/types/GenericRequestType";
import { UpdateUserRequest } from "../DTOs/User/UpdateUserRequest";
import { Error } from "../core/enums/error";
import { Success } from "../core/enums/success";
import { UpdateUserEmailRequest } from "../DTOs/Account/UpdateUserEmailRequest";
import bcrypt from "bcrypt";

const getAllUsers = async (
  req: Request, 
  res: Response
) => {
  return res.json(await UserRepository.getAllUsers());
};

const changeUserRole = async (
  req: GenericRequest<typeof ChangeUserRoleRequest>,
  res: Response
) => {
    ChangeUserRoleRequest.parse(req.body);
    if(!await UserRepository.exists(req.params.id)) 
      return res.status(404).json({
        error: Error.USER_NOT_FOUND,
      });

    return res.json(await UserRepository.changeUserRole(req.params.id, req.body.role));  
};

const getUserById = async (
  req: Request,
  res: Response
) => {
    const { id } = req.params;
    const user = await UserRepository.getUserById(id);

    if(!user) 
      return res.status(404).json({
        error: Error.USER_NOT_FOUND,
      });
    
    return res.json(user);
};


const updateUser = async (
  req: GenericRequest<typeof UpdateUserRequest>,
  res: Response
) => {
  UpdateUserRequest.parse(req.body);
  req.body
  if(! await UserRepository.exists(req.params.id)) 
    return res.status(404).json({
      error: Error.USER_NOT_FOUND,
    });
  const updatedUser = await UserRepository.updateUser(req.params.id, req.body);
  return res.json(updatedUser);
};

const deleteUser = async (
  req: Request,
  res: Response
) => {
    if(await UserRepository.exists(req.params.id))
      await UserRepository.deleteUser(req.params.id);
  return res.json({
    message: Success.ACCOUNT_DELETED,
  });
};

const updateUserEmail = async (
  req: Request,
  res: Response
) => {
  UpdateUserEmailRequest.parse(req.body);
  const user = await UserRepository.getUserById(req.params.id);
  if(user === null) 
    return res.status(404).json({
      error: Error.USER_NOT_FOUND,
    });
  
  if(!bcrypt.compareSync(req.body.password, user.password)) return res.status(400).json({error: Error.INVALID_CREDENTIALS});

  const updatedUser = await UserRepository.updateEmail(req.params.id, req.body.email);
  res.json(updatedUser);
}


export { getAllUsers, getUserById, deleteUser, updateUser, changeUserRole ,  updateUserEmail,};