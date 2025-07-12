import express from "express";
import {
  createAnswer,
  voteAnswer,
  acceptAnswer,
} from "../controllers/answer.controller.js";

const router = express.Router();

router.post("/:questionId", createAnswer);
router.post("/vote/:id", voteAnswer);
router.post("/accept/:id", acceptAnswer);

export default router;