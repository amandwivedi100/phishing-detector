import { Router } from "express";
import { sendEmailTest } from "../controllers/dashboard.controllers.js";

const router = Router();

router.route("/testing").post(sendEmailTest);

export default router;
