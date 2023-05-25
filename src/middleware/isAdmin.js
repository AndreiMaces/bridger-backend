"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = require("../core/enums/role");
const error_1 = require("../core/enums/error");
const isAdmin = (req, res, next) => {
    if (req.body.user.role === role_1.Role.ADMIN) {
        next();
    }
    else {
        res.status(401).json({
            error: error_1.Error.UNAUTHORIZED,
        });
    }
};
exports.default = isAdmin;
