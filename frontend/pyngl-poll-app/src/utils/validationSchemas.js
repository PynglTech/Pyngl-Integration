// // import * as z from 'zod';

// // export const loginSchema = z.object({
// //     email: z.string().email({ message: "Invalid email address" }),
// //     password: z.string().min(1, { message: "Password is required" }),
// // });

// // export const registerSchema = z.object({
// //     username: z.string().min(3, { message: "Username must be at least 3 characters" }),
// //     email: z.string().email({ message: "Invalid email address" }),
// //     phoneNumber: z.string().min(10, { message: "Please enter a valid phone number" }),
// //     password: z.string().min(6, { message: "Password must be at least 6 characters" }),
// // });

// // export const forgotPasswordSchema = z.object({
// //     email: z.string().email({ message: "Invalid email address" }),
// // });

// // export const resetPasswordSchema = z.object({
// //     otp: z.string().min(6, { message: "OTP must be 6 digits" }).max(6),
// //     password: z.string().min(6, { message: "Password must be at least 6 characters" }),
// // });


// import * as z from 'zod';

// export const loginSchema = z.object({
//     email: z.string().email({ message: "Invalid email address" }),
//     password: z.string().min(1, { message: "Password is required" }),
// });

// export const registerSchema = z.object({
//     username: z.string().min(3, 'Username must be at least 3 characters'),
//     email: z.string().email('Invalid email address'),
//     phoneNumber: z.string().min(10, 'Please enter a valid phone number'),
    
//     // Use z.string() for date, as the input type="date" provides a string
//     birthDate: z.string().refine((date) => new Date(date) < new Date(), {
//         message: "Please enter a valid date of birth"
//     }),

//     password: z.string().min(8, 'Password must be at least 8 characters'),
    
//     // Add the confirmPassword field
//     confirmPassword: z.string().min(8, 'Password must be at least 8 characters')
// })
// // Use .refine to validate that the passwords match
// .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match",
//     path: ["confirmPassword"], // Show error on the confirmPassword field
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
  identifier: z.string().min(1, "Required"),
  password: z.string().min(6, "Password too short"),
});


export const registerSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    
    // REMOVED: phoneNumber field
    
    // UPDATED: Matches the 'dob' string sent from your frontend (e.g., "January 1, 2002")
    dob: z.string().min(1, { message: "Date of birth is required" }),

    password: z.string().min(8, 'Password must be at least 8 characters'),
    
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters')
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Show error on the confirmPassword field
});

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export const resetPasswordSchema = z.object({
    otp: z.string().min(6, { message: "OTP must be 6 digits" }).max(6),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});