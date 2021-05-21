import { Router } from "express";
import RoleController from "./api/role/role.controller";
import UserController from "./api/user/user.controller";
import StateController from "./api/states/state.controller";
const router = Router();

// Main Routes
router.get("", (req, res) => {
  res.send("Welcome to my API");
});

// Roles Routes
router.use("/role", RoleController);

// User routes
router.use("/user", UserController);

// State routes
router.use("/state", StateController);
export default router;
