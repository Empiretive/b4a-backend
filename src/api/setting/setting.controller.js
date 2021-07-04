import { Router } from "express";
import * as SettingService from "./setting.service";
const router = Router();

// App Settings
router.get("/app", SettingService.getAppSettings);
router.post("/app", SettingService.setAppSettings);
router.put("/app", SettingService.updateAppSettings);

// Any setting
router.get("/any", SettingService.getAnySettings);
router.post("/any", SettingService.setAnySettings);
router.put("/any", SettingService.updateAnySettings);
export default router;
