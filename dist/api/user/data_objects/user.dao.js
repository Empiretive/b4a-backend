"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activatedUser = exports.savedToken = exports.updateUser = exports.registerUser = exports.findAllUsers = exports.findUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _user = _interopRequireDefault(require("../models/user.model"));

var _role = _interopRequireDefault(require("../../role/model/role.model"));

var _lodash = require("lodash");

var _States = require("../../../common/States");

// Find one User some time, by a query or not
var findUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(query) {
    var userFound;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _user["default"].findOne(query).populate("role", "name level");

          case 2:
            userFound = _context.sent;
            return _context.abrupt("return", userFound);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findUser(_x) {
    return _ref.apply(this, arguments);
  };
}(); // Find all user with the query condition


exports.findUser = findUser;

var findAllUsers = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var query,
        users,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            query = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : null;
            _context2.next = 3;
            return _user["default"].find(query).populate("role", "level name");

          case 3:
            users = _context2.sent;
            return _context2.abrupt("return", users);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findAllUsers() {
    return _ref2.apply(this, arguments);
  };
}(); // Register a user


exports.findAllUsers = findAllUsers;

var registerUser = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(user) {
    var role, newUser;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _role["default"].findOne({
              level: user.role
            });

          case 2:
            role = _context3.sent;

            if (!(0, _lodash.isEmpty)(role)) {
              _context3.next = 7;
              break;
            }

            _context3.next = 6;
            return _role["default"].findOne({
              level: 4
            });

          case 6:
            role = _context3.sent;

          case 7:
            user.role = role._id;
            newUser = new _user["default"](user);
            _context3.next = 11;
            return newUser.save();

          case 11:
            return _context3.abrupt("return", newUser);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function registerUser(_x2) {
    return _ref3.apply(this, arguments);
  };
}(); // Update User


exports.registerUser = registerUser;

var updateUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(query, user) {
    var userFound, role, userUpdated;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _user["default"].findOne(query);

          case 2:
            userFound = _context4.sent;
            _context4.next = 5;
            return _role["default"].findOne({
              level: user.role
            });

          case 5:
            role = _context4.sent;

            if ((0, _lodash.isEmpty)(role) || role == null) {
              role._id = userFound.role;
            }

            user.role = role._id;
            _context4.next = 10;
            return _user["default"].findByIdAndUpdate(userFound._id, user, {
              "new": true
            });

          case 10:
            userUpdated = _context4.sent;
            return _context4.abrupt("return", userUpdated);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function updateUser(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateUser = updateUser;

var savedToken = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(user_id, token) {
    var userSaved;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _user["default"].findByIdAndUpdate(user_id, {
              token: token
            }, {
              "new": true
            });

          case 2:
            userSaved = _context5.sent;
            return _context5.abrupt("return", userSaved);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function savedToken(_x5, _x6) {
    return _ref5.apply(this, arguments);
  };
}();

exports.savedToken = savedToken;

var activatedUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, action) {
    var user, userFound, state;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!(action == "DELETE")) {
              _context6.next = 6;
              break;
            }

            _context6.next = 3;
            return _user["default"].findByIdAndUpdate(id, {
              deletedAt: new Date()
            }, {
              "new": true
            });

          case 3:
            user = _context6.sent;
            _context6.next = 11;
            break;

          case 6:
            if (!(action == "TOGGLE")) {
              _context6.next = 11;
              break;
            }

            _context6.next = 9;
            return _user["default"].findById(id);

          case 9:
            userFound = _context6.sent;

            if (!(0, _lodash.isEmpty)(userFound)) {
              state = userFound.status == _States.UserState.active ? _States.UserState.disable : _States.UserState.active;
              userFound.status = state;
              user = userFound.save();
            }

          case 11:
            return _context6.abrupt("return", user);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function activatedUser(_x7, _x8) {
    return _ref6.apply(this, arguments);
  };
}();

exports.activatedUser = activatedUser;