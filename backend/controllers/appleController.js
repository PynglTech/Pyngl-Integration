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
export const handleWebhook = async (req, res) => {
    try {
        // 1. Universal Payload Parser
        const payload = req.body.payload || req.body;
        console.log("🚀 ~ handleWebhook ~ payload:", payload)

        // 2. Validation
        if (!payload || !payload.event) return res.sendStatus(200);

        const event = payload.event;
        const eventType = event.type;
        
        // Robust ID Extraction
        const chatId = payload.chat_id || event.chat_id;
        const threadId = payload.thread_id || event.thread_id || null;

        console.log(`🔔 Event: ${eventType} | Chat: ${chatId}`);

        // --- CASE: MESSAGE EVENT (Used for both "Start Poll" AND "Vote") ---
        if (eventType === 'message') {
            const messageText = event.text || "";
            console.log(`📩 Text Received: "${messageText}"`);

            // -------------------------------------------------------
            // A. CHECK FOR TRIGGER: "Start Poll #ID"
            // -------------------------------------------------------
            const triggerMatch = messageText.match(/Start Poll #([a-f0-9]{24})/i);

            if (triggerMatch) {
                const pollId = triggerMatch[1];
                
                try {
                    const poll = await Poll.findById(pollId);
                    if (poll) {
                        console.log(`🚀 Sending Poll: "${poll.question}"`);
                        await sendDynamicListPicker(chatId, threadId, poll);
                    } else {
                        console.log(`⚠️ Poll #${pollId} not found.`);
                    }
                } catch (err) {
                    console.error("⚠️ DB Error (Trigger):", err.message);
                }
                return res.sendStatus(200); // Stop here if it was a trigger
            }

            // -------------------------------------------------------
            // B. CHECK FOR VOTE: Match Text to Option Title
            // -------------------------------------------------------
            // Apple sends the selected option title as text (e.g., "React")
            try {
                // Find a poll that has an option matching this text
                // Note: Ideally, we should filter by recent activity or active session,
                // but for now, finding ANY poll with this option text works.
                const poll = await Poll.findOne({
                    "options.text": messageText
                });

                if (poll) {
                    const optionIndex = poll.options.findIndex(opt => opt.text === messageText);

                    if (optionIndex !== -1) {
                        console.log(`🗳️ Text Vote Detected: "${messageText}" for Poll ${poll._id}`);

                        // Check if already voted (by Chat ID)
                        const hasVoted = poll.votedBy.some(v => v.appleChatId === chatId);

                        if (!hasVoted) {
                            // 1. Update Counts
                            poll.options[optionIndex].votes += 1;
                            poll.totalVotes += 1;
                            
                            // 2. Save Voter
                            poll.votedBy.push({
                                appleChatId: chatId,
                                optionIndex: optionIndex,
                                votedAt: new Date()
                            });

                            await poll.save();
                            console.log("✅ Vote Saved to MongoDB!");

                            // 3. Send Reply
                            await sendTextMessage(chatId, threadId, `✅ You voted for: "${messageText}"`);
                        } else {
                            await sendTextMessage(chatId, threadId, "⚠️ You have already voted.");
                        }
                    }
                }
            } catch (err) {
                console.error("⚠️ DB Error (Vote):", err.message);
            }
        }

        // --- OPTIONAL: Keep Postback Handler just in case ---
        else if (eventType === 'rich_message_postback') {
             console.log("📦 Rich Postback received (Unused for Apple Text Votes)");
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
        subtitle: "Tap below to vote",
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
