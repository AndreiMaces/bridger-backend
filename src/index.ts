require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

import routes from "./routes/index";
import { Socket } from "socket.io";
app.use("/", routes);

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
io.on("connection", (socket: Socket) => {
  socket.on("join", (data: any) => {
    console.log(data)
    users = {...users, [data.userId]: []}
    if(data.userId === undefined || data.mac === undefined) return;
    //@ts-ignore
    users[data.userId].push({mac: data.mac, roomId: socket.id});
    socket.join(data.userId);
    //@ts-ignore
    io.to(data.userId).emit('online-users', users[data.userId]);
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
