import { Router } from "express";
import * as SettingService from "./setting.service";
const router = Router();

router.get("", (req, res) => res.send("Configuraciones"));

export default router;
