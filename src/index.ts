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
import { sha256 } from "js-sha256";
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
    const link = sha256(data.userId + data.deviceIp);
    console.log(data)
    users = {...users, [data.userId]: []}
    //@ts-ignore
    users[data.userId].push({ deviceIp: data.deviceIp, link });
    //@ts-ignore
    io.emit(data.userId + 'online-users', users[data.userId]);
    setInterval(() => {
      //@ts-ignore
      io.emit(data.userId + 'online-users', users[data.userId]);
    }, 500);
    console.log(link + "gyroscope")
    socket.on(link + "gyroscope", (gyroscopeData: any) => {
      console.log(link)
      io.emit(link + "gyroscope", gyroscopeData);
    })
  })
  socket.on('forceDisconnect', function(){
    socket.disconnect();
  });
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
