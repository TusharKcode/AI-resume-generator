import express from "express";
import protect from "../middleware/authMiddleware.js"
import { getResumeById } from "../../frontend/src/services/resumeService.js";
import { createResume, getUserResumes, saveEducation, saveProjects, saveResumeSection, saveSection, saveSkills } from "../controllers/resumeController.js";

const router = express.Router();

router.post("/create", protect, createResume)
router.get("/user", protect, getUserResumes)
router.post("/section", protect, saveResumeSection)
router.get("/:id", getResumeById)
router.post("/skills", saveSkills)
router.post("/education", saveEducation)
router.post("/projects", saveProjects)
router.post("/section", saveSection)

export default router;