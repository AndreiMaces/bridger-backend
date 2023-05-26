"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
let users = {};
io.on("connection", (socket) => {
    let userId = "";
    socket.on("join", (data) => {
        const link = (0, js_sha256_1.sha256)(data.userId + data.deviceName);
        console.log(data);
        users = Object.assign(Object.assign({}, users), { [data.userId]: [] });
        //@ts-ignore
        users[data.userId].push({ deviceIp: data.deviceIp, link });
        //@ts-ignore
        io.emit(data.userId + 'online-users', users[data.userId]);
        setInterval(() => {
            //@ts-ignore
            io.emit(data.userId + 'online-users', users[data.userId]);
        }, 500);
        socket.on(link + "gyroscope", (gyroscopeData) => {
            console.log(data.userId);
            io.emit(link + "gyroscope", gyroscopeData);
        });
    });
    socket.on('forceDisconnect', function () {
        socket.disconnect();
    });
});
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
