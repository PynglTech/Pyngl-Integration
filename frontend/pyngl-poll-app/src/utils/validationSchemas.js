// import * as z from 'zod';

// export const loginSchema = z.object({
//     email: z.string().email({ message: "Invalid email address" }),
//     password: z.string().min(1, { message: "Password is required" }),
// });

// export const registerSchema = z.object({
//     username: z.string().min(3, { message: "Username must be at least 3 characters" }),
//     email: z.string().email({ message: "Invalid email address" }),
//     phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
//     password: z.string().min(6, { message: "Password must be at least 6 characters" }),
// });

// export const forgotPasswordSchema = z.object({
//     email: z.string().email({ message: "Invalid email address" }),
// });

// export const resetPasswordSchema = z.object({
//     otp: z.string().min(6, { message: "OTP must be 6 digits" }).max(6),
//     password: z.string().min(6, { message: "Password must be at least 6 characters" }),
// });


import * as z from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
});

export const registerSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    
    // --- THIS FIELD HAS BEEN ADDED ---
    birthDate: z.string().min(1, { message: "Your date of birth is required." })
      .refine((date) => !isNaN(Date.parse(date)), {
          message: "Please enter a valid date."
      }),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export const resetPasswordSchema = z.object({
    otp: z.string().min(6, { message: "OTP must be 6 digits" }).max(6),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});