import { Router } from "express";
import { scanEmailsController } from "../controllers/dashboard.controllers.js";

const router = Router();

router.route("/scan-emails").post(scanEmailsController);

export default router;
