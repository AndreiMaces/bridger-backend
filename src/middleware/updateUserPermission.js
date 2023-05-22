"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const role_1 = require("../core/enums/role");
const hasPermissionToUpdateUser = (req, res, next) => {
    var _a, _b;
    if (((_a = req.body) === null || _a === void 0 ? void 0 : _a.user.role) === role_1.Role.ADMIN || ((_b = req.body) === null || _b === void 0 ? void 0 : _b.user.id) === req.params.id) {
        next();
    }
    else {
        return res.status(401).json({
            error: 'Unauthorized',
        });
    }
};
exports.default = hasPermissionToUpdateUser;
