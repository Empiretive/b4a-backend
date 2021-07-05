"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var userSchema = new _mongoose.Schema({
  dni: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  lastName: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  status: {
    type: Number
  },
  role: {
    ref: "Role",
    type: _mongoose.Schema.Types.ObjectId
  },
  photo: {
    type: String
  },
  password: {
    type: String
  },
  token: {
    type: String
  },
  deletedAt: {
    type: Date
  }
}, {
  versionKey: false,
  timestamps: true
});

var _default = (0, _mongoose.model)("User", userSchema);

exports["default"] = _default;