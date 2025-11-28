import axios from "axios";
import Poll from "../models/Poll.js";

// CONFIGURATION
const ACCOUNT_ID = '522c9394-0387-4261-9967-83113296ff32';
const LIVECHAT_PAT = 'us-south1:oKGo6J9eS6L99mVnqOSoUmTPPVo'; // Your actual token
const APPLE_LIST_PICKER_URL = 'https://apple-csp.livechatinc.com/list-picker';
const STANDARD_MSG_URL = 'https://api.livechatinc.com/v3.5/agent/action/send_event';

// --- MAIN WEBHOOK HANDLER ---
// export const handleWebhook = async (req, res) => {
//   try {
//         const payload = req.body.payload || req.body;
//         if (!payload || !payload.event) return res.sendStatus(200);


//         const eventType = payload.event.type;
//         // Robust ID Extraction: LiveChat sends IDs in different places for different events
//         const chatId = payload.chat_id || payload.event.chat_id;
//         const threadId = payload.thread_id || payload.event.thread_id || null;

//         // --- DEBUG LOGGING ---
//         console.log(`🔔 RECEIVED EVENT: ${eventType}`);
//         console.log(`📄 FULL DATA:`, JSON.stringify(payload.event, null, 2)); 
//         // ---------------------

//         console.log(`🔔 Event: ${eventType} | Chat: ${chatId}`);

//         // --- CASE A: SEND POLL ---
//         if (eventType === 'message') {
//             const messageText = payload.event.text || "";
//             const match = messageText.match(/Start Poll #([a-f0-9]{24})/i);

//             if (match) {
//                 const pollId = match[1];
//                 const poll = await Poll.findById(pollId);
//                 if (poll) {
//                     console.log(`🚀 Sending Poll: "${poll.question}"`);
//                     await sendDynamicListPicker(chatId, threadId, poll);
//                 }
//             }
//         }

//         // --- CASE B: HANDLE VOTE ---
//         else if (eventType === 'rich_message_postback' || eventType === 'postback') {
            
//             // DEBUG: See the exact structure

//             // Robust ID Extraction: Check multiple possible paths
//             let postbackId = null;
            
//             if (payload.event.postback && payload.event.postback.id) {
//                 postbackId = payload.event.postback.id;
//             } else if (payload.event.id) {
//                 postbackId = payload.event.id;
//             } else if (payload.event.value) {
//                 postbackId = payload.event.value;
//             }

//             console.log(`🔍 Extracted Postback ID: ${postbackId}`);

//             if (postbackId && postbackId.includes('_')) {
//                 const [pollId, optionIndexStr] = postbackId.split('_');
//                 const optionIndex = parseInt(optionIndexStr);

//                 try {
//                     const poll = await Poll.findById(pollId);
//                     if (poll) {
//                         const hasVoted = poll.votedBy.some(v => v.appleChatId === chatId);

//                         if (!hasVoted) {
//                             poll.options[optionIndex].votes += 1;
//                             poll.totalVotes += 1;
//                             poll.votedBy.push({
//                                 appleChatId: chatId,
//                                 optionIndex: optionIndex,
//                                 votedAt: new Date()
//                             });
//                             await poll.save();
//                             console.log("✅ Vote Saved to MongoDB!");
//                             await sendTextMessage(chatId, threadId, `✅ Vote recorded for: "${poll.options[optionIndex].text}"`);
//                         } else {
//                             console.log("⚠️ Duplicate Vote");
//                             await sendTextMessage(chatId, threadId, "⚠️ You have already voted.");
//                         }
//                     } else {
//                         console.log("⚠️ Poll ID not found in DB");
//                     }
//                 } catch (err) {
//                     console.error("⚠️ DB Error during vote:", err.message);
//                 }
//             } else {
//                 console.log("⚠️ Invalid Postback ID format (missing '_')");
//             }
//         }
//         res.sendStatus(200);
//     } catch (error) {
//         console.error("❌ Webhook Error:", error.message);
//         res.sendStatus(500);
//     }
// };

// --- MAIN WEBHOOK HANDLER ---

// --- HELPER: Check Business Hours (Mon-Fri, 9 AM - 5 PM IST) ---
const isBusinessHours = () => {
    const now = new Date();

    // Convert current server time to Asia/Kolkata
    const istTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    const day = istTime.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
    const hour = istTime.getHours(); // 0-23

    // Working days: Monday(1) → Friday(5)
    const isWeekday = day >= 1 && day <= 5;

    // Working hours: 9 AM → 5 PM (17:00)
    const isWorkingHours = hour >= 9 && hour < 17;

    return isWeekday && isWorkingHours;
};


export const handleWebhook = async (req, res) => {
    try {
        const payload = req.body.payload || req.body;
        if (!payload || !payload.event) return res.sendStatus(200);

        // --- CRITICAL FIX: Ignore Bot/Agent Messages ---
        // Check author_type (LiveChat standard) or specific author_id
        const authorType = payload.event.author_type || payload.event.user_type; // varies by API version
        
        // If the author is NOT a customer, stop immediately.
        // This prevents the bot from reading its own "Need support..." message.
        if (authorType === 'agent' || authorType === 'bot' || payload.event.author_id === 'tech@pyngl.com') {
            return res.sendStatus(200); 
        }
        
        // 1. Determine Event Type and Extract Data
        let eventType = payload.event ? payload.event.type : null;
        let chatId = payload.chat_id || (payload.chat ? payload.chat.id : null);
        let threadId = payload.thread_id || (payload.chat && payload.chat.thread ? payload.chat.thread.id : null);
        let messageText = "";

        // --- SCENARIO 1: Active Chat Message (incoming_event) ---
        if (payload.event && payload.event.type === 'message') {
            messageText = payload.event.text || "";
        }
        
        // --- SCENARIO 2: New/Reactivated Chat (incoming_chat) ---
        else if (req.body.action === "incoming_chat" || payload.chat) {
            // The message is inside the thread history array
            const thread = payload.chat.thread || {};
            const events = thread.events || [];
            // Get the most recent message from the user
            const lastMessage = events.reverse().find(e => e.type === 'message');
            
            if (lastMessage) {
                messageText = lastMessage.text || "";
                eventType = 'message'; // Treat it as a message event
            }
        }

        console.log(`🔔 Processed: Type=${eventType} | Chat=${chatId} | Text="${messageText}"`);

        if (!chatId || !messageText) return res.sendStatus(200);

        // --- LOGIC: Check Trigger or Vote ---
        
        // 1. Check for "Start Poll" Trigger
        const triggerMatch = messageText.match(/Start Poll #([a-f0-9]{24})/i);

        if (triggerMatch) {
            const pollId = triggerMatch[1];
            console.log(`🚀 Trigger Detected for Poll #${pollId}`);
            
            try {
                const poll = await Poll.findById(pollId);
                if (poll) {
                     console.log(`🚀 Found Poll: "${poll.question}". Sending Welcome & List Picker...`);
                        
                        // 1. Send Welcome Message
                        await sendTextMessage(chatId, threadId, `👋 Welcome! You've been invited to vote on the poll by Pyngl". Tap the Poll below to cast your vote.`);
                        
                    await sendDynamicListPicker(chatId, threadId, poll);
                } else {
                    console.log(`⚠️ Poll #${pollId} not found.`);
                }
            } catch (err) {
                console.error("⚠️ DB Error (Trigger):", err.message);
            }
            return res.sendStatus(200);
        }

        if (/^(help|support|agent|human)/i.test(messageText.trim())) {
            console.log(`🆘 Help Requested: "${messageText}"`);
            
            if (isBusinessHours()) {
                // --- ONLINE MESSAGE ---
                await sendTextMessage(
                    chatId, 
                    threadId, 
                    "👋 Need assistance? You can email us at tech@pyngl.com. An agent will be with you shortly if available."
                );
            } else {
                // --- OUT OF HOURS MESSAGE ---
                await sendTextMessage(
                    chatId, 
                    threadId, 
                    "Our live agents are currently unavailable. Please leave a message or email us at tech@pyngl.com. We will get back to you soon. (Support Hours: Mon–Fri, 9AM–5PM IST)"
                );
            }
            return res.sendStatus(200);
        }

        // 2. Check for Vote (Text Match)
        // Only if it's NOT a trigger command
        try {
            const poll = await Poll.findOne({ "options.text": messageText });

            if (poll) {
                const optionIndex = poll.options.findIndex(opt => opt.text === messageText);

                if (optionIndex !== -1) {
                    console.log(`🗳️ Vote Detected: "${messageText}" for Poll ${poll._id}`);

                    // Check if already voted
                    const hasVoted = poll.votedBy.some(v => v.appleChatId === chatId);

                    if (!hasVoted) {
                        poll.options[optionIndex].votes += 1;
                        poll.totalVotes += 1;
                        poll.votedBy.push({
                            appleChatId: chatId,
                            optionIndex: optionIndex,
                            votedAt: new Date()
                        });
                        await poll.save();
                        console.log("✅ Vote Saved!");
                        await sendTextMessage(chatId, threadId, `✅Thank you for voting!`);
                        await sendTextMessage(chatId, threadId, `Your vote for "${messageText}" has been recorded. Need help? Reply with "help".`);
                    } else {
                        await sendTextMessage(chatId, threadId, "⚠️ You have already voted.");
                        await sendTextMessage(chatId, threadId, `Need help? Reply with "help".`);
                    }
                }
            }
        } catch (err) {
            console.error("⚠️ DB Error (Vote):", err.message);
        }

        res.sendStatus(200);

    } catch (error) {
        console.error("❌ Webhook Error:", error.message);
        res.sendStatus(500);
    }
};

// --- CORRECT SENDER FUNCTION FOR APPLE CSP ---
async function sendDynamicListPicker(chatId, threadId, poll) {  
    
    // IMPORTANT: This payload format is specific to the apple-csp endpoint.
    // It does NOT use "event: { type: rich_message }" wrapper.
    const payload = {
        chatId: chatId,       // camelCase
        threadId: threadId,   // camelCase
        title: poll.question,
        subtitle: "Click an option to vote",
        image: poll.imageUrl || "https://via.placeholder.com/300",
        groups: [
            {
                title: "Options",
                multipleChoice: false,
                items: poll.options.map((opt, index) => ({
                    id: `${poll._id}_${index}`, // "id" (not "identifier") for this endpoint
                    title: opt.text,
                    subtitle: "Click to vote",
                    image: "https://via.placeholder.com/50"
                }))
            }
        ]
    };

    try {
        const response = await axios.post(APPLE_LIST_PICKER_URL, payload, {
            auth: { username: ACCOUNT_ID, password: LIVECHAT_PAT },
            headers: { 'Content-Type': 'application/json' }
        });
        console.log("✅ List Picker Sent Successfully!", response.data);
    } catch (error) {
        console.error("❌ Send Error:", error.response ? error.response.data : error.message);
    }
}

// --- HELPER: Send Text ---
async function sendTextMessage(chatId, threadId, text) {
    try {
        // For text replies, we use the Standard Agent API
        await axios.post(STANDARD_MSG_URL, {
            chat_id: chatId,
            ...(threadId && { thread_id: threadId }),
            event: {
                type: "message",
                text: text,
                recipients: "all"
            }
        }, {
            auth: { username: ACCOUNT_ID, password: LIVECHAT_PAT },
            headers: { 'Content-Type': 'application/json' }
        });
        console.log("✅ Reply Sent");
    } catch (e) { console.error("Text Send Error:", e.message); }
}
