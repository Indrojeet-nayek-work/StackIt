import Answer from "../models/Answer.js";
import Question from "../models/Question.js";

export const createAnswer = async (req, res) => {
  const { questionId } = req.params;
  const answer = await Answer.create({ ...req.body, questionId });
  res.status(201).json(answer);
};

export const voteAnswer = async (req, res) => {
  const { voteType } = req.body; // "up" or "down"
  const answer = await Answer.findById(req.params.id);
  if (!answer) return res.status(404).json({ error: "Not found" });
  answer.votes += voteType === "up" ? 1 : -1;
  await answer.save();
  res.json({ votes: answer.votes });
};

export const acceptAnswer = async (req, res) => {
  const answer = await Answer.findById(req.params.id);
  if (!answer) return res.status(404).json({ error: "Not found" });
  await Answer.updateMany({ questionId: answer.questionId }, { isAccepted: false });
  answer.isAccepted = true;
  await answer.save();
  res.json(answer);
};
