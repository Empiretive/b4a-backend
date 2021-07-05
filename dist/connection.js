"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _config = _interopRequireDefault(require("./config"));

var _chalk = _interopRequireDefault(require("chalk"));

// URL TO CONECT WITH MONGODB
var connectionUrl;

if (process.env.NODE_ENV == "development") {
  connectionUrl = ""
    .concat(_config["default"].DB.PROTOCOL, "://")
    .concat(_config["default"].DB.HOST, ":")
    .concat(_config["default"].DB.PORT, "/")
    .concat(_config["default"].DB.NAME);
} else {
  connectionUrl =
    "mongodb+srv://admin:root@cluster0.1hrb2.mongodb.net/b4a_stg?retryWrites=true&w=majority";
}

var conn = _mongoose["default"]
  .connect(connectionUrl, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function (db) {
    return console.log(_chalk["default"].greenBright("DB is conected"));
  })
  ["catch"](function (err) {
    return console.log(err);
  });
