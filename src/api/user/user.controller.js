import { Router } from "express";
import { checkRole } from "../../common/middleware/auth.middleware";
import * as UserService from "./user.service";

const router = Router();

// ***** USER ROUTES

// Register User by Backoffice
router.post("/", UserService.registerUser);
router.get("/", [checkRole(2)], UserService.getUsers);
router.put("/:id", UserService.updateUserById);
router.get("/:id", UserService.getOneUser);
export default router;
