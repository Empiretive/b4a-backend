"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InitialSetup = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var RoleDao = _interopRequireWildcard(require("./role/data_objects/role.dao"));

var stateDao = _interopRequireWildcard(require("./states/data_objects/state.dao"));

var UserDao = _interopRequireWildcard(require("./user/data_objects/user.dao"));

var _response = require("../common/response");

var _passwordCrypt = require("../utils/passwordCrypt");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var InitialSetup = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var roles, dataRole, userStates, password, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            // Roles
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
            _context.next = 4;
            return Promise.all([RoleDao.setRole(roles[0]), RoleDao.setRole(roles[1]), RoleDao.setRole(roles[2]), RoleDao.setRole(roles[3])]);

          case 4:
            dataRole = _context.sent;
            _context.next = 7;
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

          case 7:
            userStates = _context.sent;
            _context.next = 10;
            return (0, _passwordCrypt.encryptPassword)("admin");

          case 10:
            password = _context.sent;
            _context.next = 13;
            return UserDao.registerUser({
              dni: 1,
              name: "admin",
              lastName: "",
              phone: "",
              email: "admin",
              role: 1,
              password: password,
              status: 1
            });

          case 13:
            user = _context.sent;
            res.json((0, _response.Response)({
              user: user,
              roles: dataRole,
              userStates: userStates
            })).status(200);
            _context.next = 19;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](0);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 17]]);
  }));

  return function InitialSetup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.InitialSetup = InitialSetup;