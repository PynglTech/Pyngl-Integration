// server.js
import express from 'express';
import 'dotenv/config';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// --- HELPER FUNCTIONS ---

// Function to send a simple text reply
async function sendReply(recipientNumber, messageText) {
    const accessToken = process.env.WHATSAPP_API_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

    const data = {
        messaging_product: "whatsapp",
        to: recipientNumber,
        type: "text",
        text: { body: messageText }
    };
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(url, data, { headers: headers });
        console.log(`Text reply sent to ${recipientNumber}`);
    } catch (error) {
        console.error("Error sending text reply:", error.response ? error.response.data.error : error.message);
    }
}

// *** CORRECTED FUNCTION TO SEND A POLL ***
async function sendPoll(recipientNumber) {
    const accessToken = process.env.WHATSAPP_API_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

    const data = {
        messaging_product: "whatsapp",
        to: recipientNumber,
        type: "poll",
        poll: {
            name: "What's the best new feature for Pyngl?",
            options: [
                "AI Suggestions",
                "Dark Mode",
                "More Analytics"
            ],
            selectable_options_count: 1 // 1 for single choice, more for multi-choice
        }
    };
    
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(url, data, { headers: headers });
        console.log(`Poll sent to ${recipientNumber}`);
    } catch (error) {
        console.error("Error sending poll:", error.response ? error.response.data.error : error.message);
    }
}


// --- WEBHOOK SETUP ---
app.get('/webhook', (req, res) => {
    // Verification logic
    const verify_token = process.env.WHATSAPP_VERIFY_TOKEN;
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === verify_token) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});


app.post('/webhook', (req, res) => {
    const body = req.body;
    console.log("Incoming webhook message:", JSON.stringify(body, null, 2));

    if (body.object && body.entry?.[0]?.changes?.[0]?.value?.messages?.[0]) {
        const message = body.entry[0].changes[0].value.messages[0];

        if (message.type === 'text') {
            const from = message.from;
            const messageBody = message.text.body;

            if (messageBody.toLowerCase().trim() === 'poll') {
                sendPoll(from);
            } else {
                const replyMessage = `You said: "${messageBody}"`;
                sendReply(from, replyMessage);
            }
        }
    }
    res.sendStatus(200);
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});