import express from "express";
import { handleWhatsAppWebhook, verifyWebhook } from "../controllers/whatsappWebhookController.js";

const router = express.Router();

// Verification (GET)
router.get("/", verifyWebhook);

// Incoming messages (POST)
router.post("/", handleWhatsAppWebhook);

export default router;
