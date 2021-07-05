"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPayload = exports.generateToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var generateToken = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload) {
    var token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _jsonwebtoken["default"].sign(payload, _config["default"].JWT.SECRET, {
              expiresIn: _config["default"].JWT.EXPIRE_IN
            });

          case 2:
            token = _context.sent;
            return _context.abrupt("return", token);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function generateToken(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.generateToken = generateToken;

var getPayload = function getPayload(token) {
  var payload = _jsonwebtoken["default"].verify(token, _config["default"].JWT.SECRET, function (err, payload) {
    if (err) {
      console.log(err);
      return {
        err: err
      };
    } else {
      return payload;
    }
  });

  if (payload.err) {
    return {
      error: "Token Error"
    };
  }

  return payload;
};

exports.getPayload = getPayload;