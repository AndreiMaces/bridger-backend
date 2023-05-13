const app = require("express")();
const cors = require("cors");
app.use(cors());

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (client) => {
  client.on("gyroscope", (data) => {
    console.log(data);
    io.emit("gyroscopeCapture", { data });
  });
  client.on("disconnect", () => {
    console.log("disconnect");
  });
});

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

server.listen(3000);
