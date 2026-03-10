import express from "express"
import protect from "../middleware/authMiddleware.js"
import { generateAIContent } from "../controllers/aiController.js";

const router = express.Router();
router.post("/generate", protect, generateAIContent)
export default router;