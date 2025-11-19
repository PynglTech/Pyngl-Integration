import axios from "axios";

/**
 * Send a poll to an Apple Messages for Business user
 *
 * Required req.body:
 * - userMbid: Apple MBID (from webhook)
 * - question: Poll question
 * - options: [{ title: "Option A", id: "A" }, ...]
 * - imageUrl: (optional) image to include in message
 */
export const sendPollToApple = async (req, res) => {
  try {
    const { userMbid, question, options, imageUrl } = req.body;

    // Validation
    if (!userMbid) {
      return res.status(400).json({ error: "Missing user MBID" });
    }
    if (!question || !options) {
      return res.status(400).json({ error: "Missing poll question or options" });
    }

    // Build interactive actions
    const actions = options.map((opt, index) => ({
      type: "reply",
      title: opt.title,
      id: opt.id ?? `option_${index + 1}`,
    }));

    // Base content
    let content = {
      type: "INTERACTIVE",
      body: question,
      actions,
    };

    // If image provided, build media template
    if (imageUrl) {
      content = {
        type: "MEDIA",
        mediaUrl: imageUrl,
        mediaType: "image/jpeg",
        interactive: {
          body: question,
          actions,
        },
      };
    }

    // Final payload
    const payload = {
      messages: [
        {
          sender: process.env.SENDER_ID,
          destinations: [
            {
              to: `urn:mbid:${userMbid}`,
            },
          ],
          content,
        },
      ],
    };

    // Call MSP API
    const response = await axios.post(process.env.MSP_API_URL, payload, {
      headers: {
        Authorization: `App ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    return res.json({
      success: true,
      message: "Poll sent successfully",
      providerResponse: response.data,
    });
  } catch (error) {
    console.error("Send Poll Error:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      error: "Failed to send poll",
      details: error.response?.data || error.message,
    });
  }
};


export const receiveAppleResponse = async (req, res) => {
  try {
    const message = req.body;

    console.log("Incoming Apple MFB Message:", JSON.stringify(message, null, 2));

    const userMbid = message?.message?.from?.id;
    const reply = message?.message?.content?.text;

    if (!userMbid || !reply) {
      return res.status(200).send("Ignored: No reply found");
    }

    // TODO: Save to DB
    // await PollVote.create({ userMbid, reply });

    return res.status(200).json({
      success: true,
      userMbid,
      reply,
      message: "Vote received successfully",
    });
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(500).send("Webhook error");
  }
};
