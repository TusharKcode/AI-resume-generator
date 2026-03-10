import { generateResumeContent } from "../services/aiService.js";

export const generateAIContent = async(req, res) => {
    try {
        const { section, userData } = req.body;
        const aiText = await generateResumeContent(section, userData);

        res.json({
            section, aiText
        });
    } catch (error) {
        res.status(500).json({
            message: "AI generation failed",
            error: error.message
        })
    }
}