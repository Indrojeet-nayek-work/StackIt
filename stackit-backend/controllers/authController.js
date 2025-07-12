import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendVerificationCode } from "../utils/verificationService.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  // Generate verification code and send email
  const code = await sendVerificationCode(email, username);
  const user = await User.create({ username, email, passwordHash, verificationCode: code, isVerified: false });
  res.status(201).json({ message: "Signup successful! Check your email for the verification code.", user });
};

export const verifyUser = async (req, res) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });
  if (user.verificationCode === code) {
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully!" });
  } else {
    return res.status(400).json({ error: "Invalid verification code" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
  if (!user.isVerified) {
    // Resend verification code if not verified
    const code = await sendVerificationCode(email, user.username);
    user.verificationCode = code;
    await user.save();
    return res.status(403).json({ error: "Email not verified. Verification code sent." });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ token, user });
};