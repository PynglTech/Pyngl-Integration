import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

// This function tells Passport how to serialize a user into the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// This function tells Passport how to deserialize a user from the session
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use(
    new GoogleStrategy({
        // Options for the Google strategy, using credentials from your .env file
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/users/auth/google/callback'
    }, 
    async (accessToken, refreshToken, profile, done) => {
        // This function is called after Google successfully authenticates the user.
        // We find or create a user in our own database.
        try {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                // If they already exist, we're done. Pass them to the next step.
                return done(null, existingUser);
            }

            // If it's a new user, create an account for them.
            const newUser = await new User({
                googleId: profile.id,
                username: profile.displayName,
                email: profile.emails[0].value,
                profilePictureUrl: profile.photos[0].value,
                // We don't save a password because they will always log in via Google.
            }).save();
            
            done(null, newUser);

        } catch (error) {
            done(error, null);
        }
    })
);
export default passport;