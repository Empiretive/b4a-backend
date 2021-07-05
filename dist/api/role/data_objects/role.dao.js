"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRole = exports.setRole = exports.getRoles = exports.getRole = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _role = _interopRequireDefault(require("../model/role.model"));

// Get One role
var getRole = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(query) {
    var role;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _role["default"].findOne(query);

          case 2:
            role = _context.sent;
            return _context.abrupt("return", role);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getRole(_x) {
    return _ref.apply(this, arguments);
  };
}(); // Get all roles


exports.getRole = getRole;

var getRoles = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var roles;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _role["default"].find().sort("level");

          case 2:
            roles = _context2.sent;
            return _context2.abrupt("return", roles);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getRoles() {
    return _ref2.apply(this, arguments);
  };
}(); // Set a especific role


exports.getRoles = getRoles;

var setRole = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
    var level, name, roleSaved;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            level = _ref3.level, name = _ref3.name;
            _context3.next = 3;
            return new _role["default"]({
              level: level,
              name: name
            });

          case 3:
            roleSaved = _context3.sent;
            _context3.next = 6;
            return roleSaved.save();

          case 6:
            return _context3.abrupt("return", roleSaved);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function setRole(_x2) {
    return _ref4.apply(this, arguments);
  };
}(); // Update role name


exports.setRole = setRole;

var updateRole = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref5) {
    var level, name, roleUpdated;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            level = _ref5.level, name = _ref5.name;
            _context4.next = 3;
            return _role["default"].findOneAndUpdate({
              level: level
            }, {
              name: name
            }, {
              "new": true
            });

          case 3:
            roleUpdated = _context4.sent;
            return _context4.abrupt("return", roleUpdated);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateRole(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.updateRole = updateRole;