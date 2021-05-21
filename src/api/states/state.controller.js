import * as stateService from "./states.service";
import { Router } from "express";
const router = Router();

router.post("/user", stateService.createUserStates);

export default router;
