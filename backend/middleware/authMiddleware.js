import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    console.log("Cookies received:", req.cookies);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
           

            // --- THIS IS THE FIX ---
            // Add a check to ensure the user still exists in the database
            if (!req.user) {
                return res.status(401).json({ error: 'Not authorized, user not found' });
            }
            
            next(); // Proceed to the next step (e.g., createPoll)
        } catch (error) {
            console.error(error);
            return res.status(401).json({ error: 'Not authorized, token failed' });
        }
    } else {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }
};
const checkAuth = async (req, res, next) => {
    let token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
        } catch (error) {
            // If token is invalid, just proceed without a user
            console.log("Invalid token found, proceeding as anonymous.");
            req.user = null;
        }
    }
    
    next();
};
export { protect, checkAuth };