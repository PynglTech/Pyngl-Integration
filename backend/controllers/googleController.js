// import { google } from "googleapis";
// import GoogleUser from "../models/GoogleUser.js";

// const oAuth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI
// );

// // --- Step 1: Login ---
// const login = (req, res) => {
//   const { pollId } = req.query;
//   const url = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     prompt: "consent",
//     scope: [
//       "https://www.googleapis.com/auth/gmail.send",
//       "https://www.googleapis.com/auth/contacts.readonly",
//       "openid",
//       "email",
//       "profile",
//     ],
//     state: pollId,
//   });

//   res.redirect(url);
// };

// // --- Step 2: Callback ---
// const oauth2callback = async (req, res) => {
//   try {
//     const { code, state } = req.query;
//     const pollId = state;

//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);

//     const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });
//     const { data } = await oauth2.userinfo.get();

//     let user = await GoogleUser.findOne({ email: data.email });

//     if (!user) {
//       user = new GoogleUser({
//         email: data.email,
//         googleId: data.id,
//         access_token: tokens.access_token,
//         refresh_token: tokens.refresh_token,
//         expiry_date: tokens.expiry_date,
//       });
//     } else {
//       // Update tokens if user already exists
//       user.access_token = tokens.access_token;
//       if (tokens.refresh_token) user.refresh_token = tokens.refresh_token;
//       user.expiry_date = tokens.expiry_date;
//     }

//     await user.save();

//     // Redirect with pollId
//     res.redirect(
//       `http://localhost:5173/share?connectedEmail=${encodeURIComponent(
//         data.email
//       )}&pollId=${pollId}`
//     );
//   } catch (err) {
//     console.error("OAuth error:", err);
//     res.status(500).send("Authentication failed");
//   }
// };

// // --- Fetch Contacts ---
// const getContacts = async (req, res) => {
//   try {
//     const user = await GoogleUser.findOne({ email: req.query.email });
//     if (!user || !user.access_token) return res.status(401).send("Unauthorized");

//     oAuth2Client.setCredentials({
//       access_token: user.access_token,
//       refresh_token: user.refresh_token,
//       expiry_date: user.expiry_date,
//     });

//     if (Date.now() > user.expiry_date) {
//       const newToken = await oAuth2Client.refreshAccessToken();
//       user.access_token = newToken.credentials.access_token;
//       user.expiry_date = newToken.credentials.expiry_date;
//       await user.save();
//       oAuth2Client.setCredentials(newToken.credentials);
//       console.log("🔄 Access token refreshed!");
//     }

//     const people = google.people({ version: "v1", auth: oAuth2Client });
//     const response = await people.people.connections.list({
//       resourceName: "people/me",
//       personFields: "names,emailAddresses",
//       pageSize: 200,
//     });

//     const contacts =
//       response.data.connections?.map((c) => ({
//         name: c.names?.[0]?.displayName || "",
//         email: c.emailAddresses?.[0]?.value || "",
//       })) || [];

//     res.json({ contacts });
//   } catch (err) {
//     console.error("Error fetching contacts:", err);
//     res.status(500).send("Failed to fetch contacts");
//   }
// };

// export { login, oauth2callback, getContacts };
// import { google } from "googleapis";
// import GoogleUser from "../models/GoogleUser.js";
// import User from "../models/User.js";
// const oAuth2Client = new google.auth.OAuth2(
//   process.env.GOOGLE_CLIENT_ID,
//   process.env.GOOGLE_CLIENT_SECRET,
//   process.env.GOOGLE_REDIRECT_URI
// );

// // --- Step 1: Login ---
// const login = (req, res) => {
//   const { pollId } = req.query;
//   const url = oAuth2Client.generateAuthUrl({
//     access_type: "offline",
//     prompt: "consent",
//     scope: [
//       "https://www.googleapis.com/auth/gmail.send",
//       "https://www.googleapis.com/auth/contacts.readonly",
//       "openid",
//       "email",
//       "profile",
//     ],
//     state: pollId,
//   });

//   res.redirect(url);
// };

// // --- Step 2: Callback ---
// const oauth2callback = async (req, res) => {
//   try {
//     const { code, state } = req.query;
//     const pollId = state;

//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);

//     const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });
//     const { data } = await oauth2.userinfo.get();

//     let user = await GoogleUser.findOne({ email: data.email });

//     if (!user) {
//       user = new GoogleUser({
//         email: data.email,
//         googleId: data.id,
//         access_token: tokens.access_token,
//         refresh_token: tokens.refresh_token,
//         expiry_date: tokens.expiry_date,
//       });
//     } else {
//       // Update tokens if user already exists
//       user.access_token = tokens.access_token;
//       if (tokens.refresh_token) user.refresh_token = tokens.refresh_token;
//       user.expiry_date = tokens.expiry_date;
//     }

//     await user.save();

//     // Redirect with pollId
//     res.redirect(
//       `http://localhost:5173/share?connectedEmail=${encodeURIComponent(
//         data.email
//       )}&pollId=${pollId}`
//     );
//   } catch (err) {
//     console.error("OAuth error:", err);
//     res.status(500).send("Authentication failed");
//   }
// };

// --- Fetch Contacts ---
// const getContacts = async (req, res) => {
//   try {
//     const user = await GoogleUser.findOne({ email: req.query.email });
//     if (!user || !user.access_token) return res.status(401).send("Unauthorized");

//     oAuth2Client.setCredentials({
//       access_token: user.access_token,
//       refresh_token: user.refresh_token,
//       expiry_date: user.expiry_date,
//     });

//     if (Date.now() > user.expiry_date) {
//       const newToken = await oAuth2Client.refreshAccessToken();
//       user.access_token = newToken.credentials.access_token;
//       user.expiry_date = newToken.credentials.expiry_date;
//       await user.save();
//       oAuth2Client.setCredentials(newToken.credentials);
//       console.log("🔄 Access token refreshed!");
//     }
import { google } from "googleapis";
import GoogleUser from "../models/GoogleUser.js";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// --- Step 1: Login ---
const login = (req, res) => {
  const { pollId } = req.query;
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/gmail.send",
      "https://www.googleapis.com/auth/contacts.readonly",
      "openid",
      "email",
      "profile",
    ],
    // If pollId is undefined (signup flow), state will be the string "undefined" or empty
    state: pollId, 
  });

  res.redirect(url);
};

// --1- Step 2: Callback ---working code completly
// const oauth2callback = async (req, res) => {
//   try {
//     const { code, state } = req.query;
//     const pollId = state;

//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);

//     const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });
//     const { data } = await oauth2.userinfo.get();

//     let user = await GoogleUser.findOne({ email: data.email });

//     if (!user) {
//       user = new GoogleUser({
//         email: data.email,
//         googleId: data.id,
//         access_token: tokens.access_token,
//         refresh_token: tokens.refresh_token,
//         expiry_date: tokens.expiry_date,
//       });
//     } else {
//       // Update tokens if user already exists
//       user.access_token = tokens.access_token;
//       if (tokens.refresh_token) user.refresh_token = tokens.refresh_token;
//       user.expiry_date = tokens.expiry_date;
//     }

//     await user.save();

//     // ✅ FIXED: Determine Redirect Destination
//     // Use environment variable for frontend URL or fallback to localhost
//     const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

//     if (pollId && pollId !== "undefined" && pollId !== "null") {
//       // Flow A: Poll Sharing (Redirect to Share Page)
//       res.redirect(
//         `${CLIENT_URL}/share?connectedEmail=${encodeURIComponent(data.email)}&pollId=${pollId}`
//       );
//     } else {
//       // Flow B: Signup/Login (Redirect to Username Step)
//       // We pass the email so the frontend can hydrate the state
//       res.redirect(
//         `${CLIENT_URL}/signup/username?email=${encodeURIComponent(data.email)}&authType=google`
//       );
//     }

//   } catch (err) {
//     console.error("OAuth error:", err);
//     res.status(500).send("Authentication failed");
//   }
// };
// const oauth2callback = async (req, res) => {
//   try {
//     const { code, state } = req.query;
//     const pollId = state;

//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);

//     const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });
//     const { data } = await oauth2.userinfo.get();

//     let user = await GoogleUser.findOne({ email: data.email });

//     const isExistingUser = Boolean(user);  // ❗ this decides redirect

//     if (!user) {
//       user = new GoogleUser({
//         email: data.email,
//         googleId: data.id,
//         access_token: tokens.access_token,
//         refresh_token: tokens.refresh_token,
//         expiry_date: tokens.expiry_date,
//       });
//     } else {
//       // Update tokens if user already exists
//       user.access_token = tokens.access_token;
//       if (tokens.refresh_token) user.refresh_token = tokens.refresh_token;
//       user.expiry_date = tokens.expiry_date;
//     }

//     await user.save();

//     // frontend URL
//     const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

//     // A: Poll sharing flow
//     if (pollId && pollId !== "undefined" && pollId !== "null") {
//       return res.redirect(
//         `${CLIENT_URL}/share?connectedEmail=${encodeURIComponent(
//           data.email
//         )}&pollId=${pollId}`
//       );
//     }

//     // B: EXISTING GOOGLE USER → redirect to dashboard
//     if (isExistingUser) {
//       return res.redirect(
//         `${CLIENT_URL}/dashboard?email=${encodeURIComponent(data.email)}&auth=google`
//       );
//     }

//     // C: NEW GOOGLE USER → username setup
//     return res.redirect(
//       `${CLIENT_URL}/signup/username?email=${encodeURIComponent(
//         data.email
//       )}&authType=google`
//     );

//   } catch (err) {
//     console.error("OAuth error:", err);
//     return res.status(500).send("Authentication failed");
//   }
// };
// const oauth2callback = async (req, res) => {
//   try {
//     const { code, state } = req.query;
//     const pollId = state;

//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);

//     const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });
//     const { data } = await oauth2.userinfo.get();

//     // Check in BOTH collections
//     let googleUser = await GoogleUser.findOne({ email: data.email });
//     let mainUser = await User.findOne({ email: data.email });

//     // Decide where to redirect
//     const isExistingUser = Boolean(googleUser || mainUser);

//     // --- save/update googleUser record ---
//     if (!googleUser) {
//       googleUser = new GoogleUser({
//         email: data.email,
//         googleId: data.id,
//         access_token: tokens.access_token,
//         refresh_token: tokens.refresh_token,
//         expiry_date: tokens.expiry_date,
//       });
//     } else {
//       googleUser.access_token = tokens.access_token;
//       if (tokens.refresh_token) googleUser.refresh_token = tokens.refresh_token;
//       googleUser.expiry_date = tokens.expiry_date;
//     }

//     await googleUser.save();

//     const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

//     // A. Poll share flow
//     if (pollId && pollId !== "undefined" && pollId !== "null") {
//       return res.redirect(
//         `${CLIENT_URL}/share?connectedEmail=${encodeURIComponent(
//           data.email
//         )}&pollId=${pollId}`
//       );
//     }

//     // B. EXISTING USER → send to dashboard
//     if (isExistingUser) {
//       return res.redirect(
//         `${CLIENT_URL}/dashboard?email=${encodeURIComponent(
//           data.email
//         )}&auth=google`
//       );
//     }

//     // C. NEW GOOGLE USER → create username
//     return res.redirect(
//       `${CLIENT_URL}/signup/username?email=${encodeURIComponent(
//         data.email
//       )}&authType=google`
//     );

//   } catch (err) {
//     console.error("OAuth error:", err);
//     return res.status(500).send("Authentication failed");
//   }
// };
// const oauth2callback = async (req, res) => {
//   try {
//     const { code, state } = req.query;
//     const pollId = state;

//     // 1. Get Google tokens
//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);

//     // 2. Get Google profile
//     const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });
//     const { data } = await oauth2.userinfo.get();

//     const email = data.email;

//     // 3. Check both collections
//     let googleUser = await GoogleUser.findOne({ email });
//     let mainUser = await User.findOne({ email });

//     const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

//     // ==============
//     // POLL SHARE FLOW
//     // ==============
//     if (pollId && pollId !== "undefined" && pollId !== "null") {
//       return res.redirect(
//         `${CLIENT_URL}/share?connectedEmail=${encodeURIComponent(email)}&pollId=${pollId}`
//       );
//     }

//     // ==============================================
//     // CASE 1: MAIN USER ALREADY EXISTS → LOGIN + DASH
//     // ==============================================
//     if (mainUser) {
//       // save/update google tokens
//       if (!googleUser) {
//         googleUser = new GoogleUser({
//           email,
//           googleId: data.id,
//           access_token: tokens.access_token,
//           refresh_token: tokens.refresh_token,
//           expiry_date: tokens.expiry_date,
//         });
//       } else {
//         googleUser.access_token = tokens.access_token;
//         if (tokens.refresh_token) googleUser.refresh_token = tokens.refresh_token;
//         googleUser.expiry_date = tokens.expiry_date;
//       }

//       await googleUser.save();

//       // 🔥 SET LOGIN COOKIE 🔥
//       generateToken(req, res, mainUser._id);

//       return res.redirect(
//         `${CLIENT_URL}/dashboard?auth=google`
//       );
//     }

//     // =====================================================
//     // CASE 2: No main user → go to username setup (SIGN UP)
//     // =====================================================
//     if (!googleUser) {
//       googleUser = new GoogleUser({
//         email,
//         googleId: data.id,
//         access_token: tokens.access_token,
//         refresh_token: tokens.refresh_token,
//         expiry_date: tokens.expiry_date,
//       });
//     } else {
//       googleUser.access_token = tokens.access_token;
//       if (tokens.refresh_token) googleUser.refresh_token = tokens.refresh_token;
//       googleUser.expiry_date = tokens.expiry_date;
//     }

//     await googleUser.save();

//     // redirect to username step
//     return res.redirect(
//       `${CLIENT_URL}/signup/username?email=${encodeURIComponent(email)}&authType=google`
//     );

//   } catch (err) {
//     console.error("OAuth error:", err);
//     return res.status(500).send("Authentication failed");
//   }
// };
const oauth2callback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const pollId = state;

    // 1. Get Google tokens
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    // 2. Get Google profile
    const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });
    const { data } = await oauth2.userinfo.get();

    const email = data.email;

    // 3. Check both collections
    let googleUser = await GoogleUser.findOne({ email });
    let mainUser = await User.findOne({ email });

    const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

    // ==============
    // POLL SHARE FLOW
    // ==============
    if (pollId && pollId !== "undefined" && pollId !== "null") {
      return res.redirect(
        `${CLIENT_URL}/share?connectedEmail=${encodeURIComponent(email)}&pollId=${pollId}`
      );
    }

    // ==============================================
    // CASE 1: MAIN USER ALREADY EXISTS → LOGIN + DASH
    // ==============================================
    // if (mainUser) {
    //   // save/update google tokens
    //   if (!googleUser) {
    //     googleUser = new GoogleUser({
    //       email,
    //       googleId: data.id,
    //       access_token: tokens.access_token,
    //       refresh_token: tokens.refresh_token,
    //       expiry_date: tokens.expiry_date,
    //     });
    //   } else {
    //     googleUser.access_token = tokens.access_token;
    //     if (tokens.refresh_token) googleUser.refresh_token = tokens.refresh_token;
    //     googleUser.expiry_date = tokens.expiry_date;
    //   }

    //   await googleUser.save();

    //   // 🔥 FIXED: Removed 'req' from arguments 🔥
    //   generateToken(res, mainUser._id);

    //   return res.redirect(
    //     `${CLIENT_URL}/dashboard?auth=google`
    //   );
    // }
    if (mainUser) {
  // update google info
  if (!googleUser) {
    googleUser = new GoogleUser({
      email,
      googleId: data.id,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: tokens.expiry_date,
    });
  } else {
    googleUser.access_token = tokens.access_token;
    if (tokens.refresh_token) googleUser.refresh_token = tokens.refresh_token;
    googleUser.expiry_date = tokens.expiry_date;
  }

  await googleUser.save();

  // 🔥 Correct token generation
  generateToken(res, mainUser._id);

  return res.redirect(`${CLIENT_URL}/dashboard?auth=google`);
}


    // =====================================================
    // CASE 2: No main user → go to username setup (SIGN UP)
    // =====================================================
    if (!googleUser) {
      googleUser = new GoogleUser({
        email,
        googleId: data.id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date,
      });
    } else {
      googleUser.access_token = tokens.access_token;
      if (tokens.refresh_token) googleUser.refresh_token = tokens.refresh_token;
      googleUser.expiry_date = tokens.expiry_date;
    }

    await googleUser.save();

    // redirect to username step
    return res.redirect(
      `${CLIENT_URL}/signup/username?email=${encodeURIComponent(email)}&authType=google`
    );

  } catch (err) {
    console.error("OAuth error:", err);
    return res.status(500).send("Authentication failed");
  }
};

//     const people = google.people({ version: "v1", auth: oAuth2Client });
//     const response = await people.people.connections.list({
//       resourceName: "people/me",
//       personFields: "names,emailAddresses,phoneNumbers",
//       pageSize: 200,
//     });

//     const contacts =
//       response.data.connections?.map((c) => {
//         return {
//           name: c.names?.[0]?.displayName || "",
//           email: c.emailAddresses?.[0]?.value || "",
//            phone: c.phoneNumbers?.[0]?.value || "",
//         };
//       }) || [];
//       console.log("🚀 ~ getContacts ~ response.data.connections:", response.data.connections)
//       console.log("🚀 ~ getContacts ~ response.data:", response.data)
//       console.log("🚀 ~ getContacts ~ contacts:", contacts)

//     res.json({ contacts });
//   } catch (err) {
//     console.error("Error fetching contacts:", err);
//     res.status(500).send("Failed to fetch contacts");
//   }
// };
const getContacts = async (req, res) => {
  try {
    const user = await GoogleUser.findOne({ email: req.query.email });
    if (!user || !user.access_token) return res.status(401).send("Unauthorized");

    oAuth2Client.setCredentials({
      access_token: user.access_token,
      refresh_token: user.refresh_token,
      expiry_date: user.expiry_date,
    });

    if (Date.now() > user.expiry_date) {
      const newToken = await oAuth2Client.refreshAccessToken();
      await GoogleUser.findOneAndUpdate(
        { email: user.email },
        {
          access_token: newToken.credentials.access_token,
          expiry_date: newToken.credentials.expiry_date,
        }
      );
      oAuth2Client.setCredentials(newToken.credentials);
    }

    const people = google.people({ version: "v1", auth: oAuth2Client });
    const response = await people.people.connections.list({
      resourceName: "people/me",
      personFields: "names,emailAddresses,phoneNumbers",
      pageSize: 200,
    });

    const contacts =
      response.data.connections?.map((c) => ({
        name: c.names?.[0]?.displayName || "",
        email: c.emailAddresses?.[0]?.value || "",
        phone: c.phoneNumbers?.[0]?.value || "",
      })) || [];

    // ⭐ SAFE UPDATE — NO VERSION CONFLICTS
    await GoogleUser.findOneAndUpdate(
      { email: user.email },
      { contacts },
      { new: true }
    );
    await User.findOneAndUpdate(
  { email: user.email },
  { googleContacts: contacts },
  { new: true }
);

    res.json({ contacts });

  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).send("Failed to fetch contacts");
  }
};

export { login, oauth2callback, getContacts };