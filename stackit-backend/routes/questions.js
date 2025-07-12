import express from "express";
import {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  voteQuestion,
} from "../controllers/question.controller.js";

const router = express.Router();

router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);
router.post("/", createQuestion);
router.post("/:id/vote", voteQuestion);

export default router;
