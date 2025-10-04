// /backend/utils/whatsappService.js

import axios from 'axios';

const WHATSAPP_API_VERSION = 'v18.0'; // Or a more recent version
const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const whatsappAPI = axios.create({
  baseURL: `https://graph.facebook.com/${WHATSAPP_API_VERSION}`,
  headers: {
    'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
    'Content-Type': 'application/json',
  }
});

export const sendWhatsappMessage = async (recipientPhoneNumber, messageText) => {
  if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_NUMBER_ID) {
    throw new Error('WhatsApp API credentials are not configured in the .env file.');
  }

  try {
    const response = await whatsappAPI.post(`/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
      messaging_product: 'whatsapp',
      to: recipientPhoneNumber, // Must include country code, e.g., 919876543210
      text: {
        body: messageText,
      },
    });
    console.log('WhatsApp message sent successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.response?.data || error.message);
    throw new Error('Failed to send WhatsApp message.');
  }
};