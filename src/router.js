import { Router } from "express";
import RoleController from "./api/role/role.controller";
import UserController from "./api/user/user.controller";
import StateController from "./api/states/state.controller";
import SettingController from "./api/setting/setting.controller";
import AuthController from "./api/auth/auth.controller";
import CategoryController from "./api/category/category.controller";

import { checkRole, JWTAuth } from "./common/middleware/auth.middleware";
import { Roles } from "./common/Roles";
import { InitialSetup } from "./api/InitialSetup";
const router = Router();

// Main Routes
router.get("", (req, res) => {
  res.send("Welcome to my API");
});

// Roles Routes
router.use("/roles", JWTAuth, RoleController);

// User routes
router.use("/users", JWTAuth, UserController);

// State routes
router.use("/states", JWTAuth, StateController);

// Settings Routes
router.use("/settings", [JWTAuth, checkRole(Roles.admin)], SettingController);

// Auth Routes
router.use("/auth", AuthController);
// Category Routed
router.use("/categories", CategoryController);

router.get("/initial", InitialSetup);
export default router;
