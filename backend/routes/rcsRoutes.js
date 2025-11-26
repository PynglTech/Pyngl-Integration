import express from "express";
import { sendRcsMessage } from "../controllers/rcsController.js";

const router = express.Router();

router.post("/send", sendRcsMessage);

export default router;
