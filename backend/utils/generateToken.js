// // // // // import jwt from 'jsonwebtoken';

// // // // // const generateToken = (res, userId) => {
// // // // //   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
// // // // //     expiresIn: '30d',
// // // // //   });

// // // // //   const isProduction = process.env.NODE_ENV === 'production';

// // // // //   res.cookie('jwt', token, {
// // // // //     httpOnly: true, // ✅ can't be accessed via JS
// // // // //     secure: isProduction, // ✅ required for HTTPS
// // // // //     sameSite: isProduction ? 'None' : 'Lax', // ✅ allows cross-origin cookie (Render + Vercel)
// // // // //     path: '/', // ✅ ensures cookie valid for all routes
// // // // //     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
// // // // //   });
// // // // // };

// // // // // export default generateToken;

// // // // import jwt from "jsonwebtoken";

// // // // const generateToken = (res, userId) => {
// // // //   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
// // // //     expiresIn: "30d",
// // // //   });

// // // //   const isLocal = process.env.NODE_ENV !== "production";

// // // //   res.cookie("jwt", token, {
// // // //     httpOnly: true,
// // // //     secure: !isLocal,
// // // //     sameSite: isLocal ? "Lax" : "None",
// // // //     path: "/",
// // // //     maxAge: 30 * 24 * 60 * 60 * 1000,
// // // //   });
// // // // };

// // // // export default generateToken;

// // // import jwt from 'jsonwebtoken';

// // // const generateToken = (res, userId) => {
// // //   // 1. Create the token using the ID
// // //   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
// // //     expiresIn: '30d',
// // //   });

// // //   // 2. Attach it to the cookie
// // //   res.cookie('jwt', token, {
// // //     httpOnly: true,
// // //     secure: process.env.NODE_ENV !== 'development',
// // //     sameSite: 'strict', // or 'lax'
// // //     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
// // //   });
// // // };

// // // export default generateToken;
// // import jwt from 'jsonwebtoken';

// // const generateToken = (res, userId) => {
// //   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
// //     expiresIn: '30d',
// //   });

// //   res.cookie('jwt', token, {
// //     httpOnly: true,
// //     // Use 'lax' so the cookie is accepted during the redirect from Google
// //     sameSite: 'lax', 
// //     secure: false, // False for localhost/http
// //     maxAge: 30 * 24 * 60 * 60 * 1000, 
// //   });
// // };

// // export default generateToken; 
// import jwt from 'jsonwebtoken';

// const generateToken = (res, userId) => {
//   const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   });

//   res.cookie('jwt', token, {
//     httpOnly: true,
    
//     // 1. MUST BE FALSE for 192.168.x.x (unless you have SSL certificates)
//     secure: false, 

//     // 2. MUST BE 'Lax' to survive the Google Redirect
//     sameSite: 'lax', 

//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//   });
// };

// export default generateToken;
import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    // ⚠️ CRITICAL: Set secure to false for development (http)
    secure: process.env.NODE_ENV === 'production', 
    // ⚠️ CRITICAL: Use 'Lax' so it works on redirects and normal login
    sameSite: 'lax', 
    maxAge: 30 * 24 * 60 * 60 * 1000, 
    // ❌ DO NOT add a "domain" property here
  });
};

export default generateToken;