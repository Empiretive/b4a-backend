"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = require("../../common/middleware/auth.middleware");

var UserService = _interopRequireWildcard(require("./user.service"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)(); // ***** USER ROUTES
// Register User by Backoffice

router.post("/", [(0, _auth.checkRole)(1)], UserService.registerUser);
router.get("/", [(0, _auth.checkRole)(2)], UserService.getUsers);
router.put("/:id", [(0, _auth.checkRole)(1)], UserService.updateUserById);
router.get("/:id", [(0, _auth.checkRole)(2)], UserService.getOneUser);
router["delete"]("/:id", [(0, _auth.checkRole)(1)], UserService.deleteUser);
router.get("/status/:id", [(0, _auth.checkRole)(2)], UserService.toggleEnableUser);
var _default = router;
exports["default"] = _default;