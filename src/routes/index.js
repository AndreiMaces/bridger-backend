"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//Pay attention to the following line:
const HandledRouter = (0, express_1.Router)();
const validateJwt_1 = __importDefault(require("../middleware/validateJwt"));
const user_1 = __importDefault(require("./user"));
HandledRouter.use("/users", validateJwt_1.default, user_1.default);
const account_1 = __importDefault(require("./account"));
HandledRouter.use("/account", validateJwt_1.default, account_1.default);
const auth_1 = __importDefault(require("./auth"));
HandledRouter.use("/auth", auth_1.default);
const company_1 = __importDefault(require("./company"));
HandledRouter.use("/companies", validateJwt_1.default, company_1.default);
exports.default = HandledRouter;
