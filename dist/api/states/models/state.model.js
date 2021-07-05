"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var stateSchema = new _mongoose.Schema({
  entity: {
    type: String
  },
  value: {
    type: Number
  },
  name: {
    type: String
  }
}, {
  versionKey: false
});

var _default = (0, _mongoose.model)("State", stateSchema);

exports["default"] = _default;