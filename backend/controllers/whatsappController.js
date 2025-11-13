// // // // // import axios from 'axios';
// // // // // import asyncHandler from '../middleware/asyncHandler.js';

// // // // // // IMPORTANT: The host URL for the On-Premise API depends on your specific setup.
// // // // // // You must add this to your .env file. It might be something like 'https://your-wa-api-host:443'.
// // // // // const WHATSAPP_ONPREM_HOST = process.env.WHATSAPP_ONPREM_HOST;

// // // // // /**
// // // // //  * @desc    Request a registration code for the WhatsApp Business API phone number.
// // // // //  * @route   POST /api/whatsapp-admin/request-code
// // // // //  * @access  Private (Admin Only)
// // // // //  */
// // // // // export const requestRegistrationCode = asyncHandler(async (req, res) => {
// // // // //     const { cc, phoneNumber, method } = req.body;

// // // // //     if (!cc || !phoneNumber || !method) {
// // // // //         res.status(400);
// // // // //         throw new Error('Country code, phone number, and method (sms/voice) are required.');
// // // // //     }

// // // // //     // Securely read the Base64-encoded certificate from your environment variables.
// // // // //     const cert = process.env.WHATSAPP_CERTIFICATE;
// // // // //     if (!cert) {
// // // // //         res.status(500);
// // // // //         throw new Error('WhatsApp certificate is not configured on the server.');
// // // // //     }
// // // // //     if (!WHATSAPP_ONPREM_HOST) {
// // // // //         res.status(500);
// // // // //         throw new Error('WhatsApp API host is not configured on the server.');
// // // // //     }

// // // // //     const payload = {
// // // // //         cc,
// // // // //         phone_number: phoneNumber,
// // // // //         method,
// // // // //         cert,
// // // // //     };

// // // // //     try {
// // // // //         const response = await axios.post(`${WHATSAPP_ONPREM_HOST}/v1/account`, payload, {
// // // // //             headers: {
// // // // //                 'Content-Type': 'application/json',
// // // // //                 // This endpoint might require Basic Auth with an admin user/pass from your setup
// // // // //                 // 'Authorization': 'Basic ' + Buffer.from('admin_user:admin_pass').toString('base64')
// // // // //             }
// // // // //         });

// // // // //         // The WhatsApp API returns a 202 if it's a new registration and the request is accepted.
// // // // //         if (response.status === 202) {
// // // // //             res.status(200).json({
// // // // //                 success: true,
// // // // //                 message: "Registration code request accepted. Check your device for an SMS or voice call.",
// // // // //                 vname: response.data.account[0].vname,
// // // // //             });
// // // // //         } else {
// // // // //              res.status(200).json({
// // // // //                 success: true,
// // // // //                 message: "This number appears to be already registered.",
// // // // //                 data: response.data,
// // // // //             });
// // // // //         }

// // // // //     } catch (error) {
// // // // //         console.error("WhatsApp Registration Error:", error.response?.data || error.message);
// // // // //         res.status(500);
// // // // //         throw new Error('Failed to request registration code from WhatsApp.');
// // // // //     }
// // // // // });

// // // // // import axios from 'axios';
// // // // // import asyncHandler from '../middleware/asyncHandler.js';
// // // // // // These values will be read from your .env file
// // // // // const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
// // // // // const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
// // // // // const WHATSAPP_API_URL = `https://graph.facebook.com/v19.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`;
// // // // // /**
// // // // //  * @desc    Sends a native, interactive poll to a specified WhatsApp number.
// // // // //  * @route   POST /api/whatsapp/send-poll
// // // // //  * @access  Private (for testing)
// // // // //  */
// // // // // export const sendWhatsAppPoll = asyncHandler(async (req, res) => {
// // // // //     // The frontend will send the recipient's phone number
// // // // //     const { recipientPhoneNumber } = req.body;
// // // // //     // For this test, we'll use mock data for the poll.
// // // // //     const poll = {
// // // // //         question: "What's the best time for the meeting?",
// // // // //         options: ["10 AM", "2 PM", "4 PM"]
// // // // //     };
// // // // //     if (!recipientPhoneNumber || !poll) {
// // // // //         return res.status(400).json({ error: "Recipient phone number and poll data are required." });
// // // // //     }
// // // // //     // This is the specific JSON format for an interactive poll message
// // // // //     const messagePayload = {
// // // // //         messaging_product: "whatsapp",
// // // // //         to: recipientPhoneNumber,
// // // // //         type: "interactive",
// // // // //         interactive: {
// // // // //             type: "list",
// // // // //             header: { type: "text", text: "Pyngl Poll" },
// // // // //             body: { text: poll.question },
// // // // //             footer: { text: "Vote by selecting an option" },
// // // // //             action: {
// // // // //                 button: "Vote Now",
// // // // //                 sections: [{
// // // // //                     title: "Options",
// // // // //                     rows: poll.options.map((option, index) => ({
// // // // //                         id: `option_${index + 1}`,
// // // // //                         title: option
// // // // //                     }))
// // // // //                 }]
// // // // //             }
// // // // //         }
// // // // //     };
// // // // //     try {
// // // // //         await axios.post(WHATSAPP_API_URL, messagePayload, {
// // // // //             headers: {
// // // // //                 'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
// // // // //                 'Content-Type': 'application/json'
// // // // //             }
// // // // //         });
// // // // //         res.status(200).json({ success: true, message: "Test poll sent successfully to WhatsApp." });
// // // // //     } catch (error) {
// // // // //         console.error("WhatsApp API Error:", error.response?.data || error.message);
// // // // //         res.status(500).json({ error: "Failed to send WhatsApp poll." });
// // // // //     }
// // // // // });
// // // // import axios from 'axios';

// // // // // 1. YOUR ENVIRONMENT VARIABLES (from your .env file)
// // // // const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
// // // // const PHONE_NUMBER_ID = "789189997619825"; // This is from your API URL

// // // // const WHATSAPP_API_URL = `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`;

// // // // /**
// // // //  * Sends your "Daily Poll" Template to a user.
// // // //  * @param {string} userPhoneNumber The user's phone number in international format (e.g., "919574158474")
// // // //  */
// // // // export async function sendDailyPoll(userPhoneNumber) {
  
// // // //   // This is the correct simple payload.
// // // //   // Your template has no variables, so it does not need a "components" array.
// // // //   const payload = {
// // // //     messaging_product: "whatsapp",
// // // //     to: userPhoneNumber,
// // // //     type: "template",
// // // //     template: {
// // // //       name: "pyngl_pyng_templete", // The name of your Quick Reply template
// // // //       language: {
// // // //         code: "en"
// // // //       }
// // // //     }
// // // //   };

// // // //   try {
// // // //     console.log('Sending poll to:', userPhoneNumber);
    
// // // //     const response = await axios.post(WHATSAPP_API_URL, payload, {
// // // //       headers: {
// // // //         'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
// // // //         'Content-Type': 'application/json'
// // // //       }
// // // //     });

// // // //     console.log('Message sent successfully:', response.data);
// // // //     return response.data;

// // // //   } catch (error) {
// // // //     console.error('Error sending WhatsApp message:', error.response ? error.response.data.error : error.message);
// // // //     throw new Error(error.response?.data?.error?.message || 'Failed to send message');
// // // //   }
// // // // }
// // // import axios from "axios";

// // // export const sendWhatsAppPoll = async (req, res) => {
// // //   try {
// // //     const { phone, pollId, question, options } = req.body;

// // //     if (!phone || !pollId || !question)
// // //       return res.status(400).json({ error: "Missing required fields" });

// // //     const url = `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

// // //     const payload = {
// // //       messaging_product: "whatsapp",
// // //       to: phone,
// // //       type: "template",
// // //       template: {
// // //         name: process.env.WHATSAPP_TEMPLATE_NAME,
// // //         language: { code: "en" },
// // //         components: [
// // //           {
// // //             type: "body",
// // //             parameters: [
// // //               { type: "text", text: question },
// // //               { type: "text", text: options.join(", ") },
// // //               { type: "text", text: `https://localhost:5173/poll/${pollId}` }
// // //             ]
// // //           },
// // //         ]
// // //       }
// // //     };

// // //     const headers = {
// // //       Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
// // //       "Content-Type": "application/json",
// // //     };

// // //     const metaRes = await axios.post(url, payload, { headers });
// // //     res.status(200).json({
// // //       success: true,
// // //       metaMessageId: metaRes.data.messages?.[0]?.id || null,
// // //       message: "WhatsApp template sent!"
// // //     });

// // //   } catch (error) {
// // //     console.error("WhatsApp API Error:", error.response?.data || error);
// // //     res.status(500).json({
// // //       error: "Failed to send WhatsApp message",
// // //       details: error.response?.data,
// // //     });
// // //   }
// // // };

// // import axios from "axios";

// // export const sendWhatsAppPoll = async (req, res) => {
// //   try {
// //     const { phone, pollId, question, options } = req.body;

// //     if (!phone || !pollId || !question)
// //       return res.status(400).json({ error: "Missing required fields" });

// //     const url = `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

// //    const payload = {
// //   messaging_product: "whatsapp",
// //   to: phone,
// //   type: "template",
// //   template: {
// //     name: process.env.WHATSAPP_TEMPLATE_NAME,
// //     language: { code: "en" }
// //   }


// //     };

// //     const headers = {
// //       Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
// //       "Content-Type": "application/json",
// //     };

// //     const metaRes = await axios.post(url, payload, { headers });

// //     res.status(200).json({
// //       success: true,
// //       metaMessageId: metaRes.data.messages?.[0]?.id || null,
// //       message: "WhatsApp template sent!"
// //     });

// //   } catch (error) {
// //     console.error("WhatsApp API Error:", error.response?.data || error);
// //     res.status(500).json({
// //       error: "Failed to send WhatsApp message",
// //       details: error.response?.data,
// //     });
// //   }
// // };

// import axios from "axios";
// import Poll from "../models/Poll.js";
// import User from "../models/User.js";

// // export const sendWhatsAppPoll = async (req, res) => {
// //   try {
// //     const { pollId, userId } = req.body;

// //     const user = await User.findById(userId);
// //     const poll = await Poll.findById(pollId);

// //     if (!user || !poll) {
// //       return res.status(400).json({ error: "User or poll not found" });
// //     }

// //     const phone = user.phoneNumber.replace("+", ""); // WhatsApp requires no '+'

// //     const voteLink = `https://pyngl.com/poll/${poll._id}`;

// //     const url = `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

// //     const payload = {
// //       messaging_product: "whatsapp",
// //       to: phone,
// //       type: "template",
// //       template: {
// //         name: process.env.WHATSAPP_TEMPLATE_NAME, 
// //         language: { code: "en" },
// //         components: [
// //           {
// //             type: "body",
// //             parameters: [
// //               { type: "text", text: poll.question },
// //               { type: "text", text: poll.options[0]?.text || "-" },
// //               { type: "text", text: poll.options[1]?.text || "-" },
// //               { type: "text", text: poll.options[2]?.text || "-" },
// //               { type: "text", text: voteLink },
// //             ],
// //           },
// //         ],
// //       },
// //     };

// //     const headers = {
// //       Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
// //       "Content-Type": "application/json",
// //     };

// //     const metaRes = await axios.post(url, payload, { headers });

// //     res.status(200).json({
// //       success: true,
// //       message: "WhatsApp poll sent!",
// //       metaMessageId: metaRes.data.messages?.[0]?.id || null,
// //     });

// //   } catch (error) {
// //     console.error("WhatsApp API Error:", error.response?.data || error);
// //     res.status(500).json({
// //       error: "Failed to send WhatsApp message",
// //       details: error.response?.data,
// //     });
// //   }
// // };
// export const sendWhatsAppPoll = async (req, res) => {
//   try {
//     const { phone, pollId, question, options } = req.body;

//     if (!phone || !pollId || !question)
//       return res.status(400).json({ error: "Missing required fields" });

//     const url = `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

//     const voteLink = `https://pyngl.com/poll/${pollId}`;

//     const payload = {
//       messaging_product: "whatsapp",
//       to: phone,
//       type: "template",
//       template: {
//         name: process.env.WHATSAPP_TEMPLATE_NAME, // YOUR TEMPLATE NAME
//         language: { code: "en" },

//         components: [
//           {
//             type: "header",
//             parameters: [
//               { type: "text", text: "New Poll" } // {{0}}
//             ]
//           },
//           {
//             type: "body",
//             parameters: [
//               { type: "text", text: question },          // {{poll_question}}
//               { type: "text", text: options[0] || "-" }, // {{option_1}}
//               { type: "text", text: options[1] || "-" }, // {{option_2}}
//               { type: "text", text: options[2] || "-" }, // {{option_3}}
//               { type: "text", text: voteLink }           // {{vote_link}}
//             ]
//           }
//         ]
//       }
//     };

//     const headers = {
//       Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
//       "Content-Type": "application/json",
//     };

//     const metaRes = await axios.post(url, payload, { headers });

//     res.status(200).json({
//       success: true,
//       metaMessageId: metaRes.data.messages?.[0]?.id || null,
//       message: "WhatsApp poll sent successfully!"
//     });

//   } catch (error) {
//     console.error("WhatsApp API Error:", error.response?.data || error);
//     res.status(500).json({
//       error: "Failed to send WhatsApp message",
//       details: error.response?.data,
//     });
//   }
// };
import axios from "axios";
import Poll from "../models/Poll.js";
import User from "../models/User.js";

export const sendWhatsAppPoll = async (req, res) => {
  try {
    const { pollId, userId } = req.body;

    const user = await User.findById(userId);
    const poll = await Poll.findById(pollId);

    if (!user || !poll) {
      return res.status(400).json({ error: "User or poll not found" });
    }

    const phone = user.phoneNumber.replace("+", "");
    const voteLink = `https://pyngl.com/poll/${poll._id}`;

    const url = `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: {
        name: process.env.WHATSAPP_TEMPLATE_NAME,
        language: { code: "en" },
        components: [
          {
            type: "header",
            parameters: [
              { type: "text", text: "New Poll" } // {{0}}
            ]
          },
          {
            type: "body",
            parameters: [
              { type: "text", text: poll.question },                // {{poll_question}}
              { type: "text", text: poll.options?.[0]?.text || "-" }, // {{option_1}}
              { type: "text", text: poll.options?.[1]?.text || "-" }, // {{option_2}}
              { type: "text", text: poll.options?.[2]?.text || "-" }, // {{option_3}}
              { type: "text", text: voteLink }                       // {{vote_link}}
            ]
          }
        ]
      }
    };

    const headers = {
      Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    };

    const metaRes = await axios.post(url, payload, { headers });

    res.status(200).json({
      success: true,
      metaMessageId: metaRes.data.messages?.[0]?.id || null,
      message: "WhatsApp poll sent successfully!"
    });

  } catch (error) {
    console.error("WhatsApp API Error:", error.response?.data || error);
    res.status(500).json({
      error: "Failed to send WhatsApp message",
      details: error.response?.data,
    });
  }
};
