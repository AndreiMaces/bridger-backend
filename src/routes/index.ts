import { Router } from "express";

//Pay attention to the following line:
const HandledRouter = Router();

import validateToken from "../middleware/validateJwt";

import userRoutes from "./user";
HandledRouter.use("/users", validateToken, userRoutes);

import accountRoutes from "./account";
HandledRouter.use("/account", validateToken, accountRoutes);

import authRoutes from "./auth";
HandledRouter.use("/auth", authRoutes);

import companyRoutes from "./company";
HandledRouter.use("/companies", validateToken, companyRoutes);

export default HandledRouter;
