import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import questionRoutes from "./routes/question.routes.js";
import answerRoutes from "./routes/answer.routes.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "stackit",
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on port ${process.env.PORT}`),
    );
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));