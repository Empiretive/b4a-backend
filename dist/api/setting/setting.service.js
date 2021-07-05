"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateAnySettings = exports.setAnySettings = exports.getAnySettings = exports.updateAppSettings = exports.setAppSettings = exports.getAppSettings = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _response = require("../../common/response");

var SettingDao = _interopRequireWildcard(require("./data_objects/setting.dao"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// App Settings
var getAppSettings = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var settings;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return SettingDao.getSetting({
              type: "APP",
              name: "APP_SETTINGS",
              deletedAt: null
            });

          case 3:
            settings = _context.sent;

            if (!((0, _lodash.isEmpty)(settings) || settings == null)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.json((0, _response.Response)(null, null, "SETTING.APP.NOT_FOUND", false)).status(404));

          case 6:
            return _context.abrupt("return", res.json((0, _response.Response)(settings, "SETTING.APP.SUCCESS.FOUND", "SETTING.APP.ERROR", true)).status(200));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.json((0, _response.Response)(_context.t0, null, "SETTING.APP.ERROR.BAD_REQUEST", false)).status(400));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));

  return function getAppSettings(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getAppSettings = getAppSettings;

var setAppSettings = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var settingsExists, appSettings, setting;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return SettingDao.getSetting({
              type: "APP",
              name: "APP_SETTINGS",
              deletedAt: null
            });

          case 3:
            settingsExists = _context2.sent;

            if ((0, _lodash.isEmpty)(settingsExists)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.json((0, _response.Response)(null, null, "SETTING.APP.ERROR.SETTING_EXISTS", false)).status(400));

          case 6:
            appSettings = {
              name: req.body.name,
              description: req.body.description,
              rif: req.body.rif,
              logo: req.body.logo,
              email: req.body.email,
              phone: req.body.phone
            };
            _context2.next = 9;
            return SettingDao.setSetting({
              type: "APP",
              name: "APP_SETTINGS",
              value: appSettings
            });

          case 9:
            setting = _context2.sent;
            return _context2.abrupt("return", res.json((0, _response.Response)(setting, "SETTING.APP.SUCCESS", "SETTING.APP.ERROR.CANT_BE_CREATED", !(0, _lodash.isEmpty)(setting))).status(!(0, _lodash.isEmpty)(setting) ? 200 : 400));

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.json((0, _response.Response)(_context2.t0, null, "SETTING.APP.ERROR.BAD_REQUEST", false)).status(400));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function setAppSettings(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.setAppSettings = setAppSettings;

var updateAppSettings = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var settings, appSettings, appSettingsUpdated;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return SettingDao.getSetting({
              type: "APP",
              name: "APP_SETTINGS",
              deletedAt: null
            });

          case 3:
            settings = _context3.sent;

            if (!((0, _lodash.isEmpty)(settings) || settings == null)) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.json((0, _response.Response)(null, null, "SETTING.APP.NOT_FOUND", false)).status(404));

          case 6:
            appSettings = {
              name: req.body.name,
              description: req.body.description,
              rif: req.body.rif,
              logo: req.body.logo,
              email: req.body.email,
              phone: req.body.phone
            };
            _context3.next = 9;
            return SettingDao.updateSetting({
              _id: settings._id,
              deletedAt: null
            }, {
              type: "APP",
              name: "APP_SETTINGS",
              value: appSettings
            });

          case 9:
            appSettingsUpdated = _context3.sent;
            return _context3.abrupt("return", res.json((0, _response.Response)(appSettingsUpdated, "SETTING.APP.SUCCESS.UPDATE", "SETTING.APP.ERROR", !(0, _lodash.isEmpty)(appSettingsUpdated))).status(!(0, _lodash.isEmpty)(appSettingsUpdated) ? 200 : 400));

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.json((0, _response.Response)(_context3.t0, null, "SETTING.APP.ERROR.BAD_REQUEST", false)).status(400));

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 13]]);
  }));

  return function updateAppSettings(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); // Any Setting


exports.updateAppSettings = updateAppSettings;

var getAnySettings = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var settings;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return SettingDao.getSetting({
              type: req.query.type,
              name: req.query.name
            });

          case 3:
            settings = _context4.sent;

            if (!((0, _lodash.isEmpty)(settings) || settings == null)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.json((0, _response.Response)(null, null, "SETTING.ANY.NOT_FOUND", false)).status(404));

          case 6:
            return _context4.abrupt("return", res.json((0, _response.Response)(settings, "SETTING.APP.SUCCESS.FOUND", "SETTING.APP.ERROR", true)).status(200));

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.json((0, _response.Response)(_context4.t0, null, "SETTING.APP.ERROR.BAD_REQUEST", false)).status(400));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));

  return function getAnySettings(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getAnySettings = getAnySettings;

var setAnySettings = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var settingsExists, appSettings, setting;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return SettingDao.getSetting({
              type: req.body.type,
              name: req.body.name
            });

          case 3:
            settingsExists = _context5.sent;

            if ((0, _lodash.isEmpty)(settingsExists)) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.json((0, _response.Response)(null, null, "SETTING.ANY.ERROR.SETTING_EXISTS", false)).status(400));

          case 6:
            appSettings = req.body.value;
            _context5.next = 9;
            return SettingDao.setSetting({
              type: req.body.type,
              name: req.body.name,
              value: appSettings
            });

          case 9:
            setting = _context5.sent;
            return _context5.abrupt("return", res.json((0, _response.Response)(setting, "SETTING.APP.SUCCESS", "SETTING.APP.ERROR.CANT_BE_CREATED", !(0, _lodash.isEmpty)(setting))).status(!(0, _lodash.isEmpty)(setting) ? 200 : 400));

          case 13:
            _context5.prev = 13;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.json((0, _response.Response)(_context5.t0, null, "SETTING.APP.ERROR.BAD_REQUEST", false)).status(400));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 13]]);
  }));

  return function setAnySettings(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.setAnySettings = setAnySettings;

var updateAnySettings = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var settings, appSettings, appSettingsUpdated;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return SettingDao.getSetting({
              type: req.body.type,
              name: req.body.name
            });

          case 3:
            settings = _context6.sent;

            if (!((0, _lodash.isEmpty)(settings) || settings == null)) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", res.json((0, _response.Response)(null, null, "SETTING.APP.NOT_FOUND", false)).status(404));

          case 6:
            appSettings = req.body.value;
            _context6.next = 9;
            return SettingDao.updateSetting({
              _id: settings._id,
              deletedAt: null
            }, {
              type: req.body.type,
              name: req.body.name,
              value: appSettings
            });

          case 9:
            appSettingsUpdated = _context6.sent;
            return _context6.abrupt("return", res.json((0, _response.Response)(appSettingsUpdated, "SETTING.APP.SUCCESS.UPDATE", "SETTING.APP.ERROR", !(0, _lodash.isEmpty)(appSettingsUpdated))).status(!(0, _lodash.isEmpty)(appSettingsUpdated) ? 200 : 400));

          case 13:
            _context6.prev = 13;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.json((0, _response.Response)(_context6.t0, null, "SETTING.APP.ERROR.BAD_REQUEST", false)).status(400));

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 13]]);
  }));

  return function updateAnySettings(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}(); // Styles app Settings
// export const setAppStyles = async (req, res) => {
//   try {
//     const settingStyles = await SettingDao.setSetting({
//       type: "APP",
//       name: "APP_STYLES",
//       value: req.body,
//     });
//   } catch (error) {}
// };


exports.updateAnySettings = updateAnySettings;