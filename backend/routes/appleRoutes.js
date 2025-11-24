import express from "express";
import { handleWebhook } from "../controllers/appleController.js";

const router = express.Router();

// Define the webhook route
// This matches POST /api/webhook
router.post("/webhook", handleWebhook);

export default router;