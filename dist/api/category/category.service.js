"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCategory = exports.getCategories = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _response = require("../../common/response");

var _States = require("../../common/States");

var CategoryDao = _interopRequireWildcard(require("./data_objects/category.dao"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var getCategories = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var categories;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return CategoryDao.getCategories({
              deletedAt: null
            });

          case 3:
            categories = _context.sent;
            return _context.abrupt("return", res.json((0, _response.Response)(categories, "CATEGORY.FIND.SUCCESS", "CATEGORY.FIND.ERROR.NOT_FOUND", !(0, _lodash.isEmpty)(categories))).status(!(0, _lodash.isEmpty)(categories) ? 200 : 404));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.json((0, _response.Response)(_context.t0, null, "CATEGORY.FIND.ERROR.BAD_REQUEST", false)).status(400));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function getCategories(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Create Category


exports.getCategories = getCategories;

var createCategory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var categoryFound, category, categoryCreated;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return CategoryDao.getOneCategory({
              name: req.body.name
            });

          case 3:
            categoryFound = _context2.sent;

            if ((0, _lodash.isEmpty)(categoryFound)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.json((0, _response.Response)(categoryFound, null, "CATEGORY.CREATE.ERROR.ALREADY_EXISTS", false)).status(400));

          case 6:
            category = {
              name: req.body.name,
              description: req.body.description,
              color: req.body.color,
              status: _States.CategoryState.enable
            };
            _context2.next = 9;
            return CategoryDao.createCategory(category);

          case 9:
            categoryCreated = _context2.sent;
            res.json((0, _response.Response)(categoryCreated, "CATEGORY.CREATE.SUCCESS", "CATEGORY.CREATE.ERROR.CANT_BE_CREATED", !(0, _lodash.isEmpty)(categoryCreated))).status(!(0, _lodash.isEmpty)(categoryCreated) ? 200 : 400);
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.json((0, _response.Response)(_context2.t0, null, "CATEGORY.CREATE.ERROR.BAD_REQUEST", false)).s);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function createCategory(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createCategory = createCategory;