import { Router } from "express";
import {
  sendEmailTest,
  scanEmailsController,
} from "../controllers/dashboard.controllers.js";

const router = Router();

router.route("/testing").post(sendEmailTest);
router.route("/scan-emails").post(scanEmailsController);

export default router;
