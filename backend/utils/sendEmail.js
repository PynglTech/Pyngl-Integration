import nodemailer from "nodemailer";

/**
 * Send poll email via SMTP (Office 365 / Microsoft)
 * @param {Object} user - Authenticated user (will be CC'd)
 * @param {Array|string} recipients - Recipient email(s)
 * @param {Object} poll - Poll object (_id, question, options)
 */
export default async function sendPollEmail(user, recipients, poll) {
  if (!poll || !poll._id) throw new Error("Poll object with _id is required");

  const voteUrl = process.env.VOTE_URL;
  const pollId = poll._id.toString();

  // Prepare plain, HTML, and AMP content
  const plain = `Vote now: ${poll.question}\nYES → ${voteUrl}/vote?pollId=${pollId}&opt=yes\nNO → ${voteUrl}/vote?pollId=${pollId}&opt=no`;

  const html = `<div style="padding:20px;text-align:center;">
      <h3>${poll.question}</h3>
      <a href="${voteUrl}/vote?pollId=${pollId}&opt=yes">YES</a> |
      <a href="${voteUrl}/vote?pollId=${pollId}&opt=no">NO</a>
    </div>`;

  const ampHtml = `<!doctype html>
<html ⚡4email>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <style amp-custom>
    .btn { padding:10px 14px; border-radius:8px; margin:8px; display:inline-block }
    .yes { background:#FF4DA6; color:#fff }
    .no { background:#00CFFF; color:#fff }
  </style>
</head>
<body>
  <h3>${poll.question}</h3>
  <form method="post" action-xhr="${voteUrl}/email/vote" target="_top">
    <input type="hidden" name="pollId" value="${pollId}">
    ${poll.options.map(o => `
      <label>
        <input type="radio" name="opt" value="${o.text}"> ${o.text}
      </label><br/>
    `).join("")}
    <button class="btn yes" type="submit">Vote</button>
    <div submit-success>
      <template type="amp-mustache">
        <p>✅ Thanks! Here are the live results:</p>
      </template>
    </div>
  </form>
</body>
</html>`;

  // Ensure recipients is array
  const toList = Array.isArray(recipients) ? recipients.join(", ") : recipients;

  // Setup nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "notifications@pyngl.com",
      pass: process.env.NOTIF_PASSWORD,
    },
  });

  // Send email
  await transporter.sendMail({
    from: '"Pyngl Notifications" <notifications@pyngl.com>',
    to: toList,
    cc: user.email, // authenticated user
    subject: poll.question,
    text: plain,
    html: html,
    amp: ampHtml,
  });

  console.log(`✅ Poll sent to ${toList} (CC: ${user.email})`);
}
