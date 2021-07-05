"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Response = void 0;

// Response format function
var Response = function Response(data, messageSuccess, MessageError, status) {
  var response = {
    data: data,
    message: status ? messageSuccess : MessageError,
    success: status
  };
  return response;
};

exports.Response = Response;