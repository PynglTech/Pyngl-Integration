import User from '../models/User.js';
import Poll from '../models/Poll.js';
import Notification from '../models/Notification.js';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import { Resend } from 'resend';
import { sendOtp, verifyOtp } from '../utils/otpServices.js';
import GoogleUser from '../models/GoogleUser.js';
import Otp from '../models/Otp.js';
// --- Reusable function to format user data for responses ---
const formatUserResponse = (user) => {
    return {
        _id: user._id,
        username: user.username,
        email: user.email,
        // phoneNumber: user.phoneNumber, 
        profilePictureUrl: user.profilePictureUrl,
        birthDate: user.birthDate, 
        age: user.age, 
    };
};
const resend = new Resend(process.env.RESEND_API_KEY);
// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
// export const registerUser = asyncHandler(async (req, res) => {
//     // NEW: Destructure birthDate from the request body
//     const { username, email, password, phoneNumber, birthDate } = req.body;

//     // MERGED: Using the more robust check for existing users
//     const userExists = await User.findOne({ 
//         $or: [{ email }, { username }, { phoneNumber }] 
//     });

//     if (userExists) {
//         res.status(400);
//         throw new Error('User with given email, username, or phone number already exists');
//     }

//     const user = await User.create({ 
//         username, 
//         email, 
//         password, 
//         phoneNumber,
//         birthDate // NEW: Save birthDate on creation
//     });

//     if (user) {
//         generateToken(res, user._id);

//         // Kept your welcome notification logic
//         const welcomeNotification = new Notification({
//             user: user._id,
//             message: "Welcome to Pyngl! Ready to find out what people are thinking?",
//             link: "/create-poll"
//         });
//         await welcomeNotification.save();

//         const io = req.app.get('io');
//         io.to(user._id.toString()).emit('new_notification', welcomeNotification);
        
//         res.status(201).json(formatUserResponse(user));
//     } else {
//         res.status(400);
//         throw new Error('Invalid user data');
//     }
// });
export const registerUser = asyncHandler(async (req, res) => {
    // 1. REMOVED phoneNumber
    // 2. Added 'dob' to accept the string from frontend
    let { username, email, password, birthDate, dob } = req.body;

    // 3. Handle Date Conversion
    // Frontend sends "dob" string (e.g., "January 15, 2002")
    if (!birthDate && dob) {
        birthDate = new Date(dob);
    }

    // 4. Updated duplicate check (Removed phoneNumber check)
    const userExists = await User.findOne({ 
        $or: [{ email }, { username }] 
    });

    if (userExists) {
        res.status(400);
        throw new Error('User with given email or username already exists');
    }

    // 5. Create user without phoneNumber
    const user = await User.create({ 
        username, 
        email, 
        password, 
        birthDate 
    });

    if (user) {
      generateToken(res, user._id);



        const welcomeNotification = new Notification({
            user: user._id,
            message: "Welcome to Pyngl! Ready to find out what people are thinking?",
            link: "/create-poll"
        });
        await welcomeNotification.save();

        const io = req.app.get('io');
        io.to(user._id.toString()).emit('new_notification', welcomeNotification);
        
        // Frontend 'register' store expects direct object (response.data), 
        // so we DO NOT wrap this in { user: ... }
        res.status(201).json(formatUserResponse(user));
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
// @access  Public
// export const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (user && (await user.matchPassword(password))) {
//         generateToken(res, user._id);
        
//         // Record login for the nudge scheduler
//         await user.recordLogin();

//         res.status(200).json(formatUserResponse(user));
//     } else {
//         res.status(401);
//         throw new Error('Invalid email or password');
//     }
// });
// export const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//    const user = await User.findOne({
//   $or: [
//     { email: identifier.toLowerCase() },
//     { username: identifier.toLowerCase() }
//   ]
// });


//     if (user && (await user.matchPassword(password))) {
//         generateToken(res, user._id);
        
//         await user.recordLogin();

//         // Frontend 'login' store expects 'response.data.user'
//         // So we MUST wrap this in { user: ... }
//         res.status(200).json({ 
//             user: formatUserResponse(user) 
//         });
//     } else {
//         res.status(401);
//         throw new Error('Invalid email or password');
//     }
// });
// export const loginUser = asyncHandler(async (req, res) => {
//     const { identifier, password } = req.body;

//     if (!identifier) {
//         res.status(400);
//         throw new Error("Identifier is required");
//     }

//     const normalized = identifier.toLowerCase();

//     const user = await User.findOne({
//         $or: [
//             { email: normalized },
//             { username: normalized }
//         ]
//     });

//     if (user && (await user.matchPassword(password))) {
//         generateToken(res, user._id);
        
//         await user.recordLogin();

//         return res.status(200).json({
//             user: formatUserResponse(user)
//         });
//     }

//     res.status(401);
//     throw new Error("Invalid email or password");
// });
export const loginUser = asyncHandler(async (req, res) => {
    console.log("🟦 Login Request Body:", req.body);

    const { identifier, password } = req.body;

    console.log("🟩 Raw Identifier:", identifier);
    console.log("🟩 Raw Password:", password);

    const normalized = identifier?.toString().trim().toLowerCase();
    console.log("🟧 Normalized:", normalized);

    const user = await User.findOne({
        $or: [
            { email: normalized },
            { username: normalized }
        ]
    });

    console.log("🟥 DB User Found:", user);

    if (user) {
        const passMatch = await user.matchPassword(password);
        console.log("🟪 Password match:", passMatch);
    }

    if (!user) {
        res.status(401);
        throw new Error("Invalid email or password (User not found)");
    }

    if (!(await user.matchPassword(password))) {
        res.status(401);
        throw new Error("Invalid email or password (Wrong password)");
    }

    generateToken(res, user._id);
    await user.recordLogin();

    res.status(200).json({
        user: formatUserResponse(user)
    });
});



// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
export const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

// @desc    Get user's poll creation and participation stats
// @route   GET /api/users/profile/stats
// @access  Private
export const getUserProfileStats = asyncHandler(async (req, res) => {
    // This entire function from your file is preserved as it's a great feature.
    const userId = req.user._id;
    const { period = 'all-time' } = req.query;
    let startDate;
    if (period === 'week') {
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
    }
    const pingsCreatedQuery = { author: userId };
    if (startDate) {
        pingsCreatedQuery.createdAt = { $gte: startDate };
    }
    const pingsCreated = await Poll.countDocuments(pingsCreatedQuery);
    const participationPipeline = [
      { $match: { author: userId } }, 
      { $unwind: "$votedBy" },
      ...(startDate ? [{ $match: { "votedBy.votedAt": { $gte: startDate } } }] : []),
      { $count: "total" }
    ];
    const participationResult = await Poll.aggregate(participationPipeline);
    const totalParticipate = participationResult.length > 0 ? participationResult[0].total : 0;
    res.status(200).json({ pingsCreated, totalParticipate });
});

// @desc    Update user profile information
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        // NEW: Allow updating birthDate
        user.birthDate = req.body.birthDate || user.birthDate;

        const updatedUser = await user.save();
        res.status(200).json(formatUserResponse(updatedUser));
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user password
// @route   PUT /api/users/profile/password
// @access  Private
export const updateUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);
    if (user && (await user.matchPassword(oldPassword))) {
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } else {
        res.status(401);
        throw new Error('Invalid old password');
    }
});

// @desc    Update user profile picture
// @route   PUT /api/users/profile/picture
// @access  Private
export const updateUserProfilePicture = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400);
        throw new Error('No image file provided.');
    }
    const user = await User.findById(req.user._id);
    if (user) {
        user.profilePictureUrl = req.file.path; // URL from Cloudinary
        const updatedUser = await user.save();
        res.status(200).json(formatUserResponse(updatedUser));
    } else {
        res.status(404);
        throw new Error('User not found.');
    }
});

// @desc    Request password reset via Email OTP
// @route   POST /api/users/forgotpassword
// @access  Public
export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.status(404);
    throw new Error('There is no user with that email address.');
  }

  const resetOtp = user.generatePasswordResetOtp();
  console.log("🚀 ~ resetOtp:", resetOtp)
  await user.save({ validateBeforeSave: false });

  // This is the HTML body for the email
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Password Reset Request</h2>
      <p>Hi ${user.username},</p>
      <p>You requested a password reset for your Pyngl account. Your One-Time Password (OTP) is:</p>
      <h1 style="font-size: 32px; letter-spacing: 2px; margin: 20px 0; text-align: center;">
        ${resetOtp}
      </h1>
      <p>This OTP is valid for 10 minutes. If you did not request this, please ignore this email.</p>
      <p>Thanks,<br>The Pyngl Team</p>
    </div>
  `;

  try {
    // Replaced sendEmail with resend.emails.send
    const { data, error } = await resend.emails.send({
      from: 'Pyngl <notifications@pyngl.com>', // Or your verified domain
      to: user.email,
      subject: 'Your Password Reset OTP',
      html: htmlBody,
    });

    // NEW: Check for a specific error from Resend
    if (error) {
      console.error("Resend error:", error);
      throw new Error('Email could not be sent'); // Triggers the catch block
    }

    res.status(200).json({ success: true, message: 'OTP sent to email' });

  } catch (err) {
    // This catch block will now also catch the error we throw above
    user.passwordResetOtp = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    res.status(500);
    throw new Error('Email could not be sent');
  }
});

// @desc    Reset password with Email OTP
// @route   PUT /api/users/resetpassword
// @access  Public
export const resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, password } = req.body;
    if (!email || !otp || !password) {
        res.status(400);
        throw new Error('Please provide email, OTP, and a new password.');
    }

    // --- CRITICAL FIX ---
    // The OTP is stored in plain text, so we find it directly without hashing.
    const user = await User.findOne({
        email,
        passwordResetOtp: otp, // Find the plain text OTP
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
        res.status(400);
        throw new Error('Invalid OTP or OTP has expired.');
    }
    user.password = password;
    user.passwordResetOtp = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.status(200).json({ success: true, message: 'Password reset successful.' });
});

// --- Phone OTP functions are preserved from your file ---

// @desc    Request password reset via Phone OTP
// @route   POST /api/users/forgotpassword-otp
// @access  Public
export const forgotPasswordOtp = asyncHandler(async (req, res) => {
    const { phoneNumber, channel = 'sms' } = req.body;
    const user = await User.findOne({ phoneNumber });
    if (!user) {
        res.status(404);
        throw new Error('User with that phone number not found');
    }
    await sendOtp(phoneNumber, channel);
    res.status(200).json({ success: true, message: `OTP sent to ${phoneNumber} via ${channel}` });
});

// @desc    Reset password using Phone OTP
// @route   POST /api/users/resetpassword-otp
// @access  Public
export const resetPasswordOtp = asyncHandler(async (req, res) => {
    const { phoneNumber, otpCode, newPassword } = req.body;
    const isValidOtp = await verifyOtp(phoneNumber, otpCode);
    if (!isValidOtp) {
        res.status(400);
        throw new Error('Invalid or expired OTP');
    }
    const user = await User.findOne({ phoneNumber });
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ success: true, message: 'Password has been reset successfully' });
});
export const saveUserLocation = async (req, res) => {
  try {
    const userId = req.user?._id || req.body.userId; // ✅ fallback for testing
    const { latitude, longitude, accuracy } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Latitude and longitude are required." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.location = { latitude, longitude, accuracy, updatedAt: new Date() };
    await user.save();

    res.status(200).json({
      message: "Location saved successfully!",
      location: user.location,
    });
  } catch (error) {
    console.error("❌ Error saving user location:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};


export const getUserStatus = async (req, res) => {
  try {
    if (req.user) return res.json({ user: formatUserResponse(req.user) });
    res.json({ user: null });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
export const saveUserContacts = async (req, res) => {
  try {
    const { contacts } = req.body;  // array of {name, phone}
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Replace or merge contacts
    user.savedContacts = contacts;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Contacts saved successfully",
      savedContacts: user.savedContacts
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to save contacts", error });
  }
};
// export const getUserContacts = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (!user) return res.status(404).json({ message: "User not found" });

//     const fromGoogle = user.googleContacts || [];
//     const saved = user.savedContacts || [];

//     const merged = [
//       ...fromGoogle.map(c => ({ ...c, source: "google" })),
//       ...saved.map(c => ({ ...c, source: "manual" }))
//     ];

//     // remove duplicates by phone
//     const unique = merged.filter(
//       (contact, index, self) =>
//         contact.phone &&
//         index === self.findIndex(c => c.phone === contact.phone)
//     );

//     res.json({ contacts: unique });
//   } catch (err) {
//     res.status(500).json({ message: "Error loading contacts" });
//   }
// };

// export const getUserContacts = async (req, res) => {
//   try {
//   const user = await User.findOne({ email: req.user.email });

//     // console.log("REQ.USER =", req.user);  // ← ADD THIS
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // If Google contacts are empty — auto fetch them
//     if (!user.googleContacts || user.googleContacts.length === 0) {
//       console.log("Google contacts empty → Fetching now...");
      
//       // call Google API
//       const googleUser = await GoogleUser.findOne({ email: user.email });

//       if (googleUser && googleUser.access_token) {
//         oAuth2Client.setCredentials({
//           access_token: googleUser.access_token,
//           refresh_token: googleUser.refresh_token,
//           expiry_date: googleUser.expiry_date,
//         });

//         const people = google.people({ version: "v1", auth: oAuth2Client });
//         const response = await people.people.connections.list({
//           resourceName: "people/me",
//           personFields: "names,emailAddresses,phoneNumbers",
//           pageSize: 200,
//         });

//         const contacts = response.data.connections?.map((c) => ({
//           name: c.names?.[0]?.displayName || "",
//           email: c.emailAddresses?.[0]?.value || "",
//           phone: c.phoneNumbers?.[0]?.value || "",
//         })) || [];

//         user.googleContacts = contacts;
//         await user.save();

//         return res.json({ contacts });
//       }
//     }

//     // Otherwise return saved contacts
//     const merged = [
//       ...user.googleContacts.map(c => ({ ...c, source: "google" })),
//       ...user.savedContacts.map(c => ({ ...c, source: "manual" }))
//     ];

//     const unique = merged.filter(
//       (contact, index, self) =>
//         contact.phone &&
//         index === self.findIndex(c => c.phone === contact.phone)
//     );

//     res.json({ contacts: unique });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error loading contacts" });
//   }
// };

export const getUserContacts = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const google = user.googleContacts || [];
    const saved = user.savedContacts || [];

    const merged = [
      ...google.map(c => ({ ...c, source: "google" })),
      ...saved.map(c => ({ ...c, source: "manual" }))
    ];

    const unique = merged.filter(
      (c, idx, arr) =>
        c.phone &&
        idx === arr.findIndex(x => x.phone === c.phone)
    );

    res.json({ contacts: unique });
  } catch (err) {
    res.status(500).json({ message: "Error loading contacts" });
  }
};
// @desc    Check username availability and provide smart suggestions
// @route   POST /api/users/check-username
// @access  Public
export const checkUsernameAvailability = asyncHandler(async (req, res) => {
    const { username } = req.body;
    
    // 1. Basic Validation
    if (!username || username.length < 3) {
        return res.status(400).json({ message: 'Username too short' });
    }

    // 2. Check exact match in Database
    const userExists = await User.findOne({ username });

    // If user does NOT exist, it is available
    if (!userExists) {
        return res.status(200).json({ 
            available: true, 
            message: 'Username is available',
            suggestions: []
        });
    }

    // 3. If Taken: Generate "Smart" Suggestions
    // We generate a few candidates to check
    const randomNum = Math.floor(Math.random() * 1000);
    const currentYear = new Date().getFullYear();
    
    const candidates = [
        `${username}${randomNum}`,          
        `${username}${currentYear}`,      
        `${username}_${randomNum}`,        
        `real${username}`,                 
        `${username}_official`             
    ];

    // 4. Check which candidates are ACTUALLY free in the DB
    // We find any users that have these usernames
    const takenCandidates = await User.find({ 
        username: { $in: candidates } 
    }).select('username');

    const takenUsernames = takenCandidates.map(u => u.username);

    // Filter: Keep only the ones NOT in the database
    const availableSuggestions = candidates.filter(
        candidate => !takenUsernames.includes(candidate)
    );

    // 5. Return result
    res.status(200).json({
        available: false,
        message: 'Username is taken',
        suggestions: availableSuggestions.slice(0, 3) // Return top 3 available options
    });
});
// export const sendOtpToEmail = asyncHandler(async (req, res) => {
//     const { email } = req.body;

//     if (!email) {
//         res.status(400);
//         throw new Error('Email is required');
//     }

//     // ✅ FIX: Normalize Email (Trim + Lowercase)
//     const normalizedEmail = email.toLowerCase().trim();

//     // 1. Generate OTP
//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     console.log(`🔢 Sending OTP ${otpCode} to ${normalizedEmail}`);

//     // 2. Store in OTP Collection
//     try {
//         await Otp.deleteMany({ email: normalizedEmail });
//         await Otp.create({ email: normalizedEmail, otp: otpCode });
//     } catch (dbError) {
//         console.error("❌ Database Error:", dbError);
//         res.status(500);
//         throw new Error('Database error saving OTP');
//     }

//     // 3. Send Email
//     const htmlBody = `
//       <div style="font-family: Arial, sans-serif; line-height: 1.6;">
//         <h2>Verify your email</h2>
//         <p>Use the code below to verify your email address for Pyngl.</p>
//         <h1 style="font-size: 32px; letter-spacing: 2px; margin: 20px 0; text-align: center;">
//           ${otpCode}
//         </h1>
//         <p>This code expires in 10 minutes.</p>
//         <p>Thanks,<br>The Pyngl Team</p>
//       </div>
//     `;

//     try {
//         const { data, error } = await resend.emails.send({
//             from: 'Pyngl <notifications@pyngl.com>',
//             to: normalizedEmail,
//             subject: 'Your Verification Code',
//             html: htmlBody,
//         });

//         if (error) throw new Error('Email could not be sent');
//         res.status(200).json({ message: 'OTP sent successfully' });

//     } catch (err) {
//         await Otp.deleteMany({ email: normalizedEmail });
//         res.status(500);
//         throw new Error('Email could not be sent');
//     }
// });

// // ✅ Verify Email OTP
// export const verifyEmailOtp = asyncHandler(async (req, res) => {
//     const { email, otp } = req.body;

//     if (!email || !otp) {
//         res.status(400);
//         throw new Error('Email and OTP are required');
//     }

//     // ✅ FIX: Normalize Input before query
//     const normalizedEmail = email.toLowerCase().trim();
//     const cleanOtp = otp.toString().trim();

//     console.log(`🔍 Verifying: ${normalizedEmail} with code: ${cleanOtp}`);

//     const record = await Otp.findOne({ email: normalizedEmail, otp: cleanOtp });

//     if (!record) {
//         // Debugging help
//         const exists = await Otp.findOne({ email: normalizedEmail });
//         if (exists) {
//             console.log(`❌ Mismatch! DB: ${exists.otp} vs Input: ${cleanOtp}`);
//         } else {
//             console.log(`❌ No record found for ${normalizedEmail}`);
//         }
//         res.status(400);
//         throw new Error('Invalid or expired verification code.');
//     }

//     // Clean up
//     await Otp.deleteOne({ _id: record._id });

//     res.status(200).json({ success: true, message: 'Email verified successfully' });
// });
// export const sendOtpToEmail = asyncHandler(async (req, res) => {
//     const { email } = req.body;
    
//     // [DEBUG LOGS]
//     console.log("🔵 sendOtpToEmail called");
//     console.log("📧 Email received:", email);

//     if (!email) {
//         console.log("❌ Email missing in body");
//         res.status(400);
//         throw new Error('Email is required');
//     }

//     // 1. Generate OTP
//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     console.log("🔢 Generated OTP:", otpCode);

//     // 2. Store in OTP Collection
//     try {
//         await Otp.deleteMany({ email });
//         await Otp.create({ email, otp: otpCode });
//         console.log("💾 OTP saved to Database");
//     } catch (dbError) {
//         console.error("❌ Database Error saving OTP:", dbError);
//         res.status(500);
//         throw new Error('Database error saving OTP');
//     }

//     // 3. Send Email
//     const htmlBody = `
//       <div style="font-family: Arial, sans-serif; line-height: 1.6;">
//         <h2>Verify your email</h2>
//         <p>Use the code below to verify your email address for Pyngl.</p>
//         <h1 style="font-size: 32px; letter-spacing: 2px; margin: 20px 0; text-align: center;">
//           ${otpCode}
//         </h1>
//         <p>This code expires in 10 minutes.</p>
//         <p>Thanks,<br>The Pyngl Team</p>
//       </div>
//     `;

//     try {
//         console.log("🚀 Attempting to send email via Resend...");
//         const { data, error } = await resend.emails.send({
//             from: 'Pyngl <notifications@pyngl.com>',
//             to: email,
//             subject: 'Your Verification Code',
//             html: htmlBody,
//         });

//         if (error) {
//             console.error("❌ Resend API Error:", error);
//             throw new Error('Email could not be sent');
//         }

//         console.log("✅ Email sent successfully:", data);
//         res.status(200).json({ message: 'OTP sent successfully' });

//     } catch (err) {
//         console.error("❌ Send Block Error:", err);
//         // Cleanup if email fails
//         await Otp.deleteMany({ email });
//         res.status(500);
//         throw new Error('Email could not be sent');
//     }
// });

// export const verifyEmailOtp = asyncHandler(async (req, res) => {
//     const { email, otp } = req.body;

//     console.log(`🔍 Verifying OTP for: ${email}`);
//     console.log(`🔢 Code entered: ${otp}`);

//     if (!email || !otp) {
//         res.status(400);
//         throw new Error('Email and OTP are required');
//     }

//     const normalizedEmail = email.toLowerCase();

//     const record = await Otp.findOne({ email: normalizedEmail, otp });

//     if (!record) {
//         // Debug: Check if *any* record exists for this email (to detect mismatch)
//         const anyRecord = await Otp.findOne({ email: normalizedEmail });
//         if (anyRecord) {
//              console.log(`❌ Mismatch! DB has ${anyRecord.otp} but user entered ${otp}`);
//         } else {
//              console.log(`❌ No OTP record found for ${normalizedEmail} at all.`);
//         }

//         res.status(400);
//         throw new Error('Invalid or expired verification code.');
//     }

//     console.log("✅ OTP Verified Successfully!");
//     await Otp.deleteOne({ _id: record._id });

//     res.status(200).json({ success: true, message: 'Email verified successfully' });
// });
export const sendOtpToEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.status(400);
        throw new Error('Email is required');
    }

    // ✅ CRITICAL FIX: Normalize Email (Lowercase + Trim)
    const normalizedEmail = email.toLowerCase().trim();

    // 1. Generate OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`🔢 Sending OTP ${otpCode} to ${normalizedEmail}`);

    // 2. Store in OTP Collection
    try {
        // Delete old OTPs for this exact email
        await Otp.deleteMany({ email: normalizedEmail });
        await Otp.create({ email: normalizedEmail, otp: otpCode });
        console.log("💾 OTP saved to Database");
    } catch (dbError) {
        console.error("❌ Database Error:", dbError);
        res.status(500);
        throw new Error('Database error saving OTP');
    }

    // 3. Send Email
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Verify your email</h2>
        <p>Use the code below to verify your email address for Pyngl.</p>
        <h1 style="font-size: 32px; letter-spacing: 2px; margin: 20px 0; text-align: center;">
          ${otpCode}
        </h1>
        <p>This code expires in 10 minutes.</p>
        <p>Thanks,<br>The Pyngl Team</p>
      </div>
    `;

    try {
        const { data, error } = await resend.emails.send({
            from: 'Pyngl <notifications@pyngl.com>',
            to: normalizedEmail,
            subject: 'Your Verification Code',
            html: htmlBody,
        });

        if (error) throw new Error('Email could not be sent');
        res.status(200).json({ message: 'OTP sent successfully' });

    } catch (err) {
        await Otp.deleteMany({ email: normalizedEmail });
        res.status(500);
        throw new Error('Email could not be sent');
    }
});

// ✅ Verify Email OTP
export const verifyEmailOtp = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        res.status(400);
        throw new Error('Email and OTP are required');
    }

    // ✅ CRITICAL FIX: Match the normalization used in sendOtpToEmail
    const normalizedEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();

    console.log(`🔍 Verifying: ${normalizedEmail} with code: ${cleanOtp}`);

    const record = await Otp.findOne({ email: normalizedEmail, otp: cleanOtp });

    if (!record) {
        // Debug log to see if ANY record exists for this email
        const anyRecord = await Otp.findOne({ email: normalizedEmail });
        if(anyRecord) {
             console.log(`❌ Mismatch! DB has ${anyRecord.otp} but user sent ${cleanOtp}`);
        } else {
             console.log(`❌ No record found for ${normalizedEmail} at all.`);
        }
        
        res.status(400);
        throw new Error('Invalid or expired verification code.');
    }

    // Clean up
    await Otp.deleteOne({ _id: record._id });

    res.status(200).json({ success: true, message: 'Email verified successfully' });
});
export const checkEmailAvailability = asyncHandler(async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(200).json({ 
            available: false, 
            message: 'Email is already registered' 
        });
    }

    res.status(200).json({ 
        available: true, 
        message: 'Email is available' 
    });
});