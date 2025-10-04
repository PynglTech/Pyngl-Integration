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
  birthDate: z.coerce.date({
    required_error: "Date of Birth is required",
    invalid_type_error: "Invalid date format",
  })
});


export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
});

export const resetPasswordSchema = z.object({
    otp: z.string().min(6, { message: "OTP must be 6 digits" }).max(6),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});