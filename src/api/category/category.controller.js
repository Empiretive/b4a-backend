import * as categoryService from "./category.service";
import { Router } from "express";
import { JWTAuth, checkRole } from "../../common/middleware/auth.middleware";
const router = Router();

router.get("/", categoryService.getCategories);
router.post("/", [JWTAuth, checkRole(2)], categoryService.createCategory);

export default router;
