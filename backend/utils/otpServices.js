// /backend/utils/otpService.js

import twilio from 'twilio';
import 'dotenv/config'
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
const client = twilio(accountSid, authToken);
console.log("Attempting to use Verify Service SID:", verifySid); 
/**
 * Sends an OTP to a given phone number.
 * @param {string} phoneNumber - The phone number in E.164 format (e.g., +1234567890).
 * @param {'sms' | 'whatsapp'} channel - The channel to send the OTP through.
 * @returns {Promise<object>} The Twilio verification object.
 */
export const sendOtp = async (phoneNumber, channel) => {
  try {
    const verification = await client.verify.v2.services(verifySid)
      .verifications
      .create({ to: phoneNumber, channel: channel });
    return verification;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error('Failed to send OTP.');
  }
};

/**
 * Verifies an OTP code for a given phone number.
 * @param {string} phoneNumber - The phone number in E.164 format.
 * @param {string} code - The OTP code entered by the user.
 * @returns {Promise<boolean>} True if the OTP is valid, false otherwise.
 */
export const verifyOtp = async (phoneNumber, code) => {
  try {
    const verificationCheck = await client.verify.v2.services(verifySid)
      .verificationChecks
      .create({ to: phoneNumber, code: code });

    // The status will be "approved" if the code is correct.
    return verificationCheck.status === 'approved';
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false; // Return false on any error (e.g., expired, invalid)
  }
};