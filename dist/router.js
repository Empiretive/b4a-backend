"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _role = _interopRequireDefault(require("./api/role/role.controller"));

var _user = _interopRequireDefault(require("./api/user/user.controller"));

var _state = _interopRequireDefault(require("./api/states/state.controller"));

var _setting = _interopRequireDefault(require("./api/setting/setting.controller"));

var _auth = _interopRequireDefault(require("./api/auth/auth.controller"));

var _category = _interopRequireDefault(require("./api/category/category.controller"));

var _auth2 = require("./common/middleware/auth.middleware");

var _Roles = require("./common/Roles");

var _InitialSetup = require("./api/InitialSetup");

var router = (0, _express.Router)(); // Main Routes

router.get("", function (req, res) {
  res.send("Welcome to my API");
}); // Roles Routes

router.use("/roles", _auth2.JWTAuth, _role["default"]); // User routes

router.use("/users", _auth2.JWTAuth, _user["default"]); // State routes

router.use("/states", _auth2.JWTAuth, _state["default"]); // Settings Routes

router.use("/settings", [_auth2.JWTAuth, (0, _auth2.checkRole)(_Roles.Roles.admin)], _setting["default"]); // Auth Routes

router.use("/auth", _auth["default"]); // Category Routed

router.use("/categories", _category["default"]);
router.get("/initial", _InitialSetup.InitialSetup);
var _default = router;
exports["default"] = _default;