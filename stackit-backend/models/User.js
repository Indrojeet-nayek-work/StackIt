import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  avatar: { type: String },
  verificationCode: { type: String },
  isVerified: { type: Boolean, default: false },
});

export default mongoose.model("User", UserSchema);