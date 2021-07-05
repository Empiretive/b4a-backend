"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var categorySchema = new _mongoose.Schema({
  name: String,
  description: String,
  color: String,
  status: Number,
  deletedAt: Date
}, {
  versionKey: false
});

var _default = (0, _mongoose.model)("Category", categorySchema);

exports["default"] = _default;