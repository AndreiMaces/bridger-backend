"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
const index_1 = __importDefault(require("./routes/index"));
const js_sha256_1 = require("js-sha256");
app.use("/", index_1.default);
// app.get("/", (req: any, res: { json: (arg0: { message: string }) => void }) => {
//   res.json({ message: "Welcome to the application." });
// });
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
});
let userOptions = {};
io.on("connection", (socket) => {
    let userId = "";
    socket.on("join", (data) => {
        console.log(data);
        userOptions[data.userId].link = (0, js_sha256_1.sha256)(data.userId + data.deviceIp);
        userOptions[data.userId].hasGyroscope = true;
        userOptions[data.userId].devices = {};
        if (!userOptions[data.userId].devices)
            userOptions[data.userId].devices = Object.assign(Object.assign({}, userOptions[data.userId].devices), { [data.userId]: [] });
        userOptions[data.userId].devices.push({ deviceIp: data.deviceIp, link });
        console.log(userOptions);
        Object.keys(userOptions).forEach((key) => {
            setInterval(() => {
                io.emit(key + 'online-users', users[key].devices);
            }, 500);
            if (users[key].hasGyroscope)
                socket.on(users[key].link + "gyroscope", (gyroscopeData) => {
                    io.emit(users[key].link + "gyroscope", gyroscopeData);
                });
        });
    });
    socket.on('forceDisconnect', function () {
        socket.disconnect();
    });
});
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
