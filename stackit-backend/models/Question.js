import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [String],
    author: {
      username: String,
      avatar: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    votes: {
      type: Number,
      default: 0,
    },
    userVotes: {
      type: Map,
      of: String, // userId -> "up" or "down"
      default: {},
    },
  },
  { timestamps: true },
);

export default mongoose.model("Question", questionSchema);