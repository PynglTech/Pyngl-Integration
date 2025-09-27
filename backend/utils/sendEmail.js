import { google } from "googleapis";

/**
 * Sends a poll email via Gmail (plain text, HTML, AMP)
 * @param {Object} user - User object containing Gmail tokens & email
 * @param {string|string[]} recipients - Email or array of emails
 * @param {Object} poll - Poll object from MongoDB (must include _id, question, options)
 */
export default async function sendEmail(user, recipients, poll) {
  if (!poll || !poll._id) throw new Error("Poll object with _id is required");

  const pollId = poll._id.toString();

  // Setup Gmail OAuth client
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oAuth2Client.setCredentials({
    access_token: user.access_token,
    refresh_token: user.refresh_token,
    expiry_date: user.expiry_date
  });

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  const voteUrl = process.env.VOTE_URL;

  // Plain text version
  const plain = `Vote now: ${poll.question}\nYES → ${voteUrl}/vote?pollId=${pollId}&opt=yes\nNO → ${voteUrl}/vote?pollId=${pollId}&opt=no`;

  // HTML version
  const html = `<div style="padding:20px;text-align:center;">
      <h3>${poll.question}</h3>
      <a href="${voteUrl}/vote?pollId=${pollId}&opt=yes">YES</a> |
      <a href="${voteUrl}/vote?pollId=${pollId}&opt=no">NO</a>
    </div>`;

  // AMP HTML version
  const ampHtml = `<!doctype html>
<html ⚡4email>
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js"></script>
  <script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js"></script>
  <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js"></script>
  <style amp4email-boilerplate>body{visibility:hidden}</style>
  <style amp-custom>
    .btn { padding:10px 14px; border-radius:8px; margin:8px; display:inline-block }
    .yes { background:#FF4DA6; color:#fff }
    .no { background:#00CFFF; color:#fff }
    .meter { height:8px; background:#e6e6e6; border-radius:4px; margin:5px 0 }
    .bar { height:8px; background:#FF4DA6; border-radius:4px }
  </style>
</head>
<body>
  <h3>${poll.question}</h3>

  <!-- Voting Form -->
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

  <amp-list width="auto" height="120" layout="fixed-height"
            src="${voteUrl}/email/results?pollId=${pollId}">
    <template type="amp-mustache">
      <h4>📊 Live Results:</h4>
      {{#options}}
        <div>{{text}} - {{pct}}%</div>
        <div class="meter"><div class="bar" style="width: {{pct}}%"></div></div>
      {{/options}}
    </template>
  </amp-list>

</body>
</html>`;

  // Ensure recipients is a string list
  const toField = Array.isArray(recipients) ? recipients.join(", ") : recipients;

  // Construct MIME message
  const messageParts = [
    `From: Pyngl <${user.email}>`,
    `To: ${toField}`,
    `Subject: ${poll.question}`,
    "MIME-Version: 1.0",
    "Content-Type: multipart/alternative; boundary=boundary123",
    "",
    "--boundary123",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    plain,
    "--boundary123",
    "Content-Type: text/html; charset=UTF-8",
    "",
    html,
    "--boundary123",
    "Content-Type: text/x-amp-html; charset=UTF-8",
    "",
    ampHtml,
    "--boundary123--"
  ];

  // Encode for Gmail API
  const raw = Buffer.from(messageParts.join("\n"))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  // Send email
  return gmail.users.messages.send({
    userId: "me",
    requestBody: { raw }
  });
}
