import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    author: {
      username: String,
      avatar: String,
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
    isAccepted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Answer", answerSchema);