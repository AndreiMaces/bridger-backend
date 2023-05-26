// @ts-nocheck
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

let userOptions = {};
io.on("connection", (socket: Socket) => {
  socket.on("join", (data: any) => {
    console.log(data)
    if(!userOptions[data.userId]) userOptions[data.userId] = {};
    userOptions[data.userId].link = sha256(data.userId + data.deviceIp);
    userOptions[data.userId].hasGyroscope = true;
    if(!userOptions[data.userId].devices) userOptions[data.userId].devices = [];
    userOptions[data.userId].devices.push({ deviceIp: data.deviceIp, link: userOptions[data.userId].link });

    console.log(userOptions)

    Object.keys(userOptions).forEach((key) => {
      setInterval(() => {
        io.emit(key + 'online-users', users[key].devices);
      }, 500);
      if(users[key].hasGyroscope)
        socket.on(users[key].link + "gyroscope", (gyroscopeData: any) => {
          io.emit(users[key].link + "gyroscope", gyroscopeData);
        })
    });

  })
  socket.on('forceDisconnect', function(){
    socket.disconnect();
  });
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
