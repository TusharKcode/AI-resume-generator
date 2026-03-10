import express from "express";
import protect from "../middleware/authMiddleware.js"
import { createResume, getUserResumes, saveResumeSection } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/create", protect, createResume)
router.get("/user", protect, getUserResumes)
router.post("/section", protect, saveResumeSection)

export default router;