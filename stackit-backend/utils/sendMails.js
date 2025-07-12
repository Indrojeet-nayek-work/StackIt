require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function generateVerificationCode(length = 6) {
  return Math.random().toString().slice(2, 2 + length).padEnd(length, '0');
}

/**
 * Send verification email for login or signup.
 * @param {string} to - Recipient email address.
 * @param {'login'|'signup'} type - Type of verification.
 * @returns {Promise<{info: object, code: string}>}
 */
const sendVerificationEmail = async (to, type = 'signup') => {
  const code = generateVerificationCode();
  let subject, text;

  if (type === 'login') {
    subject = 'Login Verification Code';
    text = `Your login verification code is: ${code}\n\nPlease input this code to continue.`;
  } else {
    subject = 'Signup Verification Code';
    text = `Your signup verification code is: ${code}\n\nPlease input this code to continue.`;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  const info = await transporter.sendMail(mailOptions);
  return { info, code };
};

module.exports = sendVerificationEmail;