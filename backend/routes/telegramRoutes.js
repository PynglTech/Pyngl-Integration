// routes/telegramRoutes.js
import express from "express";
import { connectTelegram, sendPoll,sharePollToTelegram } from "../controllers/telegramController.js";
import { protect } from "../middleware/authMiddleware.js";
  
const router = express.Router();

// 👇 Add protect middleware here
router.get("/connect", protect, connectTelegram);
router.post("/sharePoll", protect, sharePollToTelegram);
router.post("/send-poll", protect, sendPoll);
// For deep link redirection (iOS safe)
router.get("/deeplink/:userId", (req, res) => {
  const { userId } = req.params;
  const botUsername = "PynglPollsBot";
  const telegramDeepLink = `tg://resolve?domain=${botUsername}&start=${userId}`;

  // fallback HTML redirect (iOS sometimes needs this)
  res.send(`
    <html>
      <head>
        <meta http-equiv="refresh" content="0; url=${telegramDeepLink}" />
        <script>
          setTimeout(() => {
            window.location.href = "https://t.me/${botUsername}?start=${userId}";
          }, 500);
        </script>
      </head>
      <body>
        <p>Redirecting to Telegram...</p>
      </body>
    </html>
  `);
});


export default router;

