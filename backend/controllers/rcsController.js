// // // // // // // // // import axios from "axios";
// // // // // // // // // import User from "../models/User.js";
// // // // // // // // // import Poll from "../models/Poll.js";

// // // // // // // // // // RML Connect API Config
// // // // // // // // // const RML_API_URL = "https://apis.rmlconnect.net/rcs/v1/message";
// // // // // // // // // const RML_TOKEN = process.env.RML_ACCESS_TOKEN; // Add this to your .env
// // // // // // // // // const RML_BOT_NAME = "rml_jbm"; // Your Bot Name

// // // // // // // // // export const sendRCSPollToSelected = async (req, res) => {
// // // // // // // // //   try {
// // // // // // // // //     const { pollId, contacts } = req.body;

// // // // // // // // //     if (!contacts || contacts.length === 0) {
// // // // // // // // //       return res.status(400).json({ error: "No contacts selected" });
// // // // // // // // //     }

// // // // // // // // //     const poll = await Poll.findById(pollId);
// // // // // // // // //     if (!poll) return res.status(404).json({ error: "Poll not found" });

// // // // // // // // //     // 1. Validate Image (RCS requires a valid public image URL ending in .png/.jpg)
// // // // // // // // //     // If poll has no image, use a default placeholder or your logo
// // // // // // // // //     const rcsImage = poll.imageUrl || "https://placehold.co/600x400.png?text=Poll";
    
// // // // // // // // //     // 2. Map Poll Options to RCS Suggestions
// // // // // // // // //     // RCS allows max 11 suggestions usually, but safest to stick to 2-4 for Polls
// // // // // // // // //     const suggestions = poll.options.map((opt) => ({
// // // // // // // // //       type: "message", // This creates the clickable "Vote" button
// // // // // // // // //       text: opt.text.substring(0, 25), // RCS button text limits are strict
// // // // // // // // //       postback: `VOTE_${opt._id}` // This is sent to your webhook when clicked
// // // // // // // // //     }));

// // // // // // // // //     let results = [];

// // // // // // // // //     // 3. Loop through contacts and send individually
// // // // // // // // //     for (const c of contacts) {
      
// // // // // // // // //       // Clean Phone Number Logic
// // // // // // // // //       let cleanPhone = (c.phone || "")
// // // // // // // // //         .toString()
// // // // // // // // //         .replace(/\s+/g, "")
// // // // // // // // //         .replace(/-/g, "")
// // // // // // // // //         .replace(/\(/g, "")
// // // // // // // // //         .replace(/\)/g, "");

// // // // // // // // //       // Ensure +91 format (or international format)
// // // // // // // // //       if (/^\d{10}$/.test(cleanPhone)) cleanPhone = "+91" + cleanPhone;
// // // // // // // // //       if (!cleanPhone.startsWith("+")) {
// // // // // // // // //         console.log("❌ Invalid RCS phone:", cleanPhone);
// // // // // // // // //         continue;
// // // // // // // // //       }

// // // // // // // // //       // 4. Construct the Route Mobile Payload
// // // // // // // // //       const payload = {
// // // // // // // // //         type: "card",
// // // // // // // // //         phone_no: cleanPhone,
// // // // // // // // //         bot_name: RML_BOT_NAME,
// // // // // // // // //         extra: `poll_${poll._id}`, // Tag for your tracking
// // // // // // // // //         card: {
// // // // // // // // //           title: poll.question, // The Poll Question
// // // // // // // // //           description: "Tap an option below to vote instantly! 👇",
// // // // // // // // //           url: rcsImage,
// // // // // // // // //           suggestions: suggestions
// // // // // // // // //         },
// // // // // // // // //         // Fallback Logic (Only works if user is 404 AND text matches DLT)
// // // // // // // // //         fallback_channel: "sms",
// // // // // // // // //         sms: {
// // // // // // // // //           fallback_text: `New Poll: ${poll.question}. Vote here: https://pyngl.com/poll/${poll._id}`
// // // // // // // // //         }
// // // // // // // // //       };

// // // // // // // // //       try {
// // // // // // // // //         const rmlRes = await axios.post(RML_API_URL, payload, {
// // // // // // // // //           headers: {
// // // // // // // // //             "Content-Type": "application/json",
// // // // // // // // //             "Authorization": `Bearer ${RML_TOKEN}`
// // // // // // // // //           }
// // // // // // // // //         });

// // // // // // // // //         // 5. Log Success
// // // // // // // // //         results.push({
// // // // // // // // //           phone: cleanPhone,
// // // // // // // // //           status: "queued", // RML returns 202 Accepted
// // // // // // // // //           id: rmlRes.data.id || null
// // // // // // // // //         });

// // // // // // // // //       } catch (apiErr) {
// // // // // // // // //         console.error(`RCS Send Error for ${cleanPhone}:`, apiErr.response?.data || apiErr.message);
// // // // // // // // //         results.push({ phone: cleanPhone, status: "failed", error: apiErr.response?.data });
// // // // // // // // //       }
// // // // // // // // //     }

// // // // // // // // //     res.json({
// // // // // // // // //       success: true,
// // // // // // // // //       count: results.length,
// // // // // // // // //       details: results
// // // // // // // // //     });

// // // // // // // // //   } catch (err) {
// // // // // // // // //     console.error("RCS Controller Error:", err);
// // // // // // // // //     res.status(500).json({ error: "Failed to process RCS request", details: err.message });
// // // // // // // // //   }
// // // // // // // // // };
// // // // // // // // import axios from "axios";
// // // // // // // // import User from "../models/User.js";
// // // // // // // // import Poll from "../models/Poll.js";
// // // // // // // // import dotenv from "dotenv";

// // // // // // // // // RML Connect API Config
// // // // // // // // const RML_API_URL = "https://apis.rmlconnect.net/rcs/v1/message";
// // // // // // // // // ⚠️ CRITICAL: Ensure this variable exists in your .env file
// // // // // // // // const RML_TOKEN = process.env.RML_ACCESS_TOKEN; 
// // // // // // // // const RML_BOT_NAME = "rml_jbm"; 

// // // // // // // // export const sendRCSPollToSelected = async (req, res) => {
// // // // // // // //   try {
// // // // // // // //     const { pollId, contacts } = req.body;

// // // // // // // //     // 1. Check for Token (Fixes "Unauthorized" issue)
// // // // // // // //     if (!RML_TOKEN) {
// // // // // // // //       console.error("❌ RML_ACCESS_TOKEN is missing in .env file");
// // // // // // // //       return res.status(500).json({ error: "Server misconfiguration: Missing RCS Token" });
// // // // // // // //     }

// // // // // // // //     if (!contacts || contacts.length === 0) {
// // // // // // // //       return res.status(400).json({ error: "No contacts selected" });
// // // // // // // //     }

// // // // // // // //     const poll = await Poll.findById(pollId);
// // // // // // // //     if (!poll) return res.status(404).json({ error: "Poll not found" });

// // // // // // // //     // 2. Map Poll Options to RCS Suggestions
// // // // // // // //     // Note: We use type: "message" (Postback) for poll voting
// // // // // // // //     const suggestions = poll.options.map((opt) => ({
// // // // // // // //       type: "message", 
// // // // // // // //       text: opt.text.substring(0, 25), // Limit button text length
// // // // // // // //       postback: `VOTE_${opt._id}`
// // // // // // // //     }));

// // // // // // // //     let results = [];

// // // // // // // //     // 3. Loop through contacts
// // // // // // // //     for (const c of contacts) {
      
// // // // // // // //       // Clean Phone Number
// // // // // // // //       let cleanPhone = (c.phone || "")
// // // // // // // //         .toString()
// // // // // // // //         .replace(/\s+/g, "")
// // // // // // // //         .replace(/-/g, "")
// // // // // // // //         .replace(/\(/g, "")
// // // // // // // //         .replace(/\)/g, "");

// // // // // // // //       if (/^\d{10}$/.test(cleanPhone)) cleanPhone = "+91" + cleanPhone;
      
// // // // // // // //       if (!cleanPhone.startsWith("+")) {
// // // // // // // //         console.log("❌ Invalid RCS phone:", cleanPhone);
// // // // // // // //         continue;
// // // // // // // //       }

// // // // // // // //       // 4. Construct Payload (Text + Suggestions)
// // // // // // // //       // We switched from 'card' to 'text' to remove the image requirement
// // // // // // // //       const payload = {
// // // // // // // //         type: "text",                // Changed from 'card' to 'text' [cite: 322]
// // // // // // // //         phone_no: cleanPhone,
// // // // // // // //         bot_name: RML_BOT_NAME,
// // // // // // // //         text: poll.question,         // The Poll Question becomes the main text [cite: 324]
// // // // // // // //         suggestions: suggestions,    // The Options become buttons [cite: 326]
        
// // // // // // // //         // SMS Fallback
// // // // // // // //         fallback_channel: "sms",
// // // // // // // //         sms: {
// // // // // // // //           // ⚠️ MUST match your DLT Template exactly
// // // // // // // //           fallback_text: `Greetings from Pyngl! We have a new poll for you. Vote here: https://pyngl.com/poll/${poll._id}`
// // // // // // // //         }
// // // // // // // //       };

// // // // // // // //       try {
// // // // // // // //         const rmlRes = await axios.post(RML_API_URL, payload, {
// // // // // // // //           headers: {
// // // // // // // //             "Content-Type": "application/json",
// // // // // // // //             "Authorization": `Bearer ${RML_TOKEN}` // [cite: 312]
// // // // // // // //           }
// // // // // // // //         });

// // // // // // // //         results.push({
// // // // // // // //           phone: cleanPhone,
// // // // // // // //           status: "queued",
// // // // // // // //           id: rmlRes.data.id || null
// // // // // // // //         });

// // // // // // // //       } catch (apiErr) {
// // // // // // // //         // Log the full error to see why it is Unauthorized
// // // // // // // //         console.error(`RCS Error for ${cleanPhone}:`, apiErr.response?.data || apiErr.message);
// // // // // // // //         results.push({ phone: cleanPhone, status: "failed", error: apiErr.response?.data });
// // // // // // // //       }
// // // // // // // //     }

// // // // // // // //     res.json({
// // // // // // // //       success: true,
// // // // // // // //       count: results.length,
// // // // // // // //       details: results
// // // // // // // //     });

// // // // // // // //   } catch (err) {
// // // // // // // //     console.error("RCS Controller Error:", err);
// // // // // // // //     res.status(500).json({ error: "Failed to process RCS request", details: err.message });
// // // // // // // //   }
// // // // // // // // };
// // // // // // // import axios from "axios";
// // // // // // // import User from "../models/User.js";
// // // // // // // import Poll from "../models/Poll.js";
// // // // // // // import dotenv from "dotenv";

// // // // // // // // Ensure environment variables are loaded
// // // // // // // dotenv.config();

// // // // // // // // RML Connect API Config
// // // // // // // const RML_API_URL = "https://apis.rmlconnect.net/rcs/v1/message";
// // // // // // // const RML_BOT_NAME = "rml_jbm"; 

// // // // // // // export const sendRCSPollToSelected = async (req, res) => {
// // // // // // //   try {
// // // // // // //     const { pollId, contacts } = req.body;

// // // // // // //     // ---------------------------------------------------------
// // // // // // //     // 1. TOKEN SANITIZATION 
// // // // // // //     // ---------------------------------------------------------
// // // // // // //     let rawToken = process.env.RML_ACCESS_TOKEN;

// // // // // // //     if (!rawToken) {
// // // // // // //       console.error("❌ RML_ACCESS_TOKEN is missing in .env file");
// // // // // // //       return res.status(500).json({ error: "Server misconfiguration: Missing RCS Token" });
// // // // // // //     }

// // // // // // //     // Clean up the token string
// // // // // // //     const CLEAN_TOKEN = rawToken.replace("Bearer ", "").trim();

// // // // // // //     // ---------------------------------------------------------
// // // // // // //     // 2. Poll & Contact Validation
// // // // // // //     // ---------------------------------------------------------
// // // // // // //     if (!contacts || contacts.length === 0) {
// // // // // // //       return res.status(400).json({ error: "No contacts selected" });
// // // // // // //     }

// // // // // // //     const poll = await Poll.findById(pollId);
// // // // // // //     if (!poll) return res.status(404).json({ error: "Poll not found" });

// // // // // // //     // ---------------------------------------------------------
// // // // // // //     // 3. Map Poll Options to RCS Suggestions
// // // // // // //     // ---------------------------------------------------------
// // // // // // //     const suggestions = poll.options.map((opt) => ({
// // // // // // //       type: "message", 
// // // // // // //       text: opt.text.substring(0, 25), // RCS button text limit is strict
// // // // // // //       postback: `VOTE_${opt._id}`      // Webhook data
// // // // // // //     }));

// // // // // // //     let results = [];

// // // // // // //     // ---------------------------------------------------------
// // // // // // //     // 4. Loop & Send
// // // // // // //     // ---------------------------------------------------------
// // // // // // //     for (const c of contacts) {
      
// // // // // // //       // Clean Phone Number
// // // // // // //       let cleanPhone = (c.phone || "")
// // // // // // //         .toString()
// // // // // // //         .replace(/\s+/g, "")
// // // // // // //         .replace(/-/g, "")
// // // // // // //         .replace(/\(/g, "")
// // // // // // //         .replace(/\)/g, "");

// // // // // // //       // Ensure +91 format
// // // // // // //       if (/^\d{10}$/.test(cleanPhone)) cleanPhone = "+91" + cleanPhone;
      
// // // // // // //       // Validation
// // // // // // //       if (!cleanPhone.startsWith("+")) {
// // // // // // //         console.log("❌ Invalid RCS phone format:", cleanPhone);
// // // // // // //         continue;
// // // // // // //       }

// // // // // // //       // Payload Construction
// // // // // // //       const payload = {
// // // // // // //         type: "text",                
// // // // // // //         phone_no: cleanPhone,
// // // // // // //         bot_name: RML_BOT_NAME,
// // // // // // //         text: poll.question,         
// // // // // // //         suggestions: suggestions,    
        
// // // // // // //         // SMS Fallback
// // // // // // //         fallback_channel: "sms",
// // // // // // //         sms: {
// // // // // // //           fallback_text: `Greetings from Pyngl! We have a new poll for you. Vote here: https://pyngl.com/poll/${poll._id}`
// // // // // // //         }
// // // // // // //       };

// // // // // // //       try {
// // // // // // //         const rmlRes = await axios.post(RML_API_URL, payload, {
// // // // // // //           headers: {
// // // // // // //             "Content-Type": "application/json",
// // // // // // //             "Authorization": `Bearer ${CLEAN_TOKEN}`
// // // // // // //           }
// // // // // // //         });

// // // // // // //         console.log(`✅ RCS Queued for ${cleanPhone}`);
// // // // // // //         results.push({
// // // // // // //           phone: cleanPhone,
// // // // // // //           status: "queued",
// // // // // // //           id: rmlRes.data.id || null
// // // // // // //         });

// // // // // // //       } catch (apiErr) {
// // // // // // //         const errorData = apiErr.response?.data || apiErr.message;
// // // // // // //         console.error(`❌ RCS Error for ${cleanPhone}:`, JSON.stringify(errorData));
        
// // // // // // //         results.push({ 
// // // // // // //           phone: cleanPhone, 
// // // // // // //           status: "failed", 
// // // // // // //           error: errorData 
// // // // // // //         });
// // // // // // //       }
// // // // // // //     }

// // // // // // //     res.json({
// // // // // // //       success: true,
// // // // // // //       count: results.length,
// // // // // // //       details: results
// // // // // // //     });

// // // // // // //   } catch (err) {
// // // // // // //     console.error("RCS Controller Critical Error:", err);
// // // // // // //     res.status(500).json({ error: "Failed to process RCS request", details: err.message });
// // // // // // //   }
// // // // // // // };
// // // // // // import axios from "axios";
// // // // // // import User from "../models/User.js";
// // // // // // import Poll from "../models/Poll.js";
// // // // // // import dotenv from "dotenv";

// // // // // // dotenv.config();

// // // // // // const RML_API_URL = "https://apis.rmlconnect.net/rcs/v1/message";
// // // // // // const RML_BOT_NAME = "rml_jbm"; 

// // // // // // export const sendRCSPollToSelected = async (req, res) => {
// // // // // //   try {
// // // // // //     const { pollId, contacts } = req.body;

// // // // // //     // ---------------------------------------------------------
// // // // // //     // 1. SETUP & MOCK MODE CHECK
// // // // // //     // ---------------------------------------------------------
// // // // // //     // If MOCK MODE is on, we skip the token check and API call
// // // // // //     const IS_MOCK_MODE = process.env.RCS_MOCK_MODE === "true";
// // // // // //     let CLEAN_TOKEN = "";

// // // // // //     if (!IS_MOCK_MODE) {
// // // // // //         let rawToken = process.env.RML_ACCESS_TOKEN;
// // // // // //         if (!rawToken) {
// // // // // //           console.error("❌ RML_ACCESS_TOKEN is missing in .env file");
// // // // // //           return res.status(500).json({ error: "Server misconfiguration: Missing RCS Token" });
// // // // // //         }
// // // // // //         CLEAN_TOKEN = rawToken.replace("Bearer ", "").trim();
// // // // // //     }

// // // // // //     // ---------------------------------------------------------
// // // // // //     // 2. Poll & Contact Validation
// // // // // //     // ---------------------------------------------------------
// // // // // //     if (!contacts || contacts.length === 0) {
// // // // // //       return res.status(400).json({ error: "No contacts selected" });
// // // // // //     }

// // // // // //     const poll = await Poll.findById(pollId);
// // // // // //     if (!poll) return res.status(404).json({ error: "Poll not found" });

// // // // // //     // ---------------------------------------------------------
// // // // // //     // 3. Map Poll Options
// // // // // //     // ---------------------------------------------------------
// // // // // //     const suggestions = poll.options.map((opt) => ({
// // // // // //       type: "message", 
// // // // // //       text: opt.text.substring(0, 25), 
// // // // // //       postback: `VOTE_${opt._id}`
// // // // // //     }));

// // // // // //     let results = [];

// // // // // //     // ---------------------------------------------------------
// // // // // //     // 4. Loop & Process
// // // // // //     // ---------------------------------------------------------
// // // // // //     for (const c of contacts) {
      
// // // // // //       // Clean Phone Number
// // // // // //       let cleanPhone = (c.phone || "").toString().replace(/\D/g, "");
// // // // // //       if (cleanPhone.length === 10) cleanPhone = "91" + cleanPhone;
      
// // // // // //       // RCS API requires "+" prefix
// // // // // //       if (!cleanPhone.startsWith("+")) cleanPhone = "+" + cleanPhone;

// // // // // //       // Construct Payload
// // // // // //       const payload = {
// // // // // //         type: "text",                
// // // // // //         phone_no: cleanPhone,
// // // // // //         bot_name: RML_BOT_NAME,
// // // // // //         text: poll.question,         
// // // // // //         suggestions: suggestions,    
// // // // // //         fallback_channel: "sms",
// // // // // //         sms: {
// // // // // //           fallback_text: `Greetings from Pyngl! We have a new poll for you. Vote here: https://pyngl.com/poll/${poll._id}`
// // // // // //         }
// // // // // //       };

// // // // // //       // ---------------------------------------------------------
// // // // // //       // 5. SEND OR MOCK
// // // // // //       // ---------------------------------------------------------
// // // // // //       if (IS_MOCK_MODE) {
// // // // // //           // --- MOCK SUCCESS RESPONSE ---
// // // // // //           console.log(`⚠️ [MOCK MODE] Simulating RCS Send to ${cleanPhone}`);
// // // // // //           console.log(`📦 Payload:`, JSON.stringify(payload, null, 2));
          
// // // // // //           // Simulate 500ms network delay
// // // // // //           await new Promise(r => setTimeout(r, 500)); 

// // // // // //           results.push({
// // // // // //             phone: cleanPhone,
// // // // // //             status: "queued",
// // // // // //             id: "mock-msg-id-" + Date.now() // Fake ID
// // // // // //           });
// // // // // //           continue; // Skip the real API call
// // // // // //       }

// // // // // //       // --- REAL API CALL ---
// // // // // //       try {
// // // // // //         const rmlRes = await axios.post(RML_API_URL, payload, {
// // // // // //           headers: {
// // // // // //             "Content-Type": "application/json",
// // // // // //             "Authorization": `Bearer ${CLEAN_TOKEN}`
// // // // // //           }
// // // // // //         });

// // // // // //         results.push({
// // // // // //           phone: cleanPhone,
// // // // // //           status: "queued",
// // // // // //           id: rmlRes.data.id || null
// // // // // //         });

// // // // // //       } catch (apiErr) {
// // // // // //         console.error(`❌ RCS Error for ${cleanPhone}:`, apiErr.response?.data || apiErr.message);
// // // // // //         results.push({ phone: cleanPhone, status: "failed", error: apiErr.response?.data });
// // // // // //       }
// // // // // //     }

// // // // // //     res.json({
// // // // // //       success: true,
// // // // // //       count: results.length,
// // // // // //       details: results
// // // // // //     });

// // // // // //   } catch (err) {
// // // // // //     console.error("RCS Controller Error:", err);
// // // // // //     res.status(500).json({ error: "Failed to process RCS request", details: err.message });
// // // // // //   }
// // // // // // };
// // // // // import axios from "axios";
// // // // // import User from "../models/User.js";
// // // // // import Poll from "../models/Poll.js";
// // // // // import dotenv from "dotenv";

// // // // // dotenv.config();

// // // // // const RML_API_URL = "https://apis.rmlconnect.net/rcs/v1/message";
// // // // // const RML_BOT_NAME = "rml_jbm"; 

// // // // // export const sendRCSPollToSelected = async (req, res) => {
// // // // //   try {
// // // // //     const { pollId, contacts } = req.body;

// // // // //     // ---------------------------------------------------------
// // // // //     // 1. SETUP & MOCK MODE CHECK
// // // // //     // ---------------------------------------------------------
// // // // //     // If RCS_MOCK_MODE is "true" in .env, we skip the real API call.
// // // // //     // This allows you to test the Frontend UI while waiting for a valid token.
// // // // //     const IS_MOCK_MODE = process.env.RCS_MOCK_MODE === "true";
// // // // //     let CLEAN_TOKEN = "";

// // // // //     if (!IS_MOCK_MODE) {
// // // // //         let rawToken = process.env.RML_ACCESS_TOKEN;
// // // // //         if (!rawToken) {
// // // // //           console.error("❌ RML_ACCESS_TOKEN is missing in .env file");
// // // // //           return res.status(500).json({ error: "Server misconfiguration: Missing RCS Token" });
// // // // //         }
// // // // //         // FIX: Remove "Bearer" if pasted accidentally, and trim spaces
// // // // //         CLEAN_TOKEN = rawToken.replace("Bearer ", "").trim();
// // // // //     }

// // // // //     // ---------------------------------------------------------
// // // // //     // 2. Poll & Contact Validation
// // // // //     // ---------------------------------------------------------
// // // // //     if (!contacts || contacts.length === 0) {
// // // // //       return res.status(400).json({ error: "No contacts selected" });
// // // // //     }

// // // // //     const poll = await Poll.findById(pollId);
// // // // //     if (!poll) return res.status(404).json({ error: "Poll not found" });

// // // // //     // ---------------------------------------------------------
// // // // //     // 3. Map Poll Options to RCS Suggestions
// // // // //     // ---------------------------------------------------------
// // // // //     const suggestions = poll.options.map((opt) => ({
// // // // //       type: "message", 
// // // // //       // Safety: Ensure text exists and limit to 25 chars (RCS constraint)
// // // // //       text: (opt.text || "Option").substring(0, 25), 
// // // // //       postback: `VOTE_${opt._id}`
// // // // //     }));

// // // // //     let results = [];

// // // // //     // ---------------------------------------------------------
// // // // //     // 4. Loop & Process
// // // // //     // ---------------------------------------------------------
// // // // //     for (const c of contacts) {
      
// // // // //       // Clean Phone Number: Remove all non-digits
// // // // //       let cleanPhone = (c.phone || "").toString().replace(/\D/g, "");
      
// // // // //       // Add India Country Code if missing (10 digits -> 91XXXXXXXXXX)
// // // // //       if (cleanPhone.length === 10) cleanPhone = "91" + cleanPhone;
      
// // // // //       // RCS API strictly requires the "+" prefix
// // // // //       if (!cleanPhone.startsWith("+")) cleanPhone = "+" + cleanPhone;

// // // // //       // Construct Payload (Using type: "text" to avoid image requirement)
// // // // //       const payload = {
// // // // //         type: "text",                
// // // // //         phone_no: cleanPhone,
// // // // //         bot_name: RML_BOT_NAME,
// // // // //         text: poll.question,         
// // // // //         suggestions: suggestions,    
        
// // // // //         // SMS Fallback
// // // // //         fallback_channel: "sms",
// // // // //         sms: {
// // // // //           // ⚠️ NOTE: This text must match a registered DLT template in production
// // // // //           fallback_text: `Greetings from Pyngl! We have a new poll for you. Vote here: https://pyngl.com/poll/${poll._id}`
// // // // //         }
// // // // //       };

// // // // //       // ---------------------------------------------------------
// // // // //       // 5. SEND OR MOCK
// // // // //       // ---------------------------------------------------------
// // // // //       if (IS_MOCK_MODE) {
// // // // //           // --- MOCK SUCCESS RESPONSE ---
// // // // //           console.log(`⚠️ [MOCK MODE] Simulating RCS Send to ${cleanPhone}`);
          
// // // // //           // Simulate 500ms network delay to make UI feel real
// // // // //           await new Promise(r => setTimeout(r, 500)); 

// // // // //           results.push({
// // // // //             phone: cleanPhone,
// // // // //             status: "queued",
// // // // //             id: "mock-msg-id-" + Date.now() // Fake ID
// // // // //           });
// // // // //           continue; // Skip to next contact
// // // // //       }

// // // // //       // --- REAL API CALL ---
// // // // //       try {
// // // // //         const rmlRes = await axios.post(RML_API_URL, payload, {
// // // // //           headers: {
// // // // //             "Content-Type": "application/json",
// // // // //             "Authorization": `Bearer ${CLEAN_TOKEN}`
// // // // //           }
// // // // //         });

// // // // //         console.log(`✅ RCS Queued for ${cleanPhone}`);
// // // // //         results.push({
// // // // //           phone: cleanPhone,
// // // // //           status: "queued",
// // // // //           id: rmlRes.data.id || null
// // // // //         });

// // // // //       } catch (apiErr) {
// // // // //         // Detailed Error Logging
// // // // //         const errorData = apiErr.response?.data || apiErr.message;
        
// // // // //         // Specific check for the Read-Only Token issue
// // // // //         if (apiErr.response?.status === 401) {
// // // // //             console.error(`❌ UNAUTHORIZED: Token is invalid or expired.`);
// // // // //         } else {
// // // // //             console.error(`❌ RCS Error for ${cleanPhone}:`, JSON.stringify(errorData));
// // // // //         }

// // // // //         results.push({ 
// // // // //             phone: cleanPhone, 
// // // // //             status: "failed", 
// // // // //             error: errorData 
// // // // //         });
// // // // //       }
// // // // //     }

// // // // //     // ---------------------------------------------------------
// // // // //     // 6. Return Summary to Frontend
// // // // //     // ---------------------------------------------------------
// // // // //     res.json({
// // // // //       success: true,
// // // // //       count: results.length,
// // // // //       details: results
// // // // //     });

// // // // //   } catch (err) {
// // // // //     console.error("RCS Controller Critical Error:", err);
// // // // //     res.status(500).json({ error: "Failed to process RCS request", details: err.message });
// // // // //   }
// // // // // };
// // // // import axios from "axios";
// // // // import User from "../models/User.js";
// // // // import Poll from "../models/Poll.js";
// // // // import dotenv from "dotenv";

// // // // dotenv.config();

// // // // const RML_API_URL = "https://apis.rmlconnect.net/rcs/v1/message";
// // // // const RML_BOT_NAME = "rml_jbm"; 

// // // // export const sendRCSPollToSelected = async (req, res) => {
// // // //   try {
// // // //     const { pollId, contacts } = req.body;

// // // //     // ---------------------------------------------------------
// // // //     // 1. SETUP & TOKEN CLEANING
// // // //     // ---------------------------------------------------------
// // // //     const IS_MOCK_MODE = process.env.RCS_MOCK_MODE === "true";
// // // //     let CLEAN_TOKEN = "";

// // // //     if (!IS_MOCK_MODE) {
// // // //         let rawToken = process.env.RML_ACCESS_TOKEN;
// // // //         if (!rawToken) {
// // // //           return res.status(500).json({ error: "Missing RCS Token in .env" });
// // // //         }
// // // //         // Remove "Bearer " if accidentally pasted to prevent 401 errors
// // // //         CLEAN_TOKEN = rawToken.replace("Bearer ", "").trim();
// // // //     }

// // // //     // ---------------------------------------------------------
// // // //     // 2. Poll & Contact Validation
// // // //     // ---------------------------------------------------------
// // // //     if (!contacts || contacts.length === 0) {
// // // //       return res.status(400).json({ error: "No contacts selected" });
// // // //     }

// // // //     const poll = await Poll.findById(pollId);
// // // //     if (!poll) return res.status(404).json({ error: "Poll not found" });

// // // //     // ---------------------------------------------------------
// // // //     // 3. Prepare Payload Data
// // // //     // ---------------------------------------------------------
// // // //     // Use the poll's image, or the placeholder that worked in Postman
// // // //     const rcsImage = poll.imageUrl || "https://placehold.co/600x400.png";

// // // //     // Map Options to Suggestions (Buttons)
// // // //     const suggestions = poll.options.map((opt) => ({
// // // //       type: "message", 
// // // //       text: (opt.text || "Option").substring(0, 25), 
// // // //       postback: `VOTE_${opt._id}`
// // // //     }));

// // // //     let results = [];

// // // //     // ---------------------------------------------------------
// // // //     // 4. Loop & Send
// // // //     // ---------------------------------------------------------
// // // //     for (const c of contacts) {
      
// // // //       // Clean Phone Number
// // // //       let cleanPhone = (c.phone || "").toString().replace(/\D/g, "");
// // // //       if (cleanPhone.length === 10) cleanPhone = "91" + cleanPhone;
// // // //       if (!cleanPhone.startsWith("+")) cleanPhone = "+" + cleanPhone;

// // // //       // Payload: Matches your working Postman "Rich Card" JSON
// // // //       const payload = {
// // // //         type: "card",
// // // //         phone_no: cleanPhone,
// // // //         bot_name: RML_BOT_NAME,
// // // //         extra: `poll_${poll._id}`,
// // // //         card: {
// // // //           title: "Quick Poll: Feature Request",
// // // //           description: poll.question, 
// // // //           url: rcsImage,
// // // //           suggestions: suggestions
// // // //         },
// // // //         // Fallback to SMS
// // // //         fallback_channel: "sms",
// // // //         sms: {
// // // //           fallback_text: `Greetings from Pyngl! We have a new poll for you. Vote here: https://pyngl.com/poll/${poll._id}`
// // // //         }
// // // //       };

// // // //       // ---------------------------------------------------------
// // // //       // 5. Send Request (Mock or Real)
// // // //       // ---------------------------------------------------------
// // // //       if (IS_MOCK_MODE) {
// // // //           console.log(`⚠️ [MOCK] Sending to ${cleanPhone}`);
// // // //           results.push({ phone: cleanPhone, status: "queued", id: "mock-id" });
// // // //           continue;
// // // //       }

// // // //       try {
// // // //         const rmlRes = await axios.post(RML_API_URL, payload, {
// // // //           headers: {
// // // //             "Content-Type": "application/json",
// // // //             "Authorization": `Bearer ${CLEAN_TOKEN}`
// // // //           }
// // // //         });

// // // //         console.log(`✅ RCS Sent to ${cleanPhone}`);
// // // //         results.push({
// // // //           phone: cleanPhone,
// // // //           status: "queued",
// // // //           id: rmlRes.data.id || null
// // // //         });

// // // //       } catch (apiErr) {
// // // //         console.error(`❌ RCS Error for ${cleanPhone}:`, apiErr.response?.data || apiErr.message);
// // // //         results.push({ phone: cleanPhone, status: "failed", error: apiErr.response?.data });
// // // //       }
// // // //     }

// // // //     res.json({ success: true, count: results.length, details: results });

// // // //   } catch (err) {
// // // //     console.error("RCS Controller Error:", err);
// // // //     res.status(500).json({ error: "Failed to process RCS request", details: err.message });
// // // //   }
// // // // };
// // // import axios from "axios";
// // // import User from "../models/User.js";
// // // import Poll from "../models/Poll.js";
// // // import dotenv from "dotenv";

// // // dotenv.config();

// // // const RML_API_URL = "https://apis.rmlconnect.net/rcs/v1/message";
// // // const RML_BOT_NAME = "rml_jbm"; 

// // // export const sendRCSPollToSelected = async (req, res) => {
// // //   try {
// // //     const { pollId, contacts } = req.body;

// // //     // ---------------------------------------------------------
// // //     // 1. SETUP & TOKEN CLEANING
// // //     // ---------------------------------------------------------
// // //     const IS_MOCK_MODE = process.env.RCS_MOCK_MODE === "true";
// // //     let CLEAN_TOKEN = "";

// // //     if (!IS_MOCK_MODE) {
// // //         let rawToken = process.env.RML_ACCESS_TOKEN;
// // //         if (!rawToken) {
// // //           return res.status(500).json({ error: "Missing RCS Token in .env" });
// // //         }
// // //         // 🛡️ FIX: Remove "Bearer", remove quotes, remove spaces
// // //         CLEAN_TOKEN = rawToken.replace(/Bearer/g, "").replace(/"/g, "").trim();
// // //     }

// // //     if (!contacts || contacts.length === 0) {
// // //       return res.status(400).json({ error: "No contacts selected" });
// // //     }

// // //     const poll = await Poll.findById(pollId);
// // //     if (!poll) return res.status(404).json({ error: "Poll not found" });

// // //     // ---------------------------------------------------------
// // //     // 2. Construct Payload
// // //     // ---------------------------------------------------------
// // //     // RCS Cards MUST have a valid image. Use poll image or fallback.
// // //     const rcsImage = poll.imageUrl || "https://placehold.co/600x400.png";

// // //     // Map Options to Buttons
// // //     const suggestions = poll.options.map((opt) => ({
// // //       type: "message", 
// // //       text: (opt.text || "Option").substring(0, 25), 
// // //       postback: `VOTE_${opt._id}`
// // //     }));

// // //     let results = [];

// // //     // ---------------------------------------------------------
// // //     // 3. Loop & Send
// // //     // ---------------------------------------------------------
// // //     for (const c of contacts) {
      
// // //       // Clean Phone Number
// // //       let cleanPhone = (c.phone || "").toString().replace(/\D/g, "");
// // //       if (cleanPhone.length === 10) cleanPhone = "91" + cleanPhone;
// // //       if (!cleanPhone.startsWith("+")) cleanPhone = "+" + cleanPhone;

// // //       // 📦 PAYLOAD: Exact structure that worked in Postman
// // //       const payload = {
// // //         type: "card",                // [cite: 148]
// // //         phone_no: cleanPhone,
// // //         bot_name: RML_BOT_NAME,
// // //         extra: `poll_${poll._id}`,
// // //         card: {
// // //           title: "Quick Poll: Feature Request",
// // //           description: poll.question, 
// // //           url: rcsImage,             // [cite: 154]
// // //           suggestions: suggestions
// // //         },
// // //         // Fallback Logic
// // //         fallback_channel: "sms",
// // //         sms: {
// // //           fallback_text: `Greetings from Pyngl! We have a new poll for you. Vote here: https://pyngl.com/poll/${poll._id}`
// // //         }
// // //       };

// // //       // ---------------------------------------------------------
// // //       // 4. Send Request
// // //       // ---------------------------------------------------------
// // //       if (IS_MOCK_MODE) {
// // //           console.log(`⚠️ [MOCK] Sending to ${cleanPhone}`);
// // //           results.push({ phone: cleanPhone, status: "queued", id: "mock-id" });
// // //           continue;
// // //       }

// // //       try {
// // //         // Log exactly what we are sending (for debugging)
// // //         console.log(`📡 Sending Real RCS to ${cleanPhone}...`);
        
// // //         const rmlRes = await axios.post(RML_API_URL, payload, {
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             "Authorization": `Bearer ${CLEAN_TOKEN}` // Auto-adds Bearer
// // //           }
// // //         });

// // //         console.log(`✅ Success! ID: ${rmlRes.data.id}`);
// // //         results.push({
// // //           phone: cleanPhone,
// // //           status: "queued",
// // //           id: rmlRes.data.id || null
// // //         });

// // //       } catch (apiErr) {
// // //         console.error(`❌ RCS Error for ${cleanPhone}:`, apiErr.response?.data || apiErr.message);
        
// // //         // If 401, print the token we TRIED to use (first 10 chars) to debug
// // //         if (apiErr.response?.status === 401) {
// // //             console.error(`🔍 Token Used: Bearer ${CLEAN_TOKEN.substring(0,10)}...`);
// // //         }

// // //         results.push({ phone: cleanPhone, status: "failed", error: apiErr.response?.data });
// // //       }
// // //     }

// // //     res.json({ success: true, count: results.length, details: results });

// // //   } catch (err) {
// // //     console.error("RCS Controller Error:", err);
// // //     res.status(500).json({ error: "Failed to process RCS request", details: err.message });
// // //   }
// // // };
// // import axios from "axios";
// // import User from "../models/User.js";
// // import Poll from "../models/Poll.js";
// // import dotenv from "dotenv";

// // dotenv.config();

// // // 🔴 CHANGE 1: Switching to the alternate Route Mobile Endpoint
// // // If this doesn't work, switch it back to: "https://apis.rmlconnect.net/rcs/v1/message"
// // const RML_API_URL = "https://rcs-api.routemobile.com/v1/messages"; 
// // const RML_BOT_NAME = "rml_jbm"; 

// // export const sendRCSPollToSelected = async (req, res) => {
// //   try {
// //     const { pollId, contacts } = req.body;

// //     // ---------------------------------------------------------
// //     // 1. SETUP & TOKEN CLEANING
// //     // ---------------------------------------------------------
// //     const IS_MOCK_MODE = process.env.RCS_MOCK_MODE === "true";
// //     let CLEAN_TOKEN = "";

// //     if (!IS_MOCK_MODE) {
// //         let rawToken = process.env.RML_ACCESS_TOKEN;
// //         if (!rawToken) {
// //           return res.status(500).json({ error: "Missing RCS Token in .env" });
// //         }
// //         // Remove "Bearer" and whitespace to ensure clean token
// //         CLEAN_TOKEN = rawToken.replace(/Bearer/g, "").replace(/"/g, "").trim();
// //     }

// //     if (!contacts || contacts.length === 0) {
// //       return res.status(400).json({ error: "No contacts selected" });
// //     }

// //     const poll = await Poll.findById(pollId);
// //     if (!poll) return res.status(404).json({ error: "Poll not found" });

// //     // ---------------------------------------------------------
// //     // 2. Construct Payload
// //     // ---------------------------------------------------------
// //     const rcsImage = poll.imageUrl || "https://placehold.co/600x400.png";

// //     const suggestions = poll.options.map((opt) => ({
// //       type: "message", 
// //       text: (opt.text || "Option").substring(0, 25), 
// //       postback: `VOTE_${opt._id}`
// //     }));

// //     let results = [];

// //     // ---------------------------------------------------------
// //     // 3. Loop & Send
// //     // ---------------------------------------------------------
// //     for (const c of contacts) {
      
// //       let cleanPhone = (c.phone || "").toString().replace(/\D/g, "");
// //       if (cleanPhone.length === 10) cleanPhone = "91" + cleanPhone;
// //       if (!cleanPhone.startsWith("+")) cleanPhone = "+" + cleanPhone;

// //       [cite_start]// 📦 PAYLOAD: Using the Rich Card structure [cite: 156-175]
// //       const payload = {
// //         messageRequest: {
// //             phone_no: cleanPhone,
// //             bot_name: RML_BOT_NAME,
// //             type: "card",
// //             card: {
// //                 title: "Quick Poll: Feature Request",
// //                 description: poll.question, 
// //                 url: rcsImage,             
// //                 suggestions: suggestions
// //             },
// //             fallback_channel: "sms",
// //             sms: {
// //                 fallback_text: `Greetings from Pyngl! Vote here: https://pyngl.com/poll/${poll._id}`
// //             }
// //         }
// //       };
      
// //       // NOTE: The documentation you uploaded uses a flat structure (no 'messageRequest' wrapper).
// //       // But if you are using the 'rcs-api.routemobile.com' endpoint, it might require the wrapper.
// //       // If the above payload fails with 400 Bad Request, revert to the flat structure below:
      
// //       const flatPayload = {
// //         type: "card",
// //         phone_no: cleanPhone,
// //         bot_name: RML_BOT_NAME,
// //         extra: `poll_${poll._id}`,
// //         card: {
// //           title: "Quick Poll: Feature Request",
// //           description: poll.question, 
// //           url: rcsImage,
// //           suggestions: suggestions
// //         },
// //         fallback_channel: "sms",
// //         sms: {
// //           fallback_text: `Greetings from Pyngl! Vote here: https://pyngl.com/poll/${poll._id}`
// //         }
// //       };

// //       // ---------------------------------------------------------
// //       // 4. Send Request
// //       // ---------------------------------------------------------
// //       if (IS_MOCK_MODE) {
// //           console.log(`⚠️ [MOCK] Sending to ${cleanPhone}`);
// //           results.push({ phone: cleanPhone, status: "queued", id: "mock-id" });
// //           continue;
// //       }

// //       try {
// //         console.log(`📡 Sending Real RCS to ${cleanPhone} via ${RML_API_URL}...`);
        
// //         [cite_start]// Try sending the FLAT payload first as per your doc [cite: 156]
// //         const rmlRes = await axios.post(RML_API_URL, flatPayload, {
// //           headers: {
// //             "Content-Type": "application/json",
// //             "Authorization": `Bearer ${CLEAN_TOKEN}` 
// //           }
// //         });

// //         console.log(`✅ Success! ID: ${rmlRes.data.id}`);
// //         results.push({
// //           phone: cleanPhone,
// //           status: "queued",
// //           id: rmlRes.data.id || null
// //         });

// //       } catch (apiErr) {
// //         console.error(`❌ RCS Error for ${cleanPhone}:`, apiErr.response?.data || apiErr.message);
        
// //         if (apiErr.response?.status === 401) {
// //             console.error(`🔍 Token Used: Bearer ${CLEAN_TOKEN.substring(0,10)}...`);
// //             console.error(`⚠️ TIP: Check if Postman is using 'https://apis.rmlconnect.net' or 'https://rcs-api.routemobile.com'`);
// //         }

// //         results.push({ phone: cleanPhone, status: "failed", error: apiErr.response?.data });
// //       }
// //     }

// //     res.json({ success: true, count: results.length, details: results });

// //   } catch (err) {
// //     console.error("RCS Controller Error:", err);
// //     res.status(500).json({ error: "Failed to process RCS request", details: err.message });
// //   }
// // };
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// export const sendRcsMessage = async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;

//     if (!phoneNumber) {
//       return res.status(400).json({ error: "Phone number is required" });
//     }

//     const payload = {
//       type: "card",
//       phone_no: phoneNumber,
//       bot_name: "rml_jbm",
//       extra: "poll-campaign-001",
//       card: {
//         title: "Quick Poll: Feature Request",
//         description: "How are you??",
//         url: "https://placehold.co/600x400.png",
//         suggestions: [
//           { type: "message", text: "Good", postback: "vote_ai_story" },
//           { type: "message", text: "Fine", postback: "vote_dashboard" }
//         ]
//       },
//       fallback_channel: "sms",
//       sms: {
//         fallback_text:
//           "Greetings from Pyngl! We have a new poll for you. Vote here: https://pyngl.com/vote",
//       },
//     };

//     const token = process.env.RML_ACCESS_TOKEN;

//     const response = await axios.post(
//       "https://apis.rmlconnect.net/rcs/v1/message",
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     return res.json({
//       success: true,
//       routeMobileResponse: response.data,
//     });
//   } catch (err) {
//     console.error("RCS ERROR:", err.response?.data || err.message);
//     return res.status(500).json({
//       error: "Failed to send RCS",
//       details: err.response?.data || err.message,
//     });
//   }
// };
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// export const sendRcsMessage = async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;

//     console.log("📩 Incoming RCS request:", phoneNumber);

//     if (!phoneNumber) {
//       return res.status(400).json({ error: "Missing phoneNumber" });
//     }

//     const token = process.env.RML_ACCESS_TOKEN;
//     if (!token) {
//       console.log("❌ No token found in .env");
//       return res.status(500).json({ error: "Missing RML_ACCESS_TOKEN in .env" });
//     }

//     // CLEAN TOKEN
//     const bearer = token.replace("Bearer", "").replace(/"/g, "").trim();

//     console.log("🔑 Using Token:", bearer.substring(0, 20) + "...");

//     const payload = {
//       type: "card",
//       phone_no: phoneNumber,
//       bot_name: "rml_jbm",
//       extra: "poll-campaign-001",
//       card: {
//         title: "Quick Poll: Feature Request",
//         description: "How are you??",
//         url: "https://placehold.co/600x400.png",
//         suggestions: [
//           { type: "message", text: "Good", postback: "vote_ai_story" },
//           { type: "message", text: "Fine", postback: "vote_dashboard" }
//         ]
//       },
//       fallback_channel: "sms",
//       sms: {
//         fallback_text:
//           "Greetings from Pyngl! We have a new poll for you. Vote here: https://pyngl.com/vote"
//       }
//     };

//     console.log("📦 Sending Payload:", payload);

//     const response = await axios.post(
//       "https://apis.rmlconnect.net/rcs/v1/message",
//       payload,
//       {
//         headers: {
//           Authorization: `Bearer ${bearer}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("✅ RCS RESPONSE:", response.data);

//     return res.json({ success: true, data: response.data });

//   } catch (err) {
//     console.log("❌ RCS ERROR:", err.response?.data || err.message);
//     return res.status(500).json({
//       error: err.response?.data || err.message,
//     });
//   }
// };

export const sendRcsMessage = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    console.log("📩 Incoming RCS request:", phoneNumber);

    if (!phoneNumber) {
      return res.status(400).json({ error: "Missing phoneNumber" });
    }

    // -----------------------------------------------------------------
    // ⭐ 1. CLEAN + NORMALIZE PHONE NUMBER TO E.164 FORMAT (+91XXXXXXXXXX)
    // -----------------------------------------------------------------
    let cleanPhone = phoneNumber.toString().replace(/\D/g, ""); // remove non-digits

    if (cleanPhone.length === 10) {
      cleanPhone = "91" + cleanPhone; // add country code
    }

    if (!cleanPhone.startsWith("+")) {
      cleanPhone = "+" + cleanPhone; // add "+"
    }

    console.log("📞 Cleaned Phone:", cleanPhone);

    // -----------------------------------------------------------------
    // ⭐ 2. TOKEN CHECK + CLEANUP
    // -----------------------------------------------------------------
    const token = process.env.RML_ACCESS_TOKEN;

    if (!token) {
      console.log("❌ No token found in .env");
      return res.status(500).json({ error: "Missing RML_ACCESS_TOKEN in .env" });
    }

    const bearer = token.replace("Bearer", "").replace(/"/g, "").trim();
    console.log("🔑 Using Token:", bearer.substring(0, 20) + "...");

    // -----------------------------------------------------------------
    // ⭐ 3. BUILD EXACT PAYLOAD (MATCHING POSTMAN)
    // -----------------------------------------------------------------
    const payload = {
      type: "card",
      phone_no: cleanPhone,
      bot_name: "rml_jbm",
      extra: "poll-campaign-001",
      card: {
        title: "Quick Poll: Feature Request",
        description: "How are you??",
        url: "https://placehold.co/600x400.png",
        suggestions: [
          { type: "message", text: "Good", postback: "vote_ai_story" },
          { type: "message", text: "Fine", postback: "vote_dashboard" }
        ]
      },
      fallback_channel: "sms",
      sms: {
        fallback_text:
          "Greetings from Pyngl! We have a new poll for you. Vote here: https://pyngl.com/vote"
      }
    };

    console.log("📦 Sending Payload:", payload);

    // -----------------------------------------------------------------
    // ⭐ 4. SEND TO ROUTE MOBILE RCS API
    // -----------------------------------------------------------------
    const response = await axios.post(
      "https://apis.rmlconnect.net/rcs/v1/message",
      payload,
      {
        headers: {
          Authorization: `Bearer ${bearer}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ RCS RESPONSE:", response.data);

    return res.json({ success: true, data: response.data });

  } catch (err) {
    console.log("❌ RCS ERROR:", err.response?.data || err.message);
    return res.status(500).json({
      error: err.response?.data || err.message,
    });
  }
};
