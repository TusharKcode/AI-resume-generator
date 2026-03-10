import { generateAiContent } from "../services/aiService.js";
import db from "../config/db.js"

export const generateAIContent = async(req, res) => {
    try {
        const { section, userData, resumeId } = req.body;

        if(!resumeId){
            return res.status(400).json({
                message:"resumeId is required"
            })
        }

        // Generate AI texts
        const aiText = await generateAiContent(section, userData);

        // save it into DB
        const query = `INSERT INTO ai_generated_content (resume_id, section_name, ai_text) VALUES (?, ?, ?)`;
        await db.execute(query, [resumeId, section, aiText])

        res.json({
            section, aiText
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "AI generation failed",
            error: error.message
        })
    }
}