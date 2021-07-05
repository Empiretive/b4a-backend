"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createState = exports.getStates = exports.getState = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _state = _interopRequireDefault(require("../models/state.model"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var getState = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(entity, value) {
    var state;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _state["default"].findOne({
              entity: entity,
              value: value
            });

          case 2:
            state = _context.sent;
            return _context.abrupt("return", state);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getState(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getState = getState;

var getStates = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(entity) {
    var states;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _state["default"].find({
              entity: entity
            });

          case 2:
            states = _context2.sent;
            return _context2.abrupt("return", states);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getStates(_x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getStates = getStates;

var createState = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
    var entity, states, stateRepeat, statesCreated, _iterator, _step, state, newState;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            entity = _ref3.entity, states = _ref3.states;
            _context3.next = 3;
            return _state["default"].find({
              entity: entity,
              name: {
                $in: states.map(function (state) {
                  return state.name;
                })
              },
              value: {
                $in: states.map(function (state) {
                  return state.value;
                })
              }
            });

          case 3:
            stateRepeat = _context3.sent;

            if ((0, _lodash.isEmpty)(stateRepeat)) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", 0);

          case 6:
            statesCreated = [];

            if ((0, _lodash.isEmpty)(states)) {
              _context3.next = 27;
              break;
            }

            _iterator = _createForOfIteratorHelper(states);
            _context3.prev = 9;

            _iterator.s();

          case 11:
            if ((_step = _iterator.n()).done) {
              _context3.next = 19;
              break;
            }

            state = _step.value;
            newState = new _state["default"]({
              entity: entity,
              value: state.value,
              name: state.name
            });
            _context3.next = 16;
            return newState.save();

          case 16:
            statesCreated.push(newState);

          case 17:
            _context3.next = 11;
            break;

          case 19:
            _context3.next = 24;
            break;

          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3["catch"](9);

            _iterator.e(_context3.t0);

          case 24:
            _context3.prev = 24;

            _iterator.f();

            return _context3.finish(24);

          case 27:
            return _context3.abrupt("return", statesCreated);

          case 28:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[9, 21, 24, 27]]);
  }));

  return function createState(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.createState = createState;