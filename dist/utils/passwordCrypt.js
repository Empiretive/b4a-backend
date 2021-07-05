"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparePassword = exports.encryptPassword = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _config = _interopRequireDefault(require("../config"));

// Encrypt a password
var encryptPassword = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(password) {
    var salt, encryptPass;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _bcryptjs["default"].genSalt(_config["default"].CRYPT.SALT_ROUND);

          case 2:
            salt = _context.sent;
            _context.next = 5;
            return _bcryptjs["default"].hash(password, salt);

          case 5:
            encryptPass = _context.sent;
            return _context.abrupt("return", encryptPass);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function encryptPassword(_x) {
    return _ref.apply(this, arguments);
  };
}(); // Compare two password encrypted


exports.encryptPassword = encryptPassword;

var comparePassword = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(password, orginPassword) {
    var compare;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _bcryptjs["default"].compare(password, orginPassword);

          case 2:
            compare = _context2.sent;
            return _context2.abrupt("return", compare);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function comparePassword(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.comparePassword = comparePassword;