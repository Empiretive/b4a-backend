"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCategory = exports.getOneCategory = exports.getCategories = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _category = _interopRequireDefault(require("../models/category.model"));

var getCategories = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(query) {
    var categoriesList;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _category["default"].find(query);

          case 2:
            categoriesList = _context.sent;
            return _context.abrupt("return", categoriesList);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getCategories(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getCategories = getCategories;

var getOneCategory = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(query) {
    var category;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _category["default"].findOne(query);

          case 2:
            category = _context2.sent;
            return _context2.abrupt("return", category);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getOneCategory(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getOneCategory = getOneCategory;

var createCategory = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(category) {
    var newCategory;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return new _category["default"](category).save();

          case 2:
            newCategory = _context3.sent;
            return _context3.abrupt("return", newCategory);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function createCategory(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.createCategory = createCategory;