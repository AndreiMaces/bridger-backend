"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const universalTryCatch_1 = require("./universalTryCatch");
class HandledRouter {
    constructor() {
        this._router = express_1.default.Router();
    }
    get(route, ...functions) {
        this._router.get(route, ...functions.map(f => (0, universalTryCatch_1.CatchAll)(f)));
    }
    post(route, ...functions) {
        this._router.post(route, ...functions.map(f => (0, universalTryCatch_1.CatchAll)(f)));
    }
    put(route, ...functions) {
        this._router.put(route, ...functions.map(f => (0, universalTryCatch_1.CatchAll)(f)));
    }
    delete(route, ...functions) {
        this._router.delete(route, ...functions.map(f => (0, universalTryCatch_1.CatchAll)(f)));
    }
    patch(route, ...functions) {
        this._router.patch(route, ...functions.map(f => (0, universalTryCatch_1.CatchAll)(f)));
    }
    getRouter() {
        return this._router;
    }
}
exports.default = new HandledRouter();
