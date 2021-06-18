import { Router } from "express";
import { JWTAuth } from "../../common/middleware/auth.middleware";
import * as authService from "./auth.service";
const router = Router();

router.post("/signin", authService.signIn);
router.post("/logout", [JWTAuth], authService.logout);
router.post("/user/token", authService.getUserByToken);
router.get("/profile", [JWTAuth], authService.profile);
export default router;
