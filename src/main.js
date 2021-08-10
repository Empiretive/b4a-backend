import chalk from "chalk";
import "./connection";
import app from "./app";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Start Server
// app.listen(app.get("port"), () => {
//   console.log(chalk.blueBright(`Server listening on port ${app.get("port")}`));
// });

io.on("connection", (socket) => {
  socket.on("notification", (message) => {
    console.log(message);
  });
});

server.listen(app.get("port"), () => {
  console.log(chalk.blueBright(`Server listening on port ${app.get("port")}`));
});
