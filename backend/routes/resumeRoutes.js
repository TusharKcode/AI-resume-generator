import express from "express";
import protect from "../middleware/authMiddleware.js"
import { createResume, getUserResumes, saveResumeSection, saveSkills } from "../controllers/resumeController.js";
import { getResumeById } from "../../frontend/src/services/resumeService.js";

const router = express.Router();

router.post("/create", protect, createResume)
router.get("/user", protect, getUserResumes)
router.post("/section", protect, saveResumeSection)
router.get("/:id", getResumeById)
router.post("/skills", saveSkills)

export default router;