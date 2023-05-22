import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import TokenRepository from "../repository/TokenRepository";
import { Error } from "../core/enums/error";
import { CatchAll } from "../utils/universalTryCatch";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) 
    return res.status(401).json({
      error: Error.INVALID_TOKEN,
    });

  if (await TokenRepository.getByValue(token) === null) 
    return res.status(401).json({
      error: Error.INVALID_TOKEN,
    });

  jwt.verify(
    token as string,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(401).json({
          error: Error.INVALID_TOKEN,
        });
      }
      if(!decoded.data.isEmailConfirmed) {
        return res.status(401).json({
          error: Error.EMAIL_NOT_CONFIRMED,
        });
      }
      req.body.user = decoded.data;
      next();
    }
  );
};

export default CatchAll(validateToken);
