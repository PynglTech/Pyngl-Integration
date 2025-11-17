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
import { google } from "googleapis";
import GoogleUser from "../models/GoogleUser.js";

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
    state: pollId,
  });

  res.redirect(url);
};

// --- Step 2: Callback ---
const oauth2callback = async (req, res) => {
  try {
    const { code, state } = req.query;
    const pollId = state;

    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oAuth2Client });
    const { data } = await oauth2.userinfo.get();

    // 1️⃣ Find or create main user
    let user = await User.findOne({ email: data.email });

    if (!user) {
      user = await User.create({
        email: data.email,
        username: data.email.split("@")[0],
        password: crypto.randomBytes(20).toString("hex"), // Fake password
        phoneNumber: "0000000000",                       // placeholder
        birthDate: new Date("2000-01-01"),               // placeholder
      });
    }

    // 2️⃣ Save Google tokens
    await GoogleUser.findOneAndUpdate(
      { email: data.email },
      {
        googleId: data.id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date,
      },
      { upsert: true }
    );

    // 3️⃣ Create JWT session cookie
    const token = user._id.toString();

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      domain: ".pyngl.com",
    });

    // 4️⃣ Redirect to frontend
    const FRONTEND_URL =
      process.env.NODE_ENV === "production"
        ? "https://pyngl.com"
        : "http://localhost:5173";

    res.redirect(
      `${FRONTEND_URL}/share?connectedEmail=${encodeURIComponent(
        user.email
      )}&pollId=${pollId}`
    );

  } catch (err) {
    console.error("OAuth error:", err);
    res.status(500).send("Authentication failed");
  }
};


// --- Fetch Contacts ---
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
      user.access_token = newToken.credentials.access_token;
      user.expiry_date = newToken.credentials.expiry_date;
      await user.save();
      oAuth2Client.setCredentials(newToken.credentials);
      console.log("🔄 Access token refreshed!");
    }

    const people = google.people({ version: "v1", auth: oAuth2Client });
    const response = await people.people.connections.list({
      resourceName: "people/me",
      personFields: "names,emailAddresses,phoneNumbers",
      pageSize: 200,
    });

    const contacts =
      response.data.connections?.map((c) => {
        return {
          name: c.names?.[0]?.displayName || "",
          email: c.emailAddresses?.[0]?.value || "",
           phone: c.phoneNumbers?.[0]?.value || "",
        };
      }) || [];
      console.log("🚀 ~ getContacts ~ response.data.connections:", response.data.connections)
      console.log("🚀 ~ getContacts ~ response.data:", response.data)
      console.log("🚀 ~ getContacts ~ contacts:", contacts)

    res.json({ contacts });
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).send("Failed to fetch contacts");
  }
};

export { login, oauth2callback, getContacts };