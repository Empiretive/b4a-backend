"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleEnableUser = exports.deleteUser = exports.getOneUser = exports.updateUserById = exports.getUsers = exports.registerUser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var UserDao = _interopRequireWildcard(require("./data_objects/user.dao"));

var _generatePassword = _interopRequireDefault(require("generate-password"));

var encrypt = _interopRequireWildcard(require("../../utils/passwordCrypt"));

var _user2 = require("./data_objects/user.dto");

var _mail = require("../../utils/mail/mail");

var _lodash = require("lodash");

var _response = require("../../common/response");

var jwt = _interopRequireWildcard(require("../../utils/jwt"));

var _States = require("../../common/States");

var _user3 = require("./data_objects/user.formater");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Register user BACKOFFICE
var registerUser = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userFound, userFoundbyEmail, _req$body, dni, name, lastName, phone, email, role, photo, password, user, userSaved, token, userResponse;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return UserDao.findUser({
              dni: req.body.dni,
              deletedAt: null,
              status: _States.UserState.active
            });

          case 3:
            userFound = _context.sent;
            _context.next = 6;
            return UserDao.findUser({
              email: req.body.email,
              deletedAt: null,
              status: _States.UserState.active
            });

          case 6:
            userFoundbyEmail = _context.sent;

            if (!((0, _lodash.isEmpty)(userFound) && (0, _lodash.isEmpty)(userFoundbyEmail))) {
              _context.next = 29;
              break;
            }

            _req$body = req.body, dni = _req$body.dni, name = _req$body.name, lastName = _req$body.lastName, phone = _req$body.phone, email = _req$body.email, role = _req$body.role, photo = _req$body.photo;
            password = !(0, _lodash.isEmpty)(req.body.password) ? req.body.password : _generatePassword["default"].generate({
              length: 10,
              numbers: true
            }); //Generate a dinamic password to a new user
            // The dto validate the properties

            user = (0, _user2.userDto)({
              dni: dni,
              name: name,
              lastName: lastName,
              email: email,
              role: role,
              photo: photo
            }); // Send a mail with the password generate

            _context.next = 13;
            return (0, _mail.sendMailRegister)(user.email, {
              name: name,
              lastName: lastName,
              password: password
            });

          case 13:
            _context.next = 15;
            return encrypt.encryptPassword(password);

          case 15:
            user.password = _context.sent;
            //Encrypt Password
            user.status = _States.UserState.active;
            user.email = user.email.toLowerCase();
            user.phone = phone;
            _context.next = 21;
            return UserDao.registerUser(user);

          case 21:
            userSaved = _context.sent;
            //Saved user on BD
            token = null; // Generate Token on register?
            // await jwt.generateToken({
            //   user: {
            //     _id: userSaved._id,
            //     name: userSaved.name,
            //     lastName: userSaved.lastName,
            //     role: userSaved.role,
            //   },
            // });

            _context.next = 25;
            return UserDao.savedToken(userSaved._id, token);

          case 25:
            userResponse = _context.sent;
            return _context.abrupt("return", res.json((0, _response.Response)(userResponse, "USER.REGISTER.SUCCESS", "USER.REGISTER.ERROR.CANT_BE_REGISTERED", !(0, _lodash.isEmpty)(userResponse))).status(!(0, _lodash.isEmpty)(userResponse) ? 201 : 403));

          case 29:
            return _context.abrupt("return", res.json((0, _response.Response)(null, null, "USER.REGISTER.ERROR.USER_EXIST", false)).status(400));

          case 30:
            _context.next = 35;
            break;

          case 32:
            _context.prev = 32;
            _context.t0 = _context["catch"](0);
            res.json((0, _response.Response)(_context.t0, null, "USER.REGISTER.ERROR.BAD_REQUEST", false)).status(400);

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 32]]);
  }));

  return function registerUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // List users


exports.registerUser = registerUser;

var getUsers = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var listUsers, userListFormat;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return UserDao.findAllUsers({
              deletedAt: null
            });

          case 3:
            listUsers = _context2.sent;
            _context2.next = 6;
            return (0, _user3.AllUserFormat)(listUsers, req.user.role.level);

          case 6:
            userListFormat = _context2.sent;
            return _context2.abrupt("return", res.json((0, _response.Response)(userListFormat, "USER.FIND.SUCCESS", "USER.FIND.ERROR.NOT_FOUND", !(0, _lodash.isEmpty)(userListFormat))).status(!(0, _lodash.isEmpty)(userListFormat) ? 200 : 404));

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            res.json((0, _response.Response)(_context2.t0, null, "USER.LIST.ERROR.BAD_REQUEST")).status(400);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));

  return function getUsers(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // Update User


exports.getUsers = getUsers;

var updateUserById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body2, dni, name, lastName, phone, email, role, photo, status, user, updateUser;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _req$body2 = req.body, dni = _req$body2.dni, name = _req$body2.name, lastName = _req$body2.lastName, phone = _req$body2.phone, email = _req$body2.email, role = _req$body2.role, photo = _req$body2.photo, status = _req$body2.status;
            user = (0, _user2.userDto)({
              dni: dni,
              name: name,
              lastName: lastName,
              email: email,
              role: role,
              photo: photo
            });
            user.phone = phone;
            user.status = status;
            user.token = null;
            _context3.next = 8;
            return UserDao.updateUser({
              _id: req.params.id
            }, user);

          case 8:
            updateUser = _context3.sent;
            return _context3.abrupt("return", res.json((0, _response.Response)(updateUser, "USER.UPDATE.SUCCESS", "USER.UPDATE.ERROR.BAD_REQUEST", !(0, _lodash.isEmpty)(updateUser))).status(!(0, _lodash.isEmpty)(updateUser) ? 200 : 400));

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            res.json((0, _response.Response)(_context3.t0, null, "USER.UPDATE.ERROR.BAD_REQUEST")).status(400);

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 12]]);
  }));

  return function updateUserById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // Get One User


exports.updateUserById = updateUserById;

var getOneUser = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var userFound, userFormated;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return UserDao.findUser({
              _id: req.params.id,
              deletedAt: null
            });

          case 3:
            userFound = _context4.sent;
            _context4.next = 6;
            return (0, _user3.userFormater)(userFound);

          case 6:
            userFormated = _context4.sent;
            return _context4.abrupt("return", res.json((0, _response.Response)(userFormated, "USER.FIND.SUCCESS", "USER.FIND.ERROR.NOT_FOUND", !(0, _lodash.isEmpty)(userFormated))).status(!(0, _lodash.isEmpty)(userFormated) ? 200 : 404));

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);
            res.json((0, _response.Response)(_context4.t0, null, "USER.FIND.ERROR.BAD_REQUEST")).status(400);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));

  return function getOneUser(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); // Delete user


exports.getOneUser = getOneUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var userDeleted;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return UserDao.activatedUser(req.params.id, "DELETE");

          case 3:
            userDeleted = _context5.sent;

            if ((0, _lodash.isEmpty)(userDeleted)) {
              res.json((0, _response.Response)(null, null, "USER.DELETED.ERROR.CANT_BE_DELETED")).status(400);
            }

            return _context5.abrupt("return", res.json((0, _response.Response)(userDeleted, "USER.DELETED.SUCCESS", "USER.DELETED.ERROR.NOT_FOUND", !(0, _lodash.isEmpty)(userDeleted))).status(!(0, _lodash.isEmpty)(userDeleted) ? 200 : 404));

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);
            res.json((0, _response.Response)(_context5.t0, null, "USER.DELETED.ERROR.BAD_REQUEST")).status(400);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));

  return function deleteUser(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;

var toggleEnableUser = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var userEnable;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return UserDao.activatedUser(req.params.id, "TOGGLE");

          case 3:
            userEnable = _context6.sent;

            if ((0, _lodash.isEmpty)(userEnable)) {
              res.json((0, _response.Response)(null, null, "USER.TOGGLE.ERROR.CANT_BE_CANT_BE_ENABLE")).status(400);
            }

            return _context6.abrupt("return", res.json((0, _response.Response)(userEnable, "USER.ENABLE.SUCCESS", "USER.ENABLE.ERROR.NOT_FOUND", !(0, _lodash.isEmpty)(userEnable))).status(!(0, _lodash.isEmpty)(userEnable) ? 200 : 404));

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](0);
            res.json((0, _response.Response)(_context6.t0, null, "USER.ENABLE.ERROR.BAD_REQUEST")).status(400);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 8]]);
  }));

  return function toggleEnableUser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.toggleEnableUser = toggleEnableUser;