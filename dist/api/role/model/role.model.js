"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var RoleSchema = new _mongoose.Schema({
  level: {
    type: Number,
    required: true
  },
  name: {
    type: String
  }
}, {
  versionKey: false,
  timestamps: true
});

var _default = (0, _mongoose.model)("Role", RoleSchema);

exports["default"] = _default;