const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sendVerificationEmail = require('../utils/sendMail');

const router = express.Router();

// 📩 SIGNUP
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit

    const user = new User({ email, password: hashed, verificationCode: code });
    await user.save();

    await sendVerificationEmail(email, code);
    res.status(201).json({ message: 'Signup successful! Check your email for the verification code.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ VERIFY EMAIL
router.post('/verify', async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.verificationCode === code) {
      user.isVerified = true;
      user.verificationCode = null;
      await user.save();
      return res.status(200).json({ message: 'Email verified successfully!' });
    } else {
      return res.status(400).json({ message: 'Invalid verification code' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🔐 LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Please verify your email first' });
    }

    res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;