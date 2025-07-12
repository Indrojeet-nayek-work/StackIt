const { sendMail } = require('./nodemailerService');

/**
 * Generate a random 6-digit verification code
 * @returns {string}
 */
function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send a verification code to the user's email
 * @param {string} to - Recipient email address
 * @param {string} username - Recipient username (optional)
 * @returns {Promise<string>} - The code sent
 */
async function sendVerificationCode(to, username = "") {
  const code = generateVerificationCode();
  const subject = "Your StackIt Verification Code";
  const text = `Hello${username ? ` ${username}` : ''},\n\nYour verification code is: ${code}\n\nIf you did not request this, please ignore this email.`;
  const html = `<p>Hello${username ? ` <strong>${username}</strong>` : ''},</p><p>Your verification code is: <strong>${code}</strong></p><p>If you did not request this, please ignore this email.</p>`;
  await sendMail({ to, subject, text, html });
  return code;
}

module.exports = { sendVerificationCode, generateVerificationCode };
