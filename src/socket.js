"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleSocket = void 0;
const MessageFormatValidator_1 = require("./utils/MessageFormatValidator");
const _1 = require(".");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let currentCommand = null;
const HandleSocket = (socket) => {
    socket.on("message", (data) => {
        try {
            //console.log("Message received: ", data);
            MessageFormatValidator_1.MessageFormat.parse(data);
            const decoded = jsonwebtoken_1.default.verify(data.jwt, process.env.JWT_SECRET);
            let user = decoded.data;
            if (!currentCommand || currentCommand.priority < user.priority) {
                currentCommand = Object.assign(Object.assign({}, data), { priority: user.priority });
                _1.io.emit(data.to, { direction: currentCommand.data, duration: data.duration });
                setTimeout(() => {
                    currentCommand = null;
                }, data.duration);
            }
        }
        catch (e) {
            console.log("Invalid message: ", e);
            return;
        }
    });
};
exports.HandleSocket = HandleSocket;
