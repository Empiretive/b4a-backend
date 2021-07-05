"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var settingSchema = new _mongoose.Schema({
  type: {
    type: String
  },
  name: {
    type: String
  },
  value: {},
  deletedAt: Date
}, {
  versionKey: false
});

var _default = (0, _mongoose.model)("Setting", settingSchema);

exports["default"] = _default;