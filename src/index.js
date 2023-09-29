"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
// @ts-nocheck
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./routes/index"));
const socket_1 = require("./socket");
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/", index_1.default);
const server = require("http").createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
exports.io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
exports.io.on("connection", (socket) => {
    (0, socket_1.HandleSocket)(socket);
});
