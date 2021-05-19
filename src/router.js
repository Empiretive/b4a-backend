import { Router } from "express";
import RoleController from "./api/role/role.controller";
const router = Router();

// Main Routes
router.get("", (req, res) => {
  res.send("Welcome to my API");
});

// Roles Routes
router.use("/role", RoleController);
export default router;
