// import axios from 'axios';
// import asyncHandler from '../middleware/asyncHandler.js';

// // IMPORTANT: The host URL for the On-Premise API depends on your specific setup.
// // You must add this to your .env file. It might be something like 'https://your-wa-api-host:443'.
// const WHATSAPP_ONPREM_HOST = process.env.WHATSAPP_ONPREM_HOST;

// /**
//  * @desc    Request a registration code for the WhatsApp Business API phone number.
//  * @route   POST /api/whatsapp-admin/request-code
//  * @access  Private (Admin Only)
//  */
// export const requestRegistrationCode = asyncHandler(async (req, res) => {
//     const { cc, phoneNumber, method } = req.body;

//     if (!cc || !phoneNumber || !method) {
//         res.status(400);
//         throw new Error('Country code, phone number, and method (sms/voice) are required.');
//     }

//     // Securely read the Base64-encoded certificate from your environment variables.
//     const cert = process.env.WHATSAPP_CERTIFICATE;
//     if (!cert) {
//         res.status(500);
//         throw new Error('WhatsApp certificate is not configured on the server.');
//     }
//     if (!WHATSAPP_ONPREM_HOST) {
//         res.status(500);
//         throw new Error('WhatsApp API host is not configured on the server.');
//     }

//     const payload = {
//         cc,
//         phone_number: phoneNumber,
//         method,
//         cert,
//     };

//     try {
//         const response = await axios.post(`${WHATSAPP_ONPREM_HOST}/v1/account`, payload, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 // This endpoint might require Basic Auth with an admin user/pass from your setup
//                 // 'Authorization': 'Basic ' + Buffer.from('admin_user:admin_pass').toString('base64')
//             }
//         });

//         // The WhatsApp API returns a 202 if it's a new registration and the request is accepted.
//         if (response.status === 202) {
//             res.status(200).json({
//                 success: true,
//                 message: "Registration code request accepted. Check your device for an SMS or voice call.",
//                 vname: response.data.account[0].vname,
//             });
//         } else {
//              res.status(200).json({
//                 success: true,
//                 message: "This number appears to be already registered.",
//                 data: response.data,
//             });
//         }

//     } catch (error) {
//         console.error("WhatsApp Registration Error:", error.response?.data || error.message);
//         res.status(500);
//         throw new Error('Failed to request registration code from WhatsApp.');
//     }
// });

import axios from 'axios';
import asyncHandler from '../middleware/asyncHandler.js';
// These values will be read from your .env file
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_API_URL = `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;
/**
 * @desc    Sends a native, interactive poll to a specified WhatsApp number.
 * @route   POST /api/whatsapp/send-poll
 * @access  Private (for testing)
 */
export const sendWhatsAppPoll = asyncHandler(async (req, res) => {
    // The frontend will send the recipient's phone number
    const { recipientPhoneNumber } = req.body;
    // For this test, we'll use mock data for the poll.
    const poll = {
        question: "What's the best time for the meeting?",
        options: ["10 AM", "2 PM", "4 PM"]
    };
    if (!recipientPhoneNumber || !poll) {
        return res.status(400).json({ error: "Recipient phone number and poll data are required." });
    }
    // This is the specific JSON format for an interactive poll message
    const messagePayload = {
        messaging_product: "whatsapp",
        to: recipientPhoneNumber,
        type: "interactive",
        interactive: {
            type: "list",
            header: { type: "text", text: "Pyngl Poll" },
            body: { text: poll.question },
            footer: { text: "Vote by selecting an option" },
            action: {
                button: "Vote Now",
                sections: [{
                    title: "Options",
                    rows: poll.options.map((option, index) => ({
                        id: `option_${index + 1}`,
                        title: option
                    }))
                }]
            }
        }
    };
    try {
        await axios.post(WHATSAPP_API_URL, messagePayload, {
            headers: {
                'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        res.status(200).json({ success: true, message: "Test poll sent successfully to WhatsApp." });
    } catch (error) {
        console.error("WhatsApp API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to send WhatsApp poll." });
    }
});