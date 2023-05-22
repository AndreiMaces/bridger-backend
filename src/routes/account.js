"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_1 = require("../controller/account");
const HandledRouter_1 = __importDefault(require("../utils/HandledRouter"));
HandledRouter_1.default.delete("/", account_1.deleteAccount);
exports.default = HandledRouter_1.default.getRouter();
