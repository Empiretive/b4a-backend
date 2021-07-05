"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserStates = exports.createUserStates = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var stateDao = _interopRequireWildcard(require("./data_objects/state.dao"));

var _response = require("../../common/response");

var _lodash = require("lodash");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Create User States
var createUserStates = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userStates;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return stateDao.createState({
              entity: "USER",
              states: [{
                value: 1,
                name: "Activo"
              }, {
                value: 2,
                name: "Inactivo"
              }]
            });

          case 2:
            userStates = _context.sent;
            res.json(userStates);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUserStates(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createUserStates = createUserStates;

var getUserStates = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var userStates;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return stateDao.getStates("USER");

          case 3:
            userStates = _context2.sent;
            res.json((0, _response.Response)(userStates, "STATES.USER.FIND.SUCCESS", "STATES.USER.ERROR.BAD_REQUEST", !(0, _lodash.isEmpty)(userStates))).status(!(0, _lodash.isEmpty)(userStates) ? 200 : 400);
            _context2.next = 10;
            break;

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            res.json((0, _response.Response)(_context2.t0, null, "STATES.USER.ERROR.BAD_REQUEST")).status(400);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 7]]);
  }));

  return function getUserStates(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserStates = getUserStates;