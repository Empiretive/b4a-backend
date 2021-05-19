import { Router } from "express";
import * as RoleService from "./role.service";
const router = Router();

router.get("/", RoleService.findRoles);
router.post("/seed", RoleService.setRoles);
router.put("/", RoleService.changeRoleName);
export default router;
