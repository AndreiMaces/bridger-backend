// @ts-nocheck
require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/index";
import { Socket } from "socket.io";
import { HandleSocket } from "./socket";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/", routes);

const server = require("http").createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

export const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  HandleSocket(socket);
});