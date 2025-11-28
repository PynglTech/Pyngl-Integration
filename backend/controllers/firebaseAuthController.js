import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const firebaseLogin = asyncHandler(async (req, res) => {
  const firebaseUser = req.firebaseUser;

  const email = firebaseUser.email;
  const firebaseUid = firebaseUser.uid;
  const name = firebaseUser.name || firebaseUser.email.split("@")[0];
  const picture = firebaseUser.picture;

  let user = await User.findOne({ email });

  // If user doesn't exist → create one automatically
  if (!user) {
    user = await User.create({
      username: name,
      email,
      password: firebaseUid, // dummy password (not used)
      phoneNumber: "",
      profilePictureUrl: picture,
    });
  }

  // Assign your JWT
  const token = generateToken(res, user._id);

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    telegramChatId: user.telegramChatId,
    profilePictureUrl: user.profilePictureUrl,
    birthDate: user.birthDate,
    age: user.age,
    token,
  });
});
