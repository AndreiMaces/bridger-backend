"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controller/user");
const isAdmin_1 = __importDefault(require("../middleware/isAdmin"));
const updateUserPermission_1 = __importDefault(require("../middleware/updateUserPermission"));
const HandledRouter_1 = __importDefault(require("../utils/HandledRouter"));
HandledRouter_1.default.get("/", isAdmin_1.default, user_1.getAllUsers);
HandledRouter_1.default.get("/:id", updateUserPermission_1.default, user_1.getUserById);
HandledRouter_1.default.patch("/:id/role", isAdmin_1.default, user_1.changeUserRole);
HandledRouter_1.default.patch("/:id/email", updateUserPermission_1.default, user_1.updateUser);
HandledRouter_1.default.put("/:id/priority", isAdmin_1.default, user_1.updateUserPriority);
HandledRouter_1.default.put("/:id", updateUserPermission_1.default, user_1.updateUser);
HandledRouter_1.default.delete("/:id", isAdmin_1.default, user_1.deleteUser);
exports.default = HandledRouter_1.default.getRouter();
