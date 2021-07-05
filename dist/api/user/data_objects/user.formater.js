"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AllUserFormat = exports.userFormater = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var roleDao = _interopRequireWildcard(require("../../role/data_objects/role.dao"));

var stateDao = _interopRequireWildcard(require("../../states/data_objects/state.dao"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var userFormater = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
    var role, state;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return roleDao.getRole({
              _id: user.role
            });

          case 3:
            role = _context.sent;
            _context.next = 6;
            return stateDao.getState("USER", user.status);

          case 6:
            state = _context.sent;
            return _context.abrupt("return", {
              _id: user._id,
              dni: user.dni,
              name: user.name,
              lastName: user.lastName,
              phone: user.phone,
              email: user.email,
              role: {
                level: role.level,
                name: role.name
              },
              photo: user.photo,
              status: {
                name: state.name,
                value: state.value
              }
            });

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function userFormater(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.userFormater = userFormater;

var AllUserFormat = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userList, role) {
    var usersFormateds, _iterator, _step, user, rolefound, userFormat;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            usersFormateds = [];
            _iterator = _createForOfIteratorHelper(userList);
            _context2.prev = 2;

            _iterator.s();

          case 4:
            if ((_step = _iterator.n()).done) {
              _context2.next = 16;
              break;
            }

            user = _step.value;
            _context2.next = 8;
            return roleDao.getRole({
              _id: user.role
            });

          case 8:
            rolefound = _context2.sent;

            if (!(role <= rolefound.level)) {
              _context2.next = 14;
              break;
            }

            _context2.next = 12;
            return userFormater(user);

          case 12:
            userFormat = _context2.sent;
            usersFormateds.push(userFormat);

          case 14:
            _context2.next = 4;
            break;

          case 16:
            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](2);

            _iterator.e(_context2.t0);

          case 21:
            _context2.prev = 21;

            _iterator.f();

            return _context2.finish(21);

          case 24:
            return _context2.abrupt("return", usersFormateds);

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 18, 21, 24]]);
  }));

  return function AllUserFormat(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.AllUserFormat = AllUserFormat;