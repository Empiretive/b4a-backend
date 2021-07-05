"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JWTAuth = exports.checkRole = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _States = require("../States");

var _jwt = require("../../utils/jwt");

var UserDao = _interopRequireWildcard(require("../../api/user/data_objects/user.dao"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var checkRole = function checkRole(role) {
  return function (req, res, next) {
    if (req.user.role.level <= role) {
      next();
      return 0;
    }

    res.json("USER.PERMISSIONS.ERROR").status(401);
  };
};

exports.checkRole = checkRole;

var JWTAuth = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var bearer, token, payload, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            bearer = req.headers.authorization;

            if (!(0, _lodash.isEmpty)(bearer)) {
              _context.next = 4;
              break;
            }

            res.json({
              message: "USER.AUTH.ERROR.TOKEN_NOT_PROVIDED",
              success: false
            }).status(401);
            return _context.abrupt("return", 0);

          case 4:
            token = bearer.split(" ");
            payload = (0, _jwt.getPayload)(token[1]);

            if ((0, _lodash.isEmpty)(payload.error)) {
              _context.next = 9;
              break;
            }

            res.json({
              message: "USER.AUTH.ERROR.TOKEN_INVALID",
              success: false
            }).status(401);
            return _context.abrupt("return", 0);

          case 9:
            _context.next = 11;
            return UserDao.findUser({
              token: token[1],
              _id: payload.user._id,
              deletedAt: null,
              status: _States.UserState.active
            });

          case 11:
            user = _context.sent;

            if (!(0, _lodash.isEmpty)(user)) {
              _context.next = 15;
              break;
            }

            res.json({
              message: "USER.AUTH.ERROR.TOKEN_EXPIRED",
              success: false
            }).status(401);
            return _context.abrupt("return", 0);

          case 15:
            req.user = payload.user;
            next();

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function JWTAuth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.JWTAuth = JWTAuth;