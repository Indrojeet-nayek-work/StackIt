import Question from "../models/Question.js";
import User from "../models/User.js";

export const getAllQuestions = async (req, res) => {
  const questions = await Question.find().populate("author", "username avatar").sort({ createdAt: -1 });
  res.json(questions);
};

export const getQuestionById = async (req, res) => {
  const question = await Question.findById(req.params.id).populate("author", "username avatar");
  res.json(question);
};

export const createQuestion = async (req, res) => {
  const question = await Question.create(req.body);
  res.status(201).json(question);
};

export const voteQuestion = async (req, res) => {
  const { voteType } = req.body; // "up" or "down"
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ error: "Not found" });
  question.votes += voteType === "up" ? 1 : -1;
  await question.save();
  res.json({ votes: question.votes });
};