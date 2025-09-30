// // import mongoose from 'mongoose';
// // import bcrypt from 'bcryptjs';
// // import crypto from 'crypto';
// // import { type } from 'os';

// // const userSchema = new mongoose.Schema({
// //   username: { type: String, required: true, unique: true, trim: true },
// //   email: { type: String, required: true, unique: true, trim: true, lowercase: true },
// //   password: { type: String, required: true },
// //   phoneNumber: { type: String, required: true, unique: true },
// //   age:{
// //     type:String
// //   },
// //   profilePictureUrl: { 
// //         type: String, 
// //         default: '' // Default to an empty string
// //     },
// //   // --- UPDATED FIELDS for OTP-based reset ---
// //   passwordResetOtp: String,
// //   passwordResetExpires: Date,

// // }, { timestamps: true });

// // // Hash password before saving
// // userSchema.pre('save', async function (next) {
// //   if (!this.isModified('password')) return next();
// //   const salt = await bcrypt.genSalt(10);
// //   this.password = await bcrypt.hash(this.password, salt);
// //   next();
// // });

// // // Method to compare entered password with hashed password
// // userSchema.methods.matchPassword = async function (enteredPassword) {
// //   return await bcrypt.compare(enteredPassword, this.password);
// // };

// // // --- NEW METHOD for generating a password reset OTP ---
// // userSchema.methods.generatePasswordResetOtp = function () {
// //   // Generate a 6-digit OTP
// //   const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();

// //   // Hash the OTP and set it on the user document
// //   this.passwordResetOtp = crypto
// //     .createHash('sha256')
// //     .update(resetOtp)
// //     .digest('hex');

// //   // Set an expiration time (e.g., 10 minutes from now)
// //   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

// //   // Return the unhashed OTP to be sent via email
// //   return resetOtp;
// // };

// // const User = mongoose.model('User', userSchema);
// // export default User;
// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true,trim: true},
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phoneNumber: { type: String, required: true, unique: true },
    
//     // --- ADD THIS NEW FIELD ---
//     profilePictureUrl: { 
//         type: String, 
//         default: '' // Default to an empty string
//     },
//  // ✅ NEW FIELD: A flag to track if we've sent the "create a poll" nudge.
//    lastLoggedIn: {
//         type: Date,
//         default: Date.now
//     },
//     lastNudgeSentAt: { // You already have this logic, which is great!
//         type: Date
//     },
//     // OTP and other fields remain the same
//     passwordResetOtp: String,
//     passwordResetExpires: Date,
// }, { timestamps: true });
// userSchema.methods.recordLogin = async function () {
//     this.lastLoggedIn = new Date();
//     await this.save();
// };
// // --- (Your pre-save hooks and methods like matchPassword remain the same) ---
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model('User', userSchema);
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'; // Added from your teammate's code for OTP generation

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        trim: true,      // From teammate's schema
        lowercase: true  // From teammate's schema
    },
    password: { 
        type: String, 
        required: true 
    },
    phoneNumber: { 
        type: String, 
        required: true, 
        unique: true 
    },
    profilePictureUrl: { 
        type: String, 
        default: '' 
    },
    
    // --- NEW: Field for Birth Date ---
    birthDate: {
        type: Date,
        required: true
    },

    // --- Fields for nudge scheduler ---
    lastLoggedIn: {
        type: Date,
        default: Date.now
    },
    lastNudgeSentAt: {
        type: Date
    },

    // --- Fields for password reset ---
    passwordResetOtp: String,
    passwordResetExpires: Date,

}, { 
    timestamps: true,
    // --- NEW: Ensure virtuals are included when converting to JSON ---
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// --- NEW: Virtual property to calculate age from birthDate ---
userSchema.virtual('age').get(function() {
    if (!this.birthDate) {
        return undefined; // Return undefined if no birth date is set
    }
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
});

// --- Method to record login time (from your schema) ---
userSchema.methods.recordLogin = async function () {
    this.lastLoggedIn = new Date();
    await this.save();
};

// --- Password hashing hook (consistent in both schemas) ---
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// --- Password matching method (consistent in both schemas) ---
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// --- OTP generation method (from your teammate's schema) ---
userSchema.methods.generatePasswordResetOtp = function () {
    // Generate a 6-digit OTP
    const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Set an expiration time (10 minutes from now)
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    
    // Store the plain OTP for now, to be hashed by another process or compared directly
    // Storing the hash is more secure, but requires sending the plain one back to the user
    this.passwordResetOtp = resetOtp; 

    // Return the unhashed OTP to be sent via SMS/email
    return resetOtp;
};

const User = mongoose.model('User', userSchema);
export default User;