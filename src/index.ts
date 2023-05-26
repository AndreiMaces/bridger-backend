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
  let userId = "";
  socket.on("join", (data: any) => {
    userId = data.userId;
    console.log(data)
    users = {...users, [data.userId]: []}
    //@ts-ignore
    users[data.userId].push({mac: data.mac, roomId: data.userId});
    //@ts-ignore
    io.emit(data.userId + 'online-users', users[data.userId]);

    socket.on(userId + "gyroscope", (gyroscopeData: any) => {
      console.log(data.userId)
      io.emit(userId + "gyroscope", gyroscopeData);
    })
  })
  socket.on('forceDisconnect', function(){
    socket.disconnect();
  });
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
