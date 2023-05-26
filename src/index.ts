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

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let userOptions = {};
io.on("connection", (socket: Socket) => {
  socket.on("join", (data: any) => {
    if (!userOptions[data.userId]) userOptions[data.userId] = {};
    if (!userOptions[data.userId].devices)
      userOptions[data.userId].devices = [];
    if (
      !userOptions[data.userId].devices.find(
        (device: any) => device.deviceIp === data.deviceIp
      )
    )
      userOptions[data.userId].devices.push({
        deviceInfo: data.deviceInfo,
        deviceIp: data.deviceIp,
        link: sha256(data.userId + data.deviceIp),
        hasGyroscope: true,
        hasAccelerometer: true,
        hasDeviceMotion: true,
      });

    Object.keys(userOptions).forEach((key) => {
      setInterval(() => {
        io.emit(key + "online-users", userOptions[key].devices);
      }, 500);

      userOptions[key].devices.forEach((device: any) => {
        console.log(device);
        if (device.hasGyroscope) {
          socket.on(device.link + "gyroscope", (gyroscopeData: any) => {
            io.emit(device.link + "gyroscope", gyroscopeData);
            console.log("Gyroscope data: ", gyroscopeData);
          });
        }

        if (device.hasAccelerometer) {
          socket.on(device.link + "accelerometer", (accelerometerData: any) => {
            io.emit(device.link + "accelerometer", accelerometerData);
          });
        }

        if (device.hasDeviceMotion) {
          socket.on(device.link + "deviceMotion", (deviceMotionData: any) => {
            io.emit(device.link + "deviceMotion", deviceMotionData);
          });
        }
      });
    });
  });
  socket.on("forceDisconnect", function () {
    socket.disconnect();
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
