import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
app.use(bodyParser.json());

// --- CONFIGURATION ---
// 1. Your Account ID (From your screenshot)
const ACCOUNT_ID = '522c9394-0387-4261-9967-83113296ff32';

// 2. Your FULL Token (Paste the new long string here)
const LIVECHAT_PAT = 'us-south1:oKGo6J9eS6L99mVnqOSoUmTPPVo'; 

const API_URL = 'https://apple-csp.livechatinc.com/list-picker';

// --- MOCK DATABASE ---
const pollData = {
    "101": {
        question: "Which frontend framework is best?",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
        options: [
            { id: "react", title: "React", subtitle: "Facebook" },
            { id: "vue", title: "Vue", subtitle: "Evan You" },
            { id: "angular", title: "Angular", subtitle: "Google" }
        ]
    }
};

// --- WEBHOOK HANDLER ---
app.post('/webhook', async (req, res) => {
    try {
        console.log("🔔 Webhook Hit!");
        
        // 1. Handle both nested (Postman) and flat (LiveChat) payloads
        // LiveChat sometimes sends the event directly in body, or inside 'payload'
        let data = req.body;
        if (req.body.payload) {
            data = req.body.payload;
        }

        // 2. LOG THE DATA (This is critical for debugging)
        console.log("📦 Processed Payload:", JSON.stringify(data, null, 2));

        // 3. Validate Structure
        if (!data.chat_id || !data.event) {
            console.log("⚠️ Ignored: Missing chat_id or event data.");
            return res.sendStatus(200); 
        }

        // 4. Extract Variables
        const messageText = data.event.text || "";
        const chatId = data.chat_id;
        
        // IMPORTANT: Apple Messages needs the 'thread_id'. 
        // If LiveChat doesn't send it, we might need to fetch it or omit it.
        // Let's try capturing it if available.
        const threadId = data.thread_id || null; 

        console.log(`📩 Message: "${messageText}" | Chat: ${chatId} | Thread: ${threadId}`);

        // 5. Trigger Check
        const match = messageText.match(/Start Poll #(\d+)/i);

        if (match) {
            const pollId = match[1];
            const poll = pollData[pollId];

            if (poll) {
                console.log(`🚀 Sending Poll #${pollId} to Chat ${chatId}...`);
                await sendDynamicListPicker(chatId, threadId,  poll);
            } else {
                console.log(`⚠️ Poll #${pollId} not found.`);
            }
        }

        res.sendStatus(200);

    } catch (error) {
        console.error("❌ Webhook Error:", error.message);
        res.sendStatus(500);
    }
});

// --- SENDER FUNCTION (Using Basic Auth) ---
async function sendDynamicListPicker(chatId, threadId,  poll) {
    // const payload = {
    //     chat_id: chatId,
    //     event: {
    //         type: "rich_message",
    //         recipients: "all",
    //         content: {
    //             template_id: "list_picker",
    //             elements: [
    //                 {
    //                     title: poll.question,
    //                     subtitle: "Tap to vote",
    //                     image: { url: poll.image },
    //                     buttons: poll.options.map(opt => ({
    //                         type: "message",
    //                         text: opt.title,
    //                         value: opt.id,
    //                         postback_id: "action_vote",
    //                         user_ids: []
    //                     }))
    //                 }
    //             ]
    //         }
    //     }
    // };
const payload = {
        chatId: chatId,
        title: poll.question,
        subtitle: "Tap to vote",
        image: poll.image,
        groups: [
            {
                title: "Choose One",
                multipleChoice: false,
                items: poll.options.map(opt => ({
                    identifier: opt.id,
                    title: opt.title,
                    subtitle: opt.subtitle,
                    image: "https://via.placeholder.com/50" // Icon for item
                }))
            }
        ]
    };
    try {
        const response = await axios.post(API_URL, payload, {
            // OPTION B: BASIC AUTHENTICATION
            auth: {
                username: ACCOUNT_ID, // Your Account ID
                password: LIVECHAT_PAT // Your Token
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("✅ Poll Sent Successfully!", response.data);
    } catch (error) {
        console.error("❌ API Error:", error.response ? error.response.data : error.message);
    }
}

app.listen(5000, () => console.log('🤖 Poll Bot is running on port 5000'));




// import express from "express";
// import axios from "axios";
// import bodyParser from "body-parser";

// const app = express();
// app.use(bodyParser.json());

// // --- CONFIGURATION ---
// const ACCOUNT_ID = '522c9394-0387-4261-9967-83113296ff32';
// const LIVECHAT_PAT = 'us-south1:oKGo6J9eS6L99mVnqOSoUmTPPVo'; // Your copied token
// const API_URL = 'https://api.livechatinc.com/v3.5/agent/action/send_event';

// // --- MOCK DATABASE ---
// const pollData = {
//     "101": {
//         question: "Which frontend framework is best?",
//         image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
//         options: [
//             { id: "react", title: "React", subtitle: "Facebook" },
//             { id: "vue", title: "Vue", subtitle: "Evan You" },
//             { id: "angular", title: "Angular", subtitle: "Google" }
//         ]
//     }
// };

// // --- WEBHOOK HANDLER ---
// app.post('/webhook', async (req, res) => {
//     try {
//         console.log("🔔 Webhook Hit!");

//         // 1. Handle the structure correctly
//         // LiveChat wraps data in "payload", but let's be safe
//         const payload = req.body.payload || req.body;

//         // 2. Debug Log: See EXACTLY what iPhone sends
//         // console.log("📦 Payload:", JSON.stringify(payload, null, 2)); 

//         // 3. Validate it is a message event
//         if (!payload.event || payload.event.type !== 'message') {
//             // console.log("⚠️ Ignoring non-message event");
//             return res.sendStatus(200);
//         }

//         // 4. CRITICAL FIX: Do NOT check payload.chat.users
//         // Real webhooks often don't send user info. We assume text messages are from users.
//         // If you want to filter bot messages, check if author_id != your_bot_id (optional)

//         const messageText = payload.event.text || "";
//         const chatId = payload.chat_id;
//         const threadId = payload.thread_id;

//         console.log(`📩 Received from iPhone: "${messageText}"`);

//         // 5. Trigger Check
//         const match = messageText.match(/Start Poll #(\d+)/i);

//         if (match) {
//             const pollId = match[1];
//             const poll = pollData[pollId];

//             if (poll) {
//                 console.log(`🚀 Found Poll #${pollId}. Sending to Chat ${chatId}...`);
//                 await sendDynamicListPicker(chatId, threadId, poll);
//             } else {
//                 console.log(`⚠️ Poll #${pollId} not found.`);
//             }
//         }

//         res.sendStatus(200);

//     } catch (error) {
//         console.error("❌ Webhook Error:", error.message);
//         res.sendStatus(500);
//     }
// });

// // --- SENDER FUNCTION ---
// async function sendDynamicListPicker(chatId, threadId, poll) {
//     const payload = {
//         chat_id: chatId,
//         event: {
//             type: "rich_message",
//             recipients: "all",
//             content: {
//                 template_id: "list_picker",
//                 elements: [
//                     {
//                         title: poll.question,
//                         subtitle: "Tap to vote",
//                         image: { url: poll.image },
//                         buttons: poll.options.map(opt => ({
//                             type: "message",
//                             text: opt.title,
//                             value: opt.id,
//                             postback_id: "action_vote",
//                             user_ids: []
//                         }))
//                     }
//                 ]
//             }
//         }
//     };

//     try {
//       const response = await axios.post(API_URL, payload, {
//             // OPTION B: BASIC AUTHENTICATION
//             auth: {
//                 username: ACCOUNT_ID, // Your Account ID
//                 password: LIVECHAT_PAT // Your Token
//             },
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         console.log("✅ Poll Sent Successfully!", response.data);
//     } catch (error) {
//         console.error("❌ API Error:", error.response ? error.response.data : error.message);
//     }
// }

// app.listen(5000, () => console.log('🤖 Poll Bot is running on port 5000'));