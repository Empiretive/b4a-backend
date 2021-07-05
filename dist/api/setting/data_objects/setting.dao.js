"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateSetting = exports.getSetting = exports.setSetting = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _setting = _interopRequireDefault(require("../models/setting.model"));

var setSetting = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var type, name, value, settingToSave;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = _ref.type, name = _ref.name, value = _ref.value;
            settingToSave = new _setting["default"]({
              type: type,
              name: name,
              value: value
            });
            _context.next = 4;
            return settingToSave.save();

          case 4:
            return _context.abrupt("return", settingToSave);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function setSetting(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.setSetting = setSetting;

var getSetting = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(query) {
    var setting;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _setting["default"].findOne(query);

          case 2:
            setting = _context2.sent;
            return _context2.abrupt("return", setting);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getSetting(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getSetting = getSetting;

var updateSetting = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(query, newSetting) {
    var settingFound, settingUpdate;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _setting["default"].findOne(query);

          case 2:
            settingFound = _context3.sent;

            if ((0, _lodash.isEmpty)(settingFound)) {
              _context3.next = 8;
              break;
            }

            _context3.next = 6;
            return _setting["default"].findByIdAndUpdate(settingFound._id, newSetting, {
              "new": true
            });

          case 6:
            settingUpdate = _context3.sent;
            return _context3.abrupt("return", settingUpdate);

          case 8:
            return _context3.abrupt("return", 0);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function updateSetting(_x3, _x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.updateSetting = updateSetting;