"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRoles = exports.changeRoleName = exports.findRoles = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var RoleDao = _interopRequireWildcard(require("./data_objects/role.dao"));

var _response = require("../../common/response");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// Find all roles
var findRoles = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var roles, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return RoleDao.getRoles();

          case 3:
            roles = _context.sent;
            response = (0, _response.Response)(roles, "ROLES.FOUND.SUCCESS", "ROLES.NOT_FOUND", roles.length > 0);
            res.json(response).status(roles.length > 0 ? 200 : 404);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            res.json("ROLE.ERROR.BAD_REQUEST").status(400);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function findRoles(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Change Roles names


exports.findRoles = findRoles;

var changeRoleName = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var roles, rolesUpdate, response;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            roles = req.body.roles;
            _context2.next = 3;
            return Promise.all(roles.map(function (role) {
              return RoleDao.updateRole(role);
            }));

          case 3:
            rolesUpdate = _context2.sent;
            response = (0, _response.Response)(rolesUpdate, "ROLES.UPDATED.SUCCESS", "ROLES.UPDATE.ERROR", rolesUpdate.length > 0);
            res.send(response).status(rolesUpdate.length > 0 ? 200 : 400);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function changeRoleName(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
/*_________________________________________________________*/
// Setup of role
// Initial Setup of roles


exports.changeRoleName = changeRoleName;

var setRoles = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var rolesFound, roles, dataRole, response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return RoleDao.getRoles();

          case 3:
            rolesFound = _context3.sent;

            if (!(rolesFound.length > 0)) {
              _context3.next = 9;
              break;
            }

            res.json((0, _response.Response)(null, null, "Roles already exists", false)).status(400);
            return _context3.abrupt("return", 0);

          case 9:
            roles = [{
              level: 1,
              name: "admin"
            }, {
              level: 2,
              name: "manager"
            }, {
              level: 3,
              name: "employee"
            }, {
              level: 4,
              name: "client"
            }];
            _context3.next = 12;
            return Promise.all([RoleDao.setRole(roles[0]), RoleDao.setRole(roles[1]), RoleDao.setRole(roles[2]), RoleDao.setRole(roles[3])]);

          case 12:
            dataRole = _context3.sent;
            response = (0, _response.Response)(dataRole, "ROLES.CREATEDS.SUCCESS", "ROLES.CANT_BE_CREATED", dataRole.length > 0 && dataRole != null);
            res.json(response).status(dataRole ? 201 : 404);

          case 15:
            _context3.next = 20;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](0);
            res.json({
              message: "ROLE.ERROR.BAD_REQUEST"
            }).status(400);

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 17]]);
  }));

  return function setRoles(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.setRoles = setRoles;