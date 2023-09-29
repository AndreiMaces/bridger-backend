import { Socket } from "socket.io";
import { MessageFormat } from "./utils/MessageFormatValidator";
import { User } from "@prisma/client";
import { io } from ".";
import jwt from "jsonwebtoken";

let currentCommand: any = null;

export const HandleSocket = (socket: Socket) =>
{
  socket.on("message", (data: MessageFormat) => {
    try {
      //console.log("Message received: ", data);

      MessageFormat.parse(data);
      const decoded = jwt.verify(data.jwt, process.env.JWT_SECRET) as any; 
      let user = decoded.data as User;

      if(!currentCommand || currentCommand.priority < user.priority) {
        currentCommand = {...data, priority: user.priority};
        io.emit(data.to, currentCommand.data);
        setTimeout(() => {
            currentCommand = null;
        }, data.duration);
      }
    } catch(e) {
      console.log("Invalid message: " , e);
      return;
    }
  });
}