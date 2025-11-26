import dotenv from "dotenv";
import axios from "axios";
import mongoose from "mongoose";
import TelegramBot from "node-telegram-bot-api";
import User from "../models/User.js";
import Poll from "../models/Poll.js";

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BOT_USERNAME = "PynglPollsBot";

// ✅ Bot Instance (shared)
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: process.env.NODE_ENV !== "production"
});



// 🟢 Link User via /start <userId>
bot.onText(/\/start (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = match[1];
  const userName = msg.from.username || msg.from.first_name || "Unknown";
  console.log(`📩 Telegram user connected: ${userName} (${chatId})`);

  try {
    if (!mongoose.isValidObjectId(userId)) {
      await bot.sendMessage(chatId, "❌ Invalid or expired link. Please reconnect via Pyngl.");
      return;
    }

    await User.findByIdAndUpdate(userId, { telegramChatId: chatId });
    await bot.sendMessage(chatId, "✅ Your Pyngl account is now linked!");
  } catch (error) {
    console.error("Error linking Telegram user:", error);
    await bot.sendMessage(chatId, "⚠️ Failed to link your Pyngl account. Please try again later.");
  }
});

// 🟢 Default /start
bot.onText(/\/start$/, async (msg) => {
  const chatId = msg.chat.id;
  await bot.sendMessage(chatId, `👋 Welcome to Pyngl Polls!\nYou’re now chatting with @${BOT_USERNAME}.`);
});

// 🟢 Generate deep link
export const connectTelegram = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const deepLink = `https://t.me/${BOT_USERNAME}?start=${req.user._id}`;

    res.json({
      linked: !!user?.telegramChatId,  // 👈 add this
      url: deepLink
    });
  } catch (err) {
    console.error("Telegram connect error:", err);
    res.status(500).json({ error: "Failed to generate Telegram link" });
  }
};


// 🟢 Send Poll Directly
export const sendPoll = async (req, res) => {
  try {
    const { chatId, question, options } = req.body;
    if (!chatId || !question || !options?.length) {
      return res.status(400).json({ error: "Missing poll data" });
    }

    const formattedOptions = options.map(o => o.text || o);

    const response = await bot.sendPoll(chatId, question, formattedOptions, {
      is_anonymous: false,
    });

    res.json({ success: true, response });
  } catch (err) {
    console.error("Error sending Telegram poll:", err.message);
    res.status(500).json({ error: "Failed to send Telegram poll" });
  }
};

export const sharePollToTelegram = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const poll = await Poll.findById(req.body.pollId);
    if (!poll) return res.status(404).json({ error: "Poll not found" });

    if (!user.telegramChatId) {
      return res.json({
        linked: false,
        message: "User not linked to Telegram",
        url: `https://t.me/PynglPollsBot?start=${user._id}`,
      });
    }

    const pollOptions = poll.options.map((opt) => opt.text || opt);
    await bot.sendPoll(user.telegramChatId, poll.question, pollOptions, {
      is_anonymous: false,
    });

    console.log("✅ Poll sent to Telegram!");

    // ✅ Send only one response
    return res.json({
    linked: true, // 👈 ***ADD THIS LINE***
    success: true,
    message: "✅ Poll shared successfully!",
    openUrl: `https://t.me/PynglPollsBot?start=${poll._id}`,
});
  } catch (err) {
    console.error("❌ Error sharing poll to Telegram:", err);
    return res.status(500).json({
      success: false,
      message: "Telegram share failed",
      error: err.message,
    });
  }
};

export { bot };

