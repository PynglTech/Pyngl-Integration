// import jwt from 'jsonwebtoken';

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });

//   const isProduction = process.env.NODE_ENV === 'production';

//   res.cookie('jwt', token, {
//     httpOnly: true, // ✅ can't be accessed via JS
//     secure: isProduction, // ✅ required for HTTPS
//     sameSite: isProduction ? 'None' : 'Lax', // ✅ allows cross-origin cookie (Render + Vercel)
//     path: '/', // ✅ ensures cookie valid for all routes
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//   });
// };

// export default generateToken;

import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const isLocal = process.env.NODE_ENV !== "production";

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: !isLocal,
    sameSite: isLocal ? "Lax" : "None",
    path: "/",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;
