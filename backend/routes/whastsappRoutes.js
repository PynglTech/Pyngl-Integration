// import express from "express";
// import { sendWhatsAppPoll } from "../controllers/whatsappController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // user must be logged in
// router.post("/send", protect, sendWhatsAppPoll);

// export default router;

import express from "express";
import { sendWhatsAppPoll,sendWhatsAppPollToAll  } from "../controllers/whatsappController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", protect, sendWhatsAppPoll);
router.post("/send-all", protect, sendWhatsAppPollToAll);
export default router;
