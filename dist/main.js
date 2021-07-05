"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _chalk = _interopRequireDefault(require("chalk"));

require("./connection");

var _app = _interopRequireDefault(require("./app"));

var _http = _interopRequireDefault(require("http"));

var _socket = require("socket.io");

var server = _http["default"].createServer(_app["default"]);

var io = new _socket.Server(server, {
  cors: {
    origin: "*"
  }
}); // Start Server
// app.listen(app.get("port"), () => {
//   console.log(chalk.blueBright(`Server listening on port ${app.get("port")}`));
// });

io.on("connection", function (socket) {
  socket.on("notification", function (message) {
    console.log(message);
  });
});

_app["default"].get("/socket", function (req, res) {
  io.emit("send", "Enviandoooo");
  res.send("enviando socket");
});

server.listen(_app["default"].get("port"), function () {
  console.log(_chalk["default"].blueBright("Server listening on port ".concat(_app["default"].get("port"))));
});