// rcsClient.js
import axios from "axios";

const RCS_BASE = "https://apis.rmlconnect.net";

class RCSClient {
  constructor(token) {
    this.token = token;   // You will pass your JWTAUTH here
  }

  // AUTH HEADERS
  headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  // SEND TEXT MESSAGE
  async sendText(phone, text) {
    const url = `${RCS_BASE}/rcs/v1/message`;

    const body = {
      type: "text",
      phone_no: phone,
      bot_name: "rml_jbm",    // YOUR BOT NAME
      text,
    };

    const res = await axios.post(url, body, { headers: this.headers() });
    return res.data;
  }

  // SEND RICH CARD
  async sendRichCard(phone) {
    const url = `${RCS_BASE}/rcs/v1/message`;

    const body = {
      type: "card",
      phone_no: phone,
      bot_name: "rml_jbm",
      card: {
        title: "Welcome!",
        description: "This is a rich card sent using Route Mobile.",
        url: "https://example.com/sample-image.jpg",
        suggestions: [
          {
            type: "url",
            text: "Visit Pyngl",
            url: "https://pyngl.com",
            postback: "open_pyngl",
          },
        ],
      },
    };

    const res = await axios.post(url, body, { headers: this.headers() });
    return res.data;
  }

  // CHECK RCS CAPABILITY
  async checkCapability(phone) {
    const url = `${RCS_BASE}/rcs/bot/v1/contactCapabilities?userContact=${encodeURIComponent(
      phone
    )}&botName=rml_jbm`;

    const res = await axios.get(url, { headers: this.headers() });
    return res.data;
  }
}

export default RCSClient;
