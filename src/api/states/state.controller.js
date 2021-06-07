import * as stateService from "./states.service";
import { Router } from "express";
const router = Router();

router.post("/users", stateService.createUserStates);

export default router;
