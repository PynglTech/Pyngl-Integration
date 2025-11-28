// import Poll from "../models/Poll.js";
// import User from "../models/User.js";

// // ===== VERIFY WEBHOOK (Meta calls this first) =====
// export const verifyWebhook = (req, res) => {
//   const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
//   const mode = req.query["hub.mode"];
//   const token = req.query["hub.verify_token"];
//   const challenge = req.query["hub.challenge"];

//   if (mode && token === verifyToken) {
//     console.log("Webhook verified successfully!");
//     return res.status(200).send(challenge);
//   } else {
//     return res.sendStatus(403);
//   }
// };

// // ===== HANDLE INCOMING WHATSAPP MESSAGES =====
// export const handleWhatsAppWebhook = async (req, res) => {
//   try {
//     const body = req.body;

//     console.log("🔥 Incoming WhatsApp Message:", JSON.stringify(body, null, 2));

//     // Ensure valid notification
//     if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages) {
//       const msg = body.entry[0].changes[0].value.messages[0];
//       const from = msg.from;                 // User phone number
//       const messageText = msg.text?.body;    // User sent text

//       console.log(`📩 Message from ${from}: ${messageText}`);

//       // Find the poll the user is responding to (you will store mapping later)
//       const poll = await Poll.findOne({ /* later: messageId mapping */ });

//       // Save the vote using option number
//       const optionIndex = parseInt(messageText) - 1;
//       if (poll.options[optionIndex]) {
//         poll.options[optionIndex].votes += 1;
//         await poll.save();

//         console.log("Vote saved!");
//       }

//       // Send "Thank you" message to the user
//       await sendThanksMessage(from);

//       return res.sendStatus(200);
//     }

//     return res.sendStatus(200);
//   } catch (err) {
//     console.error("Webhook error:", err);
//     return res.sendStatus(500);
//   }
// };

// // ===== SEND THANK YOU MESSAGE =====
// import axios from "axios";

// async function sendThanksMessage(to) {
//   const url = `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

//   const payload = {
//     messaging_product: "whatsapp",
//     to,
//     text: { body: "Thanks for your vote! Visit https://pyngl.com 🚀" }
//   };

//   await axios.post(url, payload, {
//     headers: {
//       Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
//       "Content-Type": "application/json"
//     }
//   });
// }

import Poll from "../models/Poll.js";
import User from "../models/User.js";
import axios from "axios";

// ===== VERIFY WEBHOOK (Meta calls this first) =====
export const verifyWebhook = (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log("✔ Webhook verified successfully!");
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
};

// ===== HANDLE INCOMING WHATSAPP MESSAGES =====
// export const handleWhatsAppWebhook = async (req, res) => {
//   try {
//     const body = req.body;

//     console.log("🔥 Incoming WhatsApp Webhook:", JSON.stringify(body, null, 2));

//     const entry = body.entry?.[0];
//     const changes = entry?.changes?.[0];
//     const messages = changes?.value?.messages;

//     if (!messages || !messages[0]) return res.sendStatus(200);

//     const msg = messages[0];
//     const from = msg.from;               // Phone
//     const text = msg.text?.body?.trim(); // Their response

//     console.log(`📩 Got reply from ${from}: ${text}`);

//     // ==========================================================
//     // MATCH VOTE TO POLL — you will later store sent poll messageId
//     // For now: get latest poll user created
//     // ==========================================================

//    const clean = from.replace("+", "");
// const user = await User.findOne({
//   "savedContacts.phone": { $regex: clean }
// });


//     if (!user) {
//       console.log("⚠ No user found for phone:", from);
//       return res.sendStatus(200);
//     }

//   const poll = await Poll.findOne({ author: user._id }).sort({ createdAt: -1 });



//     if (!poll) {
//       console.log("⚠ No poll found for this user");
//       return res.sendStatus(200);
//     }

//     const optionIndex = parseInt(text) - 1;

//     if (isNaN(optionIndex) || !poll.options[optionIndex]) {
//       await sendWhatsAppReply(from, "❌ Invalid option. Reply with option number (1, 2, 3...)");
//       return res.sendStatus(200);
//     }

//     // Save vote
//     poll.options[optionIndex].votes += 1;
//     await poll.save();

//     console.log(`✔ Vote saved for option ${optionIndex + 1}`);

//     // Send thank-you message
//     await sendWhatsAppReply(
//       from,
//       `⭐ Thank you for voting!\nResponse recorded for: "${poll.options[optionIndex].text}".`
//     );

//     return res.sendStatus(200);

//   } catch (err) {
//     console.error("Webhook error:", err);
//     return res.sendStatus(500);
//   }
// };
// export const handleWhatsAppWebhook = async (req, res) => {
//   try {
//     const body = req.body;
//     console.log("🔥 WhatsApp Webhook:", JSON.stringify(body, null, 2));

//     const msg = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
//     if (!msg) return res.sendStatus(200);

//     const from = msg.from;
//     const text = msg.text?.body?.trim();

//     console.log(`📩 Got reply from ${from}: ${text}`);

//     // CLEAN NUMBER
//     const clean = from.replace("+", "");

//     const user = await User.findOne({
//       "savedContacts.phone": { $regex: clean }
//     });

//     if (!user) {
//       console.log("⚠ No user found for phone:", clean);
//       return res.sendStatus(200);
//     }

//     // 🔥 FIX: match correct field "author"
//    const poll = await Poll.findOne({ author: user._id }).sort({ createdAt: -1 });

//     if (!poll) {
//       console.log("⚠ No poll found for user");
//       return res.sendStatus(200);
//     }

//     const optionIndex = parseInt(text) - 1;

//     if (isNaN(optionIndex) || !poll.options[optionIndex]) {
//       await sendWhatsAppReply(from, "❌ Invalid option. Reply with a number (1,2,3...)");
//       return res.sendStatus(200);
//     }

//     // Save vote
//     poll.options[optionIndex].votes += 1;
//     poll.totalVotes = (poll.totalVotes || 0) + 1;

//     // 🔥 Save whatsapp tracking
//     poll.whatsappMessages.push({
//       msgId: msg.id,
//       phone: "+" + clean,
//       optionSelected: optionIndex,
//       sentAt: new Date()
//     });

//     await poll.save();

//     console.log("✔ Vote saved!");

//     await sendWhatsAppReply(
//       from,
//       `⭐ Thanks for voting!\nYou selected: "${poll.options[optionIndex].text}".`
//     );

//     res.sendStatus(200);

//   } catch (err) {
//     console.error("Webhook error:", err);
//     res.sendStatus(500);
//   }
// };
export const handleWhatsAppWebhook = async (req, res) => {
  try {
    const body = req.body;

    console.log("🔥 WhatsApp Webhook:", JSON.stringify(body, null, 2));

    const msg = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!msg) return res.sendStatus(200);

    const from = msg.from;

    // support both text and reply buttons
    const text =
      msg.text?.body?.trim() ||
      msg.button?.text?.trim();

    console.log(`📩 Reply from ${from}: ${text}`);

    // PHONE MATCH
    const clean = from.replace(/\D+/g, "");
    const user = await User.findOne({
      "savedContacts.phone": { $regex: clean, $options: "i" }
    });

    if (!user) {
      console.log("⚠ No user for:", clean);
      return res.sendStatus(200);
    }

// 1️⃣ CONTEXT MESSAGE ID (reply-to)
const contextId = msg.context?.id;
console.log("📌 Context ID:", contextId);

let poll = null;

// 2️⃣ FIRST try to find the poll BY MESSAGE ID
if (contextId) {
  poll = await Poll.findOne({
    "whatsappMessages.msgId": contextId
  });
}

// 3️⃣ FALLBACK (if no context match OR old poll)
if (!poll) {
  poll = await Poll.findOne({ author: user._id })
    .sort({ createdAt: -1 });
}

if (!poll) {
  console.log("⚠ No poll found");
  return res.sendStatus(200);
}

    
    if (!poll) {
      console.log("⚠ No poll for user");
      return res.sendStatus(200);
    }

    // OPTION MATCH
    const optionIndex = parseInt(text) - 1;

    if (isNaN(optionIndex) || !poll.options[optionIndex]) {
      await sendWhatsAppReply(from, "❌ Invalid option. Send 1, 2, 3...");
      return res.sendStatus(200);
    }

    // SAVE VOTE
    poll.options[optionIndex].votes += 1;
    poll.totalVotes = (poll.totalVotes || 0) + 1;

    poll.whatsappMessages.push({
      msgId: msg.id,
      phone: "+" + clean,
      optionSelected: optionIndex,
      sentAt: new Date()
    });

    await poll.save();

    console.log("✔ Vote saved!");

    // SEND THANK YOU
    await sendWhatsAppReply(
      from,
      `🎉 Thanks! You selected: "${poll.options[optionIndex].text}".`
    );

    res.sendStatus(200);

  } catch (err) {
    console.error("Webhook Error:", err);
    res.sendStatus(500);
  }
};


// ===== SEND THANK YOU MESSAGE =====
async function sendWhatsAppReply(to, message) {
  const url = `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: message }
  };

  await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    }
  });
}
