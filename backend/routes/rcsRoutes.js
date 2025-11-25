import express from "express";
import RCSClient from "../services/rcsClient.js";

const router = express.Router();

// ⚠️ You paste your token here (environment variable recommended)
const rcs = new RCSClient(process.env.RCS_TOKEN);

// SEND TEXT
router.post("/send-text", async (req, res) => {
  try {
    const { phone, text } = req.body;
    const data = await rcs.sendText(phone, text);
    res.json(data);
  } catch (err) {
    console.log(err.response?.data);
    res.status(500).json({ error: "RCS send text failed" });
  }
});

// SEND RICH CARD
router.post("/send-card", async (req, res) => {
  try {
    const { phone } = req.body;
    const data = await rcs.sendRichCard(phone);
    res.json(data);
  } catch (err) {
    console.log(err.response?.data);
    res.status(500).json({ error: "RCS card send failed" });
  }
});

// CAPABILITY CHECK
router.get("/check/:phone", async (req, res) => {
  try {
    const { phone } = req.params;
    const data = await rcs.checkCapability(phone);
    res.json(data);
  } catch (err) {
    console.log(err.response?.data);
    res.status(500).json({ error: "RCS capability check failed" });
  }
});

export default router;
