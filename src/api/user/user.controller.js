import { Router } from "express";
import { checkRole } from "../../common/middleware/auth.middleware";
import * as UserService from "./user.service";

const router = Router();

// ***** USER ROUTES

// Register User by Backoffice
router.post("/", [checkRole(1)], UserService.registerUser);
router.get("/", [checkRole(2)], UserService.getUsers);
router.put("/:id", [checkRole(1)], UserService.updateUserById);
router.get("/:id", [checkRole(2)], UserService.getOneUser);
router.delete("/:id", [checkRole(1)], UserService.deleteUser);
router.get("/status/:id", [checkRole(2)], UserService.toggleEnableUser);

export default router;
