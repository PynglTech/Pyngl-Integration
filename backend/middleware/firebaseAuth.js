import admin from "../config/firebase.js";

const firebaseAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
        return res.status(401).json({ message: "Firebase token missing" });
    }

    try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.firebaseUser = decoded;
        next();
    } catch (err) {
        console.error("Firebase Auth Error:", err);
        res.status(401).json({ message: "Invalid Firebase token" });
    }
};

export default firebaseAuth;
