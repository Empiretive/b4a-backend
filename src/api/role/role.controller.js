import { Router } from "express";
import * as RoleService from "./role.service";
const router = Router();

// ROLES ROUTES

router.get("/", RoleService.findRoles);
router.put("/", RoleService.changeRoleName);
router.post("/seed", RoleService.setRoles);

export default router;
