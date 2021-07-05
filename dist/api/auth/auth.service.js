"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profile = exports.getUserByToken = exports.logout = exports.signIn = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _response = require("../../common/response");

var _States = require("../../common/States");

var _jwt = require("../../utils/jwt");

var _passwordCrypt = require("../../utils/passwordCrypt");

var UserDao = _interopRequireWildcard(require("../user/data_objects/user.dao"));

var _user2 = require("../user/data_objects/user.formater");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var signIn = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userFound, compare, token, payload, user, userFormat;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return UserDao.findUser({
              dni: req.body.userPass,
              deletedAt: null,
              status: _States.UserState.active
            });

          case 3:
            userFound = _context.sent;

            if (!((0, _lodash.isEmpty)(userFound) || userFound == null)) {
              _context.next = 10;
              break;
            }

            _context.next = 7;
            return UserDao.findUser({
              email: req.body.userPass.toLowerCase(),
              deletedAt: null,
              status: _States.UserState.active
            });

          case 7:
            userFound = _context.sent;

            if (!(0, _lodash.isEmpty)(userFound)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", res.json((0, _response.Response)(null, null, "USER.AUTH.ERROR.USER_NOT_EXISTS", false)).status(401));

          case 10:
            _context.next = 12;
            return (0, _passwordCrypt.comparePassword)(req.body.password, userFound.password);

          case 12:
            compare = _context.sent;

            if (compare) {
              _context.next = 15;
              break;
            }

            return _context.abrupt("return", res.json((0, _response.Response)(null, null, "USER.AUTH.ERROR.BAD_PASSWORD", false)).status(401));

          case 15:
            if ((0, _lodash.isEmpty)(userFound.token)) {
              _context.next = 28;
              break;
            }

            _context.next = 18;
            return (0, _jwt.getPayload)(userFound.token);

          case 18:
            payload = _context.sent;

            if ((0, _lodash.isEmpty)(payload.error)) {
              _context.next = 25;
              break;
            }

            _context.next = 22;
            return (0, _jwt.generateToken)({
              user: {
                _id: userFound._id,
                name: userFound.name,
                lastName: userFound.lastName,
                role: userFound.role
              }
            });

          case 22:
            token = _context.sent;
            _context.next = 26;
            break;

          case 25:
            token = userFound.token;

          case 26:
            _context.next = 31;
            break;

          case 28:
            _context.next = 30;
            return (0, _jwt.generateToken)({
              user: {
                _id: userFound._id,
                name: userFound.name,
                lastName: userFound.lastName,
                role: userFound.role
              }
            });

          case 30:
            token = _context.sent;

          case 31:
            _context.next = 33;
            return UserDao.savedToken(userFound._id, token);

          case 33:
            user = _context.sent;

            if ((0, _lodash.isEmpty)(user)) {
              _context.next = 38;
              break;
            }

            _context.next = 37;
            return (0, _user2.userFormater)(user);

          case 37:
            userFormat = _context.sent;

          case 38:
            userFormat.token = token;
            return _context.abrupt("return", res.json((0, _response.Response)({
              user: userFormat
            }, "USER.AUTH.SUCCESS", "USER.AUTH.ERROR", !(0, _lodash.isEmpty)(userFormat))).status(!(0, _lodash.isEmpty)(userFormat) ? 200 : 401));

          case 42:
            _context.prev = 42;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.json((0, _response.Response)(_context.t0, null, "USER.AUTH.ERROR.BAD_REQUEST", false)).status(400));

          case 45:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 42]]);
  }));

  return function signIn(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signIn = signIn;

var logout = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user, userLogout;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return UserDao.findUser({
              _id: req.user._id
            });

          case 3:
            user = _context2.sent;
            _context2.next = 6;
            return UserDao.savedToken(user._id, null);

          case 6:
            userLogout = _context2.sent;
            return _context2.abrupt("return", res.json((0, _response.Response)(null, "USER.AUTH.SUCCESS.LOGOUT", "USER.AUTH.ERROR.LOGOUT", !(0, _lodash.isEmpty)(userLogout))).status(200));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.json((0, _response.Response)(_context2.t0, null, "USER.AUTH.ERROR.LOGOUT", false)).status(200));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function logout(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.logout = logout;

var getUserByToken = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user, userFormat, payload;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            if (!(0, _lodash.isEmpty)(req.body.token)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.json((0, _response.Response)(null, null, "USER.AUTH.ERROR.TOKEN_NOT_PROVIDED", false)).status(400));

          case 3:
            _context3.next = 5;
            return UserDao.findUser({
              token: req.body.token
            });

          case 5:
            user = _context3.sent;

            if (!(0, _lodash.isEmpty)(user)) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", res.json((0, _response.Response)(null, null, "USER.AUTH.ERROR.NOT_FOUND", false)).status(400));

          case 8:
            _context3.next = 10;
            return (0, _user2.userFormater)(user);

          case 10:
            userFormat = _context3.sent;
            _context3.next = 13;
            return (0, _jwt.getPayload)(user.token);

          case 13:
            payload = _context3.sent;

            if ((0, _lodash.isEmpty)(payload.error)) {
              _context3.next = 18;
              break;
            }

            _context3.next = 17;
            return userDao.savedToken(user._id, null);

          case 17:
            return _context3.abrupt("return", res.json((0, _response.Response)(null, null, "USER.AUTH.ERROR.TOKEN_EXPIRED", false)).status(400));

          case 18:
            userFormat.token = user.token;
            return _context3.abrupt("return", res.json((0, _response.Response)(userFormat, "USER.AUTH.SUCCESS", "USER.AUTH.ERROR.NOT_VALID", !(0, _lodash.isEmpty)(userFormat))).status(200));

          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.json((0, _response.Response)(_context3.t0, "USER.AUTH.SUCCESS", "USER.AUTH.ERROR.BAD_REQUEST", false)).status(400));

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 22]]);
  }));

  return function getUserByToken(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUserByToken = getUserByToken;

var profile = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var user, userFormat;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return UserDao.findUser({
              _id: req.user._id
            });

          case 3:
            user = _context4.sent;
            _context4.next = 6;
            return (0, _user2.userFormater)(user);

          case 6:
            userFormat = _context4.sent;
            return _context4.abrupt("return", res.json((0, _response.Response)(userFormat, "USER.AUTH.PROFILE.SUCCESS", "USER.AUTH.PROFILE.ERROR.NOT_FOUND", !(0, _lodash.isEmpty)(userFormat))).status(400));

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.json((0, _response.Response)(_context4.t0, null, "USER.AUTH.PROFILE.ERROR.BAD_REQUEST", false)).status(400));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function profile(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.profile = profile;